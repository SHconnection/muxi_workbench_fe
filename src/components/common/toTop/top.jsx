import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import {PullList} from 'react-native-pull';
import top from '../../../assets/svg/commonIcon/top.svg'
import './top.css'


class toTop extends Component {
  clickTabBarItem() {
    PullList = this.pullList;
    // 一键置顶
    PullList.scrollTo({y:0});
  }

  render() {
    return (
      <div>
        <ReactSVG className="top" onClick={this.clickTabBarItem()} path={top} />
      </div>
    )
  }
}
export default toTop;


