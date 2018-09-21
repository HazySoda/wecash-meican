import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"

class Rating extends Component {
  config = {
    navigationBarTitleText: '排行榜'
  }

  state = {
    ratingList: [
      {
        id: 1,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.1
      },
      {
        id: 2,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.2
      },
      {
        id: 3,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.3
      },
      {
        id: 4,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.4
      },
      {
        id: 5,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.5
      },
      {
        id: 6,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.6
      },
      {
        id: 7,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.7
      },
      {
        id: 8,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.8
      },
      {
        id: 9,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 4.9
      },
      {
        id: 10,
        name: '黑椒牛柳饭',
        shopName: '永和大王 (银河SOHO店)',
        rate: 5
      },
    ]
  }

  handleListItemClick = (dishId, dishName) => {
    Taro.navigateTo({
      url: `../DishDetail/index?dishId=${dishId}&dishName=${dishName}`
    })
  }

  componentDidShow () {}

  render () {
    return (
      <View className='rating'>
        <View className='panel'>
          <View className='panel__title'>排行榜</View>
          <View className='panel__content'>
            <AtList>
              {
                this.state.ratingList.map((dish, index) => (
                  <AtListItem
                    key={dish.id}
                    title={`[No.${index + 1}] ${dish.name}`}
                    note={dish.shopName}
                    extraText={`${dish.rate}分`}
                    arrow='right'
                    onClick={this.handleListItemClick.bind(this, dish.id, dish.name)}
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

export default Rating
