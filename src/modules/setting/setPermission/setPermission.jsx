/*
成员分组页面组件
传入id
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GoBack from "components/common/goBack/index";
import ManageService from "service/manage";
import Loading from "components/common/loading/index";
import { Store } from "store";
import Save from "../components/save/save";
import Member from "../components/member/member";
import "static/css/common.css";
import "./setPermission.css";

class SetPermission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [],
      ifSave: false,
      loading: true
    };
  }

  componentDidMount() {
    const {
      location: {
        state: { id }
      },
      storeId
    } = this.props;

    ManageService.getProjectList(storeId)
      .then(object => {
        const proList = object.list.map(project1 => {
          const project = {};

          project.id = project1.projectID;
          project.name = project1.projectName;

          return project;
        });

        if (!Array.isArray(proList)) return false;

        ManageService.getProjectList(id)
          .then(obj => {
            const idList = obj.list.map(pro1 => pro1.projectID);

            proList.map(item1 => {
              const item = item1;

              if (idList.indexOf(item.id) !== -1) item.selected = true;

              return item;
            });

            this.setState({
              members: proList,
              selMembers: idList,
              loading: false
            });
          })
          .catch(error => {
            Store.dispatch({
              type: "substituteWrongInfo",
              payload: error
            });
          });
        return true;
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  transferMsgMem = (members, selMembers) => {
    this.setState({
      members,
      selMembers: selMembers || []
    });
  };

  savePersonalPermiss = () => {
    const {
      location: {
        state: { id }
      },
      history
    } = this.props;
    const { selMembers } = this.state;

    ManageService.savePersonalPermiss(id, selMembers)
      .then(() => {
        this.setState({ ifSave: true });

        history.push(`/teamMember/joinApply`);

        setTimeout(() => {
          this.setState({ ifSave: false });
        }, 1000);
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  };

  selAll = () => {
    this.setState(prevState => {
      const { members: arr1 } = prevState;
      const arr2 = [];
      let num = 0;

      if (arr1) {
        arr1.map(i => {
          if (i.selected) num += 1;
          return i;
        });

        if (num === arr1.length) {
          arr1.map(i => {
            const j = i;
            j.selected = false;
            return j;
          });
        } else {
          arr1.map(i => {
            const j = i;
            j.selected = true;
            arr2.push(j.id);
            return j;
          });
        }
      }

      return { members: arr1, selMembers: arr2 };
    });
  };

  render() {
    const { members, selMembers, ifSave, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <GoBack />
            <b className="title">设置权限</b>
            <div className="present setPermission-preMarg">
              <span className="tip setPermission-tip">
                请选择该成员可参与的项目
              </span>
              <label
                htmlFor="selectAll"
                className="fakeBtn setPermission-selectAll"
                onKeyDown={this.selAll}
                onClick={this.selAll}
                role="button"
                tabIndex="-1"
                id="lab"
              >
                全选
              </label>
              <Member
                members={members}
                selMembers={selMembers}
                transferMsg={this.transferMsgMem}
              />

              <button
                type="button"
                className="saveBtn footerBtn setPermission-btnMarg"
                onClick={this.savePersonalPermiss}
              >
                {ifSave ? "已保存" : "保存设置"}
              </button>
            </div>
            <Save ifSave={ifSave} />
          </div>
        )}
      </div>
    );
  }
}

SetPermission.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  storeId: PropTypes.number
};

SetPermission.defaultProps = {
  location: {},
  history: {},
  storeId: 0
};

const mapStateToProps = state => ({
  storeId: state.id
});

export default connect(mapStateToProps)(SetPermission);
