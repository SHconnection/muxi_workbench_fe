import Fetch from "./fetch";

const StatusService = {
  addNewStatu(data) {
    return Fetch("/status/new", {
      method: "POST",
      body: data
    });
  },
  getStatusList(page) {
    return Fetch(`/status/list/${page}/`, {
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
      method: "POST",
      data: iflike
    });
  },
  postComments(sid, data) {
    return Fetch(`/status/${sid}/comment/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      },
      body: data
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
