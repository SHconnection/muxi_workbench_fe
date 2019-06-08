import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Store } from "store";
import ManageService from "service/manage";
import LandingService from "service/landing";
import Cookie from "service/cookie";
import "static/css/common.scss";
import { emit } from "cluster";

const User = decodeURIComponent(LandingService.getUsername());

// LandingService.getEmail('ruyunC');
const data = {
  name: User,
  email: "",
  avatar: "",
  tel: "",
  teamID: 1
};

console.log("data: ",data)
Store.dispatch({
  type: "substituteUsername",
  payload: User || ""
});

class Landing extends Component {
  componentDidMount() {
    LandingService.getEmail(User)
      .then(({ email }) => {
        const userInfo = {
          email
        };
        data.email = email;
        Store.dispatch({
          type: "substituteEmail",
          payload: email || ""
        });
        console.log("email:", email) 
        LandingService.getToken(userInfo)
          .then(response => {
            Store.dispatch({
              type: "substituteId",
              payload: response.uid || 0
            });
            console.log("uid:", uid) 
            Store.dispatch({
              type: "substituteToken",
              payload: response.token || ""
            });
            console.log("token:", token) 
            Cookie.setCookie("workbench_token", response.token, 36500);
            Store.dispatch({
              type: "substituteRole",
              payload: response.urole || 1
            });
            ManageService.getPersonalSet(response.uid)
              .then(res => {
                Store.dispatch({
                  type: "substituteAvatar",
                  payload: res.avatar || ""
                });
                Store.dispatch({
                  type: "substituteLoginSuccess",
                  payload: 1
                });
              })
              .catch(error => {
                Store.dispatch({
                  type: "substituteWrongInfo",
                  payload: error
                });
              });
          })
          .catch(() => {
            LandingService.SignUp(data)
              .then(() => {
                Store.dispatch({
                  type: "substituteLoginSuccess",
                  payload: 2
                });
              })
              .catch(error => {
                Store.dispatch({
                  type: "substituteWrongInfo",
                  payload: error
                });
              });
          });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  render() {
    const { storeLoginSuccess } = this.props;

    if (storeLoginSuccess === 1) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      );
    }
    if (storeLoginSuccess === 2) {
      return (
        <div>
          <div className="subject alert">
            <p>成功向团队发起申请,请留意填写的邮箱</p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="subject alert">
          <p>页面加载中···</p>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  storeLoginSuccess: PropTypes.number
};

Landing.defaultProps = {
  storeLoginSuccess: 0
};

const mapStateToProps = state => ({
  storeLoginSuccess: state.loginSuccess
});

export default connect(mapStateToProps)(Landing);
