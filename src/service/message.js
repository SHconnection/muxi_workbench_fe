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
  }
};

export default MessageService;
