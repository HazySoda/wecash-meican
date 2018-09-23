import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import api from '../../utils/api'

class DishList extends Component {
  config = {
    navigationBarTitleText: '菜品列表'
  }

  state = {
    shopId: 0,
    shopName: '',
    dishList: []
  }

  handleListItemClick = (dishId, dishName, shopId) => {
    Taro.navigateTo({
      url: `../DishDetail/index?dishId=${dishId}&dishName=${dishName}&shopId=${shopId}`
    })
  }

  getDishList = async () => {
    try {
      Taro.showLoading({
        title: 'Loading...',
        mask: true
      })
      const res = await Taro.request({
        method: 'GET',
        url: `${api.HOST_URI}/dishes`,
        data: {
          shopId: this.state.shopId
        }
      })
      const dishList = res.data.data
      this.setState({
        dishList
      })
      Taro.hideLoading()
    } catch (err) {
      Taro.hideLoading()
      Taro.showToast(err.message)
      console.log(err)
    }
  }

  componentWillMount () {
    const { shopId, shopName } = this.$router.params
    this.setState({
      shopId,
      shopName
    })
  }

  componentDidShow () {
    this.getDishList()
  }

  render () {
    return (
      <View className='dish-list'>
        <View className='panel'>
          <View className='panel__title'>{this.state.shopName}</View>
          <View className='panel__content'>
            <AtList>
              {
                this.state.dishList.map(dish => (
                  <AtListItem
                    key={dish.id}
                    title={dish.name}
                    arrow='right'
                    extraText={`${dish.rate}分`}
                    onClick={this.handleListItemClick.bind(this, dish.id, dish.name, dish.shop_id)}
                  />
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
