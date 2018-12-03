import Fetch from "./fetch";

const LandingService = {
  getUsername() {
    return window.location.href
      .split("?")[1]
      .split("&")[0]
      .split("=")[1];
  },
  getEmail(username) {
    return Fetch(
      `https://pass.muxixyz.com/api/email/?username=${decodeURIComponent(username)}/`,
      {
        method: "GET"
      }
    );
  },
  getToken(data) {
    return Fetch("/api/v1.0/auth/login/", {
      method: "POST",
      data
    });
  },
  SignUp(data) {
    return Fetch("/api/v1.0/auth/signup/", {
      method: "POST",
      data
    });
  }
};

export default LandingService;
