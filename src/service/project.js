import Fetch from "./fetch";

const ProjectService = {
  projectDelete(proId) {
    return Fetch(`/project/${proId}/`, {
      method: "DELETE"
    });
  },

  editProjectMember(proId, selMembers) {
    return Fetch(`/project/${proId}/member/`, {
      method: "PUT",
      data: JSON.stringify({
        userList: selMembers
      })
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
      data: JSON.stringify({
        intro: textValue,
        name: inputValue
      })
    });
  },

  createProject(postData) {
    return Fetch("/api/v1.0/project/new/", {
      method: "POST",
      data: postData
    });
  }
};

export default ProjectService;
