import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import GoBack from "../../../../components/common/goBack/index";
import Icon from "../../../../components/common/icon/index";
import Button from "../../../../components/common/button/index";
import Select from "../../../../components/common/select/index";
import FileIcon from "../../components/fileIcon/index";
import FileList from "../../components/fileList/index";
import "./index.css";
import "../../../../static/css/common.css";

class ProjectDetailAllFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: null,
      itemLayOut: true, 
      fileOption: [
        {
          id: 0,
          value: "上传文件",
          type: "file",
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
            name: "文件夹1",
            uploader: "xxx",
            time: "2018/8/9",
            url: "项目1/文件夹1"
          },
          {
            kind: 1,
            id: 1,
            name: "文件夹2.zip",
            uploader: "xxx",
            time: "2018/8/9",
            url: "项目1/文件夹1"
          },
          {
            kind: 1,
            id: 2,
            name: "文件3.psd",
            uploader: "xxx",
            time: "2018/8/9",
            url: "项目1/文件夹1"
          },
          {
            kind: 1,
            id: 3,
            name: "文件4.pdf",
            uploader: "xxx",
            time: "2018/8/9",
            url: "项目1/文件夹1"
          },
          {
            kind: 1,
            id: 4,
            name: "文件夹5.txt",
            uploader: "xxx",
            time: "2018/8/9",
            url: "项目1/文件夹1"
          },
          {
            kind: 1,
            id: 5,
            name: "文件夹6.rar",
            uploader: "xxx",
            time: "2018/8/9",
            url: "项目1/文件夹1"
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
    this.changeLayoutToItem = this.changeLayoutToItem.bind(this)
    this.changeLayoutToList = this.changeLayoutToList.bind(this)
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      pid: match.params.id
    });
  }

  changeLayoutToItem() {
    this.setState({
      itemLayOut: true
    })
  }

  changeLayoutToList() {
    this.setState({
      itemLayOut: false
    })
  }

  render() {
    const { pid, fileOption, itemLayOut, folderList } = this.state;
    return (
      <div className="projectDetail-container">
        <GoBack />
        <div className="projectDetail-content">
          <div className="projectDetail-header projectDetail-allFile-header">
            <div className="projectDetail-header-left">
              <div className="title">所有文件</div>
              <div className="projectDetail-header-left-select">
                <Select items={fileOption} />
              </div>
            </div>
            <div className="projectDetail-header-right projectDetail-allFile-header-right">
              <div>
                <Icon type={itemLayOut ? "FileItemsSel" : "FileItems"} onClick={this.changeLayoutToItem} />
              </div>
              <div>
                <Icon type={itemLayOut ? "FileLists" : "FileListSel"} onClick={this.changeLayoutToList} />
              </div>
              <div>
                <Button text="批量管理" to="./file_batch_manage" />
              </div>
            </div>
          </div>
          {
            itemLayOut ? (
              <div className="projectDetail-file-items peojectDetail-allFile-items">
                {folderList.fList.map(el => (
                  <div className="file-item" key={el.id}>
                    <FileIcon name={el.name} id={el.id} pid={pid} kind={el.kind} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="projectDetail-allFile-list">
                <div className="projectDetail-allFile-list-title">
                  <div className="projectDetail-allFile-list-name">文件名称</div>
                  <div className="projectDetail-allFile-list-uploader">上传者</div>
                  <div className="projectDetail-allFile-list-time">上传时间</div>
                  <div className="projectDetail-allFile-list-url">路径</div>
                </div>
                {
                  folderList.fList.map(el => (
                    <div key={el.id}>
                      <FileList item={el} downloadFile={id => {console.log(id)}} />
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

ProjectDetailAllFile.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

ProjectDetailAllFile.defaultProps = {
  match: {}
};


export default ProjectDetailAllFile;
