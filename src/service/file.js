import Fetch from "./fetch";

const FileService = {
  // 创建文件夹
  createFileFolder(foldername, pid) {
    return Fetch(`/folder/file/`, {
      method: "POST",
      data: {
        foldername,
        project_id: pid
      },
      token: localStorage.token
    })
  },

  // 创建文档夹
  createDocFolder(foldername, pid) {
    return Fetch(`/folder/doc/`, {
      method: "POST",
      data: {
        foldername,
        project_id: pid
      },
      token: localStorage.token
    })
  },

  // 请求一堆文件（夹）
  getFileList(postData) {
    return Fetch(`/folder/file/children/`, {
      method: "POST",
      data: postData,
      token: localStorage.token
    })
  },

  // 请求一堆文档（夹）
  getDocList(postData) {
    return Fetch(`/folder/doc/children/`, {
      method: "POST",
      data: postData,
      token: localStorage.token
    })
  },

  // 上传文件
  uploadFile(formData) {
    return fetch(`/file/file/`, {
      method: 'POST',
      body: formData,
      headers: {
        'token': localStorage.token
      }
    })
  },

  getDocConnent(id) {
    return Fetch(`/file/doc/${id}/`, {
      token: JSON.parse(localStorage.user).token
    });
  }
};

export default FileService;
