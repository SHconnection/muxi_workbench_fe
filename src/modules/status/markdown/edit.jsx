import React from "react";
import Goback from "../../../components/common/goBack/index";
import Button from "../../../components/common/button";
import Editor from "../components/markdown";
import Cookie from "../../../service/cookie";
import "../../../static/css/common.css";
import "./edit.css";

function goBack() {
  window.history.back();
}

function save() {
  fetch("/status/new/", {
    method: "POST",
    headers: {
      token: Cookie.getCookie("token")
    },
    body: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      goBack();
    }
  });
}

const edit = () => (
  <div className="subject">
    <div className="head">
      <div className="last">
        <Goback width="33px" height="33px" />
      </div>
      <input
        className="status-write-input"
        type="text"
        placeholder="请输入标题"
      />
      <div className="status-save-bt">
        <Button onClick={save()} text="保存并返回" />
      </div>
    </div>
    <div className="status-markdown">
      <Editor />
    </div>
  </div>
);
export default edit;
