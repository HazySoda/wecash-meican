import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

class DishList extends Component {
  config = {
    navigationBarTitleText: '菜品列表'
  }

  state = {
    shopId: 0,
    shopName: '',
    dishes: [
      {
        id: 1,
        name: '黑椒牛柳饭',
        rate: 5
      },
      {
        id: 2,
        name: '酥嫩鸡排饭',
        rate: 4.8
      }
    ]
  }

  componentWillMount () {
    const { shopId, shopName } = this.$router.params
    this.setState({
      shopId,
      shopName
    })
  }

  componentDidShow () {}

  render () {
    return (
      <View className='dish-list'>
        <View className='panel'>
          <View className='panel__title'>{this.state.shopName}</View>
          <View className='panel__content'>
            <AtList>
              {
                this.state.dishes.map(dish => (
                  <AtListItem key={dish.id} title={dish.name} arrow='right' extraText={`${dish.rate}分`} />
                ))
              }
            </AtList>
          </View>
        </View>
      </View>
    )
  }
}

export default DishList
