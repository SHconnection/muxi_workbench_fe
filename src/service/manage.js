import Fetch from "./fetch";

const ManageService = {
  addGroup(groupName, selMembers) {
    return Fetch("/group/new/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        groupName,
        userlist: selMembers
      })
    });
  },

  groupMember() {},

  setManager() {},

  modifyMemGroup(userID, selMembers) {
    return Fetch(`/user/${userID}/manageGroup/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        groupID: selMembers[0]
      })
    });
  },

  savePersonalSet(userID, obj) {
    return Fetch(`/user/${userID}/setting/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: obj
    });
  },

  savePersonalPermiss(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        projectList: selMembers
      })
    });
  },

  saveModifyMemberIdenty(userID, selIdentities) {
    return Fetch(`/user/${userID}/setRole`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        role: selIdentities[0]
      })
    });
  },

  saveModifyMemberPro(userID, selMembers) {
    return Fetch(`/user/${userID}/managePro/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        projectList: selMembers
      })
    });
  }
};

export default ManageService;
