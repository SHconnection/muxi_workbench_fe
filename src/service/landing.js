import Fetch from "./fetch";

const LandingService = {
  getEmail() {
    return window.location.href
      .split("?")[1]
      .split("&")[0]
      .split("=")[1];
  },
  getUsername(email) {
    return Fetch(
      `https://user.muxixyz.com/api/user/?email=${decodeURIComponent(email)}`,
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
