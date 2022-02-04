import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons'

class CartItem extends Component {
  render() {
    return (
      <div className="container cart-item-outer-box">
        <div className="row">
          <div className="col-md-2 col-lg-2 pic-box">
            <Link to={'/detail/'}>
              <img src={require('../../assets/test.jpg')} alt="pic" />
            </Link>
          </div>
          <div className="col-md-6 col-lg-5 name-box">
            <Link to={'/detail/'}>
              <h6 className="name-text">M&S Select Farms Basted Lamb Leg Joint with Rosemary Boneless</h6>
            </Link>
            <p className="d-none d-md-block d-lg-none price-text">￡10.00</p>
          </div>
          <div className="col-md-3 col-lg-2 btn-box">
            <MinusOutlined /><PlusOutlined />
            <p className="goods-num">55 in trolley</p>
          </div>
          <div className="d-none d-lg-block col-lg-2 price-box">￡10.00</div>
          <div className="col-md-1 col-lg-1 del-box">
            <CloseOutlined />
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
