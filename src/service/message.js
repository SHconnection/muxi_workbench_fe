import Fetch from "./fetch";

const MessageService = {
  getPersonalAttention(userID) {
    return Fetch(`/user/attention/?id=${userID}`, {
      token: JSON.parse(localStorage.user).token
    });
  },

  attentionDel(filename) {
    return Fetch("/user/attention/", {
      method: "DELETE",
      token: JSON.parse(localStorage.user).token,
      data: {
        fileName: filename
      }
    });
  },

  makeNewMessage(receiver, maker, action) {
    return Fetch("/message/new/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
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
      token: JSON.parse(localStorage.user).token,
      data: {
        page
      }
    });
  },

  messageAllRead(username) {
    return Fetch("/message/readAll/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        username
      }
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/message/${username}/${mid}/`, {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default MessageService;
