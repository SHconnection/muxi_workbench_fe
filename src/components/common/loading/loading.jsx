import React from "react";
import ReactDOM from "react-dom";
import "./loading.css";
import "../../../static/css/common.css";

const Loading = () => (
  <div className="alertLayer">
    <div className="loader">
      <img
        src="http://ossworkbench.muxixyz.com/loading1.png"
        alt="loading1"
        className="leftAnimate"
      />
      <img
        src="http://ossworkbench.muxixyz.com/loading2.png"
        alt="loading2"
        className="middleAnimate"
      />
      <img
        src="http://ossworkbench.muxixyz.com/loading3.png"
        alt="loading3"
        className="rightAnimate"
      />
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
