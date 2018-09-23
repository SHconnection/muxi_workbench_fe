import Fetch from "./fetch";

const FileService = {
  getDocConnent(id) {
    return Fetch(`/file/doc/${id}`, {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default FileService;
