import { createStore, combineReducers } from "redux";

const createSubstituteReducer = (defaultState, actionCase = "") => (
  state = defaultState,
  action
) => {
  if (action.type === actionCase) {
    return action.payload || state;
  }

  return state;
};

const proxy = (state = "http://work.muxixyz.com", action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  proxy,
  username: createSubstituteReducer("", "substituteUserName"),
  token: createSubstituteReducer("", "substituteToken"),
  avatar: createSubstituteReducer("", "substituteAvatar"),
  email: createSubstituteReducer("", "substituteEmail"),
  role: createSubstituteReducer(1, "substituteRole"),
  id: createSubstituteReducer(0, "substituteId"),
  per: createSubstituteReducer(0, "substitutePer"),
  perRole: createSubstituteReducer(1, "substitutePerRole"),
  loginSuccess: createSubstituteReducer(0, "substituteLoginSuccess")
});

export default createStore(reducer);
