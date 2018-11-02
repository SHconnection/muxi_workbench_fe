import Fetch from "./fetch";
import Cookie from "./cookie";

const StatusService = {
  addNewStatu(title, content) {
    return Fetch("/status/new/", {
      token: Cookie.getCookie("workbench_token"),
      method: "POST",
      data: {
        content,
        title
      }
    });
  },
  changeStatu(sid, title, content) {
    return Fetch(`/status/${sid}/`, {
      token: Cookie.getCookie("workbench_token"),
      method: "PUT",
      data: {
        content,
        title
      }
    });
  },

  getStatusList(page) {
    return Fetch(`/status/list/${page}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  },
  getPersonalStatus(uid, page) {
    return Fetch(`/status/${uid}/list/${page}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  },
  getStatuDetail(sid) {
    return Fetch(`/status/${sid}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  },
  editStatu(sid) {
    return Fetch(`/status/${sid}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  },
  changeLike(sid, iflike) {
    return Fetch(`/status/${sid}/like/`, {
      method: "PUT",
      token: Cookie.getCookie("workbench_token"),
      data: { iflike }
    });
  },
  postComments(sid, content) {
    return Fetch(`/status/${sid}/comments/`, {
      method: "POST",
      token: Cookie.getCookie("workbench_token"),
      data: { content }
    });
  },
  commentDelete(cid, sid) {
    return Fetch(`/status/${sid}/comment/${cid}/`, {
      method: "DELETE",
      token: Cookie.getCookie("workbench_token")
    });
  },
  statusDelete(staId) {
    return Fetch(`/status/${staId}/`, {
      method: "DELETE",
      token: Cookie.getCookie("workbench_token")
    });
  }
};

export default StatusService;
