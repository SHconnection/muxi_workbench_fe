import Fetch from "./fetch";

const StatusService = {
  statusDelete(staId) {
    return Fetch("/status/" + staId + "/", {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
  },

  getPersonalAttention(userID) {
    const attentionList = Fetch(`/group/${userID}/list/`, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (!Array.isArray(attentionList)) return false;

    return attentionList.map(mem1 => {
      const mem = mem1;
      const obj = {};

      obj.fileName = mem.fileName;
      obj.projectName = mem.projectName;
      obj.date = mem.date;
      obj.userName = mem.userName;
      obj.dealed = false;
      obj.isFolder = mem.isFolder;

      return obj;
    });
  }
};

export default StatusService;
