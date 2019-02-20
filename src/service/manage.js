import Fetch from "./fetch";
import { Store } from "../store";

const ManageService = {
  // post a new group
  addGroup(groupName, selMembers) {
    return Fetch("/api/v1.0/group/new/", {
      token: Store.getState().token,
      method: "POST",
      data: {
        groupName,
        userlist: selMembers
      }
    });
  },

  // group user list
  getGroupMember(groupId, page = 1) {
    return Fetch(`/api/v1.0/group/${groupId}/userList/`, {
      token: Store.getState().token,
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
      token: Store.getState().token
    });
  },

  /* 
    get a project list
    if you are admin or superuser, get all projetc list
  */
  getProjectList(userID) {
    return Fetch(`/api/v1.0/user/${userID}/project/list/`, {
      token: Store.getState().token
    });
  },

  // get project user list
  getProjectUserList(projectId, page) {
    return Fetch(`/api/v1.0/project/${projectId}/userList/`, {
      token: Store.getState().token,
      data: {
        page
      }
    });
  },

  // remove user out of team
  memberDelete(userID) {
    return Fetch(`/api/v1.0/user/${userID}/`, {
      method: "DELETE",
      token: Store.getState().token
    });
  },

  // get a list of admin
  getAdmin() {
    return Fetch(`/api/v1.0/user/admins/`, {
      method: "GET",
      token: Store.getState().token
    });
  },

  addMember(userID) {
    return Fetch("/api/v1.0/user/2bMember/", {
      method: "POST",
      token: Store.getState().token,
      data: {
        userID
      }
    });
  },

  groupMember(groupID) {
    return Fetch(`/api/v1.0/group/${groupID}/userList/`, {
      token: Store.getState().token
    });
  },

  getProMember(proID) {
    return Fetch(`/api/v1.0/project/${proID}/userList/`, {
      token: Store.getState().token
    });
  },

  updateGroupMember(groupID, userList) {
    return Fetch(`/api/v1.0/group/${groupID}/manageUser/`, {
      method: "POST",
      token: Store.getState().token,
      data: {
        userList
      }
    });
  },

  updateGroupName(groupID, groupName) {
    return Fetch(`/api/v1.0/group/${groupID}/rename/`, {
      method: "POST",
      token: Store.getState().token,
      data: {
        rename: groupName
      }
    });
  },

  groupDelete(groupID) {
    return Fetch(`/api/v1.0/group/${groupID}/`, {
      method: "DELETE",
      token: Store.getState().token
    });
  },

  getPersonalPro(userID) {
    return Fetch(`/api/v1.0/user/${userID}/project/list/`, {
      token: Store.getState().token
    });
  },

  setManager(userID) {
    return Fetch("/api/v1.0/user/addAdmin/", {
      method: "POST",
      token: Store.getState().token,
      data: {
        luckydog: userID
      }
    });
  },

  deleteManager(userID) {
    return Fetch("/api/v1.0/user/delAdmin/", {
      method: "POST",
      token: Store.getState().token,
      data: {
        unluckydog: userID
      }
    });
  },

  modifyMemGroup(userID, selMembers) {
    return Fetch(`/user/${userID}/manageGroup/`, {
      method: "POST",
      token: Store.getState().token,
      data: {
        groupID: selMembers[0]
      }
    });
  },

  getPersonalSet(userID) {
    return Fetch(`/api/v1.0/user/${userID}/setting/`, {
      token: Store.getState().token
    });
  },

  savePersonalSet(userID, obj) {
    return Fetch(`/api/v1.0/user/${userID}/setting/`, {
      method: "POST",
      token: Store.getState().token,
      data: obj
    });
  },

  savePersonalAvatar(data) {
    return fetch(`/api/v1.0/user/uploadAvatar/`, {
      method: "POST",
      headers: {
        token: Store.getState().token
      },
      body: data
    }).then(response => {
      switch (response.status) {
        case 200:
          break;

        case 401:
          throw new Error("未授权");

        case 403:
          throw new Error("没有权限访问");

        case 404:
          throw new Error("页面地址错误");

        case 413:
          throw new Error("图片体积过大");

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
      token: Store.getState().token,
      data: {
        projectList: selMembers
      }
    });
  },

  saveModifyMemberIdenty(userID, selIdentities) {
    return Fetch(`/api/v1.0/user/${userID}/setRole/`, {
      method: "POST",
      token: Store.getState().token,
      data: {
        role: selIdentities[0]
      }
    });
  },

  saveModifyMemberPro(userID, selMembers) {
    return Fetch(`/api/v1.0/user/${userID}/managePro/`, {
      method: "POST",
      token: Store.getState().token,
      data: {
        projectList: selMembers
      }
    });
  },

  getJoinApply() {
    return Fetch("/api/v1.0/team/applyList/", {
      token: Store.getState().token
    });
  },

  dealJoinApply(userID) {
    return Fetch(`/api/v1.0/team/apply/${userID}/`, {
      method: "DELETE",
      token: Store.getState().token
    });
  },

  getAdminList() {
    return Fetch("/api/v1.0/user/admins/", {
      token: Store.getState().token
    });
  },

  getAllMem() {
    return this.groupMember(0);
  },

  getAllGroup() {
    return Fetch("/api/v1.0/group/list/", {
      token: Store.getState().token
    });
  },

  invitePerson() {
    return Fetch("/api/v1.0/team/invite/", {
      token: Store.getState().token
    });
  }
};

export default ManageService;
