import React, { Component } from 'react';
import './header.css'
import logo from '../../../assets/img/logo@2x.png'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentIndex: 0,
      routers: [
        {
          tabName: "项目",
          url: "project",
          index: 0
        },
        {
          tabName: "进度",
          url: "progress_list",
          index: 1
        },
        {
          tabName: "动态",
          url: "dynamic_list",
          index: 2
        },
        {
          tabName: "成员",
          url: "member",
          index: 3
        }
      ]
    }
  }

  onChange(res) {
    console.log(res)
    this.setState({
      currentIndex: res.index
    })
    console.log(this.state.currentIndex)
    window.location.href = './' + res.url
  }

  render() {
    const tabList = this.state.routers.map((res, index) => {
      let tabStyle = res.index==this.state.currentIndex ? 'tab-item tab-item-active' : 'tab-item'
      return 
      // <div onClick={this.onChange.bind(this, res)} key={index} className={tabStyle}>
      // {res.tabName}
      // </div>
    })
    return (
      <div className="container">
        <img className="logo-img" src={logo} alt={"logo"}/>
        <div className="logo-text">木犀工作台</div>
        <div className="tab-container">
          <NavLink to="/project" className="tab-item" activeClassName="tab-item tab-item-active">项目</NavLink>
          <NavLink to="/progress_list" className="tab-item" activeClassName="tab-item tab-item-active">进度</NavLink>
          <NavLink to="/dynamic_list" className="tab-item" activeClassName="tab-item tab-item-active">动态</NavLink>
          <NavLink to="/member" className="tab-item" activeClassName="tab-item tab-item-active">成员</NavLink>
        </div>
        {/* <Link to="/about">About</Link> */}
      </div>
    )
  }
}

export default Header;