/*
成员分组页面组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Member from "../components/member/member";
import Func from "../../../components/common/function/function";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./member_group.css";

class MemberGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: []
    };

    this.transferMsgMem = this.transferMsgMem.bind(this);
  }

  componentDidMount() {
    const arr = Func.getAllGroup();

    this.setState({ members: arr });
  }

  transferMsgMem(members, selMembers) {
    this.setState({
      members,
      selMembers: selMembers || []
    });
  }

  modifyMemGroup() {
    const { userID } = this.props;
    const { selMembers } = this.state;

    ManageService.modifyMemGroup(userID, selMembers);
  }

  render() {
    const { selMembers, members } = this.state;
    return (
      <div className="subject minH">
        <span className="reArrow" />
        <b className="title">选择成员分组</b>
        <div className="present memberGroup-preMarg">
          <span className="memberGroup-tip tip">请选择该成员所属分组</span>
          <Member
            members={members}
            selMembers={selMembers}
            transferMsg={this.transferMsgMem}
            dis
          />
        </div>
        <button
          type="button"
          className="saveBtn memberGroup-btnMarg"
          onClick={this.modifyMemGroup}
        >
          下一步
        </button>
      </div>
    );
  }
}

export default MemberGroup;

MemberGroup.propTypes = {
  userID: PropTypes.number
};

MemberGroup.defaultProps = {
  userID: 0
};
