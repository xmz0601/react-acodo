import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { withRouter, Link } from 'react-router-dom'

class Login extends Component {
  validatePwd = (rule, value) => {
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
      return Promise.reject('please input your password')
    } else if (value.length < 6 || value.length > 10) {
      return Promise.reject('the length of password should between 6 and 10')
    } else if (!pwdReg.test(value)) {
      return Promise.reject('password should be combination of numbers & alphabets & underscores')
    } else {
      return Promise.resolve()
    }
  }

	onFinish = async (values) => {
    // console.log(values)
    const res = await this.sendAjaxReq('clogin', values, 'post')
    if (res.meta.status === 200) {
      console.log(res.data)
      message.success('log in successfully')
      // save user info to sessionStorage
      window.sessionStorage.setItem('token', res.data.token)
      // save user info to redux
      // this.$store.commit('saveUserInfo', res.data)
      // redirect
      this.props.history.push('/home')
    } else {
      message.error(res.meta.msg)
    }
  }

  render() {
    return (
      <div className="container login-outer-box">
        <div className="row no-gutters">
          <div className="col-md-4 sidebar d-flex align-items-center justify-content-center">
            <h4 className="logo">
              <Link to="/home">acodo</Link>
            </h4>
          </div>

          <div className="col-md-8 login-container">
            <div className="header-box d-flex align-items-center justify-content-center">
              <h6 className="header">LOG IN</h6>
            </div>
            <div className="form-container d-flex align-items-center">
              <Form
                name="login"
                className="login-form"
                initialValues={{email: 'sam@gmail.com', password: '123456'}}
                onFinish={this.onFinish}
                size="large"
                autoComplete="off"
              >
                <Form.Item
                  name="email"
                  hasFeedback
                  rules={[
                    { required: true, whitespace: true, message: 'please input your email' },
                    { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, message: 'email is invalid' }
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
          
                <Form.Item
                  name="password"
                  hasFeedback
                  rules={[{ validator: this.validatePwd }]}
                >
                  <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)