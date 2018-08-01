import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import Request from './../utils/request'
import { signInApi, signInForm } from './../api/sign-in'

const FormItem = Form.Item;

const SignInForm = Form.create()(React.createClass({
  
  async handleSubmit(e) {
    e.preventDefault()

    let values = await this.getFormValues()
    if ( values ) {
      let result = await signInApi( values )
      if ( result && result.success === true ) {
        message.success( '登录成功！' )
        signInForm( values )
      } else if ( result && result.message ){
        message.error( result.message )
      }
    } else {
      message.error( '系统繁忙，稍后再试！' )
    }
  },


  getFormValues() {
    let that = this
    return new Promise((resolve, reject) => {
      that.props.form.validateFields((err, values) => {
        if (!err) {
          resolve( values )
        } else {
          reject( false )
        }
      })
    })
  },

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: "280px", margin: "0 auto" }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请您输入账号名称！' }],
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="请您输入用户名称！" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请您输入账号密码！' }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请您输入账号密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住登录</Checkbox>
            )}
            <a className="login-form-forgot">忘记密码</a><br/>
            <Button type="primary" htmlType="submit" className="login-form-button">
              确定
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  },
}))
export default SignInForm