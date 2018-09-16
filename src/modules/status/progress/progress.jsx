import React, { Component } from "react";
import StatusItem from "../components/basicCard/index";
import Gotop from "../../../components/common/toTop/top";
import StatusService from "../../../service/status"
import "./progerss.css";

// const {isPersonal} = this.props.match.params

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cout: 0,
      page: 0,
      isLoadingMore: false,
      statuList: []
    };
  }

  // 返回给我总的条数，条数除以20=page

  // componentWillMount(){
  //   const arr =  StatusService.getStatusList(0);
  //   this.setState({
  //     cout: arr.cout,
  //     page: arr.page,
  //     statuList: arr.statuList
  //   });
  // }

  render() {
    const { statuList, page, cout} = this.state;
    return (
      <div>
        <div className="status">
          <div className="status-container">
            {statuList.map((card, index) => (
              <div key={index}>
                <StatusItem
                  sid={card.sid}
                  username={card.username}
                  avatar={card.avatar}
                  time={card.time}
                  iflike={card.iflike}
                  content={card.content}
                  likeCount={card.likeCount}
                  commentCount={card.commentCount}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="loadMore" ref="wrapper" onClick={this.getStatusList.bind(page,cout)}>加载更多...</div>
        <Gotop />
      </div>
    );
  }

  getStatusList(page,cout){
    if(cout/20 > page){
      const arr =  StatusService.getStatusList(page + 1);
      this.setState({
        cout: arr.cout,
        page: arr.page,
        statuList: arr.statuList
      })
    }
    else{
      return "已经到底啦"
    }
  }

  componentDidMount() {
    const wrapper = this.refs.wrapper;
    const getStatusList = this.getStatusList;
    const that = this; // 为解决不同context的问题
    let timeCount;

    function callback() {
      const top = wrapper.getBoundingClientRect().top;
      const windowHeight = window.screen.height;

      if (top && top < windowHeight) {
        // 当 wrapper 已经被滚动到页面可视范围之内触发
        getStatusList(that);
      }
    }
    window.addEventListener('scroll', function () {
      if (this.state.isLoadingMore) {
        return ;
      }

      if (timeCount) {
        clearTimeout(timeCount);
      }

      timeCount = setTimeout(callback, 50);
    }.bind(this), false);
  }
}

export default Progress;
