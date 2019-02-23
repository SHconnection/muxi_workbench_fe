import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProjectService from "service/project";
import GoBack from "components/common/goBack/index";
import { Store } from "store";
import Loading from "components/common/loading/index";
import MemberInfo from "../../../member/memberInfo/memberInfo";
import "./index.css";

class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberList: [],
      loading: true
    };
    this.getUserList = this.getUserList.bind(this);
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList() {
    const {
      match: {
        params: { id: pid }
      }
    } = this.props;
    ProjectService.getProjectUserList(pid)
      .then(res => {
        res.memberList.shift();
        this.setState({
          memberList: res.memberList,
          loading: false
        });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  render() {
    const { memberList, loading } = this.state;
    const { storeRole } = this.props;

    return loading ? (
      <Loading loading />
    ) : (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="project-member-header">
            <div className="title">项目成员</div>
            {storeRole > 1 ? (
              <Link
                to="./editMem"
                className="project-member-header-edit fakeBtn"
              >
                编辑
              </Link>
            ) : null}
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
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  storeRole: PropTypes.number
};

Member.defaultProps = {
  match: {},
  storeRole: 1
};

const mapStateToProps = state => ({
  storeRole: state.role
});

export default connect(mapStateToProps)(Member);
