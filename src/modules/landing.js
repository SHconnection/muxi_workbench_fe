import React from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../static/css/common.css";

const Landing = ({ storeLoginSuccess }) => {
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
};

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
