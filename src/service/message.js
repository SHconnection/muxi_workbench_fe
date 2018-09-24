import Fetch from "./fetch";

const MessageService = {
  getPersonalAttention() {
    return Fetch("/user/attention/", {
      token: JSON.parse(localStorage.user).token
    });
  },

  attentionDel(filename) {
    return Fetch("/user/attention/", {
      methods: "DELETE",
      token: JSON.parse(localStorage.user).token,
      data: JSON.stringify({
        fileName: filename
      })
    });
  },

  makeNewMessage(receiver, maker, action) {
    return Fetch("/message/new/", {
      methods: "POST",
      token: JSON.parse(localStorage.user).token,
      data: JSON.stringify({
        receiver,
        maker,
        action,
        sourceID: 0
      })
    });
  },

  getMessageList(page) {
    return Fetch(`/message/list/${page}/`, {
      token: JSON.parse(localStorage.user).token
    });
  },

  messageAllRead(username) {
    return Fetch("/message/readAll/", {
      methods: "POST",
      token: JSON.parse(localStorage.user).token,
      data: JSON.stringify({
        username
      })
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/message/${username}/${mid}`, {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default MessageService;
