import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import top from '../../../assets/svg/commonIcon/top.svg'

class toTop extends Component {
  constructor(props){
    super(props);
  }

clickTabBarItem() {
    let PullList = this.refs.pullList;
    // 一键置顶
    PullList.scrollTo({y:0});
 }

 render() {
    return (
      <div>
        <ReactSVG className="top" path={top} />
      </div>
    );
  }
}

