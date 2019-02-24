// import pathToRegexp from "path-to-regexp";
import StatusService from "../service/status";

export default {
  namespace: "statusList",

  state: {
    count: 0,
    page: 1,
    isPersonal: 1,
    dataList: [],
    wrong: {}
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(({ pathname }) => {
  //         const match = pathToRegexp(
  //           "/teamMember/personalInfo/personalProgress/:uid"
  //         ).exec(pathname);
  //         const {page} = this.state.page
  //         if (match) {
  //           dispatch({
  //             type: "getPersonalFeed",
  //             payload: {uid: match[1], page}
  //           });
  //         }
  //     });
  //   }
  // },
  effects: {
    *getStatusList({ payload: page }, { call, put, select }) {
      const data = yield call(StatusService.getStatusList, page);
      const tempList = yield select(state => state.statusList.dataList);
      const list = tempList.concat(data.statuList);
      yield put({
        type: "getStatus",
        payload: {
          dataList: list,
          page: data.page + 1,
          count: data.count,
          isPersonal: 0
        }
      });
    },
    *getPersonalStatus(
      {
        payload: { uid, page }
      },
      { call, select, put }
    ) {
      const data = yield call(StatusService.getPersonalFeed, { uid, page });
      const tempList = yield select(state => state.statusList.dataList);
      const list = tempList.concat(data.statusList);
      yield put({
        type: "getPersonalStatuslist",
        payload: {
          dataList: list,
          page: data.page + 1,
          count: data.count,
          isPersonal: 1
        }
      });
    }
  },

  reducers: {
    getStatus(
      state,
      {
        payload: { dataList, page, count, isPersonal, wrong }
      }
    ) {
      return { ...state, dataList, page, count, isPersonal, wrong };
    },
    getPersonalStatuslist(
      state,
      {
        payload: { dataList, page, count, isPersonal, wrong }
      }
    ) {
      return { ...state, dataList, page, count, isPersonal, wrong };
    }
  }
};
