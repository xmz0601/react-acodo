import React, { Component } from 'react'
import './detail.less'

class Detail extends Component {
  state = {
    goodsInfo: {}
  }

  getGoodsInfo = async () => {
    const res = await this.sendAjaxReq('goods/' + this.props.match.params.gid, {}, 'get')
    if (res.meta.status === 200) {
      // console.log(res.data)
      this.setState({ goodsInfo: res.data })
    } else {
      this.setState({ goodsInfo: {} })
    }
  }

  componentDidMount() {
    this.getGoodsInfo()
  }

  render() {
    return (
      <div className="container detail-outer-box">
        <div className="row upper-box">
          <div className="col-md-4 pic-box">
            <img src={'http://127.0.0.1:8000' + this.state.goodsInfo.pic} alt="pic" />
          </div>
          <div className="col-md-8 basic-info-box">
            <h5 className="name-box">{this.state.goodsInfo.name}</h5>
            <p className="weight-box">{this.weightFilter(this.state.goodsInfo.weight)}</p>
            <p className="price-box">{this.priceFilter(this.state.goodsInfo.price)}</p>
            <div className="add-btn">Add to cart</div>
          </div>
        </div>

        <div className="row lower-box">
          <div className="col-md-8 offset-md-4">
            <div className="detail-info-box">
              <p className="info-title">Description</p>
              <p className="info-text" dangerouslySetInnerHTML={{ __html: this.state.goodsInfo.description }}></p>
            </div>
            <div className="detail-info-box">
              <p className="info-title">Ingredients</p>
              <p className="info-text" dangerouslySetInnerHTML={{ __html: this.state.goodsInfo.ingredients }}></p>
            </div>
            <div className="detail-info-box">
              <p className="info-title">Storage</p>
              <p className="info-text" dangerouslySetInnerHTML={{ __html: this.state.goodsInfo.storage }}></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
