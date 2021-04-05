import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import logo from '../img/logo.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebaar extends React.Component {
  render() {
    let path = this.props.location.pathname;
    return (<Sider trigger={null} collapsible collapsed={this.props.collapsed}>
      <div className="logo"><img alt="logo" src={logo}></img></div>
      <Menu theme="dark" mode="inline" selectedKeys={[path]}>
        <Menu.Item key="/dashboard" onClick={() => this.props.history.push('/dashboard')}>
          <Icon type="dashboard" />
          <span>Dashboard</span>
        </Menu.Item>
        <Menu.Item key="/users" onClick={() => this.props.history.push('/users')}>
          <Icon type="user" />
          <span>Manage User</span>
        </Menu.Item>
        <Menu.Item key="/ads" onClick={() => this.props.history.push('/ads')}>
          <Icon type="notification" />
          <span>Manage Ads</span>
        </Menu.Item>
        <Menu.Item key="/ticket" onClick={() => this.props.history.push('/ticket')}>
          <Icon type="audit" />
          <span>Manage Ticket</span>
        </Menu.Item>
        <SubMenu
          key="/category"
          title={
            <span>
              <Icon type="appstore" />
              <span>Master</span>
            </span>
          }
        >
          <Menu.Item key="5" onClick={() => this.props.history.push('/category')}>Manage Category</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>);
  }
}

export default withRouter(Sidebaar);
