import Fetch from "./fetch";

const FeedService = {
  getFeedList(page) {
    return Fetch(`/feed/list${page}/`, {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default FeedService;
