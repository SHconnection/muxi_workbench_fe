/*
个人信息页面组件
传入per
*/
import React from "react";
import { BrowserRouter, Route, Link,Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PersonalAttention from "../components/personal_attention/personal_attention";
import "../../../static/css/common.css";
import "./personal_info.css";

const PersonalInfo = ({location}) => {
  const {per} = location.state;
  console.log(123)
  console.log(per)

  return (
    <div className="subject minH">

      <div className="personal"> 
          <img src={per.avatar} className="personalInfo-avatar" alt="" />
          <div className = "personalIntro">
              <b className="personalName">{per.username}</b>
              <Link to={`/teamMember/personalInfo/personalSet/${per.id}`} className="fakeBtn">{per.id === localStorage.userID ? "更改设置" : ""}</Link>
              <span className="llSize">{per.email}</span>
          </div> 
          {/* <Link to={`/teamMember/personalInfo/setPersonalInfo/${JSON.stringify(per)}`}><button className="saveBtn personalInfo-btnMarg">{localStorage.user.role > 1 ? "管理成员" : ""}</button></Link> */}
       </div>
      <div className="personalInfo-select">
        <div className="selectItem">
          <Link className="llSize singleItem" to="/teamMember/personalInfo/personalAttention/">动态</Link>
          <Link className="llSize singleItem" to="/teamMember/personalInfo/personalAttention/">进度</Link>
          <Link className="llSize singleItem" to="/teamMember/personalInfo/personalAttention/">关注</Link>
        </div>
      </div> 	
      {/* <Switch>
      <BrowserRouter>
        <Route path="/personalInfo/personalAttention" component={PersonalAttention} />
        <Route path="/personalInfo/personalAttention" component={PersonalAttention} />
        <Route path="/personalInfo/personalAttention" component={PersonalAttention} />
      </BrowserRouter> */}
      {/* </Switch> */}
    </div>
  );
}

export default PersonalInfo;