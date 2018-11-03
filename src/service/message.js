import Fetch from "./fetch";
import Cookie from "./cookie";

const MessageService = {
  getPersonalAttention(userID) {
    return Fetch(`/user/attention/?id=${userID}`, {
      token: Cookie.getCookie("workbench_token")
    });
  },

  attentionDel(filename) {
    return Fetch("/user/attention/", {
      method: "DELETE",
      token: Cookie.getCookie("workbench_token"),
      data: {
        fileName: filename
      }
    });
  },

  makeNewMessage(receiver, maker, action) {
    return Fetch("/message/new/", {
      method: "POST",
      token: Cookie.getCookie("workbench_token"),
      data: {
        receiver,
        maker,
        action,
        sourceID: 0
      }
    });
  },

  getMessageList(page) {
    return Fetch(`/message/list/?page=${page}/`, {
      token: Cookie.getCookie("workbench_token"),
      data: {
        page
      }
    });
  },

  messageAllRead(username) {
    return Fetch("/message/readAll/", {
      method: "POST",
      token: Cookie.getCookie("workbench_token"),
      data: {
        username
      }
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/message/${username}/${mid}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 关注某个文档（件）
  focusOnFile(id) {
    return Fetch(`/user/attention/`, {
      method: "POST",
      data: {
        fileID: id
      },
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 取关某个文档（件）
  notFocusOnFile(id) {
    return Fetch(`/user/attention/`, {
      method: "DELETE",
      data: {
        fileID: id
      },
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 查看我关注的文件们
  getMyAttentionFiles() {
    return Fetch(`/user/attention/`, {
      method: "GET",
      token: Cookie.getCookie("workbench_token")
    });
  }
};

export default MessageService;
