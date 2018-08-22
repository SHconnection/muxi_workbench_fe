import React from 'react';
import ReactSVG from 'react-svg'
import back from '../../../assets/svg/commonIcon/back.svg'
import Button from '../../../components/common/button'
import './edit.css'
// import mySchema from '../../../components/status/markdown'


const edit = () => (
  <div>
    <div className="head">
      <ReactSVG className="last" path={back} />
      <input className="status-write-input" type="text" placeholder="请输入标题" />
      <div className="status-save-bt">
        <Button text="保存并返回" />
      </div>
    </div>
    {/* <mySchema className="editor" /> */}
  </div>
);
  
  export default edit;