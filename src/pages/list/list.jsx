import React, { Component } from 'react'
import './list.less'
import ListItem from '../../components/list-item/index.jsx'
import { Pagination, Breadcrumb } from 'antd'

class List extends Component {
  state = {
    queryInfo: {},
    total: 0,
    goodsList: [],
    catesInfo: [],
    currentPage: 1
  }

  getGoodsList = async () => {
    // console.log(this.state.queryInfo)
    const res = await this.sendAjaxReq('goods', this.state.queryInfo, 'get')
    if (res.meta.status === 200) {
      // console.log(res.data)
      this.setState({
        goodsList: res.data.goods,
        total: res.data.totalCount
      })
    } else {
      this.setState({
        goodsList: [],
        total: 0
      })
    }
  }

  getCatesInfo = async () => {
    // console.log(this.props.match.params.cid)
    let newArr = []
    const res = await this.sendAjaxReq('categories/' + this.props.match.params.cid, {}, 'get')
    if (res.meta.status === 200) {
      newArr.push(res.data.cate_name)
      if(res.data.cate_level === 1) {
        // get parent cate
        const res1 = await this.sendAjaxReq('categories/' + res.data.cate_pid, {}, 'get')
        newArr.push(res1.data.cate_name)
      }
      // console.log(newArr)
      this.setState({
        catesInfo: newArr.reverse()
      })
    } else {
      this.setState({
        catesInfo: []
      })
    }
  }

  changePage = (page) => {
    // console.log(this.props)
    this.props.history.push('/list/' + this.props.match.params.cid + '/' + page)
    this.setState({ currentPage: page})
  }

  componentDidMount() {
    this.setState({
      queryInfo: {
        query: '',
        cid: this.props.match.params.cid,
        pagenum: parseInt(this.props.match.params.page),
        pagesize: 12
      }
    }, function() {
      this.getGoodsList()
      this.getCatesInfo()
      this.setState({ currentPage: parseInt(this.props.match.params.page) })
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 'this' is forbidden in this function
    const newCid = nextProps.match.params.cid
    const newPage = parseInt(nextProps.match.params.page)
    if (newCid !== prevState.queryInfo.cid || newPage !== prevState.queryInfo.pagenum) {
      return {
        queryInfo: {
          query: '',
          cid: newCid,
          pagenum: newPage,
          pagesize: 12  
        }
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.queryInfo.cid !== prevState.queryInfo.cid || this.state.queryInfo.pagenum !== prevState.queryInfo.pagenum) {
      this.getGoodsList()
      this.getCatesInfo()
      this.setState({ currentPage: this.state.queryInfo.pagenum })
    }
  }

  render() {
    return (
      <div className="container list-outer-box">
        <div className="row breadcrumb-box">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            {
              this.state.catesInfo.map((item, ind) => {
                return (
                  <Breadcrumb.Item key={ind}>{item}</Breadcrumb.Item>
                )
              })
            }
          </Breadcrumb>
        </div>
        <div className="row list-box">
          {this.state.goodsList.map((item) => {
            return (
              <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 item-box" key={item._id}>
                <ListItem {...item} />
              </div>
            )
          })}
        </div>
        <div className="row pagi-box">
          <Pagination current={this.state.currentPage} pageSize={this.state.queryInfo.pagesize} total={this.state.total} onChange={this.changePage} />
        </div>
      </div>
    )
  }
}

export default List
