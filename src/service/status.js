import Fetch from "./fetch";

const StatusService = {
  addNewStatu(title, content) {
    return Fetch("/api/v1.0/status/new/", {
      token: localStorage.token,
      method: "POST",
      data: {
        content,
        title
      }
    });
  },
  changeStatu(sid, title, content) {
    return Fetch(`/api/v1.0/status/${sid}/`, {
      token: localStorage.token,
      method: "PUT",
      data: {
        content,
        title
      }
    });
  },

  getStatusList(page) {
    return Fetch(`/api/v1.0/status/list/${page}/`, {
      token: localStorage.token
    });
  },
  getPersonalStatus(uid, page) {
    return Fetch(`/api/v1.0/status/${uid}/list/${page}/`, {
      token: localStorage.token
    });
  },
  getStatuDetail(sid) {
    return Fetch(`/api/v1.0/status/${sid}/`, {
      token: localStorage.token
    });
  },
  editStatu(sid) {
    return Fetch(`/api/v1.0/status/${sid}/`, {
      token: localStorage.token
    });
  },
  changeLike(sid, iflike) {
    return Fetch(`/api/v1.0/status/${sid}/like/`, {
      method: "PUT",
      token: localStorage.token,
      data: { iflike }
    });
  },
  postComments(sid, content) {
    return Fetch(`/api/v1.0/status/${sid}/comments/`, {
      method: "POST",
      token: localStorage.token,
      data: { content }
    });
  },
  commentDelete(cid, sid) {
    return Fetch(`/api/v1.0/status/${sid}/comment/${cid}/`, {
      method: "DELETE",
      token: localStorage.token
    });
  },
  statusDelete(staId) {
    return Fetch(`/api/v1.0/status/${staId}/`, {
      method: "DELETE",
      token: localStorage.token
    });
  }
};

export default StatusService;
