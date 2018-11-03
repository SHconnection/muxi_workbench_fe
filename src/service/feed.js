import Fetch from "./fetch";

const FeedService = {
  getFeedList(page) {
    return Fetch(`/feed/list/${page}/`, {
      token: localStorage.token
    });
  },
  getPersonalFeed(uid, page) {
    return Fetch(`/feed/list/${uid}/personal/${page}/`, {
      token: localStorage.token
    });
  }
};

export default FeedService;
