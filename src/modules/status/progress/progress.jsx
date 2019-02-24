/* eslint-disable import/no-unresolved */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import {
  getContainerHeight,
  getScrollHeight,
  getScrollTop
} from "common/scroll";
import StatusItem from "../components/basicCard/index";
import Gotop from "../../../components/common/toTop/top";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import Loading from "../../../components/common/loading";

import "./progress.css";

class Status extends Component {
  constructor(props) {
    super(props);
    const { statusList } = props;
    const { wrong } = statusList;
    this.state = {
      wrong,
      loading: false
    };
    this.getStatusList = this.getStatusList.bind(this);
    this.getPersonalList = this.getPersonalList.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match.params.id);
    if (match.path === "/status") {
      this.getStatusList();
    } else {
      this.getPersonalList(match.params.uid);
    }
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.addEventListener("scroll", this.scroll);
  }

  componentWillUnmount() {
    const appContainer = document.querySelector(".app-container");
    if (appContainer) appContainer.removeEventListener("scroll", this.scroll);
  }

  getStatusList() {
    const { loading } = this.state;
    if (loading) return;
    this.setState({
      loading: true
    });
    const { dispatch, statusList } = this.props;
    const { page, dataList } = statusList;
    dispatch({
      type: "statusList/getStatusList",
      payload: page,
      dataList
    });
  }

  getPersonalList(uid) {
    const { loading } = this.state;
    if (loading) return;
    this.setState({
      loading: true
    });
    const { dispatch, statusList } = this.props;
    const { page, dataList } = statusList;
    dispatch({
      type: "statusList/getPelsonalStatus",
      payload: { uid, page },
      dataList
    });
  }

  scroll() {
    const { match } = this.props;
    const { statusList } = this.props;
    const { isPersonal } = statusList;
    if (getScrollTop() + getContainerHeight() >= getScrollHeight()) {
      if (!isPersonal) {
        this.getStatusList();
      } else {
        this.getPersonalList(match.params.id);
      }
    }
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { statusList } = this.props;
    const { dataList, isPersonal, count, page } = statusList;
    const { wrong, loading } = this.state;
    return (
      <div className="statusContainer">
        <Loading loading={loading && page === 0} />
        <div className={isPersonal ? "" : "status"}>
          <div className="status-container">
            {dataList.map(card => (
              <div key={card.sid}>
                <StatusItem
                  sid={card.sid}
                  username={card.username}
                  avatar={card.avatar}
                  time={card.time}
                  iflike={card.iflike}
                  content={card.content}
                  likeCount={card.likeCount}
                  commentCount={card.commentCount}
                  isPersonal={isPersonal}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="loadMore">
          {count / 20 >= page ? "下拉加载更多..." : "我是有底线的"}
        </div>
        <Gotop />
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

Status.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  wrong: PropTypes.shape({
    msg: PropTypes.string
  }),
  dispatch: PropTypes.func
};

Status.defaultProps = {
  match: {},
  wrong: {},
  dispatch: () => {}
};

const mapStateToProps = state => ({
  statusList: state.statusList
});

export default connect(mapStateToProps)(Status);
