/*
个人信息页面组件
*/
import React, { useState, useEffect } from "react";
import { Route, NavLink, Link, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "components/common/avatar/index";
import ManageService from "service/manage";
import Loading from "components/common/loading/index";
import { Store } from "store";
import PersonalAttention from "../components/personalAttention/personalAttention";
import Dynamic from "../../feed/dynamic";
import Progress from "../../status/index";
import "static/css/common.css";
import "./personalInfo.css";

const PersonalInfo = ({
  storeId,
  storePerRole,
  storeRole,
  match: {
    params: { uid }
  }
}) => {
  const [per, setPer] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      ManageService.getPersonalSet(uid)
        .then(info => {
          setPer({
            name: info.name,
            email: info.email,
            avatar: info.avatar
          });
          setLoading(false);
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });
    },
    [uid]
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="personal">
            <div className="personalInfo-personalInformation">
              <Avatar src={per.avatar} width={114} height={114} />
              <div className="personalInfo-personalIntro">
                <b className="personalInfo-personalName" title={per.name}>
                  {per.name}
                </b>
                <Link to="/teamMember/personalSet" className="fakeBtn">
                  {parseInt(uid, 10) === parseInt(storeId, 10)
                    ? "更改设置"
                    : ""}
                </Link>
                <div className="llSize">{per.email}</div>
              </div>
            </div>
            <Link
              to={`/teamMember/setPersonalInfo/${per.name}`}
              className="personalInfo-btnMarg"
            >
              <button
                type="button"
                className={
                  parseInt(storeRole, 10) === 7 &&
                  parseInt(storeRole, 10) !== parseInt(storePerRole, 10)
                    ? "saveBtn personalInfo-saveBtn"
                    : "none"
                }
              >
                管理成员
              </button>
            </Link>
          </div>
          <div className="personalInfo-select">
            <div className="selectItem">
              <NavLink
                activeClassName="personalInfo-active"
                className="llSize singleItem"
                to={`/teamMember/personalInfo/${uid}/personalDynamic`}
              >
                动态
              </NavLink>
              <NavLink
                activeClassName="personalInfo-active"
                className="llSize singleItem"
                to={`/teamMember/personalInfo/${uid}/personalProgress`}
              >
                进度
              </NavLink>
              <NavLink
                activeClassName="personalInfo-active"
                className="llSize singleItem"
                to={`/teamMember/personalInfo/${uid}/personalAttention`}
              >
                关注
              </NavLink>
            </div>
          </div>
          <Switch>
            <Redirect
              exact
              path="/teamMember/personalInfo/:uid"
              to={`/teamMember/personalInfo/${uid}/personalAttention`}
            />
            <Route
              path="/teamMember/personalInfo/:uid/personalDynamic"
              component={Dynamic}
            />
            <Route
              path="/teamMember/personalInfo/:uid/personalAttention"
              component={PersonalAttention}
            />
            <Route
              path="/teamMember/personalInfo/:uid/personalProgress"
              component={Progress}
            />
          </Switch>
        </div>
      )}
    </div>
  );
};

PersonalInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string
    })
  }),
  storeId: PropTypes.number,
  storeRole: PropTypes.number,
  storePerRole: PropTypes.number
};

PersonalInfo.defaultProps = {
  match: {},
  storeId: 0,
  storeRole: 1,
  storePerRole: 1
};

const mapStateToProps = state => ({
  storeId: state.id,
  storePerRole: state.perRole,
  storeRole: state.role
});

export default connect(mapStateToProps)(PersonalInfo);
