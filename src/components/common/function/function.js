/*
公用函数文件
getAllMem获取全部成员
getAllPro获取全部项目
getAllGroup获取全部分组
*/
import Fetch from "../../../service/fetch";

const Func = {
  getAllMem() {
    const {list: memberList} = Fetch("/group/0/userList/", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": localStorage.user.token
      }
    });

    if (!Array.isArray(memberList)) return false;

    return memberList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.name = mem.username;
      obj.id = mem.userID;
      obj.email = mem.email;
      obj.role = mem.role;
      obj.selected = false;

      return obj;
    });
  },

  getAllPro() {
    const {list: proList} = fetch("/user/project/list/", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": localStorage.user.token,
      }
    });

    if (!Array.isArray(proList)) return false;

    return proList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.name = mem.projectName;
      obj.id = mem.projectID;
      obj.count = mem.userCount;
      obj.selected = false;

      return obj;
    });
  },

  getAllGroup() {
    const { groupList } = Fetch("/group/list/", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": localStorage.user.token,
      }
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
  },
};

export default Func;
