import React , { Component } from 'react'
import {Link}from 'react-router-dom';


class guidance extends Component{
    render() {
      return (
        <div>
          <ul>
            <li><Link to="/project">项目</Link></li>
            <li><Link to="/dynamic">动态</Link></li>
            <li><Link to="/progress">进度</Link></li>
            <li><Link to="/number">成员</Link></li>
          </ul>
          {this.props.children}
        </div>
      )
    }
}

export default guidance;
