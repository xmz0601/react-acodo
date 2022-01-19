import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'

class ListItem extends Component {
  priceFilter = (val) => {
    const arr = (val + '').split('.')
    if (arr[1]) {
      if (arr[1].length === 1) return '￡' + val + '0'
      if (arr[1].length === 2) return '￡' + val
      return '￡' + val.toFixed(2)
    }
    return '￡' + val + '.00'
  }

  weightFilter = (val) => {
    if (val >= 1000) return val/1000 + 'kg'
    return val + 'g'
  }


  render() {
    return (
      <div className="container list-item-outer-box">
        <Link to={'/detail' + this.props._id}>
          <img className="pic-box" src={'http://127.0.0.1:8000' + this.props.pic} alt="pic" />
          <h5 className="name-box">{this.props.name}</h5>
          <p className="weight-box">{this.weightFilter(this.props.weight)}</p>
          <p className="price-box">{this.priceFilter(this.props.price)}</p>
        </Link>
        <div className="add-btn">Add to cart</div>
      </div>
    )
  }
}

export default ListItem
