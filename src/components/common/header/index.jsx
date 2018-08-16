import React, { Component } from 'react';
import './index.css'
import logo from '../../../assets/img/logo@2x.png'
import searchIcon from '../../../assets/img/search@2x.png'
import infoRemindIcon from '../../../assets/img/info-remind@2x.png'
import { NavLink } from 'react-router-dom'
import AvatarImg from '../../../assets/img/avatar.png'
import Avatar from '../avatar/index'

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentIndex: 0,
      showInput: false
    }
  }

  clickSearchIcon() {
    const that = this
    this.setState({
      showInput: !that.state.showInput
    })
  }

  render() {
    return (
      <div className="header-container">
        <img className="header-logo-img" src={logo} alt={"logo"}/>
        <div className="header-logo-text">木犀工作台</div>
        <div className="header-tab-container">
          <NavLink to="/project" className="header-tab-item" activeClassName="header-tab-item header-tab-item-active">项目</NavLink>
          <NavLink to="/progress_list" className="header-tab-item" activeClassName="header-tab-item header-tab-item-active">进度</NavLink>
          <NavLink to="/dynamic_list" className="header-tab-item" activeClassName="header-tab-item header-tab-item-active">动态</NavLink>
          <NavLink to="/member" className="header-tab-item" activeClassName="header-tab-item header-tab-item-active">成员</NavLink>
        </div>
        <div className="header-function">
          <div className="header-avatar">
            <Avatar src={AvatarImg} />
          </div>
          <img className="header-info-icon" src={infoRemindIcon} alt={"info-remind"}/>
          {this.state.showInput && (<input className="header-search-input" type="text" autoFocus={true}/>)}
          <img onClick={this.clickSearchIcon.bind(this)} className="header-search-icon" src={searchIcon} alt={"search"}/>
        </div>
        <div className="header-write-progress">写进度</div>
      </div>
    )
  }
}

export default Header;