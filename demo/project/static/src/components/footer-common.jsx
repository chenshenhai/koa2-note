import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
const {  Footer } = Layout

class FooterCommon extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Hello World ©2017 Created by hello world
      </Footer>
    )
  }
}


export default FooterCommon