import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard, AtTag, AtRate } from "taro-ui"
import api from '../../utils/api'
import './index.scss'
import Placeholder from '../../components/Placeholder'

class ShopList extends Component {
  config = {
    navigationBarTitleText: '商家列表'
  }

  state = {
    shopList: []
  }

  handleCardClick = (shopId, shopName) => {
    Taro.navigateTo({
      url: `../DishList/index?shopId=${shopId}&shopName=${shopName}`
    })
  }

  getShopList = async () => {
    try {
      Taro.showLoading({
        title: 'Loading...',
        mask: true
      })
      const res = await Taro.request({
        method: 'GET',
        url: `${api.HOST_URI}/shops`
      })
      Taro.hideLoading()
      if (res.statusCode !== 200) {
        Taro.showToast({
          title: res.data.message || '服务器繁忙，请稍后再试',
          icon: 'none'
        })
        return
      }
      const shopList = res.data.data
      this.setState({
        shopList
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
    this.getShopList()
  }

  render () {
    return (
      <View className='shop-list'>
        <View className='panel'>
          <View className='panel__title'>商家列表</View>
          <View className='panel__content'>
            {
              this.state.shopList.length ?
              this.state.shopList.map(shop => (
                <AtCard
                  key={shop.id}
                  extra={`${shop.dishes_count} 件菜品`}
                  title={shop.name}
                  onClick={this.handleCardClick.bind(this, shop.id, shop.name)}
                >
                  <View className='at-row at-row__justify--between'>
                    <View className='tags'>
                      <AtTag size='small' circle active>午餐</AtTag>
                      {
                        shop.type === 2 &&
                        <AtTag size='small' circle active>晚餐</AtTag>
                      }
                    </View>
                    <View className='rate'>
                      <AtRate value={parseFloat(shop.rate)} />
                      <Text className='text'>{parseFloat(shop.rate)}</Text>
                    </View>
                  </View>
                </AtCard>
              )) : <Placeholder />
            }
          </View>
        </View>
      </View>
    )
  }
}

export default ShopList
