import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import { logoutUser } from '../actions/userActions';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@connect(mapStateToProps, mapDispatchToProps)
export default class Navbar extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ key }) {
    switch(key) {
    case 'logout':
      this.props.logout();
      break;
    }
  }

  render() {
    let { logged } = this.props;
    return (
      <Menu className='navbar' onClick={this.handleClick} mode="horizontal">
        <Menu.Item className='logo'>
          <Link to='/'><Icon type='camera-o' /></Link>
        </Menu.Item>
        {logged && 
        <SubMenu className='profile-submenu' title={<Link to='/profile'><Icon type="user" />Profile</Link>} >
          <Menu.Item className='submenu-item' key="logout">
            <Icon type="logout" />Logout
          </Menu.Item>
        </SubMenu>}
        {!logged && 
        <Menu.Item>
          <Link className='primary' to='/register'>Sign up</Link>
        </Menu.Item>}
        {!logged && 
        <Menu.Item>
          <Link to='/login'><Icon type="login" />Login</Link>
        </Menu.Item>}
        {logged && 
        <Menu.Item>
          <Link to='/upload'><Icon type="cloud-upload-o" />Upload</Link>
        </Menu.Item>}
        {logged && 
        <SubMenu title={<span><Icon type="picture" />Gallery</span>}>
          <Menu.Item className='submenu-item' key="Carousel">
            <Link to='gallery/carousel'>Carousel</Link>
          </Menu.Item>
          <Menu.Item disabled className='submenu-item' key="Cards">
            <Link to='gallery/cards'>Cards</Link>
          </Menu.Item>
        </SubMenu>}
      </Menu>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    logged: !!user.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  }
}
