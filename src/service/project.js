import Fetch from "./fetch";

const ProjectService = {
  projectDelete(proId) {
    return Fetch(`/project/${proId}/`, {
      method: "DELETE",
      token: JSON.parse(localStorage.user).token
    });
  },

  editProjectMember(proId, selMembers) {
    return Fetch(`/project/${proId}/member/`, {
      method: "PUT",
      token: JSON.parse(localStorage.user).token,
      data: {
        userList: selMembers
      }
    });
  },

  // 获取项目基本信息（name,intro,userCount）
  getProjectInfo(proId) {
    return Fetch(`/project/${proId}/`, {
      token: localStorage.token
    });
  },

  saveProjectSet(proId, textValue, inputValue) {
    return Fetch(`/project/${proId}/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        intro: textValue,
        name: inputValue
      }
    });
  },

  // 创建项目
  createProject(postData) {
    return Fetch("/project/new/", {
      method: "POST",
      token: localStorage.token,
      data: postData
    });
  },

  // 获取项目列表(默认第一页)
  getProjectList(userID, page = 1) {
    return Fetch(`/user/${userID}/project/list/?page=${page}`, {
      token: localStorage.token
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
    return Fetch(`/folder/filetree/${pid}/`, {
      token: localStorage.token
    });
  },

  // 更新文件树
  updateProjectFileTree(pid, fileTreeStr) {
    return Fetch(`/folder/filetree/${pid}/`, {
      method: "PUT",
      data: {
        filetree: fileTreeStr
      },
      token: localStorage.token
    });
  },

  // 获取项目文档树
  getProjectDocTree(pid) {
    return Fetch(`/folder/doctree/${pid}/`, {
      token: localStorage.token
    });
  },

  // 更新文档树
  updateProjectDocTree(pid, docTreeStr) {
    return Fetch(`/folder/doctree/${pid}/`, {
      method: "PUT",
      data: {
        doctree: docTreeStr
      },
      token: localStorage.token
    });
  }
};

export default ProjectService;
