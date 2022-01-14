import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
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

ReactDOM.render(<App />, document.getElementById('root'))
