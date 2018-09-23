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
    }).then(memberList =>
      memberList.map(mem1 => {
        const mem = mem1;
        const obj = {};

        obj.name = mem.username;
        obj.id = mem.userID;
        obj.email = mem.email;
        obj.role = mem.role;
        obj.selected = false;

        return obj;
      })
    );
  },

  getProMember(proID) {
    const { list: memberList } = Fetch(`/group/${proID}/userList/`);

    if (!Array.isArray(memberList)) return false;

    return memberList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.name = mem.username;
      obj.id = mem.userID;
      obj.avatar = mem.avatar;

      return obj;
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
    const { list: memberList } = Fetch("/team/applyList/", {
      token: JSON.parse(localStorage.user).token
    });

    if (!Array.isArray(memberList)) return false;

    return memberList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.name = mem.username;
      obj.id = mem.userID;
      obj.email = mem.userEmail;
      obj.dealed = false;

      return obj;
    });
  },

  dealJoinApply(userID) {
    return Fetch(`/team/apply/${userID}/`, {
      method: "DELETE"
    });
  },

  getAdminList() {
    const { list: memberList } = Fetch("/user/admins/", {
      token: JSON.parse(localStorage.user).token
    });

    if (!Array.isArray(memberList)) return false;

    return memberList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.name = mem.username;
      obj.id = mem.userID;

      return obj;
    });
  },

  getAllMem() {
    return this.groupMember(0);
  },

  getAllPro() {
    const { list: proList } = fetch("/user/project/list/", {
      token: JSON.parse(localStorage.user).token
    });

    if (!Array.isArray(proList)) return false;

    return proList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.name = mem.projectName;
      obj.id = mem.projectID;
      obj.count = mem.userCount;
      obj.intro = mem.intro;
      obj.selected = false;

      return obj;
    });
  },

  getAllGroup() {
    const { groupList } = Fetch("/group/list/", {
      token: JSON.parse(localStorage.user).token
    });

    if (!Array.isArray(groupList)) return false;

    return groupList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.name = mem.groupName;
      obj.id = mem.groupID;
      obj.count = mem.userCount;
      obj.selected = false;
      obj.dealed = false;

      return obj;
    });
  }
};

export default ManageService;
