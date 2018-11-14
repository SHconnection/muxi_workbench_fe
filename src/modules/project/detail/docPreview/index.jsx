import React, { Component } from "react";
import PropTypes from "prop-types";
import { MarkdownPreview } from "react-marked-markdown";
// import { Scrollbars } from "react-custom-scrollbars";
// import FileTreeComponent from "../../components/fileTree/index";
// import MessageService from "../../../../service/message";
import AlertMoveFile from "../../components/alertMoveFile";
import AlertDeleteFile from "../../components/alertDeleteFile";
import FileService from "../../../../service/file";
import ProjectService from "../../../../service/project";
import MessageService from "../../../../service/message";
import WrongPage from "../../../../components/common/wrongPage/wrongPage";
import { FileTree } from "../../fileTree1";
import Othercomments from "../../../../components/common/otherComments/comments";
import Paging from "../../../../components/common/paging/index";
import Avatar from "../../../../components/common/avatar/index";
import Button from "../../../../components/common/button/index";
import Goback from "../../../../components/common/goBack/index";
import "../../../../static/css/common.css";
import "../../../status/markdown/edit.css";
import "./index.css";

class DocPreview extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      pid: parseInt(match.params.pid, 0),
      id: parseInt(match.params.id, 0),
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
      currentPage: 1,
      // 总页数
      pageNums: 1,
      // 是否显示删除文档
      showDletedoc: false,
      // 是否显示移动文档
      showMoveDoc: false,
      // 移动文档最终选择的id
      // finalMoveDocId: 0,
      wrong: ""
    };
    this.getDocInfo = this.getDocInfo.bind(this);
    this.getDocTree = this.getDocTree.bind(this);
    this.getDocUrl = this.getDocUrl.bind(this);
    this.getCommentList = this.getCommentList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendComment = this.sendComment.bind(this);
    this.selectPage = this.selectPage.bind(this);
    this.startDeleteDoc = this.startDeleteDoc.bind(this);
    this.confirmDeleteDoc = this.confirmDeleteDoc.bind(this);
    this.moveDoc = this.moveDoc.bind(this);
    this.confirmMoveDoc = this.confirmMoveDoc.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.focusDoc = this.focusDoc.bind(this);
    this.isFocus = this.isFocus.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillMount() {
    // const { match } = this.props;
    // const { sid } = match.params.id;
    this.getDocInfo();
    this.getDocTree();
    this.isFocus();
    this.getCommentList();
  }

  // 获取当前页面评论列表
  getCommentList() {
    const { id, pid, currentPage } = this.state;
    ProjectService.getCommentListForDoc(pid, id, currentPage)
      .then(res => {
        this.setState({
          commentList: res.commentList,
          pageNums:
            res.count % 20 === 0
              ? Math.floor(res.count / 20, 0)
              : Math.floor(res.count / 20, 0) + 1
        });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  // 请求文档的详情信息
  getDocInfo() {
    const { id } = this.state;
    FileService.getDocConnent(id)
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
      })
      .catch(err => {
        this.setState({ wrong: err });
      });
    // FileService.getDocList(postData)
    //   .then(res => {
    //     const { creator } = res.DocList[0]
    //     const regex = /\D/
    //     const timeArr = res.DocList[0].create_time.split(regex)
    //     const timeStr = `${timeArr[0]}/${timeArr[1]}/${timeArr[2]} ${timeArr[3]}:${timeArr[4]}`
    //     this.setState({
    //       docInfo: res.DocList[0],
    //       createTime: timeStr,
    //       creator
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({ wrong: error });
    //   });
  }

  // 算出文档所在树
  getDocTree() {
    const { id, pid } = this.state;
    FileTree.getDocTree(pid)
      .then(el => {
        this.setState({
          docTree: el
        });
        this.getDocUrl(id, el);
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
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
        .catch(err => {
          this.setState({ wrong: err });
        });
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
          this.setState({ wrong: error });
        });
    }
  }

  // 跳转页面
  selectPage(page) {
    const { pid, id, pageNums, currentPage } = this.state;
    if (page > 0 && page <= pageNums && page !== currentPage) {
      ProjectService.getCommentList(pid, id, page)
        .then(res => {
          this.setState({
            commentList: res.commentList,
            currentPage: page
          });
        })
        .catch(error => {
          this.setState({ wrong: error });
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
            .catch(err => {
              this.setState({ wrong: err });
            });
        }
      })
      .catch(error => {
        this.setState({ wrong: error });
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
          this.setState({ wrong: error });
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
    MessageService.getMyAttentionFiles()
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
        this.setState({ wrong: error });
      });
  }

  // 关注文档或取消关注
  focusDoc() {
    const { id, isFocus } = this.state;
    if (isFocus) {
      MessageService.notFocusOnFile(id, 0).catch(error => {
        this.setState({ wrong: error });
      });
      this.setState({
        isFocus: false
      });
    } else {
      MessageService.focusOnFile(id, 0).catch(error => {
        this.setState({ wrong: error });
      });
      this.setState({
        isFocus: true
      });
    }
  }

  cancel() {
    this.setState({ wrong: "" });
  }

  render() {
    const {
      id,
      docInfo,
      docTree,
      docUrlWithId,
      createTime,
      commentInput,
      commentList,
      currentPage,
      pageNums,
      showDletedoc,
      showMoveDoc,
      isFocus,
      wrong
    } = this.state;

    return (
      <div className="projectDetail-container">
        <Goback />
        <div className="filePreview-content">
          {/* 头部 */}
          <div className="filePreview-header">
            {/* 头部左边 */}
            <div className="filePreview-header-left">
              <div className="filePreview-header-fileName">{docInfo.name}</div>
              <div className="docPreview-header-creator">{docInfo.creator}</div>
              <div className="docPreview-header-lasteditor">
                {docInfo.lasteditor}
                <span>（最新编辑）</span>
              </div>
              <div className="docPreview-header-url">
                {docUrlWithId.map((el, index) => (
                  <span key={el.id}>
                    {index ? <span>/</span> : ""}
                    <a href={`../docFolder/${el.id}`}>{el.name}</a>
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
              {/* <div onClick={() => { }} onMouseDown={() => { }} role="presentation">编辑</div> */}
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
            <MarkdownPreview
              value={docInfo.content}
              className="column docPreview-md-preview"
              markedOptions={{
                baseUrl: true,
                headerIds: true,
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
              }}
            />
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
          {/* 分页功能 */}
          {commentList.length ? (
            <div className="filePreview-paging">
              <Paging
                pageNums={pageNums}
                currentPage={currentPage}
                selectPage={this.selectPage}
              />
            </div>
          ) : (
            ""
          )}
          {/* 发表评论 */}
          <div className="send">
            <Avatar
              className="comment-img"
              src={localStorage.avatar}
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
        {/* {showDletedoc && (
          <div className="deleteFileAlert">
            <div className="delete-file-alert-tip">确认要删除该文档吗</div>
            <div className="delete-file-alert-cancel">
              <Button
                onClick={this.hideAlert}
                text="取消"
                width="65"
                height="32"
                border="1px solid RGBA(217, 217, 217, 1)"
                bgColor="RGBA(255, 255, 255, 1)"
                textColor="RGBA(64, 64, 64, 1)"
                fontSize="14"
              />
            </div>
            <div className="delete-file-alert-done">
              <Button
                onClick={this.confirmDeleteDoc}
                text="确定"
                width="65"
                height="32"
                fontSize="14"
              />
            </div>
          </div>
        )} */}
        {/* 移动文档弹出框 */}
        {showMoveDoc ? (
          <AlertMoveFile
            fileTree={docTree}
            cancel={this.hideAlert}
            confirmMoveFile={this.confirmMoveDoc}
          />
        ) : (
          ""
        )}
        {/* {showMoveDoc && (
          <div className="moveFileAlert">
            <div className="move-file-alert-tip">选择保存路径</div>
            <div className="move-file-tree-container">
              <Scrollbars>
                <FileTreeComponent
                  root={docTree}
                  select={() => {
                    const fileRootTemp = Object.assign({}, docTree);
                    fileRootTemp.selected = !fileRootTemp.selected;
                    FileTree.initNodeSelected(fileRootTemp);
                    this.setState({
                      docTree: fileRootTemp
                    });
                  }}
                  finalSelect={el => {
                    const fileRootTemp = Object.assign({}, docTree);
                    FileTree.initNodeFinalSelected(fileRootTemp);
                    let fatherId;
                    if (el.selected || el.router.length === 1) {
                      fatherId = el.id;
                    } else {
                      // 取消选中
                      fatherId = el.router[el.router.length - 2];
                    }
                    const fatherNode = FileTree.searchNode(
                      fatherId,
                      fileRootTemp
                    );
                    fatherNode.finalSelected = true;
                    this.setState({
                      docTree: fileRootTemp,
                      finalMoveDocId: fatherNode.id
                    });
                  }}
                />
              </Scrollbars>
            </div>
            <div className="move-file-alert-cancel">
              <Button
                onClick={this.hideAlert}
                text="取消"
                width="65"
                height="32"
                border="1px solid RGBA(217, 217, 217, 1)"
                bgColor="RGBA(255, 255, 255, 1)"
                textColor="RGBA(64, 64, 64, 1)"
                fontSize="14"
              />
            </div>
            <div className="move-file-alert-done">
              <Button
                onClick={this.confirmMoveDoc}
                text="确定"
                width="65"
                height="32"
                fontSize="14"
              />
            </div>
          </div>
        )} */}
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

DocPreview.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

DocPreview.defaultProps = {
  match: {}
};

export default DocPreview;
