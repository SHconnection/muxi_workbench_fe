import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "../../../../components/common/icon/index";
import Select from "../../../../components/common/select/index";
import FileIcon from "../../components/fileIcon/index";
import "./index.css";
import "../../../../static/css/common.css";

class ProjectDetailAllFile extends Component {
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
        },
        {
          id: 2,
          value: "创建文件夹"
        },
        {
          id: 3,
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
    const {pid} = this.state
    return (
      <div>haha{pid}</div>
    )
  }
}

export default ProjectDetailAllFile;