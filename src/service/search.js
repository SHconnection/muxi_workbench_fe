import Fetch from "./fetch";
import Cookie from "./cookie";

const SearchService = {
  getSearchResults(page, searchtext, pid) {
    return Fetch(`/search/?page=${page}`, {
      method: "POST",
      token: Cookie.getCookie("workbench_token"),
      data: {
        pattern: searchtext,
        projectID: pid
      }
    });
  }
};

export default SearchService;
