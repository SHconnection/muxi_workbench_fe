import React from "react";
import { Redirect } from "react-router";
import ManageService from "../service/manage";
import LandingService from "../service/landing";
import WrongPage from "../components/common/wrongPage/wrongPage";
import Cookie from "../service/cookie";
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
    LandingService.getEmail(User)
      .then(emailRes => {
        data.email = emailRes.email;
      })
      .then(() => {
        LandingService.getToken(data1)
          .then(response => {
            console.log(response);
            localStorage.id = response.uid;
            localStorage.token = response.token || "";
            Cookie.setCookie("workbench_token", response.token);
            localStorage.role = response.urole || 1;

            ManageService.getPersonalSet(response.uid)
              .then(res => {
                localStorage.avatar = res.avatar || "";
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
export default Landing;
