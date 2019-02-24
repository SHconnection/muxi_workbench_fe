// import pathToRegexp from "path-to-regexp";
import FeedService from "../service/feed";

export default {
  namespace: "feedList",

  state: {
    hasNext: true,
    pageNum: 1,
    dataList: [],
    isPersonal: 0,
    wrong: {}
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(({ pathname }) => {
  //         const match = pathToRegexp(
  //           "/teamMember/personalInfo/personalDynamic/:uid"
  //         ).exec(pathname);
  //         const {pageNum} = this.state.pageNum
  //         if (match) {
  //           dispatch({
  //             type: "getPersonalFeed",
  //             payload: {uid: match[1], pageNum}
  //           });
  //         }
  //     });
  //   }
  // },
  effects: {
    *getFeedList({ payload: pageNum }, { call, put, select }) {
      const data = yield call(FeedService.getFeedList, pageNum);
      const tempList = yield select(state => state.feedList.dataList);
      const list = tempList.concat(data.dataList);
      yield put({
        type: "getFeed",
        payload: {
          dataList: list,
          pageNum: data.pageNum + 1,
          hasNext: data.hasNext,
          isPersonal: 0
        }
      });
    },
    *getPersonalFeed(
      {
        payload: { uid, pageNum }
      },
      { call, select, put }
    ) {
      const data = yield call(FeedService.getPersonalFeed, { uid, pageNum });
      const tempList = yield select(state => state.feedList.dataList);
      const list = tempList.concat(data.dataList);
      yield put({
        type: "getPersonalList",
        payload: {
          dataList: list,
          pageNum: data.pageNum + 1,
          hasNext: data.hasNext,
          isPersonal: 1
        }
      });
    }
  },

  reducers: {
    getFeed(
      state,
      {
        payload: { dataList, pageNum, hasNext, isPersonal, wrong }
      }
    ) {
      return { ...state, dataList, pageNum, hasNext, isPersonal, wrong };
    },
    getPersonalList(
      state,
      {
        payload: { dataList, pageNum, hasNext, isPersonal, wrong }
      }
    ) {
      return { ...state, dataList, pageNum, hasNext, isPersonal, wrong };
    }
  }
};
