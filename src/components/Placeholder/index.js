import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

class Placeholder extends Component {

  render () {
    return (
      <View className='placeholder'>
        <Text>空空如也</Text>
      </View>
    )
  }
}

export default Placeholder
