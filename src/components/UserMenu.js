import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import logo from '../img/kashme_logo.png';

const { Sider } = Layout;
const { SubMenu } = Menu;

class UserMenu extends React.Component {
  render() {
    let path = this.props.location.pathname;
    return (
    
    <Sider trigger={null} collapsible collapsed={this.props.collapsed} style={{background:'#03278A'}}>
      
      <div className="logo">
        <img alt="logo" src={logo} ></img>
        {/* <span style={{color:'white'}}>KashMe</span> */}
        
        </div>
    {/* <div>
      KashMe
    </div> */}

      <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]} style={{background:'#03278A'}} >
        <Menu.Item key="/dashboard" onClick={() => this.props.history.push('/dashboard')}>
          <Icon style={{color:'white'}} type="dashboard" />
          <span className="unselectable">Dashboard</span>
        </Menu.Item>
        <Menu.Item key="/users" onClick={() => this.props.history.push('/dashboard')}>
          <Icon style={{color:'white'}}  type="user" />
          <span className="unselectable">Manage Customers</span>
        </Menu.Item>
        {/* <Menu.Item key="/products" onClick={() => this.props.history.push('/products')}>
        <Icon type="shopping-cart" />
          <span>Products </span>
        </Menu.Item> */}
        <Menu.Item key="/category" onClick={() => this.props.history.push('/dashboard')}>
          <Icon style={{color:'white'}}  type="codepen" />
          <span className="unselectable">Transactions/Loans</span>
        </Menu.Item>
        <Menu.Item key="/categordy" onClick={() => this.props.history.push('/dashboard')}>
          <Icon style={{color:'white'}}  type="codepen" />
          <span className="unselectable">Account Approval</span>
        </Menu.Item>
        <Menu.Item key="/categoryd" onClick={() => this.props.history.push('/dashboard')}>
          <Icon style={{color:'white'}}  type="codepen" />
          <span className="unselectable">Settings</span>
        </Menu.Item>
{/*         
        <Menu.Item key="/subcategory" onClick={() => this.props.history.push('/subcategory')}>
          <Icon type="codepen" />
          <span>Sub-Category</span>
        </Menu.Item> */}
        {/* <Menu.Item key="/ads" onClick={() => this.props.history.push('/ads')}>
          <Icon type="notification" />
          <span>Manage Ads</span>
        </Menu.Item>
        <Menu.Item key="/ticket" onClick={() => this.props.history.push('/ticket')}>
          <Icon type="audit" />
          <span>Manage Ticket</span>
        </Menu.Item> */}
        {/* <SubMenu
          key="/category"
          title={
            <span>
              <Icon type="appstore" />
              <span>Master</span>
            </span>
          }
        >
         <Menu.Item key="/banners" onClick={() => this.props.history.push('/banners')}>
          <Icon type="codepen" />
          <span className="unselectable">Manage Banners</span>
        </Menu.Item>
        </SubMenu> */}
      </Menu>
    </Sider>);
  }
}

export default withRouter(UserMenu);
