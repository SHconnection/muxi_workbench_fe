/*
成员分组页面组件
传入{id, group}
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoBack from "../../../components/common/goBack/index";
import Member from "../components/member/member";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import Loading from "../../../components/common/loading/index";
import "../../../static/css/common.css";
import "./memberGroup.css";

class MemberGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [],
      wrong: {}
    };

    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    Loading.show();
    const arr = ManageService.getAllGroup()
      .then(() => {
        Loading.hide();
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
    const {
      match: {
        params: {
          per: { group }
        }
      }
    } = this.props;

    arr.map((item1, index) => {
      const item = item1;

      if (item.id === group) {
        arr[index].selected = true;
      }

      return item;
    });

    const array = [];
    array.push(group);

    this.setState({
      members: arr,
      selMembers: array
    });
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  transferMsgMem(members, selMembers) {
    this.setState({
      members,
      selMembers: selMembers || []
    });
  }

  modifyMemGroup() {
    const {
      match: {
        params: {
          per: { id }
        }
      }
    } = this.props;
    const { selMembers } = this.state;

    ManageService.modifyMemGroup(id, selMembers).catch(error => {
      this.setState({ wrong: error });
    });
  }

  render() {
    const { selMembers, members, wrong } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
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

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default MemberGroup;

MemberGroup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      per: PropTypes.shape({
        id: PropTypes.number,
        group: PropTypes.number
      })
    })
  })
};

MemberGroup.defaultProps = {
  match: {}
};
