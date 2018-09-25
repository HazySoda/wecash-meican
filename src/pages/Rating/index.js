import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import api from '../../utils/api'
import Placeholder from '../../components/Placeholder'

class Rating extends Component {
  config = {
    navigationBarTitleText: '排行榜'
  }

  state = {
    rankList: []
  }

  handleListItemClick = (dishId, dishName, shopId) => {
    Taro.navigateTo({
      url: `../DishDetail/index?dishId=${dishId}&dishName=${dishName}&shopId=${shopId}`
    })
  }

  getRankList = async () => {
    try {
      Taro.showLoading({
        title: 'Loading...',
        mask: true
      })
      const res = await Taro.request({
        method: 'GET',
        url: `${api.HOST_URI}/dishes/rank`
      })
      Taro.hideLoading()
      if (res.statusCode !== 200) {
        Taro.showToast({
          title: res.data.message || '服务器繁忙，请稍后再试',
          icon: 'none'
        })
        return
      }
      const rankList = res.data
      this.setState({
        rankList
      })
    } catch (err) {
      Taro.hideLoading()
      Taro.showToast({
        title: '连接服务器失败',
        icon: 'none'
      })
      console.log(err)
    }
  }

  componentDidShow () {
    this.getRankList()
  }

  render () {
    return (
      <View className='rating'>
        <View className='panel'>
          <View className='panel__title'>排行榜</View>
          <View className='panel__content'>
            {
              this.state.rankList.length ?
              <AtList>
                {
                  this.state.rankList.map((dish, index) => (
                    <AtListItem
                      key={dish.id}
                      title={`[No.${index + 1}] ${dish.name}`}
                      note={dish.shop_Name}
                      extraText={`${dish.rate}分`}
                      arrow='right'
                      onClick={this.handleListItemClick.bind(this, dish.id, dish.name, dish.shop_id)}
                    />
                  ))
                }
              </AtList> : <Placeholder />
            }
          </View>
        </View>
      </View>
    )
  }
}

export default Rating
