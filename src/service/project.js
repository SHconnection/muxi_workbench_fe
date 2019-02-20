import Fetch from "./fetch";
import { Store } from "../store";
// import { ContentMatch } from "prosemirror-model";

const ProjectService = {
  projectDelete(proId) {
    return Fetch(`/api/v1.0/project/${proId}/`, {
      method: "DELETE",
      token: Store.getState().token
    });
  },

  editProjectMember(proId, selMembers) {
    return Fetch(`/api/v1.0/project/${proId}/member/`, {
      method: "PUT",
      token: Store.getState().token,
      data: {
        userList: selMembers
      }
    });
  },

  // 获取项目基本信息（name,intro,userCount）
  getProjectInfo(proId) {
    return Fetch(`/api/v1.0/project/${proId}/`, {
      token: Store.getState().token
    });
  },

  saveProjectSet(proId, textValue, inputValue) {
    return Fetch(`/api/v1.0/project/${proId}/`, {
      method: "POST",
      token: Store.getState().token,
      data: {
        intro: textValue,
        name: inputValue
      }
    });
  },

  // 获取项目成员
  getProjectUserList(pid) {
    return Fetch(`/api/v1.0/project/${pid}/member/`, {
      method: "GET",
      token: Store.getState().token
    });
  },

  // 创建项目
  createProject(postData) {
    return Fetch("/api/v1.0/project/new/", {
      method: "POST",
      token: Store.getState().token,
      data: postData
    });
  },

  // 获取项目列表(默认第一页)
  getProjectList(userID, page = 1) {
    return Fetch(`/api/v1.0/user/${userID}/project/list/?page=${page}`, {
      token: Store.getState().token
    });
  },

  // 获取全部项目列表
  getAllProjectList(userID) {
    return ProjectService.getProjectList(userID).then(res => {
      const projectFetch = [];
      for (let i = 1; i <= res.pageMax; i += 1) {
        projectFetch.push(ProjectService.getProjectList(userID, i));
      }
      return Promise.all(projectFetch);
    });
  },

  // 获取项目的文件树
  getProjectFileTree(pid) {
    return Fetch(`/api/v1.0/folder/filetree/${pid}/`, {
      token: Store.getState().token
    });
  },

  // 更新文件树
  updateProjectFileTree(pid, fileTreeStr) {
    return Fetch(`/api/v1.0/folder/filetree/${pid}/`, {
      method: "PUT",
      data: {
        filetree: fileTreeStr
      },
      token: Store.getState().token
    });
  },

  // 获取项目文档树
  getProjectDocTree(pid) {
    return Fetch(`/api/v1.0/folder/doctree/${pid}/`, {
      token: Store.getState().token
    });
  },

  // 更新文档树
  updateProjectDocTree(pid, docTreeStr) {
    return Fetch(`/api/v1.0/folder/doctree/${pid}/`, {
      method: "PUT",
      data: {
        doctree: docTreeStr
      },
      token: Store.getState().token
    });
  },

  // 评论文件
  commentFile(pid, fid, content) {
    return Fetch(`/api/v1.0/project/${pid}/file/${fid}/comments/`, {
      method: "POST",
      data: {
        content
      },
      token: Store.getState().token
    });
  },

  // 获取文件评论列表
  getCommentList(pid, fid) {
    return Fetch(`/api/v1.0/project/${pid}/file/${fid}/comments/`, {
      token: Store.getState().token
    });
  },

  // 评论文档
  commentDoc(pid, fid, content) {
    return Fetch(`/api/v1.0/project/${pid}/doc/${fid}/comments/`, {
      method: "post",
      data: {
        content
      },
      token: Store.getState().token
    });
  },

  // 获取文档评论列表
  getCommentListForDoc(pid, fid) {
    return Fetch(`/api/v1.0/project/${pid}/doc/${fid}/comments/`, {
      token: Store.getState().token
    });
  }
};

export default ProjectService;
