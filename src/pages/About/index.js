import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class About extends Component {
  config = {
    navigationBarTitleText: '关于'
  }

  render () {
    return (
      <View className='rating'>
        <View className='panel'>
          <View className='panel__title'>关于</View>
          <View className='panel__content padding'>
            This is About page.
          </View>
        </View>
      </View>
    )
  }
}

export default About
