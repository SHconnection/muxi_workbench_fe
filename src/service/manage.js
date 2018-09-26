import Fetch from "./fetch";

const ManageService = {
  addGroup(groupName, selMembers) {
    return Fetch("/group/new/", {
      method: "POST",
      data: JSON.stringify({
        groupName,
        userlist: selMembers
      })
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
    return Fetch(`/project/${proID}/userList/`, {
      token: JSON.parse(localStorage.user).token
    });
  },

  updateGroupMember(groupID, userList) {
    return Fetch(`/group/${groupID}/manageUser/`, {
      method: "POST",
      data: JSON.stringify({
        userList
      })
    });
  },

  groupDelete(groupID) {
    return Fetch(`/group/${groupID}`, {
      method: "DELETE"
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

  memberDelete(userID) {
    return Fetch(`/user/${userID}`, {
      method: "DELETE"
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
