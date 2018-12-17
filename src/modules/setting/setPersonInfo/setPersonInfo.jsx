/*
个人设置页面组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoBack from "../../../components/common/goBack/index";
import Member from "../components/member/member";
import Delete from "../components/delete/delete";
import Save from "../components/save/save";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import Loading from "../../../components/common/loading/index";
import "../../../static/css/common.css";
import "./setPersonInfo.css";

class SetPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selMembers: [],
      members: [],
      selIdentities: [],
      identity: [
        { name: "管理员", selected: false, id: 3 },
        { name: "成员", selected: false, id: 1 }
      ],
      ifSave: false,
      deleteX: false,
      deled: false,
      wrong: {}
    };
  }

  componentDidMount() {
    const { identity, selIdentities } = this.state;
    Loading.show();

    ManageService.getPersonalPro(localStorage.id)
      .then(project => {
        if (project) {
          const proList = project.list.map(item => {
            const obj = {};

            obj.id = item.projectID;
            obj.name = item.projectName;
            obj.count = item.userCount;
            obj.intro = item.intro;
            obj.selected = false;

            return obj;
          });

          ManageService.getPersonalPro(localStorage.per)
            .then(pro => {
              let idList = [];

              if (pro) {
                idList = pro.list.map(item => item.projectID);

                proList.map(item1 => {
                  const item = item1;

                  if (idList.indexOf(item.id) !== -1) item.selected = true;

                  return item;
                });
              }

              identity[0].selected = false;
              identity[1].selected = true;
              selIdentities[0] = 1;
              if (parseInt(localStorage.perRole, 10) > 1) {
                identity[0].selected = true;
                identity[1].selected = false;
                selIdentities[0] = parseInt(localStorage.perRole, 10);
              }

              this.setState({
                members: proList,
                selMembers: idList,
                identity,
                selIdentities
              });
            })
            .catch(error => {
              this.setState({ wrong: error });
            })
            .finally(() => {
              Loading.hide();
            });
        }
      })
      .catch(error => {
        this.setState({ wrong: error });
      })
      .finally(() => {
        Loading.hide();
      });
  }

  cancel = () => {
    this.setState({ wrong: {} });
  };

  transferMsgIden = (mem, selMem) => {
    this.setState({
      identity: mem,
      selIdentities: selMem
    });
  };

  transferMsgDel = (deleteX, deled) => {
    this.setState({
      deleteX,
      deled
    });
  };

  transferMsgMem = (members, selMembers) => {
    this.setState({
      members,
      selMembers: selMembers || []
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

  saveModifyMember = () => {
    const { selIdentities, selMembers } = this.state;

    ManageService.saveModifyMemberIdenty(localStorage.per, selIdentities).catch(
      error => {
        this.setState({ wrong: error });
      }
    );
    ManageService.saveModifyMemberPro(localStorage.per, selMembers)
      .then(() => {
        this.setState({ ifSave: true });

        setTimeout(() => {
          this.setState({ ifSave: false });
        }, 1000);
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  };

  render() {
    const {
      identity,
      selIdentities,
      members,
      selMembers,
      ifSave,
      deleteX,
      deled,
      wrong
    } = this.state;
    const {
      match: {
        params: { name }
      }
    } = this.props;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">
          {name}
          的设置
        </b>

        <div className="present">
          <div className="move">
            <p className="selectMember-fontColor llSize">从团队中移除XXA</p>
            <p className="selectMember-fontSize tip">
              被移除的成员将不能再访问工作台上的信息，但工作台上与他相关的信息将保留。
            </p>
          </div>
          <button
            type="button"
            className="moveBtn selectMember-btnMArg"
            onClick={() => {
              this.transferMsgDel(true);
            }}
          >
            确认移除
          </button>
          <br />

          <b className="littleSize title selectMember-titleMarg">设置</b>
          <Member
            members={identity}
            selMembers={selIdentities}
            transferMsg={this.transferMsgIden}
            dis
          />

          <b className="littleSize title selectMember-titleMarg">参与的项目</b>
          <span
            className="fakeBtn"
            onClick={this.selAll}
            onKeyDown={this.handleClick}
            role="button"
            tabIndex="-1"
          >
            全选
          </span>
          <Member
            members={members}
            selMembers={selMembers}
            transferMsg={this.transferMsgMem}
          />

          <button
            type="button"
            className="footerBtn saveBtn"
            onClick={this.saveModifyMember}
          >
            {ifSave ? "已保存" : "保存设置"}
          </button>

          <Save ifSave={ifSave} />

          <Delete
            name="确认要移除XXA吗?"
            deleteX={deleteX}
            transferMsg={this.transferMsgDel}
            memDel
            userId={parseInt(localStorage.per, 10)}
            certain
          />
          <Delete
            name="移除成功"
            cancel
            deleteX={deled}
            transferMsg={this.transferMsgDel}
          />
        </div>
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default SetPersonalInfo;

SetPersonalInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string
    })
  })
};

SetPersonalInfo.defaultProps = {
  match: {}
};
