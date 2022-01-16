import React, { Component } from 'react'
import './index.less'
import { message, Menu, Dropdown } from 'antd'
import { SearchOutlined, ShoppingCartOutlined, DownOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

class Header extends Component {
  state = {
    cateList: []
  }

  getCateList = async () => {
    const res = await this.sendAjaxReq('categories', { level: 2 }, 'get')
    if (res.meta.status === 200) {
      // console.log(res.data)
      this.setState({ cateList: res.data })
    } else {
      message.error(res.meta.msg)
    }
  }

  selectCateOne = (e) => {
    console.log(e)
    // e.key is the t1 _id
  }

  selectCateTwo = (e) => {
    console.log(e)
    // e.key is the  _id
  }

  componentDidMount() {
    this.getCateList()
  }

  render() {
    const menu = (
      <Menu onClick={this.selectCateTwo}>
        {this.state.cateList.map((item1) => {
          return (
            <SubMenu title={item1.cate_name} key={item1._id} onTitleClick={this.selectCateOne}>
              {item1.children.map((item2) => {
                return <Menu.Item key={item2._id}>{item2.cate_name}</Menu.Item>
              })}
            </SubMenu>
          )
        })}
      </Menu>
    )

    return (
      <div className="container header-outer-box">
        <div className="row upper-row">
          <div className="col-md-2 logo">
            <Link to="/home">acodo</Link>
          </div>
          <div className="col-md-4 search-box">
            <input type="text" />
            <button><SearchOutlined /></button>
          </div>
          <div className="col-md-2 offset-2 cart-box">
            {/* <div className="btns login-btn">Log in</div> */}
            <div className="btns mycart">
              <ShoppingCartOutlined /> | <span>￡0.00</span>
            </div>
          </div>
          <div className="col-md-2">
            {/* <div className="btns register-btn">Register</div> */}
            <div className="btns logout-btn">Log out</div>
          </div>
        </div>
        <div className="row no-gutters top-menu">
          <div className="col-md-2 top-menu-item">
            <div className="top-menu-inner">
              {/* DropDown menu */}
              <Dropdown overlay={menu} arrow placement="bottomCenter">
                <span className="dropdown-title">
                  Browse Shop <DownOutlined />
                </span>
              </Dropdown>
            </div>
          </div>
          <div className="col-md-2 top-menu-item">
            <div className="top-menu-inner">Favourites</div>
          </div>
          <div className="col-md-2 top-menu-item">
            <div className="top-menu-inner">Offers</div>
          </div>
          <div className="col-md-2 top-menu-item">
            <div className="top-menu-inner">Inspire Me</div>
          </div>
          <div className="col-md-2 top-menu-item">
            <div className="top-menu-inner">Easy Buy</div>
          </div>
          <div className="col-md-2 top-menu-item">
            <div className="top-menu-inner" style={{borderRight: 0}}>Smart Pass</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
