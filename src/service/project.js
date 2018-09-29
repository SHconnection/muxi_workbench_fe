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
    return Fetch("/api/v1.0/project/new/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: postData
    });
  }
};

export default ProjectService;
