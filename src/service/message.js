import Fetch from "./fetch";

const MessageService = {
  getPersonalAttention(userID) {
    return Fetch(`/api/v1.0/user/attention/?id=${userID}`, {
      token: localStorage.token
    });
  },

  makeNewMessage(receiver, maker, action) {
    return Fetch("/api/v1.0/message/new/", {
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
    return Fetch(`/api/v1.0/message/list/?page=${page}/`, {
      token: localStorage.token
    });
  },

  messageAllRead(username) {
    return Fetch("/api/v1.0/message/readAll/", {
      method: "POST",
      token: localStorage.token,
      data: {
        username
      }
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/api/v1.0/message/${username}/${mid}/`, {
      token: localStorage.token
    });
  },

  // 关注某个文档（件）
  focusOnFile(id, kind) {
    return Fetch(`/api/v1.0/user/attention/`, {
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
    return Fetch(`/api/v1.0/user/attention/`, {
      method: "DELETE",
      data: {
        fileID: id,
        fileKind: kind
      },
      token: localStorage.token
    });
  },

  // 查看我关注的文件们
  getMyAttentionFiles() {
    return Fetch(`/api/v1.0/user/attention/`, {
      method: "GET",
      token: localStorage.token
    });
  }
};

export default MessageService;
