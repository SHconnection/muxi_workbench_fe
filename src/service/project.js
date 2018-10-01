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

  getProjectInfo(proId) {
    return Fetch(`/project/${proId}/`, {
      token: JSON.parse(localStorage.user).token
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

  createProject(postData) {
    return Fetch("/project/new/", {
      method: "POST",
      token: localStorage.token,
      data: postData
    });
  },

  getProjectList(page=1) {
    return Fetch(`/user/project/list/?page=${page}`, {
      token: localStorage.token
    })
  }
};

export default ProjectService;
