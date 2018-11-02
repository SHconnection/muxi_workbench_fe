import Fetch from "./fetch";
import Cookie from "./cookie";

const FeedService = {
  getFeedList(page) {
    return Fetch(`/feed/list/${page}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  },
  getPersonalFeed(uid, page) {
    return Fetch(`/feed/list/${uid}/personal/${page}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  }
};

export default FeedService;
