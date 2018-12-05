import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProjectService from "../../../../service/project";
import GoBack from "../../../../components/common/goBack/index";
import MemberInfo from "../../../member/memberInfo/memberInfo";
import Loading from "../../../../components/common/loading/index";
import WrongPage from "../../../../components/common/wrongPage/wrongPage";
import "./index.css";

class Member extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      pid: match.params.id,
      memberList: [],
      wrong: {}
    };
    this.getUserList = this.getUserList.bind(this);
    this.cancel = this.cancel.bind(this);
    this.getUserList();
  }

  getUserList() {
    const { pid } = this.state;
    Loading.show();
    ProjectService.getProjectUserList(pid)
      .then(res => {
        res.memberList.shift();
        this.setState({
          memberList: res.memberList
        });
      })
      .catch(error => {
        this.setState({ wrong: error });
      })
      .finally(() => {
        Loading.hide();
      });
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { memberList, wrong } = this.state;
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
          </div>
        </div>

        <WrongPage info={wrong} cancel={this.cancel} />
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
