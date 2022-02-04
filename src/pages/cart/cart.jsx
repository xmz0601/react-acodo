import React, { Component } from 'react'
import './cart.less'
import { connect } from 'react-redux'
import { receiveUser } from '../../redux/actions'
import CartItem from '../../components/cart-item'

class Cart extends Component {


  render() {
    return (
      <div className="container cart-outer-box">
        <div className="cart-header">MY TROLLEY</div>
        <div className="cart-main clearfix">
          <div className="cart-left-box fl">
            {/* {this.showCartNum(this.props.user.cart)} trolley items */}
            <div className="row total-num">15 trolley items</div>
            <div className="row cart-list-item"><CartItem /></div>
            <div className="row cart-list-item"><CartItem /></div>
            <div className="row cart-list-item"><CartItem /></div>
            <div className="row cart-list-item"><CartItem /></div>
            <div className="row cart-list-item"><CartItem /></div>
          </div>
          <div className="cart-right-box fl">
            <div className="right-inner-box">
              <p className="total-title">Total</p>
              <p className="total-price">$553.00</p>
            </div>
          </div>  
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { receiveUser }
)(Cart)