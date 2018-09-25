import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

class About extends Component {
  config = {
    navigationBarTitleText: '关于'
  }

  state = {
    imgUrl: 'https://wow-static-1253920996.cos.ap-beijing.myqcloud.com/images/wechat-pay.jpeg'
  }

  handleImageClick = () => {
    Taro.previewImage({
      urls: [this.state.imgUrl]
    })
  }

  render () {
    return (
      <View className='about'>
        <View className='panel'>
          <View className='panel__title'>关于</View>
          <View className='panel__content padding'>
            <View class='content'>民以食为天。</View>
            <View class='content'>在闪银工作餐的众多选择中，我们可能都迷茫过。</View>
            <View class='content'>希望这个小程序可以帮每一个人找到自己的菜。</View>
            <View class='content'>如果你觉得这对你有些许帮助，点击图片长按扫码。</View>
            <View class='content'>请我喝杯咖啡吧，Respect~</View>
            <Image class='image' src={this.state.imgUrl} onClick={this.handleImageClick} />
          </View>
        </View>
      </View>
    )
  }
}

export default About
