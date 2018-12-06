import React from "react";
import ReactDOM from "react-dom";
import "./loading.css";
import "../../../static/css/common.css";

const Loading = () => (
  <div className="alertLayer">
    <div className="loader">
      <div className="leftbase leftAnimate loadImg" />
      <div className="middlebase middleAnimate loadImg" />
      <div className="rightbase rightAnimate loadImg" />
    </div>
  </div>
);

Loading.newInstance = function newInstance() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  ReactDOM.render(React.createElement(Loading), div);
  return {
    destroy() {
      // ReactDOM.unmountComponentAtNode(div)
      // document.body.removeChild(div)
      // console.log(div)
      div.style.visibility = "hidden";
    },
    show() {
      div.style.visibility = "visible";
    }
  };
};

export default Loading;
