import ReactDom from "react-dom";
import React from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "./time.less";

const format = "h:mm a";
const now = moment()
  .hour(0)
  .minute(0);

function onChange(value) {
  console.log(value && value.format(format));
}

ReactDom.render(
  <TimePicker
    showSecond={false}
    defaultValue={now}
    className="xxx"
    onChange={onChange}
    format={format}
    use24Hours
    inputReadOnly
  />,
  document.getElementById("__react-content")
);

export default TimePicker;
