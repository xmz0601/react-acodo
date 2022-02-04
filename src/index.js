import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
// import 'antd/dist/antd.min.css'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/css/global.css'
import sendAjaxReq from './api/ajax.js'

// import NProgress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/'
axios.interceptors.request.use(config => {
  // console.log(config)
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})

React.Component.prototype.sendAjaxReq = sendAjaxReq

// set filters
React.Component.prototype.weightFilter = (val) => {
  if (val >= 1000) return val/1000 + 'kg'
  return val + 'g'
}
React.Component.prototype.priceFilter = (val) => {
  const arr = (val + '').split('.')
  if (arr[1]) {
    if (arr[1].length === 1) return '￡' + val + '0'
    if (arr[1].length === 2) return '￡' + val
    return '￡' + val.toFixed(2)
  }
  return '￡' + val + '.00'
}
React.Component.prototype.showCartNum = (arr) => {
  let total = 0
  arr.forEach((ele) => {
    total += ele.goodsNum
  })
  return total
}
React.Component.prototype.showTotalPrice = (arr) => {
  let total = 0
  arr.forEach((ele) => {
    total += ele.goodsNum * ele.cart_item.price
  })
  return total
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
