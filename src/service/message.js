import Fetch from "./fetch";

const MessageService = {
  getPersonalAttention(userID) {
    return Fetch(`/user/attention/?id=${userID}`, {
      token: localStorage.token
    });
  },

  attentionDel(filename) {
    return Fetch("/user/attention/", {
      method: "DELETE",
      token: localStorage.token,
      data: {
        fileName: filename
      }
    });
  },

  makeNewMessage(receiver, maker, action) {
    return Fetch("/message/new/", {
      method: "POST",
      token: localStorage.token,
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
      token: localStorage.token,
      data: {
        page
      }
    });
  },

  messageAllRead(username) {
    return Fetch("/message/readAll/", {
      method: "POST",
      token: localStorage.token,
      data: {
        username
      }
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/message/${username}/${mid}/`, {
      token: localStorage.token
    });
  },

  // 关注某个文档（件）
  focusOnFile(id, kind) {
    return Fetch(`/user/attention/`, {
      method: "POST",
      data: {
        fileID: id,
        fileKind: kind
      },
      token: localStorage.token
    });
  },

  // 取关某个文档（件）
  notFocusOnFile(id, kind) {
    return Fetch(`/user/attention/`, {
      method: "DELETE",
      data: {
        fileName: id,
        fileKind: kind
      },
      token: localStorage.token
    });
  },

  // 查看我关注的文件们
  getMyAttentionFiles() {
    return Fetch(`/user/attention/`, {
      method: "GET",
      token: localStorage.token
    });
  }
};

export default MessageService;
