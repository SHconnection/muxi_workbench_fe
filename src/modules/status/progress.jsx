import React, { Component } from "react";
import StatusItem from "./components/basicCard/index";
import Gotop from "../../components/common/toTop/top";
import AvatarImg from "../../assets/img/avatar.png";
import Cookie from "../../service/cookie";
import "./progerss.css";

// const {isPersonal} = this.props.match.params

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cout: 0,
      page: 0,
      isLoadingMore: false,
      statuList: [
        {
          sid: 1,
          username: "木小犀",
          time: "14:46",
          avatar: { AvatarImg },
          content:
            "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段",
          iflike: 0,
          likeCount: 14,
          commentCount: 2
        },
        {
          sid: 2,
          avatar: { AvatarImg },
          username: "木小犀",
          time: "08:03",
          iflike: 1,
          content:
            "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段",
          likeCount: 14,
          commentCount: 2
        },
        {
          sid: 3,
          username: "木小犀",
          time: "11:37",
          iflike: 0,
          avatar: { AvatarImg },
          content:
            "这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段文本这是一段",
          likeCount: 14,
          commentCount: 2
        }
      ]
    };
  }

  // getStatusList(page){
  //   fetch("/status/list/" + page + "/",{
  //     method: 'GET',
  //     headers: {
  //       "token": Cookie.getCookie('token')
  //    }
  //   }).then(res => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //   }).then(res => {
  //     this.setState({
  //       cout: res.cout,
  //       page: this.state.page + 1,
  //       statuList: this.state.statuList.push(res.statuList)
  //     })
  //   })
  // }

  // 返回给我总的条数，条数除以20=page

  // componentWillMount(){
  //   this.getStatusList(0);
  // }

  render() {
    const { statuList } = this.state;
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
        {/* <div className="loadMore" ref="wrapper" onClick={this.getStatusList.bind(this, this)}>加载更多</div> */}
        <Gotop />
      </div>
    );
  }

  // componentDidMount() {
  //   const wrapper = this.refs.wrapper;
  //   const getStatusList = this.getStatusList;
  //   const that = this; // 为解决不同context的问题
  //   let timeCount;

  //   function callback() {
  //     const top = wrapper.getBoundingClientRect().top;
  //     const windowHeight = window.screen.height;

  //     if (top && top < windowHeight) {
  //       // 当 wrapper 已经被滚动到页面可视范围之内触发
  //       getStatusList(that);
  //     }
  //   }
  //   window.addEventListener('scroll', function () {
  //     if (this.state.isLoadingMore) {
  //       return ;
  //     }

  //     if (timeCount) {
  //       clearTimeout(timeCount);
  //     }

  //     timeCount = setTimeout(callback, 50);
  //   }.bind(this), false);
  // }
}

export default Progress;
