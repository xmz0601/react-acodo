import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'

class ListItem extends Component {
  render() {
    return (
      <div className="container list-item-outer-box">
        <Link to={'/detail/' + this.props._id}>
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
