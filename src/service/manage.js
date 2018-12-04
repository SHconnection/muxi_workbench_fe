import Fetch from "./fetch";

const ManageService = {
  // post a new group
  addGroup(groupName, selMembers) {
    return Fetch("/api/v1.0/group/new/", {
      token: localStorage.token,
      method: "POST",
      data: {
        groupName,
        userlist: selMembers
      }
    });
  },

  // group user list
  getGroupMember(groupId, page = 1) {
    return Fetch(`/api/v1.0/group/${groupId}/userList`, {
      token: localStorage.token,
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
    return Fetch(`/api/v1.0/group/list/`, {
      token: localStorage.token
    });
  },

  /* 
    get a project list
    if you are admin or superuser, get all projetc list
  */
  getProjectList(page) {
    return Fetch(`/api/v1.0/user/project/list`, {
      token: localStorage.token,
      data: {
        page
      }
    });
  },

  // get project user list
  getProjectUserList(projectId, page) {
    return Fetch(`/api/v1.0/project/${projectId}/userList`, {
      token: localStorage.token,
      data: {
        page
      }
    });
  },

  // remove user out of team
  memberDelete(userID) {
    return Fetch(`/api/v1.0/user/${userID}`, {
      method: "DELETE",
      token: localStorage.token
    });
  },

  // get a list of admin
  getAdmin() {
    return Fetch(`/api/v1.0/user/admins/`, {
      method: "GET",
      token: localStorage.token
    });
  },

  addMember(userID) {
    return Fetch("/api/v1.0/user/2bMember/", {
      method: "POST",
      token: localStorage.token,
      data: {
        userID
      }
    });
  },

  groupMember(groupID) {
    return Fetch(`/api/v1.0/group/${groupID}/userList/`, {
      token: localStorage.token
    });
  },

  getProMember(proID) {
    return Fetch(`/api/v1.0/project/${proID}/userList/`, {
      token: localStorage.token
    });
  },

  updateGroupMember(groupID, userList) {
    return Fetch(`/api/v1.0/group/${groupID}/manageUser/`, {
      method: "POST",
      token: localStorage.token,
      data: {
        userList
      }
    });
  },

  groupDelete(groupID) {
    return Fetch(`/api/v1.0/group/${groupID}/`, {
      method: "DELETE",
      token: localStorage.token
    });
  },

  getPersonalPro(userID) {
    return Fetch(`/api/v1.0/user/${userID}/project/list/`, {
      token: localStorage.token
    });
  },

  setManager(userID) {
    return Fetch("/api/v1.0/user/addAdmin/", {
      method: "POST",
      token: localStorage.token,
      data: {
        luckydog: userID
      }
    });
  },

  modifyMemGroup(userID, selMembers) {
    return Fetch(`/user/${userID}/manageGroup/`, {
      method: "POST",
      token: localStorage.token,
      data: {
        groupID: selMembers[0]
      }
    });
  },

  getPersonalSet(userID) {
    return Fetch(`/api/v1.0/user/${userID}/setting/`, {
      token: localStorage.token
    });
  },

  savePersonalSet(userID, obj) {
    return Fetch(`/api/v1.0/user/${userID}/setting/`, {
      method: "POST",
      token: localStorage.token,
      data: obj
    });
  },

  savePersonalAvatar(data) {
    return fetch(`/api/v1.0/user/uploadAvatar/`, {
      method: "POST",
      headers: {
        token: localStorage.token
      },
      body: data
    }).then(response => {
      switch (response.status) {
        case 401:
          throw new Error("未授权");

        case 403:
          throw new Error("没有权限访问");

        case 404:
          throw new Error("页面地址错误");

        case 500:
          throw new Error("服务器错误");

        case 502:
          throw new Error("网关错误");

        default:
          throw new Error("Wrong");
      }
    });
  },

  savePersonalPermiss(userID, selMembers) {
    return Fetch(`/api/v1.0/user/${userID}/managePro/`, {
      method: "POST",
      token: localStorage.token,
      data: {
        projectList: selMembers
      }
    });
  },

  saveModifyMemberIdenty(userID, selIdentities) {
    return Fetch(`/api/v1.0/user/${userID}/setRole/`, {
      method: "POST",
      token: localStorage.token,
      data: {
        role: selIdentities[0]
      }
    });
  },

  saveModifyMemberPro(userID, selMembers) {
    return Fetch(`/api/v1.0/user/${userID}/managePro/`, {
      method: "POST",
      token: localStorage.token,
      data: {
        projectList: selMembers
      }
    });
  },

  getJoinApply() {
    return Fetch("/api/v1.0/team/applyList/", {
      token: localStorage.token
    });
  },

  dealJoinApply(userID) {
    return Fetch(`/api/v1.0/team/apply/${userID}/`, {
      method: "DELETE",
      token: localStorage.token
    });
  },

  getAdminList() {
    return Fetch("/api/v1.0/user/admins/", {
      token: localStorage.token
    });
  },

  getAllMem() {
    return this.groupMember(0);
  },

  getAllGroup() {
    return Fetch("/api/v1.0/group/list/", {
      token: localStorage.token
    });
  },

  invitePerson() {
    return Fetch("/api/v1.0/team/invite/", {
      token: localStorage.token
    });
  }
};

export default ManageService;
