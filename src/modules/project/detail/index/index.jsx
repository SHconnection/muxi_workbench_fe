import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "../../../../components/common/icon/index";
import Select from "../../../../components/common/select/index";
import FileIcon from "../../components/fileIcon/index";
import "./index.css";
import "../../../../static/css/common.css";

class ProjectDetailIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: null,
      projectInfo: {
        name: "项目名称",
        intro: "这是简介这是简介这是简介",
        userCount: 58
      },
      fileOption: [
        {
          id: 0,
          value: "上传文件",
          type: "file"
        },
        {
          id: 1,
          value: "创建文件夹"
        }
      ],
      folderList: {
        fList: [
          {
            kind: 2,
            id: 0,
            name: "文件夹1"
          },
          {
            kind: 1,
            id: 1,
            name: "文件夹2.zip"
          },
          {
            kind: 1,
            id: 2,
            name: "文件3.psd"
          },
          {
            kind: 1,
            id: 3,
            name: "文件4.pdf"
          },
          {
            kind: 1,
            id: 4,
            name: "文件夹5.txt"
          },
          {
            kind: 1,
            id: 5,
            name: "文件夹6.rar"
          }
        ],
        mList: [
          {
            kind: 2,
            id: 0,
            name: "文件夹1"
          },
          {
            kind: 1,
            id: 1,
            name: "文档1"
          },
          {
            kind: 2,
            id: 2,
            name: "文件夹2"
          },
          {
            kind: 2,
            id: 3,
            name: "文件夹3"
          },
          {
            kind: 2,
            id: 4,
            name: "文件夹4"
          }
        ]
      }
    };
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      pid: match.params.id
    });
  }

  render() {
    const { projectInfo, fileOption, folderList, pid } = this.state;
    const { match } = this.props;
    return (
      <div className="projectDetail-content">
        <div className="projectDetail-header">
          <div className="projectDetail-header-left">
            <div className="projectDetail-header-intro">
              <div className="title">{projectInfo.name}</div>
              <div className="tip">{projectInfo.intro}</div>
            </div>
          </div>
          <div className="projectDetail-header-right">
            <div className="projectDetail-header-icon-container">
              <Icon
                text={`${projectInfo.userCount}`}
                tip="成员"
                url="/member"
              />
            </div>
            <div className="projectDetail-header-icon-container">
              <Icon type="trash" tip="回收站" to="/trash" />
            </div>
            <div className="projectDetail-header-icon-container">
              <Icon type="setting" tip="设置" to={`/project/${pid}/setting`} />
            </div>
          </div>
        </div>
        <div className="projectDetail-file-container">
          <div className="peojectDetail-file-header">
            <div className="title littleSize">文件</div>
            <div className="projectDetail-file-select">
              <Select items={fileOption} />
            </div>
          </div>
          <div className="projectDetail-file-items">
            {folderList.fList.map(el => (
              <div className="file-item" key={el.id}>
                <FileIcon name={el.name} id={el.id} pid={pid} kind={el.kind} />
              </div>
            ))}
          </div>
          <div className="projectDetail-file-footer">
            <Link to={`/project/${pid}/allFile`} className="fakeBtn">
              查看所有文件
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProjectDetailIndex.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

ProjectDetailIndex.defaultProps = {
  match: {}
};

export default ProjectDetailIndex;
