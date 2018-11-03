/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
传入id
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Delete from "../components/delete/delete";
import ProjectSetFirst from "../../project/components/projectSetFirst/projectSetFirst";
import ProjectService from "../../../service/project";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import "../../../static/css/common.css";
import "./projectSetting.css";

class SetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      textValue: "",
      deleteX: false,
      wrong: ""
    };

    this.transferMsgDel = this.transferMsgDel.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.changeText = this.changeText.bind(this);
    this.saveProjectSet = this.saveProjectSet.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    ProjectService.getProjectInfo(id)
      .then(project => {
        if (project) {
          this.setState({
            inputValue: project.name,
            textValue: project.intro
          });
        }
      })
      .catch(error => {
        this.setState({ wrong: error });
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
        params: { id }
      }
    } = this.props;
    const { textValue, inputValue } = this.state;

    ProjectService.saveProjectSet(id, textValue, inputValue).catch(error => {
      console.error(error);
    });
  }

  cancel() {
    this.setState({ wrong: "" });
  }

  render() {
    const { deleteX, inputValue, textValue, wrong } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <div>
        <ProjectSetFirst
          inputValue={inputValue}
          textValue={textValue}
          changeInput={this.changeInput}
          changeText={this.changeText}
        />

        <div className="select">
          <Link to={`/project/${id}/editMem`}>
            <button
              type="button"
              className="saveBtn"
              onClick={this.saveProjectSet}
            >
              保存
            </button>
          </Link>
          <button
            type="button"
            className="delBtn"
            onClick={() => {
              this.transferMsgDel(true);
            }}
          >
            删除项目
          </button>
          <Link className="fakeBtn" to={`/project/${id}/preview`}>
            取消
          </Link>
        </div>

        <Delete
          name="确认要移除该项目吗?"
          deleteX={deleteX}
          transferMsg={this.transferMsgDel}
          proDel
          id={id}
        />

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default SetProject;

SetProject.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

SetProject.defaultProps = {
  match: {}
};
