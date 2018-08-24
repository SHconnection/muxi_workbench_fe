import Fetch from "./fetch";

const StatusService = {
  statusDelete(staId) {
    return Fetch("/status/" + staId + "/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    });
  }
};

export default StatusService;
