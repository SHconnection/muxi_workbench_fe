import Fetch from "./fetch";
import Store from "../store";

const StatusService = {
  addNewStatu(title, content) {
    return Fetch("/api/v1.0/status/new/", {
      token: Store.getState().token,
      method: "POST",
      data: {
        content,
        title
      }
    });
  },
  changeStatu(sid, title, content) {
    return Fetch(`/api/v1.0/status/${sid}/`, {
      token: Store.getState().token,
      method: "PUT",
      data: {
        content,
        title
      }
    });
  },

  getStatusList(page) {
    return Fetch(`/api/v1.0/status/list/${page}/`, {
      token: Store.getState().token
    });
  },
  getPersonalStatus(uid, page) {
    return Fetch(`/api/v1.0/status/${uid}/list/${page}/`, {
      token: Store.getState().token
    });
  },
  getStatuDetail(sid) {
    return Fetch(`/api/v1.0/status/${sid}/`, {
      token: Store.getState().token
    });
  },
  editStatu(sid) {
    return Fetch(`/api/v1.0/status/${sid}/`, {
      token: Store.getState().token
    });
  },
  changeLike(sid, iflike) {
    return Fetch(`/api/v1.0/status/${sid}/like/`, {
      method: "PUT",
      token: Store.getState().token,
      data: { iflike }
    });
  },
  postComments(sid, content) {
    return Fetch(`/api/v1.0/status/${sid}/comments/`, {
      method: "POST",
      token: Store.getState().token,
      data: { content }
    });
  },
  commentDelete(cid, sid) {
    return Fetch(`/api/v1.0/status/${sid}/comment/${cid}/`, {
      method: "DELETE",
      token: Store.getState().token
    });
  },
  statusDelete(staId) {
    return Fetch(`/api/v1.0/status/${staId}/`, {
      method: "DELETE",
      token: Store.getState().token
    });
  }
};

export default StatusService;
