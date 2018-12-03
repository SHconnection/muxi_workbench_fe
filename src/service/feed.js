import Fetch from "./fetch";

const FeedService = {
  getFeedList(page) {
    return Fetch(`/api/v1.0/feed/list/${page}/`, {
      token: localStorage.token
    });
  },
  getPersonalFeed(uid, page) {
    return Fetch(`/api/v1.0/feed/list/${uid}/personal/${page}/`, {
      token: localStorage.token
    });
  }
};

export default FeedService;
