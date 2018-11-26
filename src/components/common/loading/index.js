import Loading from "./loading";

let loadingInstance = null;
const getLoadingInstance = () => {
  loadingInstance = loadingInstance || Loading.newInstance();
  return loadingInstance;
};

export default {
  show() {
    getLoadingInstance();
  },
  hide() {
    if (loadingInstance) {
      loadingInstance.destroy();
      loadingInstance = null;
    }
  }
};
