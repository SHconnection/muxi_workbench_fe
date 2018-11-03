import Fetch from "./fetch";
import Cookie from "./cookie";

const MessageService = {
  getPersonalAttention(userID) {
    return Fetch(`/user/attention/?id=${userID}`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  attentionDel(filename) {
    return Fetch("/user/attention/", {
      method: "DELETE",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        fileName: filename
      }
    });
  },

  makeNewMessage(receiver, maker, action) {
    return Fetch("/message/new/", {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
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
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        page
      }
    });
  },

  messageAllRead(username) {
    return Fetch("/message/readAll/", {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        username
      }
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/message/${username}/${mid}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  // 关注某个文档（件）
  focusOnFile(id) {
    return Fetch(`/user/attention/`, {
      method: "POST",
      data: {
        fileID: id
      },
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  // 取关某个文档（件）
  notFocusOnFile(id) {
    return Fetch(`/user/attention/`, {
      method: "DELETE",
      data: {
        fileID: id
      },
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },

  // 查看我关注的文件们
  getMyAttentionFiles() {
    return Fetch(`/user/attention/`, {
      method: "GET",
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  }
};

export default MessageService;
