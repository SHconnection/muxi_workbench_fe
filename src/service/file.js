import Fetch from "./fetch";
import Cookie from "./cookie";

const FileService = {
  // 创建文件夹
  createFileFolder(foldername, pid) {
    return Fetch(`/folder/file/`, {
      method: "POST",
      data: {
        foldername,
        project_id: pid
      },
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 创建文档夹
  createDocFolder(foldername, pid) {
    return Fetch(`/folder/doc/`, {
      method: "POST",
      data: {
        foldername,
        project_id: pid
      },
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 请求一堆文件（夹）
  getFileList(postData) {
    return Fetch(`/folder/file/children/`, {
      method: "POST",
      data: postData,
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 请求一堆文档（夹）
  getDocList(postData) {
    return Fetch(`/folder/doc/children/`, {
      method: "POST",
      data: postData,
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 请求单个文档详细内容
  getDocContent(id) {
    return Fetch(`/file/doc/${id}`, {
      method: "GET",
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 上传文件
  uploadFile(formData) {
    return fetch(`/file/file/`, {
      method: "POST",
      body: formData,
      headers: {
        token: Cookie.getCookie("workbench_token")
      }
    });
  },

  // 创建文档
  createDoc(postData) {
    return Fetch(`/file/doc/`, {
      method: "POST",
      data: postData,
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 删除文件
  deleteFile(id) {
    return Fetch(`/file/file/${id}/`, {
      method: "DELETE",
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 删除文件夹
  deleteFileFolder(id, postData) {
    return Fetch(`/folder/file/${id}/`, {
      method: "DELETE",
      data: postData,
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 删除文档
  deleteDoc(id) {
    return Fetch(`/file/doc/${id}/`, {
      method: "DELETE",
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 删除文档夹
  deleteDocFolder(id, postData) {
    return Fetch(`/folder/doc/${id}/`, {
      method: "DELETE",
      data: postData,
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 获取文档内容
  getDocConnent(id) {
    return Fetch(`/file/doc/${id}/`, {
      token: Cookie.getCookie("workbench_token")
    });
  },

  // 更新文档内容
  updateDoc(id, postData) {
    return Fetch(`/file/doc/${id}/`, {
      method: "PUT",
      data: postData,
      token: Cookie.getCookie("workbench_token")
    });
  }
};

export default FileService;
