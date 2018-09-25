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

  saveProjectSet(proId, textValue, inputValue) {
    return Fetch(`/project/${proId}/`, {
      method: "POST",
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
