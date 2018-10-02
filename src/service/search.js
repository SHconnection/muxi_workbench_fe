import Fetch from "./fetch";

const SearchService = {
  getSearchResults(searchtext, pid) {
    return Fetch("/search/", {
      method: "POST",
      token: JSON.parse(localStorage.user).token,
      data: {
        pattern: searchtext,
        projectID: pid
      }
    });
  }
};

export default SearchService;
