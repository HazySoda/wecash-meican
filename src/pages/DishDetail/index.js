import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import {
  AtCard,
  AtRate,
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtTextarea
} from 'taro-ui'
import './index.scss'

class DishDetail extends Component {
  config = {
    navigationBarTitleText: '菜品详情'
  }

  state = {
    dishId: 0,
    dishName: '',
    isModalOpened: false,
    comment: '',
    rate: 0,
    detail: [
      {
        id: 0,
        name: '腰花',
        thumb: 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG',
        date: '2018.09.24',
        rate: 5,
        comment: '老板两串烤腰子谢谢！！'
      },
      {
        id: 1,
        name: '土拨鼠',
        thumb: 'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG',
        date: '2018.09.24',
        rate: 4,
        comment: '啊！！！！！！！！！！'
      }
    ]
  }

  handleBtnClick = () => {
    this.setState({
      rate: 0,
      comment: '',
      isModalOpened: true
    })
  }

  handleRateChange = rate => {
    this.setState({
      rate
    })
  }

  handleModalCancel = () => {
    console.log('cancelled')
    this.setState({
      isModalOpened: false
    })
  }

  handleModalConfirm = () => {
    console.log('confirmed')
    this.setState({
      isModalOpened: false
    })
  }

  componentWillMount () {
    const { dishId, dishName } = this.$router.params
    this.setState(({
      dishId,
      dishName
    }))
  }

  componentDidShow () {}

  render () {
    return (
      <View className='dish-detail'>
        <View className='panel'>
          <View className='panel__title at-row at-row__justify--between at-row__align--center'>
            <Text>{this.state.dishName}</Text>
            <AtButton type='primary' size='small' circle onClick={this.handleBtnClick}>我来评价</AtButton>
          </View>
          <View className='panel__content'>
            {
              this.state.detail.map(detail => (
                <AtCard
                  key={detail.id}
                  extra={detail.date}
                  title={detail.name}
                  thumb={detail.thumb}
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
            />
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleModalCancel}>取消</Button>
            <Button onClick={this.handleModalConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default DishDetail
