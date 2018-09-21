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
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/ShopList/index',
          text: '首页'
        },
        {
          pagePath: 'pages/Rating/index',
          text: '排行'
        },
        {
          pagePath: 'pages/About/index',
          text: '关于'
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
