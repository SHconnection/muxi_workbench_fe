import Fetch from "./fetch";

const FileService = {
    getDocConnent(id) {
        return Fetch(`/file/doc/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: localStorage.user.token
          }
        });
      }

};

export default FileService;
