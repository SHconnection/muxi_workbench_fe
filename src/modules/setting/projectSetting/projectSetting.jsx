/*
项目设置--项目信息页面组件
为项目设置首页，下接编辑成员页面
传入id
*/
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProjectService from "service/project";
import Loading from "components/common/loading/index";
import { Store } from "store";
import Delete from "../components/delete/delete";
import ProjectSetFirst from "../../project/components/projectSetFirst/projectSetFirst";
import Save from "../components/save/save";
import "static/css/common.scss";
import "./projectSetting.scss";

class SetProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      textValue: "",
      deleteX: false,
      inputIsNull: false,
      ifSave: false,
      loading: true
    };
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
            textValue: project.intro,
            loading: false
          });
        }
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  changeInput = e => {
    if (e.target.value.trim()) {
      this.setState({
        inputValue: e.target.value,
        inputIsNull: false
      });
    } else {
      e.target.placeholder = "项目名称";
      this.setState({
        inputValue: e.target.value,
        inputIsNull: true
      });
    }
  };

  changeText = e => {
    if (!e.target.value) {
      e.target.placeholder = "简单描述项目，便于其他人了解（选填）";
    }
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

    if (!inputValue.trim()) {
      this.setState({
        inputIsNull: true
      });
      return;
    }

    ProjectService.saveProjectSet(id, textValue, inputValue)
      .then(() => {
        this.setState({ ifSave: true });

        setTimeout(() => {
          this.setState({ ifSave: false });
        }, 1000);

        history.push(`/project/${id}/editMem`);
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  };

  pageGoBack = () => {
    window.history.back();
  };

  render() {
    const {
      deleteX,
      inputValue,
      textValue,
      inputIsNull,
      ifSave,
      loading
    } = this.state;
    const {
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
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
          </div>
        )}
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
