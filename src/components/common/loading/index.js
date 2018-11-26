import Loading from "./loading";

let loadingInstance = null;
const getLoadingInstance = () => {
  loadingInstance = loadingInstance || Loading.newInstance();
  return loadingInstance;
};

export default {
  show() {
    if (loadingInstance) {
      loadingInstance.show();
    } else {
      getLoadingInstance();
    }
  },
  hide() {
    if (loadingInstance) {
      loadingInstance.destroy();
    }
  }
};
