import Fetch from "./fetch";

const MessageService = {
  makeNewMessage(receiver, maker, action) {
    return Fetch("/message/new/", {
      methods: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      },
      body: JSON.stringify({
        receiver,
        maker,
        action,
        sourceID: 0
      })
    });
  },

  getMessageList(page) {
    return Fetch(`/message/list${  page  }/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      }
    });
  },

  messageAllRead(username) {
    return Fetch("/message/readAll/", {
      methods: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      },
      body: JSON.stringify({
        username
      })
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/message/${username}/${mid}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      }
    });
  },

  getPersonalAttention() {
    return Fetch("/user/attention/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      }
    });
  },

  attentionDel(filename) {
    return Fetch("/user/attention/", {
      methods: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      },
      body: JSON.stringify({
        fileName: filename
      })
    });
  }
};

export default MessageService;
