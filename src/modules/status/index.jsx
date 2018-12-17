import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
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
      isPersonal: 0,
      statuList: []
    };
    this.getstatuList = this.getstatuList.bind(this);
  }

  getstatuList() {
    const { match } = this.props;
    const { page } = this.state;
    if (match.path === "/status") {
      StatusService.getStatusList(page + 1)
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
              isPersonal: 0
            });
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    } else {
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
              isPersonal: 1
            });
          }
        })
        .catch(error => {
          this.setState({ wrong: error });
        });
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="statusContainer">
        <Route
          exact
          path={match.url}
          render={() => (
            <Index {...this.state} getstatuList={this.getstatuList} />
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
