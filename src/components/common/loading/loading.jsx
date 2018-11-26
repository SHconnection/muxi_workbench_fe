import React from "react";
import ReactDOM from "react-dom";
import "./loading.css";
import "../../../static/css/common.css";
import LoadGif from "./GIF.gif";

const Loading = () => (
  <div className="alertLayer">
    <img className="loadingGif" src={LoadGif} alt="loading" />
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
