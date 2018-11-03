import Fetch from "./fetch";
import Cookie from "./cookie";

const StatusService = {
  addNewStatu(title, content) {
    return Fetch("/status/new/", {
      token: JSON.parse(Cookie.getCookie("user")).token,
      method: "POST",
      data: {
        content,
        title
      }
    });
  },
  changeStatu(sid, title, content) {
    return Fetch(`/status/${sid}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token,
      method: "PUT",
      data: {
        content,
        title
      }
    });
  },

  getStatusList(page) {
    return Fetch(`/status/list/${page}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },
  getPersonalStatus(uid, page) {
    return Fetch(`/status/${uid}/list/${page}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },
  getStatuDetail(sid) {
    return Fetch(`/status/${sid}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },
  editStatu(sid) {
    return Fetch(`/status/${sid}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },
  changeLike(sid, iflike) {
    return Fetch(`/status/${sid}/like/`, {
      method: "PUT",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: { iflike }
    });
  },
  postComments(sid, content) {
    return Fetch(`/status/${sid}/comments/`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: { content }
    });
  },
  commentDelete(cid, sid) {
    return Fetch(`/status/${sid}/comment/${cid}/`, {
      method: "DELETE",
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },
  statusDelete(staId) {
    return Fetch(`/status/${staId}/`, {
      method: "DELETE",
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  }
};

export default StatusService;
