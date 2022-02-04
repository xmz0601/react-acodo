import React, { Component } from 'react'
import './index.less'
import { message, Menu, Dropdown, Input, Modal, Badge } from 'antd'
import { SearchOutlined, ShoppingCartOutlined, DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetUser } from '../../redux/actions'

const { SubMenu } = Menu

class Header extends Component {
  state = {
    cateList: [],
    keywords: ''
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

  selectCate = (e) => {
    // console.log(e)
    this.props.history.push('/list/' + e.key + '/1')
  }

  handleChange = (e) => {
    // console.log(e.target.value)
    this.setState({
      keywords: e.target.value
    })
  }

  searchGoods = () => {
    if (!this.state.keywords.trim()) {
      this.setState({
        keywords: ''
      })
    } else {
      this.props.history.push('/search/' + this.state.keywords + '/1')
      this.setState({
        keywords: ''
      })  
    }
  }

  goLoginPage = () => {
    this.props.history.push('/login')
  }

  goRegisterPage = () => {
    this.props.history.push('/register')
  }

  goCartPage = () => {
    this.props.history.push('/cart')
  }

  logout = () => {
    Modal.confirm({
      title: 'Are you sure you want to log out?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      cancelText: 'Cancel',
      centered: true,
      onOk: () => {
        window.sessionStorage.clear()
        this.props.resetUser()
        if (this.props.location.pathname !== '/home') {
          this.props.history.push('/home')
        }
      }
    })
  }

  componentDidMount() {
    this.getCateList()
  }

  render() {
    const menu = (
      <Menu onClick={this.selectCate}>
        {this.state.cateList.map((item1) => {
          return (
            <SubMenu title={item1.cate_name} key={item1._id} onTitleClick={this.selectCate}>
              {item1.children.map((item2) => {
                return <Menu.Item key={item2._id}>{item2.cate_name}</Menu.Item>
              })}
            </SubMenu>
          )
        })}
      </Menu>
    )

    let hasLogined = this.props.user.username ? true : false

    return (
      <div className="container header-outer-box">
        <div className="row upper-row">
          <div className="col-md-2 logo">
            <Link to="/home">acodo</Link>
          </div>
          <div className="col-md-4 search-box">
            <Input placeholder="Find a product" value={this.state.keywords} onChange={this.handleChange} onPressEnter={this.searchGoods} />
            <button onClick={this.searchGoods}><SearchOutlined /></button>
          </div>
          <div className="col-md-2 offset-md-2 cart-box">
            {
              hasLogined ? (
                <div className="btns mycart" onClick={this.goCartPage}>
                  <Badge count={this.showCartNum(this.props.user.cart)} color="#3b135a" showZero size="small" offset={[-5, 1]}>
                    <ShoppingCartOutlined />
                  </Badge> | <span>{this.priceFilter(this.showTotalPrice(this.props.user.cart))}</span>
                </div>
              ) : (
                <div className="btns login-btn" onClick={this.goLoginPage}>Log in</div>
              )
            }
          </div>
          <div className="col-md-2">
            {
              hasLogined ? (
                <div className="btns logout-btn" onClick={this.logout}>Log out</div>
              ) : (
                <div className="btns register-btn" onClick={this.goRegisterPage}>Register</div>
              )
            }
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

export default connect(
  state => ({ user: state.user }),
  { resetUser }
)(withRouter(Header))
