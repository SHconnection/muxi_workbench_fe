import Fetch from "./fetch";

const LoginService = {
  getToken(data) {
    return Fetch("/auth/login/", {
      method: "POST",
      data
    });
  }

  // getUserId() {
  //   return Fetch("/auth/verify/", {
  //     method: "POST",
  //     data: {
  //       token: localStorage.token
  //     }
  //   });
  // }
};

export default LoginService;
