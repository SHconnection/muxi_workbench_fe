import Fetch from "./fetch";
import Cookie from "./cookie";

const FeedService = {
  getFeedList(page) {
    return Fetch(`/feed/list/${page}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  },
  getPersonalFeed(uid, page) {
    return Fetch(`/feed/list/${uid}/personal/${page}/`, {
      token: JSON.parse(Cookie.getCookie("user")).token
    });
  }
};

export default FeedService;
