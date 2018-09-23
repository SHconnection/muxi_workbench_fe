import Fetch from "./fetch";

const SearchService = {
  getSearchResults(searchtext, pid) {
    return Fetch("/search/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.user.token
      },
      body: {
        pattern: searchtext,
        projectID: pid
      }
    });
  }
};

export default SearchService;
