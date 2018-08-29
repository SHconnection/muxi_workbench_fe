import Fetch from "./fetch";

const ProjectService = {
  projectDelete(proId) {
    return Fetch(`/project/${proId}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  },

  editProjectMember(proId, selMembers) {
    return Fetch(`/project/${proId}/member/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userList: selMembers
      })
    });
  },

  saveProjectSet(proId, textValue, inputValue) {
    return Fetch(`/project/${proId}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        intro: textValue,
        name: inputValue
      })
    });
  },

  createProject(postData) {
    return Fetch("/api/v1.0/project/new/", {
      method: "POST",
      body: postData
    });
  }
};

export default ProjectService;
