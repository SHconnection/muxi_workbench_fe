import Fetch from "./fetch";
import { Store } from "../store";

const MessageService = {
  getPersonalAttention(userID) {
    return Fetch(`/api/v1.0/user/attention/?id=${userID}`, {
      token: Store.getState().token
    });
  },

  makeNewMessage(receiver, maker, action) {
    return Fetch("/api/v1.0/message/new/", {
      method: "POST",
      token: Store.getState().token,
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
      token: Store.getState().token
    });
  },

  messageAllRead() {
    return Fetch("/api/v1.0/message/readAll/", {
      method: "POST",
      token: Store.getState().token
    });
  },

  getAMessage(username, mid) {
    return Fetch(`/api/v1.0/message/${username}/${mid}/`, {
      token: Store.getState().token
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
      token: Store.getState().token
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
      token: Store.getState().token
    });
  },

  // 查看我关注的文件们
  getMyAttentionFiles() {
    return Fetch(`/api/v1.0/user/attention/`, {
      method: "GET",
      token: Store.getState().token
    });
  }
};

export default MessageService;
