import Fetch from "./fetch";

const SearchService = {
  getSearchResults(page, searchtext, pid) {
    return Fetch(`/search/?page=${page}`, {
      method: "POST",
      token: localStorage.token,
      data: {
        pattern: searchtext,
        projectID: pid
      }
    });
  }
};

export default SearchService;
