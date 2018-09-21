import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard, AtTag, AtRate } from "taro-ui"
import './index.scss'

class ShopList extends Component {
  config = {
    navigationBarTitleText: '商家列表'
  }

  state = {
    shopList: [
      {
        id: 1,
        name: '永和大王 (银河SOHO店)',
        count: 5,
        rate: 4.5
      },
      {
        id: 2,
        name: '合利屋 (三元桥店)',
        count: 7,
        rate: 4.7
      }
    ]
  }

  handleCardClick = (shopId, shopName) => {
    Taro.navigateTo({
      url: `../DishList/index?shopId=${shopId}&shopName=${shopName}`
    })
  }

  componentDidShow () {}

  render () {
    return (
      <View className='shop-list'>
        <View className='panel'>
          <View className='panel__title'>商家列表</View>
          <View className='panel__content'>
            {
              this.state.shopList.map(shop => (
                <AtCard
                  key={shop.id}
                  extra={`${shop.count} 件菜品`}
                  title={shop.name}
                  onClick={this.handleCardClick.bind(this, shop.id, shop.name)}
                >
                  <View className='at-row at-row__justify--between'>
                    <View className='tags'>
                      <AtTag size='small' circle active>午餐</AtTag>
                      <AtTag size='small' circle active>晚餐</AtTag>
                    </View>
                    <View className='rate'>
                      <AtRate value={shop.rate} />
                      <Text className='text'>{shop.rate}</Text>
                    </View>
                  </View>
                </AtCard>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}

export default ShopList
