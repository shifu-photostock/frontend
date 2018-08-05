import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@connect(mapStateToProps)
export default class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      current: 'mail',
    }
  }


  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    let { logged } = this.props;
    return (
      <Menu className='navbar' onClick={this.handleClick} mode="horizontal">
        <Menu.Item className='logo'>
          <Link to='/'><Icon type='camera-o' /></Link>
        </Menu.Item>
        {!logged && 
        <Menu.Item>
          <Link to='/login'><Icon type="login" />Login</Link>
        </Menu.Item>}
        {logged && 
        <Menu.Item>
          <Link to='/logout'><Icon type="logout" />Logout</Link>
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
    logged: user.logged
  }
}
