import Fetch from "./fetch";

const StatusService = {
  addNewStatu(title, value) {
    return Fetch("/status/new/", {
      method: "POST",
<<<<<<< HEAD
      data: {
        title,
        value
      }
=======
      data: JSON.stringify({
        title,
        value
      })
>>>>>>> 8d99aca4e42ec885e921a6afe19517ddc8fe9871
    });
  },
  
  getStatusList(page) {
    return Fetch(`/status/list${page}/`, {
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
<<<<<<< HEAD
      data: { iflike }
=======
      data: JSON.stringify({ iflike })
>>>>>>> 8d99aca4e42ec885e921a6afe19517ddc8fe9871
    });
  },
  postComments(sid, content) {
    return Fetch(`/status/${sid}/comment/`, {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
<<<<<<< HEAD
      data: data
=======
      data: JSON.stringify({
        content
      })
>>>>>>> 8d99aca4e42ec885e921a6afe19517ddc8fe9871
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
