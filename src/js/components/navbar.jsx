import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import { logoutUser } from '../actions/userActions';
import SearchBar from './searchbar.jsx';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@connect(mapStateToProps)
export default class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      current: 'logo'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ key }) {
    this.setState({ current: key });
  }

  render() {
    let { logged } = this.props;
    return (
      <div className='navbar-wrapper'>
        <Menu className='navbar' onClick={this.handleClick} mode='horizontal' selectedKeys={[this.state.current]}>
          <Menu.Item key='logo' className='logo'>
            <Link to='/'><Icon type='camera-o' /></Link>
          </Menu.Item>
          <SearchBar />
          {logged && 
          <Menu.Item key='profile'>
            <Link to='/profile'><Icon type='user'/>Profile</Link>
          </Menu.Item>}
          {!logged && 
          <Menu.Item key='register'>
            <Link className='primary' to='/register'>Sign up</Link>
          </Menu.Item>}
          {!logged && 
          <Menu.Item key='login'>
            <Link to='/login'><Icon type='login' />Login</Link>
          </Menu.Item>}
          {logged && 
          <Menu.Item key='upload'>
            <Link to='/upload'><Icon type='cloud-upload-o' />Upload</Link>
          </Menu.Item>}
          {logged && 
          <SubMenu title={<span><Icon type='picture' />Gallery</span>}>
            <Menu.Item className='submenu-item' key='Carousel'>
              <Link to='/gallery/carousel'>Carousel</Link>
            </Menu.Item>
            <Menu.Item className='submenu-item' key='Cards'>
              <Link to='/gallery/cards'>Cards</Link>
            </Menu.Item>
          </SubMenu>}
        </Menu>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    logged: !!user.id
  }
}
