/*
添加成员页面组件
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './add_member.css';
import { Link } from 'react-router-dom';

class AddMem extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className = "subject minH">
        <span className = "reArrow"></span>
        <b className = "title">添加新成员</b>
        <div className = "present">
          <b className = "title littleSize">发送链接邀请新成员</b><br/>
          <input type = "text" placeholder = "https://modao.cc/app/c10SrQ7RsFKQ9" className = "inputSize inputSty"/> 
          <button className = "saveBtn">复制</button>
          <p className = "ftSCM">复制上面的链接发送给需要邀请的人。任何看到邀请的人，都可以申请加入团队，如果想要链接失效，请<span className = "ftSC">重新生成链接。</span></p>
        </div>
      </div>
    );
  }
}

export default AddMem;