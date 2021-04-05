import React, { useState } from 'react';
import { Layout, Icon, Avatar, Popover } from 'antd';
import { Link } from "react-router-dom";
import { PROFILE_IMG_PATH } from '../actions/utilAction';

const { Header } = Layout;

function AppHeader(props) {
  const userMenuOptions = (
    <div>
      <p onClick={() => handleVisibleChange()}><Link to="/profile">My Profile</Link></p>
      <p onClick={() => handleVisibleChange()}><Link to="/reset">Change Password</Link></p>
      <p onClick={() => handleVisibleChange()}><Link to="/">Logout</Link></p>
    </div>
  );
  const notificationMenuOptions = (
    <div>
      <p>Notifications</p>
    </div>
  );
  const [visible, setVisible] = useState(false);
  function handleVisibleChange() {
    setVisible(!visible)
  }
  console.log('userssssssssssssproile',props)
  return (<Header >
    <Icon
      className="trigger"
      type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={props.toggle}
    />
    <span style={{ float: 'right' }}>
      {/* <Popover placement="bottomRight" content={notificationMenuOptions} trigger="click">
        <Icon type={'bell'} style={{ fontSize: '18px', padding: '5px' }} />
      </Popover> */}
      <span>
        <Popover placement="bottomRight" visible={visible}
          onVisibleChange={() => handleVisibleChange()} content={userMenuOptions} trigger="click">

          <Avatar src="https://ss.stagingsdei.com:9031/uploads/profile_1606480531113.png"
            className="gx-size-50 gx-pointer cursor-pointer" alt="" />
           
        </Popover>
      </span>
    </span>
  </Header>);
}

export default AppHeader;
