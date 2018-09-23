import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import {
  AtCard,
  AtRate,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtTextarea
} from 'taro-ui'
import api from '../../utils/api'
import './index.scss'

class DishDetail extends Component {
  config = {
    navigationBarTitleText: '菜品详情'
  }

  state = {
    dishId: 0,
    dishName: '',
    shopId: 0,
    isModalOpened: false,
    comment: '',
    rate: 0,
    commentList: []
  }

  handleBtnClick = () => {
    this.setState({
      rate: 0,
      comment: '',
      isModalOpened: true
    })
  }

  handleCommentChange = e => {
    this.setState({
      comment: e.target.value
    })
  }

  handleRateChange = rate => {
    this.setState({
      rate
    })
  }

  handleModalCancel = () => {
    this.setState({
      isModalOpened: false
    })
  }

  handleModalConfirm = () => {
    this.addComment()
  }

  getCommentList = async () => {
    try {
      Taro.showLoading({
        title: 'Loading...',
        mask: true
      })
      const res = await Taro.request({
        method: 'GET',
        url: `${api.HOST_URI}/comments`,
        data: {
          dishId: this.state.dishId
        }
      })
      const commentList = res.data.data
      this.setState({
        commentList
      })
      Taro.hideLoading()
    } catch (err) {
      Taro.hideLoading()
      Taro.showToast(err.message)
      console.log(err)
    }
  }

  addComment = async () => {
    try {
      Taro.showLoading({
        title: 'Loading...',
        mask: true
      })
      await Taro.request({
        method: 'POST',
        url: `${api.HOST_URI}/comments`,
        data: {
          userId: Taro.getStorageSync('uid'),
          userName: Taro.getStorageSync('username'),
          userAvatar: Taro.getStorageSync('avatar'),
          shopId: this.state.shopId,
          dishId: this.state.dishId,
          comment: this.state.comment,
          rate: this.state.rate
        }
      })
      this.setState({
        rate: 0,
        comment: '',
        isModalOpened: false
      })
      Taro.hideLoading()
      this.getCommentList()
    } catch (err) {
      Taro.hideLoading()
      Taro.showToast(err.message)
      console.log(err)
    }
  }

  userLogin = (e) => {
    const { encryptedData, iv, userInfo } = e.detail
    Taro.setStorageSync('username', userInfo.nickName)
    Taro.setStorageSync('avatar', userInfo.avatarUrl)
    Taro.login({
      timeout: 3000,
      success: res => {
        const code = res.code
        Taro.request({
          method: 'POST',
          url: `${api.HOST_URI}/users/wxLogin`,
          data: {
            code,
            encryptedData,
            iv
          },
          success: tokenRes => {
            Taro.setStorageSync('uid', tokenRes.data.userId)
            Taro.setStorageSync('token', tokenRes.data.token)
            this.handleBtnClick()
          }
        })
      }
    })
  }

  componentWillMount () {
    const { dishId, dishName, shopId } = this.$router.params
    this.setState(({
      dishId,
      dishName,
      shopId
    }))
  }

  componentDidShow () {
    this.getCommentList()
  }

  render () {
    return (
      <View className='dish-detail'>
        <View className='panel'>
          <View className='panel__title at-row at-row__justify--between at-row__align--center'>
            <Text>{this.state.dishName}</Text>
            <Button className='login-btn' openType='getUserInfo' onGetUserInfo={this.userLogin}>我来评价</Button>
          </View>
          <View className='panel__content'>
            {
              this.state.commentList.map(detail => (
                <AtCard
                  key={detail.id}
                  extra={detail.date}
                  title={detail.user_name}
                  thumb={detail.user_avatar}
                >
                  <View className='at-row at-row__align--center'>
                    <Text>评分：</Text>
                    <AtRate value={detail.rate} />
                  </View>
                  <View className='comment'>
                    {detail.comment}
                  </View>
                </AtCard>
              ))
            }
          </View>
        </View>
        <AtModal isOpened={this.state.isModalOpened}>
          {
            this.state.isModalOpened &&
            (
              <View>
                <AtModalHeader>评价</AtModalHeader>
                <AtModalContent>
                  <View class='modal-rate'>
                    <AtRate
                      size={30}
                      margin={20}
                      value={this.state.rate}
                      onChange={this.handleRateChange}
                    />
                  </View>
                  <AtTextarea
                    value={this.state.comment}
                    maxlength='100'
                    placeholder='味道、分量如何...'
                    onChange={this.handleCommentChange}
                  />
                </AtModalContent>
                <AtModalAction>
                  <Button onClick={this.handleModalCancel}>取消</Button>
                  <Button onClick={this.handleModalConfirm}>确定</Button>
                </AtModalAction>
              </View>
            )
          }
        </AtModal>
      </View>
    )
  }
}

export default DishDetail
