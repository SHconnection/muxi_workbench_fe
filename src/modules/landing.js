import React from "react";
import { Redirect } from "react-router";
import ManageService from "../service/manage";
import LandingService from "../service/landing";
import WrongPage from "../components/common/wrongPage/wrongPage";
import Cookie from "../service/cookie";

// const User = decodeURIComponent(LandingService.getUsername());

const data = {
  name: "xuanye",
  email: null,
  avatar: null,
  tel: null,
  teamID: 1
};
const data1 = {
  name: "xuanye"
};

localStorage.username = data1.username;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: 0,
      wrong: {}
    };
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    LandingService.getEmail("xuanye")
      .then(emailRes => {
        data.email = emailRes.email;
      })
      .then(() => {
        LandingService.getToken(data1)
          .then(response => {
            localStorage.id = response.uid;
            localStorage.token = response.token;
            Cookie.setCookie("workbench_token", response.token);
            localStorage.role = response.urole;

            ManageService.getPersonalSet(response.uid)
              .then(res => {
                localStorage.avatar = res.avatar;
              })
              .catch(error => {
                this.setState({ wrong: error });
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
                this.setState({ wrong: error });
              });
          });
      });
  }

  cancel() {
    this.setState({ wrong: {} });
  }

  render() {
    const { loginSuccess, wrong } = this.state;
    if (loginSuccess === 1) {
      return (
        <div>
          <Redirect to="/" />
          <WrongPage info={wrong} cancel={this.cancel} />
        </div>
      );
    }
    if (loginSuccess === 2) {
      return (
        <div>
          <div>成功向团队发起申请,请留意填写的邮箱</div>
          <WrongPage info={wrong} cancel={this.cancel} />
        </div>
      );
    }
    return (
      <div>
        <div>页面加载中···</div>
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default Landing;
