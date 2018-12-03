import Fetch from "./fetch";

const SearchService = {
  getSearchResults(page, searchtext, pid) {
    return Fetch(`/api/v1.0/search/?page=${page}`, {
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
