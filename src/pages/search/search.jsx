import React, { Component } from 'react'
import ListItem from '../../components/list-item/index.jsx'
import { Pagination, Breadcrumb } from 'antd'

class Search extends Component {
  state = {
    queryInfo: {},
    total: 0,
    goodsList: [],
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

  changePage = (page) => {
    // console.log(this.props)
    this.props.history.push('/search/' + this.props.match.params.key + '/' + page)
    this.setState({ currentPage: page })
  }

  componentDidMount() {
    this.setState({
      queryInfo: {
        query: this.props.match.params.key,
        cid: '',
        pagenum: parseInt(this.props.match.params.page),
        pagesize: 12
      }
    }, function() {
      this.getGoodsList()
      this.setState({ currentPage: parseInt(this.props.match.params.page) })
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 'this' is forbidden in this function
    const newKey = nextProps.match.params.key
    const newPage = parseInt(nextProps.match.params.page)
    if (newKey !== prevState.queryInfo.query || newPage !== prevState.queryInfo.pagenum) {
      return {
        queryInfo: {
          query: newKey,
          cid: '',
          pagenum: newPage,
          pagesize: 12  
        }
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.queryInfo.query !== prevState.queryInfo.query || this.state.queryInfo.pagenum !== prevState.queryInfo.pagenum) {
      this.getGoodsList()
      this.setState({ currentPage: this.state.queryInfo.pagenum })
    }
  }

  render() {
    return (
      <div className="container list-outer-box">
        <div className="row breadcrumb-box">
          <Breadcrumb separator=">">
            <Breadcrumb.Item>Search results</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.queryInfo.query}</Breadcrumb.Item>
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

export default Search
