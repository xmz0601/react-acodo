import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './acodo.less'

import Header from '../../components/header/index.jsx'
import Footer from '../../components/footer/index.jsx'

import Home from '../home/home.jsx'
import List from '../list/list.jsx'
import Search from '../search/search.jsx'

class Acodo extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="header-box fixed-top">
          <Header />
        </div>

        <div className="content-box">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/list/:cid/:page" component={List} />
            <Route path="/search/:key/:page" component={Search} />
            <Redirect to="/home" />
          </Switch>
        </div>

        <div className="footer-box">
          <Footer />
        </div>
      </div>
    )
  }
}

export default Acodo
  