import Fetch from "./fetch";

const FileService = {
  // 创建文件夹
  createFileFolder(foldername, pid) {
    return Fetch(`/api/v1.0/folder/file/`, {
      method: "POST",
      data: {
        foldername,
        project_id: pid
      },
      token: localStorage.token
    });
  },

  // 创建文档夹
  createDocFolder(foldername, pid) {
    return Fetch(`/api/v1.0/folder/doc/`, {
      method: "POST",
      data: {
        foldername,
        project_id: pid
      },
      token: localStorage.token
    });
  },

  // 请求一堆文件（夹）
  getFileList(postData) {
    return Fetch(`/api/v1.0/folder/file/children/`, {
      method: "POST",
      data: postData,
      token: localStorage.token
    });
  },

  // 请求一堆文档（夹）
  getDocList(postData) {
    return Fetch(`/api/v1.0/folder/doc/children/`, {
      method: "POST",
      data: postData,
      token: localStorage.token
    });
  },

  // 请求单个文档详细内容
  getDocContent(id) {
    return Fetch(`/api/v1.0/file/doc/${id}`, {
      method: "GET",
      token: localStorage.token
    });
  },

  // 上传文件
  uploadFile(formData) {
    return fetch(`/api/v1.0/file/file/`, {
      method: "POST",
      body: formData,
      headers: {
        token: localStorage.token
      }
    });
  },

  // 创建文档
  createDoc(postData) {
    return Fetch(`/api/v1.0/file/doc/`, {
      method: "POST",
      data: postData,
      token: localStorage.token
    });
  },

  // 删除文件
  deleteFile(id) {
    return Fetch(`/api/v1.0/file/file/${id}/`, {
      method: "DELETE",
      token: localStorage.token
    });
  },

  // 删除文件夹
  deleteFileFolder(id, postData) {
    return Fetch(`/api/v1.0/folder/file/${id}/`, {
      method: "DELETE",
      data: postData,
      token: localStorage.token
    });
  },

  // 删除文档
  deleteDoc(id) {
    return Fetch(`/api/v1.0/file/doc/${id}/`, {
      method: "DELETE",
      token: localStorage.token
    });
  },

  // 删除文档夹
  deleteDocFolder(id, postData) {
    return Fetch(`/api/v1.0/folder/doc/${id}/`, {
      method: "DELETE",
      data: postData,
      token: localStorage.token
    });
  },

  // 获取文档内容
  getDocConnent(id) {
    return Fetch(`/api/v1.0/file/doc/${id}/`, {
      token: localStorage.token
    });
  },

  // 更新文档内容
  updateDoc(id, postData) {
    return Fetch(`/api/v1.0/file/doc/${id}/`, {
      method: "PUT",
      data: postData,
      token: localStorage.token
    });
  },

  // 获取回收站文件
  getProjectTrash(pid) {
    return Fetch(`/api/v1.0/project/${pid}/re/`, {
      method: "GET",
      token: localStorage.token
    });
  },

  // 恢复文件
  putBackProjectTrash(pid, fid) {
    return Fetch(`/api/v1.0/project/${pid}/re/`, {
      method: "PUT",
      data: {
        file: [fid],
        doc: []
      },
      token: localStorage.token
    });
  }
};

export default FileService;
