import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { Store } from "store";
import Index from "./progress/progress";
import Detail from "./details/detail";
import Edit from "./markdown/edit";
import StatusService from "../../service/status";
import "./index.css";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      page: 0,
      isPersonal: 1,
      statuList: [],
      loading: true
    };
    this.getstatuList = this.getstatuList.bind(this);
  }

  componentDidMount() {}

  getstatuList(bool = false) {
    const { match } = this.props;
    const { page } = this.state;

    if (match.path === "/status") {
      this.setState({ isPersonal: 0 });
      StatusService.getStatusList(bool || !page ? page + 1 : page)
        .then(status => {
          if (status) {
            const arr1 = status.statuList.map(statu1 => {
              const statu = statu1;
              const obj = {};
              obj.sid = statu.sid;
              obj.username = statu.username;
              obj.avatar = statu.avatar;
              obj.time = statu.time;
              obj.iflike = statu.iflike;
              obj.content = statu.content;
              obj.likeCount = statu.likeCount;
              obj.commentCount = statu.commentCount;
              return obj;
            });
            const count1 = status.count;
            const changePage = status.page;
            const { statuList } = this.state;
            const newStatuList =
              bool || !page ? statuList.concat(arr1) : statuList;
            this.setState({
              count: count1,
              page: changePage,
              statuList: newStatuList,
              loading: false
            });
          }
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    } else {
      this.setState({ isPersonal: 1 });
      StatusService.getPersonalStatus(match.params.uid, page + 1)
        .then(status => {
          if (status) {
            const arr1 = status.statuList.map(statu1 => {
              const statu = statu1;
              const obj = {};
              obj.sid = statu.sid;
              obj.username = statu.username;
              obj.avatar = statu.avatar;
              obj.time = statu.time;
              obj.iflike = statu.iflike;
              obj.content = statu.content;
              obj.likeCount = statu.likeCount;
              obj.commentCount = statu.commentCount;
              return obj;
            });
            const count1 = status.count;
            const changePage = status.page;
            const { statuList } = this.state;
            this.setState({
              count: count1,
              page: changePage,
              statuList: statuList.concat(arr1),
              loading: false
            });
          }
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  }

  render() {
    const { match } = this.props;
    const { loading, isPersonal } = this.state;
    return (
      <div
        className={
          isPersonal ? "statusContainer status-noMargin" : "statusContainer"
        }
      >
        <Route
          exact
          path={match.url}
          render={() => (
            <Index
              {...this.state}
              getstatuList={this.getstatuList}
              loading={loading}
            />
          )}
        />
        <Route exact path={`${match.url}/:id`} component={Detail} />
        <Route path={`${match.url}/:id/reEdit`} component={Edit} />
      </div>
    );
  }
}

Status.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Status.defaultProps = {
  match: {}
};

export default Status;
