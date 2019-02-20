import Fetch from "./fetch";
import { Store } from "../store";

const FeedService = {
  getFeedList(page) {
    return Fetch(`/api/v1.0/feed/list/${page}/`, {
      token: Store.getState().token
    });
  },
  getPersonalFeed(uid, page) {
    return Fetch(`/api/v1.0/feed/list/${uid}/personal/${page}/`, {
      token: Store.getState().token
    });
  }
};

export default FeedService;
