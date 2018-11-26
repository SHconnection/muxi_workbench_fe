/*
成员分组页面组件
传入userID
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoBack from "../../../components/common/goBack/index";
import Member from "../components/member/member";
import Save from "../components/save/save";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import Loading from "../../../components/common/loading/index";
import "../../../static/css/common.css";
import "./setPermission.css";

class SetPermission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selMembers: [],
      members: [],
      ifSave: false,
      wrong: {}
    };

    this.transferMsgMem = this.transferMsgMem.bind(this);
    this.savePersonalPermiss = this.savePersonalPermiss.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { userID }
      }
    } = this.props;
    Loading.show();

    ManageService.getAllPro()
      .then(object => {
        const proList = object.list.map(project1 => {
          const project = {};

          project.id = project1.projectID;
          project.name = project1.projectName;

          return project;
        });

        if (!Array.isArray(proList)) return false;

        ManageService.getPersonalPro(userID)
          .then(obj => {
            Loading.hide();
            const idList = obj.list.map(pro1 => pro1.projectID);

            proList.map(item1 => {
              const item = item1;

              if (idList.indexOf(item.id) !== -1) item.selected = true;

              return item;
            });

            this.setState({
              members: proList,
              selMembers: idList
            });
          })
          .catch(error => {
            this.setState({ wrong: error });
          });
        return true;
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  transferMsgMem(members, selMembers) {
    this.setState({
      members,
      selMembers: selMembers || []
    });
  }

  savePersonalPermiss() {
    const {
      match: {
        params: { userID }
      }
    } = this.props;
    const { selMembers } = this.state;

    ManageService.savePersonalPermiss(userID, selMembers)
      .then(() => {
        this.setState({ ifSave: true });

        setTimeout(() => {
          this.setState({ ifSave: false });
        }, 1000);
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { members, selMembers, ifSave, wrong } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">设置权限</b>
        <div className="present setPermission-preMarg">
          <span className="tip setPermission-tip">
            请选择该成员可参与的项目
          </span>
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

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default SetPermission;

SetPermission.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userID: PropTypes.number
    })
  })
};

SetPermission.defaultProps = {
  match: {}
};
