import Fetch from "./fetch";

const LoginService = {
  getToken(data) {
    return Fetch("/auth/login/", {
      method: "POST",
      data
    });
  }
};

export default LoginService;
