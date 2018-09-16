import Fetch from "./fetch";

const FeedService = {
  getFeedList(page) {
    return Fetch("/feed/list" + page + "/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      }
    });
  },
};

export default FeedService;
