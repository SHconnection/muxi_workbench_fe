import Fetch from "./fetch";

const ManageService = {
  // post a new group
  newGroup(groupName, selMembers) {
    return Fetch("/group/new/", {
      token: JSON.parse(localStorage.user).token,
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        groupName,
        userlist: selMembers
      }
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
  getGroupMember(groupId, page=1) {
    return Fetch(`/group/${groupId}/userList`, {
      token: JSON.parse(localStorage.user).token,
      data: {
        page
      }
    })
  },

  // group all user list
  getGroupAllMember(groupId) {
    return ManageService.getGroupMember(groupId)
    .then(res => {
      const groupsFetch = []
      for (let i = 1; i <= res.pageMax; i += 1) {
        groupsFetch.push(ManageService.getGroupMember(groupId, i))
      }
      return Promise.all(groupsFetch)
    })
  },

  // get a group list
  getGroupList() {
    return Fetch(`/group/list/`, {
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
    return Fetch("/user/2bMember/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        userID
      }
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
      token: JSON.parse(localStorage.user).token,
      data: {
        userList
      }
    });
  },

<<<<<<< HEAD
  groupDelete(groupID) {
    return Fetch(`/group/${groupID}/`, {
      method: "DELETE",
      token: JSON.parse(localStorage.user).token
    });
  },

=======
>>>>>>> 8d99aca4e42ec885e921a6afe19517ddc8fe9871
  getPersonalPro() {
    return Fetch("/user/project/list/", {
      token: JSON.parse(localStorage.user).token
    });
  },

  setManager(userID) {
    return Fetch("/user/addAdmin/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        luckydog: userID
      }
    });
  },

<<<<<<< HEAD
  memberDelete(userID) {
    return Fetch(`/user/${userID}/`, {
      method: "DELETE",
      token: JSON.parse(localStorage.user).token
    });
  },
=======
  
>>>>>>> 8d99aca4e42ec885e921a6afe19517ddc8fe9871

  modifyMemGroup(userID, selMembers) {
    return Fetch(`/user/${userID}/manageGroup/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        groupID: selMembers[0]
      }
    });
  },

  savePersonalSet(userID, obj) {
    return Fetch(`/user/${userID}/setting/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: obj
    });
  },

  savePersonalPermiss(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        projectList: selMembers
      }
    });
  },

  saveModifyMemberIdenty(userID, selIdentities) {
    return Fetch(`/user/${userID}/setRole/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        role: selIdentities[0]
      }
    });
  },

  saveModifyMemberPro(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        projectList: selMembers
      }
    });
  },

  getJoinApply() {
    return Fetch("/team/applyList/", {
      token: JSON.parse(localStorage.user).token
    });
  },

  dealJoinApply(userID) {
    return Fetch(`/team/apply/${userID}/`, {
      method: "DELETE",
      token: JSON.parse(localStorage.user).token
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

  getAllGroup() {
    return Fetch("/group/list/", {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default ManageService;
