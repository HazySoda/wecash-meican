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
            <View class='content'>中秋三天加上一些业余时间写了这个小程序，</View>
            <View class='content'>万万没想到的是它还没上线，美餐先下岗了。</View>
            <View class='content'>不过写代码的过程还是很快乐的，美餐的晚餐也还在，</View>
            <View class='content'>所以还是决定发布了，希望它可以帮助到加班的闪宝们。</View>
            <View class='content'>如果它帮你找到了属于你的菜，可以请我喝杯咖啡~</View>
            <View class='content'>Work Hard && Eat Harder</View>
            <Image class='image' src={this.state.imgUrl} onClick={this.handleImageClick} />
          </View>
        </View>
      </View>
    )
  }
}

export default About
