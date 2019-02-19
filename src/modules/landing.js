import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Store from "../store";
import ManageService from "../service/manage";
import LandingService from "../service/landing";
import Cookie from "../service/cookie";
import WrongPage from "../components/common/wrongPage/wrongPage";
import "../static/css/common.css";

const User = decodeURIComponent(LandingService.getUsername());
const data = {
  name: User,
  email: "",
  avatar: "",
  tel: "",
  teamID: 1
};
const data1 = {
  name: User
};

Store.dispatch({
  type: "substituteUserName",
  payload: User || ""
});

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrong: {}
    };
  }

  componentDidMount() {
    this.loginBeforeGetInform();
  }

  loginBeforeGetInform = () => {
    LandingService.getToken(data1)
      .then(response => {
        Store.dispatch({
          type: "substituteId",
          payload: response.uid || 0
        });
        Store.dispatch({
          type: "substituteToken",
          payload: response.token || ""
        });
        Cookie.setCookie("workbench_token", response.token);
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
              type: "substituteEmail",
              payload: res.email || ""
            });
            Store.dispatch({
              type: "substituteLoginSuccess",
              payload: 1
            });
          })
          .catch(error => {
            this.setState({
              wrong: error
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
            this.setState({
              wrong: error
            });
          });
      });
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const { storeLoginSuccess } = this.props;
    const { wrong } = this.state;

    if (storeLoginSuccess === 1) {
      return (
        <div>
          <Redirect to="/" />
          <WrongPage info={wrong} cancel={this.cancel} />
        </div>
      );
    }
    if (storeLoginSuccess === 2) {
      return (
        <div>
          <div className="subject alert">
            <p>成功向团队发起申请,请留意填写的邮箱</p>
          </div>
          <WrongPage info={wrong} cancel={this.cancel} />
        </div>
      );
    }
    return (
      <div>
        <div className="subject alert">
          <p>页面加载中···</p>
        </div>
        <WrongPage info={wrong} cancel={this.cancel} />
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
