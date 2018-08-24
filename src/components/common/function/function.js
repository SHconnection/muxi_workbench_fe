/*
公用函数文件
getAllMem获取全部成员
getAllPro获取全部项目
getAllGroup获取全部分组
*/
import Fetch from "../../../service/fetch";

const Func = {
  getAllMem() {
    const memberList = Fetch("/project/member/", {
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    });

    if (!Array.isArray(memberList)) return false;

    return memberList.map(member => {
      const mem = member;
      const obj = {};

      obj.name = mem.username;
      obj.id = mem.userID;
      obj.selected = false;

      return obj;
    });
  },

  getAllPro() {
    const proList = fetch("http://119.23.79.87:1667/user/project/list/", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "mode": "no-cors"
      }
    });
    console.log(proList)

    // if (!Array.isArray(proList)) return false;

    // return proList.map(mem1 => {
    //   const mem = mem1;
    //   const obj = {};

    //   obj.name = mem.projectName;
    //   obj.id = mem.projectID;
    //   obj.selected = false;

    //   return obj;
    // });
  },

  getAllGroup() {
    const { groupList } = Fetch("/group/list/", {
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
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

  getPersonalAttention(userID) {
    const attentionList = Fetch(`/group/${  userID  }/list/`, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    });

    if (!Array.isArray(attentionList)) return false;

    return attentionList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.fileName = mem.fileName;
      obj.projectName = mem.projectName;
      obj.date = mem.date;
      obj.userName = mem.userName;
      obj.dealed = false;
      obj.isFolder = mem.isFolder;

      return obj;
    });
  }
};

export default Func;
