import Fetch from "./fetch";
import Cookie from "./cookie";

const ManageService = {
  // post a new group
  addGroup(groupName, selMembers) {
    return Fetch("/group/new/", {
      token: JSON.parse(Cookie.getCookie("user")).token,
      method: "POST",
      data: {
        groupName,
        userlist: selMembers
      }
    });
  },

  // group user list
  getGroupMember(groupId, page = 1) {
    return Fetch(`/group/${groupId}/userList`, {
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        page
      }
    });
  },

  // group all user list
  getGroupAllMember(groupId) {
    return ManageService.getGroupMember(groupId).then(res => {
      const groupsFetch = [];
      for (let i = 1; i <= res.pageMax; i += 1) {
        groupsFetch.push(ManageService.getGroupMember(groupId, i));
      }
      return Promise.all(groupsFetch);
    });
  },

  // get a group list
  getGroupList() {
    return Fetch(`/group/list/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  /* 
    get a project list
    if you are admin or superuser, get all projetc list
  */
  getProjectList(page) {
    return Fetch(`/user/project/list`, {
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        page
      }
    });
  },

  // get project user list
  getProjectUserList(projectId, page) {
    return Fetch(`/project/${projectId}/userList`, {
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        page
      }
    });
  },

  // remove user out of team
  memberDelete(userID) {
    return Fetch(`/user/${userID}`, {
      method: "DELETE",
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  // get a list of admin
  getAdmin() {
    return Fetch(`/user/admins/`, {
      method: "GET",
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  addMember(userID) {
    return Fetch("/user/2bMember/", {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        userID
      }
    });
  },

  groupMember(groupID) {
    return Fetch(`/group/${groupID}/userList/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  getProMember(proID) {
    return Fetch(`/project/${proID}/userList/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  updateGroupMember(groupID, userList) {
    return Fetch(`/group/${groupID}/manageUser/`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        userList
      }
    });
  },

  groupDelete(groupID) {
    return Fetch(`/group/${groupID}/`, {
      method: "DELETE",
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  getPersonalPro(userID) {
    return Fetch(`/user/${userID}/project/list/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  setManager(userID) {
    return Fetch("/user/addAdmin/", {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        luckydog: userID
      }
    });
  },

  modifyMemGroup(userID, selMembers) {
    return Fetch(`/user/${userID}/manageGroup/`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        groupID: selMembers[0]
      }
    });
  },

  getPersonalSet(userID) {
    return Fetch(`/user/${userID}/setting/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  savePersonalSet(userID, obj) {
    return Fetch(`/user/${userID}/setting/`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: obj
    });
  },

  savePersonalAvatar(data) {
    return fetch(`/user/uploadAvatar/`, {
      method: "POST",
      headers: {
        // accept-charset: 'Unicode',
        token: JSON.parse(Cookie.getCookie("user")).token
      },
      body: data
    });
  },

  savePersonalPermiss(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        projectList: selMembers
      }
    });
  },

  saveModifyMemberIdenty(userID, selIdentities) {
    return Fetch(`/user/${userID}/setRole/`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        role: selIdentities[0]
      }
    });
  },

  saveModifyMemberPro(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        projectList: selMembers
      }
    });
  },

  getJoinApply() {
    return Fetch("/team/applyList/", {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  dealJoinApply(userID) {
    return Fetch(`/team/apply/${userID}/`, {
      method: "DELETE",
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  getAdminList() {
    return Fetch("/user/admins/", {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  getAllMem() {
    return this.groupMember(0);
  },

  getAllGroup() {
    return Fetch("/group/list/", {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  invitePerson() {
    return Fetch("/team/invite/", {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default ManageService;
