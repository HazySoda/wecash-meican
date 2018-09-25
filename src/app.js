import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import Index from './pages/ShopList/index'
import configStore from './store'
import './app.scss'

if (process.env.TARO_ENV === "weapp") {
  require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
  require("taro-ui/dist/h5/css/index.css")
}

const store = configStore()

class App extends Component {
  config = {
    pages: [
      'pages/ShopList/index',
      'pages/DishList/index',
      'pages/DishDetail/index',
      'pages/Rating/index',
      'pages/About/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#628add',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#628add',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/ShopList/index',
          text: '首页',
          iconPath: 'assets/icons/list.png',
          selectedIconPath: 'assets/icons/list-active.png'
        },
        {
          pagePath: 'pages/Rating/index',
          text: '排行',
          iconPath: 'assets/icons/rate.png',
          selectedIconPath: 'assets/icons/rate-active.png'
        },
        {
          pagePath: 'pages/About/index',
          text: '关于',
          iconPath: 'assets/icons/about.png',
          selectedIconPath: 'assets/icons/about-active.png'
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
