/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
传入proId
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Delete from "../components/delete/delete";
import ProjectSetFirst from "../../project/components/projectSetFirst/projectSetFirst";
import ProjectService from "../../../service/project";
import ManageService from "../../../service/manage";
import "../../../static/css/common.css";
import "./projectSetting.css";

class SetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      textValue: "",
      deleteX: false
    };

    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeText = this.changeText.bind(this);
    this.saveProjectSet = this.saveProjectSet.bind(this);
  }

  componentDidMount() {
    const proInfo = ManageService.getAllPro();

    this.setState({
      inputValue: proInfo.name,
      textValue: proInfo.intro
    });
  }

  changeInput(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  changeText(e) {
    this.setState({
      textValue: e.target.value
    });
  }

  transferMsgDel(deleteX) {
    this.setState({
      deleteX
    });
  }

  saveProjectSet() {
    const {
      match: {
        params: { proId }
      }
    } = this.props;
    const { textValue, inputValue } = this.state;

    ProjectService.saveProjectSet(proId, textValue, inputValue);
  }

  render() {
    const { deleteX, inputValue, textValue } = this.state;
    const {
      match: {
        params: { proId }
      }
    } = this.props;

    return (
      <div className="subject minH">
        <ProjectSetFirst
          inputValue={inputValue}
          textValue={textValue}
          changeInput={this.changeInput}
          changeText={this.changeText}
        />

        <div className="select">
          <button
            type="button"
            className="saveBtn"
            onClick={this.saveProjectSet}
          >
            <Link to="/editMem" className="link">
              保存
            </Link>
          </button>
          <button
            type="button"
            className="delBtn"
            onClick={() => {
              this.transferMsgDel(true);
            }}
          >
            删除项目
          </button>
          <span className="fakeBtn">取消</span>
        </div>

        <Delete
          name="确认要移除该项目吗?"
          deleteX={deleteX}
          transferMsg={this.transferMsgDel}
          proDel
          proId={proId}
        />
      </div>
    );
  }
}

export default SetProject;

SetProject.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      proId: PropTypes.number
    })
  })
};

SetProject.defaultProps = {
  match: {}
};
