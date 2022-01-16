import React, { Component } from 'react'
import { Carousel } from 'antd'
import './home.less'

class Home extends Component {
  render() {
    return (
      <div className="container home-outer-box">
        <div className="row banner-box">
          <div className="col-lg-2 side-banner-box d-none d-lg-block">
            <p>Welcome</p>
            <p>to</p>
            <p>Acodo</p>
          </div>
          <div className="col-lg-8 carousel-box">
            <Carousel autoplay>
              <div>
                <img src={require('../../assets/uploads/banner1.png')} alt="banner1" />
              </div>
              <div>
                <img src={require('../../assets/uploads/banner2.jpeg')} alt="banner2" />
              </div>
              <div>
                <img src={require('../../assets/uploads/banner3.png')} alt="banner3" />
              </div>
            </Carousel>
          </div>
          <div className="col-lg-2 side-banner-box d-none d-lg-block">
            <p>Enjoy</p>
            <p>Your</p>
            <p>Shopping</p>
          </div>
        </div>

        <div className="row slot-box">
          <p className="slotTitle">
            Whatever your schedule, there's a delivery slot just for you
          </p>
          <img src={require('../../assets/uploads/slot.png')} alt="slot" />
        </div>

        <div className="row delivery-box">
          <div className="col-md-6 sub-deli-box">
            <img src={require('../../assets/uploads/delivery1.png')} alt="delivery1" />
          </div>
          <div className="col-md-6 sub-deli-box">
            <img src={require('../../assets/uploads/delivery2.png')} alt="delivery2" />
          </div>
        </div>    
      </div>
    )
  }
}

export default Home
