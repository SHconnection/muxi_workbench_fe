import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProjectService from "service/project";
import GoBack from "components/common/goBack/index";
import { Store } from "store";
import MemberInfo from "../../../member/memberInfo/memberInfo";
import "./index.css";

class Member extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      pid: match.params.id,
      memberList: []
    };
    this.getUserList = this.getUserList.bind(this);
    this.getUserList();
  }

  getUserList() {
    const { pid } = this.state;
    ProjectService.getProjectUserList(pid)
      .then(res => {
        res.memberList.shift();
        this.setState({
          memberList: res.memberList
        });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      })
      .finally(() => {});
  }

  render() {
    const { memberList } = this.state;
    return (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="project-member-header">
            <div className="title">项目成员</div>
            <Link to="./editMem" className="project-member-header-edit fakeBtn">
              编辑
            </Link>
          </div>
          <div className="project-memberlist-container">
            {memberList.map(res => (
              <div className="project-memberlist-item" key={res.userID}>
                <MemberInfo mem={res} square={false} />
              </div>
            ))}
            {memberList.length === 0 && <div className="tip">暂无成员～</div>}
          </div>
        </div>
      </div>
    );
  }
}

Member.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

Member.defaultProps = {
  match: {}
};

export default Member;
