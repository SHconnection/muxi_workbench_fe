import Fetch from "./fetch";
import Cookie from "./cookie";

const SearchService = {
  getSearchResults(page, searchtext, pid) {
    return Fetch(`/search/?page=${page}`, {
      method: "POST",
      token: JSON.parse(Cookie.getCookie("user")).token,
      data: {
        pattern: searchtext,
        projectID: pid
      }
    });
  }
};

export default SearchService;
