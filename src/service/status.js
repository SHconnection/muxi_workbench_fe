import Fetch from "./fetch";

const StatusService = {
  addNewStatu(title, value) {
    return Fetch("/status/new/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        title,
        value
      }
    });
  },

  getStatusList(page) {
    return Fetch(`/status/list/${page}/`, {
      token: JSON.parse(localStorage.user).token
    });
  },
  getPersonalStatus(uid, page) {
    return Fetch(`/status/${uid}/list/${page}/`, {
      token: JSON.parse(localStorage.user).token
    });
  },
  getStatuDetail(sid) {
    return Fetch(`/status/${sid}/`, {
      token: JSON.parse(localStorage.user).token
    });
  },
  editStatu(sid) {
    return Fetch(`/status/${sid}/`, {
      token: JSON.parse(localStorage.user).token
    });
  },
  changeLike(sid, iflike) {
    return Fetch(`/status/${sid}/like/`, {
      method: "PUT",
      token: JSON.parse(localStorage.user).token,
      data: { iflike }
    });
  },
  postComments(sid, content) {
    return Fetch(`/status/${sid}/comment/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: content
    });
  },
  commentDelete(cid, sid) {
    return Fetch(`/status/${sid}/comment/${cid}/`, {
      method: "DELETE"
    });
  },
  statusDelete(staId) {
    return Fetch(`/status/${staId}/`, {
      method: "DELETE"
    });
  }
};

export default StatusService;
