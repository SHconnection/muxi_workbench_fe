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
};

export default StatusService;
