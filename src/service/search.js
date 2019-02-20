import Fetch from "./fetch";
import { Store } from "../store";

const SearchService = {
  getSearchResults(page, searchtext, pid) {
    return Fetch(`/api/v1.0/search/?page=${page}`, {
      method: "POST",
      token: Store.getState().token,
      data: {
        pattern: searchtext,
        projectID: pid
      }
    });
  }
};

export default SearchService;
