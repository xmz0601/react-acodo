import React, { Component } from 'react'
import './index.less'

class Footer extends Component {
  render() {
    return (
      <div className="container footer-outer-box">
        <div className="row no-gutters">
          <div className="col-md-3">
            <ul style={{borderLeft: 0}}>
              <li><strong>Customer service</strong></li>
              <li>Product recalls</li>
              <li>Site Map</li>
              <li>Branch finder</li>
              <li>refunds</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul>
              <li><strong>About us</strong></li>
              <li>About Acodo</li>
              <li>Business</li>
              <li>Media center</li>
              <li>Jobs</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul>
              <li><strong>Our shops</strong></li>
              <li>Cellar</li>
              <li>Florist</li>
              <li>Gifts</li>
              <li>Garden</li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul>
              <li><strong>Follow us</strong></li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>YouTube</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer
