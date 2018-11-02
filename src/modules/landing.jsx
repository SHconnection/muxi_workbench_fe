import React from "react";
import { Redirect } from "react-router";
import ManageService from "../service/manage";
import LandingService from "../service/landing";
import Cookie from "../service/cookie";

// const Email = LandingService.getEmail();
// const user1 = LandingService.getUsername(Email);
const data = {
  username: "darren",
  email: null,
  avatar: null,
  tel: null,
  teamID: 0
};
const data1 = {
  username: "darren"
};

Cookie.setCookie("username", data1.username);

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: 0
    };
  }

  componentDidMount() {
    LandingService.getToken(data1).then(response => {
      if (response === "401 Verify Failed") {
        LandingService.SignUp(data).then(response1 => {
          if (response1 !== "401 Verify Failed")
            this.setState({
              loginSuccess: 2
            });
        });
      } else {
        const user = {};
        user.token = response.token;
        user.role = response.urole;
        user.id = response.uid;
        Cookie.setCookie("workbench_token", response.token);
        Cookie.setCookie("uid", response.uid);
        Cookie.setCookie("role", response.urole);
        Cookie.setCookie("per", JSON.stringify(user));
        ManageService.getPersonalSet(user.id)
          .then(res => {
            Cookie.setCookie("userAvatar", res.avatar);
          })
          .catch(error => {
            console.error(error);
          });
        this.setState({
          loginSuccess: 1
        });
      }
    });
  }

  render() {
    const { loginSuccess } = this.state;
    if (loginSuccess === 1) {
      return <Redirect to="/" />;
    }
    if (loginSuccess === 2) {
      return <div>成功向团队发起申请,请留意填写的邮箱</div>;
    }
    return <div>页面加载中···</div>;
  }
}

export default Landing;
