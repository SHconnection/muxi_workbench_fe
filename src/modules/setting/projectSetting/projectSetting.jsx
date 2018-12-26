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
import Loading from "../../../components/common/loading/index";
import Save from "../components/save/save";
import "../../../static/css/common.css";
import "./projectSetting.css";

class SetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      textValue: "",
      deleteX: false,
      wrong: {},
      inputIsNull: false,
      ifSave: false
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    Loading.show();

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
      })
      .finally(() => {
        Loading.hide();
      });
  }

  changeInput = e => {
    if (e.target.value) {
      this.setState({
        inputValue: e.target.value,
        inputIsNull: false
      });
    } else {
      this.setState({
        inputValue: e.target.value,
        inputIsNull: true
      });
    }
  };

  changeText = e => {
    this.setState({
      textValue: e.target.value
    });
  };

  transferMsgDel = deleteX => {
    this.setState({
      deleteX
    });
  };

  saveProjectSet = () => {
    const {
      match: {
        params: { id }
      },
      history
    } = this.props;
    const { textValue, inputValue } = this.state;

    ProjectService.saveProjectSet(id, textValue, inputValue)
      .then(() => {
        this.setState({ ifSave: true });

        setTimeout(() => {
          this.setState({ ifSave: false });
        }, 1000);

        history.push(`/project/${id}/editMem`);
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  };

  pageGoBack = () => {
    window.history.back();
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const {
      deleteX,
      inputValue,
      textValue,
      wrong,
      inputIsNull,
      ifSave
    } = this.state;
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
          inputIsNull={inputIsNull}
        />

        <div className="setProject-select">
          {/* <Link to={`/project/${id}/editMem`}> */}
          <button
            type="button"
            className="saveBtn"
            onClick={this.saveProjectSet}
          >
            保存
          </button>
          {/* </Link> */}
          <button
            type="button"
            className="delBtn"
            onClick={() => {
              this.transferMsgDel(true);
            }}
          >
            删除项目
          </button>
          <span
            className="fakeBtn"
            role="button"
            tabIndex="-1"
            className="fakeBtn"
            onClick={this.pageGoBack}
            onKeyDown={this.handleClick}
          >
            取消
          </span>
        </div>

        <Delete
          name="确认要删除该项目吗？"
          deleteX={deleteX}
          transferMsg={this.transferMsgDel}
          proDel
          proId={parseInt(id, 10)}
        />
        <Save ifSave={ifSave} />
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
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

SetProject.defaultProps = {
  match: {},
  history: {}
};
