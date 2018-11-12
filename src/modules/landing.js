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

localStorage.username = data1.username;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: 0
    };
  }

  componentDidMount() {
    LandingService.getToken(data1)
      .then(response => {
        console.log(response);
        localStorage.id = response.uid;
        // localStorage.token = response.token;
        Cookie.setCookie("workbench_token", response.token);
        localStorage.role = response.role || 7;

        const per = {};
        per.id = localStorage.id;
        per.token = localStorage.token;
        per.role = localStorage.role;
        localStorage.per = JSON.stringify(per);

        ManageService.getPersonalSet(response.uid)
          .then(res => {
            localStorage.avatar = res.avatar;
          })
          .catch(error => {
            console.error(error);
          });
        this.setState({
          loginSuccess: 1
        });
      })
      .catch(() => {
        LandingService.SignUp(data)
          .then(() => {
            this.setState({
              loginSuccess: 2
            });
          })
          .catch(error => {
            console.log(error);
          });
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
