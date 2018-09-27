import Fetch from "./fetch";

const ManageService = {
  // post a new group
  newGroup(groupName, selMembers) {
    return Fetch("/group/new/", {
      token: JSON.parse(localStorage.user).token,
      method: "POST",
      data: JSON.stringify({
        groupName,
        userlist: selMembers
      })
    });
  },

  // delete a group
  deleteGroup(groupId) {
    return Fetch(`/group/${groupId}`, {
      token: JSON.parse(localStorage.user).token,
      method: "DELETE"
    });
  },

  // group user list
  getGroupMember(groupId, page) {
    return Fetch(`/group/${groupId}/userList`, {
      token: JSON.parse(localStorage.user).token,
      data: {
        page
      }
    })
  },

  // get a group list
  getGroupList() {
    return Fetch(`/group/list`, {
      token: localStorage.token
    })
  },

  /* 
    get a project list
    if you are admin or superuser, get all projetc list
  */
  getProjectList(page) {
    return Fetch(`/user/project/list`, {
      token: JSON.parse(localStorage.user).token,
      data: {
        page
      }
    })
  },

  // get project user list
  getProjectUserList(projectId, page) {
    return Fetch(`/project/${projectId}/userList`, {
      token: JSON.parse(localStorage.user).token,
      data: {
        page
      }
    })
  },

  // remove user out of team
  memberDelete(userID) {
    return Fetch(`/user/${userID}`, {
      oken: JSON.parse(localStorage.user).token,
      method: "DELETE"
    });
  },

  addMember(userID) {
    return Fetch("/user/2bMember", {
      method: "POST",
      data: JSON.stringify({
        userID
      })
    });
  },

  groupMember(groupID) {
    return Fetch(`/group/${groupID}/userList/`, {
      token: JSON.parse(localStorage.user).token
    });
  },

  getProMember(proID) {
    return Fetch(`/group/${proID}/userList/`);
  },

  updateGroupMember(groupID, userList) {
    return Fetch(`/group/${groupID}/manageUser/`, {
      method: "POST",
      data: JSON.stringify({
        userList
      })
    });
  },

  getPersonalPro() {
    return Fetch("/user/project/list/", {
      token: JSON.parse(localStorage.user).token
    });
  },

  setManager(userID) {
    return Fetch("/user/addAdmin/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: JSON.stringify({
        luckydog: userID
      })
    });
  },

  

  modifyMemGroup(userID, selMembers) {
    return Fetch(`/user/${userID}/manageGroup/`, {
      method: "POST",
      data: JSON.stringify({
        groupID: selMembers[0]
      })
    });
  },

  savePersonalSet(userID, obj) {
    return Fetch(`/user/${userID}/setting/`, {
      method: "POST",
      data: obj
    });
  },

  savePersonalPermiss(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      data: JSON.stringify({
        projectList: selMembers
      })
    });
  },

  saveModifyMemberIdenty(userID, selIdentities) {
    return Fetch(`/user/${userID}/setRole`, {
      method: "POST",
      data: JSON.stringify({
        role: selIdentities[0]
      })
    });
  },

  saveModifyMemberPro(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      data: JSON.stringify({
        projectList: selMembers
      })
    });
  },

  getJoinApply() {
    return Fetch("/team/applyList/", {
      token: JSON.parse(localStorage.user).token
    });
  },

  dealJoinApply(userID) {
    return Fetch(`/team/apply/${userID}/`, {
      method: "DELETE"
    });
  },

  getAdminList() {
    return Fetch("/user/admins/", {
      token: JSON.parse(localStorage.user).token
    });
  },

  getAllMem() {
    return this.groupMember(0);
  },

  getAllPro() {
    return Fetch("/user/project/list/", {
      token: JSON.parse(localStorage.user).token
    });
  },

  getAllGroup() {
    return Fetch("/group/list/", {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default ManageService;
