import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "components/common/loading";

// import { MarkdownPreview } from "react-marked-markdown";
import { Store } from "store";
import AlertMoveFile from "../../components/alertMoveFile";
import AlertDeleteFile from "../../components/alertDeleteFile";
import FileService from "../../../../service/file";
import ProjectService from "../../../../service/project";
import MessageService from "../../../../service/message";
import { FileTree } from "../../fileTree";
import Othercomments from "../../../../components/common/otherComments/comments";
import Avatar from "../../../../components/common/avatar/index";
import Button from "../../../../components/common/button/index";
import Goback from "../../../../components/common/goBack/index";
import "../../../../static/css/common.css";
import "../../../status/markdown/edit.scss";
import "./index.scss";

class DocPreview extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      loading: true,
      pid: parseInt(match.params.pid, 10),
      id: parseInt(match.params.id, 10),
      isFocus: false,
      // 文档信息
      docInfo: {
        create_time: "",
        creator: "",
        name: "",
        id: "",
        lastcontent: ""
      },
      // 文档树
      docTree: {},
      docUrlWithId: [],
      // 评论列表
      commentList: [],
      // 发表评论的输入值
      commentInput: "",
      // 评论当前页数
      // currentPage: 1,
      // // 总页数
      // pageNums: 1,
      // 是否显示删除文档
      showDletedoc: false,
      // 是否显示移动文档
      showMoveDoc: false
      // 移动文档最终选择的id
      // finalMoveDocId: 0,
    };
    this.getDocInfo = this.getDocInfo.bind(this);
    this.getDocTree = this.getDocTree.bind(this);
    this.getDocUrl = this.getDocUrl.bind(this);
    this.getCommentList = this.getCommentList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.startDeleteDoc = this.startDeleteDoc.bind(this);
    this.confirmDeleteDoc = this.confirmDeleteDoc.bind(this);
    this.moveDoc = this.moveDoc.bind(this);
    this.confirmMoveDoc = this.confirmMoveDoc.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.focusDoc = this.focusDoc.bind(this);
    this.isFocus = this.isFocus.bind(this);
  }

  componentWillMount() {
    // const { match } = this.props;
    // const { sid } = match.params.id;
    this.setState({
      loading: true
    });
    Promise.all([
      this.getDocInfo(),
      this.getDocTree(),
      this.isFocus(),
      this.getCommentList()
    ]).then(() => {
      this.setState({
        loading: false
      });
    });
  }

  // 获取当前页面评论列表
  getCommentList() {
    const { id, pid } = this.state;
    return ProjectService.getCommentListForDoc(pid, id)
      .then(res => {
        this.setState({
          commentList: res.commentList
          // pageNums:
          //   res.count % 20 === 0
          //     ? Math.floor(res.count / 20, 0)
          //     : Math.floor(res.count / 20, 0) + 1
        });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  // 请求文档的详情信息
  getDocInfo() {
    const { id } = this.state;
    return FileService.getDocConnent(id)
      .then(res => {
        const regex = /\D/;
        const timeArr = res.create_time.split(regex);
        const timeStr = `${timeArr[0]}/${timeArr[1]}/${timeArr[2]} ${
          timeArr[3]
        }:${timeArr[4]}`;
        this.setState({
          docInfo: res,
          createTime: timeStr
        });
        localStorage.setItem("content", res.content);
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      })
      .finally(() => {});
  }

  // 算出文档所在树
  getDocTree() {
    const { id, pid } = this.state;
    return FileTree.getDocTree(pid)
      .then(el => {
        this.setState({
          docTree: el
        });
        this.getDocUrl(id, el);
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      })
      .finally(() => {});
  }

  // 算出文档的路径
  getDocUrl(id, tree) {
    // 找到文档坐在节点
    const node = FileTree.searchNode(id, tree);
    if (node && node.router.length) {
      const docIdUrl = JSON.parse(JSON.stringify(node.router));
      docIdUrl.pop();
      docIdUrl.shift();
      const postData = {
        folder: docIdUrl.map(el => parseInt(el, 0)),
        doc: []
      };
      FileService.getDocList(postData)
        .then(res => {
          let docUrlWithId = [{ name: "全部文档", id: 0 }];
          if (res.FolderList.length) {
            docUrlWithId = docUrlWithId.concat(
              res.FolderList.map(el => ({ name: el.name, id: el.id }))
            );
          }
          this.setState({
            // fileUrl,
            docUrlWithId
          });
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        })
        .finally(() => {});
    }
  }

  // 输入评论内容
  handleChange(event) {
    this.setState({ commentInput: event.target.value });
  }

  // 发送评论
  sendComment() {
    const { pid, id, commentInput } = this.state;
    if (commentInput) {
      ProjectService.commentDoc(pid, id, commentInput)
        .then(() => {
          this.setState({
            commentInput: ""
          });
          this.getCommentList();
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  }

  // 开始删除文档
  startDeleteDoc() {
    this.hideAlert();
    this.setState({
      showDletedoc: true
    });
  }

  // 确认删除文档
  confirmDeleteDoc() {
    const { pid, id, docTree } = this.state;
    FileService.deleteDoc(id)
      .then(() => {
        // 删除成功
        const newTree = FileTree.deleteNode(id, docTree).root;
        // 更新文档树
        if (newTree) {
          ProjectService.updateProjectDocTree(pid, JSON.stringify(newTree))
            .then(() => {
              this.hideAlert();
              window.history.back();
            })
            .catch(error => {
              Store.dispatch({
                type: "substituteWrongInfo",
                payload: error
              });
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

  // 开始移动文档
  moveDoc() {
    this.setState({
      showMoveDoc: true
    });
  }

  // 确认移动文档
  confirmMoveDoc(finalMoveFolderId) {
    const {
      pid,
      docTree,
      // finalMoveDocId,
      id
    } = this.state;
    const docTreeTemp = JSON.parse(JSON.stringify(docTree));
    const newTree = FileTree.moveNode(id, finalMoveFolderId, docTreeTemp);
    if (newTree) {
      FileTree.initNodeFinalSelected(newTree);
      FileTree.initNodeSelected(newTree);
      newTree.selected = true;
      newTree.finalSelected = true;
      ProjectService.updateProjectDocTree(pid, JSON.stringify(newTree))
        .then(() => {
          // 更新doctree
          this.getDocTree();
          this.hideAlert();
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    }
  }

  hideAlert() {
    this.setState({
      showDletedoc: false,
      showMoveDoc: false
    });
  }

  // 查看我是否关注
  isFocus() {
    const { id } = this.state;
    // const { isFocus } = this.state
    return MessageService.getMyAttentionFiles()
      .then(res => {
        const find = res.list
          .filter(item => item.fileKind === 0)
          .filter(file => file.fileID === id);
        if (find.length) {
          this.setState({
            isFocus: true
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

  // 关注文档或取消关注
  focusDoc() {
    const { id, isFocus } = this.state;
    if (isFocus) {
      MessageService.notFocusOnFile(id, 0).catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
      this.setState({
        isFocus: false
      });
    } else {
      MessageService.focusOnFile(id, 0).catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
      this.setState({
        isFocus: true
      });
    }
  }

  render() {
    const {
      pid,
      id,
      docInfo,
      docTree,
      docUrlWithId,
      createTime,
      commentInput,
      commentList,
      // currentPage,
      // pageNums,
      showDletedoc,
      showMoveDoc,
      loading,
      isFocus
    } = this.state;
    const { storeAvatar } = this.props;

    return loading ? (
      <Loading />
    ) : (
      <div className="projectDetail-container">
        <Goback />
        <div className="filePreview-content">
          {/* 头部 */}
          <div className="filePreview-header">
            {/* 头部左边 */}
            <div className="filePreview-header-left">
              <div
                className="filePreview-header-fileName overflowHiddenEllipsisTip"
                title={docInfo.name}
              >
                {docInfo.name}
              </div>
              <div
                className="docPreview-header-creator overflowHiddenEllipsisTip"
                title={docInfo.creator}
              >
                {docInfo.creator}
              </div>
              <div
                className="docPreview-header-lasteditor overflowHiddenEllipsisTip"
                title={`${docInfo.lasteditor}（最新编辑）`}
              >
                {docInfo.lasteditor}
                <span>（最新编辑）</span>
              </div>
              <div className="docPreview-header-url">
                {docUrlWithId.map((el, index) => (
                  <span key={el.id}>
                    {index ? <span>/</span> : ""}
                    <a href={`/project/${pid}/docFolder/${el.id}`}>{el.name}</a>
                  </span>
                ))}
              </div>
            </div>
            {/* 头部右边 */}
            <div className="docPreview-header-right">
              <div
                onClick={this.focusDoc}
                onMouseDown={() => {}}
                role="presentation"
              >
                {isFocus ? "取消关注" : "关注"}
              </div>
              {/* <div
                onClick={() => {}}
                onMouseDown={() => {}}
                role="presentation"
              >
                分享
              </div> */}
              <div
                onClick={this.moveDoc}
                onMouseDown={() => {}}
                role="presentation"
              >
                移动
              </div>
              <a href={`../docEdit/${id}`}>编辑</a>
              <div
                onClick={this.startDeleteDoc}
                onMouseDown={() => {}}
                role="presentation"
              >
                删除
              </div>
            </div>
          </div>
          {/* 时间 */}
          <div className="docPreview-time">{createTime}</div>
          <div className="docPreview-md-markdown">
            <div dangerouslySetInnerHTML={{ __html: docInfo.content }} />
          </div>
          <hr className="status-detail-line" />
          {/* 评论列表 */}
          <div className="status-detail-comments">
            {commentList.map(el => (
              <div key={el.id}>
                <Othercomments
                  avatar={el.avatar}
                  name={el.username}
                  day={el.time}
                  text={el.content}
                />
              </div>
            ))}
          </div>
          {/* 发表评论 */}
          <div className="send">
            <Avatar
              className="comment-img"
              src={storeAvatar}
              width={49}
              height={49}
            />
            {/* src是自己的头像 */}
            <div className="push">
              <div>
                <textarea
                  className="send-comment"
                  type="text"
                  value={commentInput}
                  onChange={this.handleChange}
                  placeholder=" 发表评论..."
                />
              </div>
              <div className="comment-bt">
                <Button onClick={() => this.sendComment()} text="发表" />
              </div>
            </div>
          </div>
        </div>
        {/* 删除文档弹出框 */}
        {showDletedoc && (
          <AlertDeleteFile
            type="文档"
            cancel={this.hideAlert}
            confirmDelete={this.confirmDeleteDoc}
          />
        )}
        {/* 移动文档弹出框 */}
        {showMoveDoc ? (
          <AlertMoveFile
            fileTree={docTree}
            cancel={this.hideAlert}
            confirmMoveFile={this.confirmMoveDoc}
          />
        ) : null}
      </div>
    );
  }
}

DocPreview.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  storeAvatar: PropTypes.string
};

DocPreview.defaultProps = {
  match: {},
  storeAvatar: ""
};

const mapStateToProps = state => ({
  storeAvatar: state.avatar
});

export default connect(mapStateToProps)(DocPreview);
