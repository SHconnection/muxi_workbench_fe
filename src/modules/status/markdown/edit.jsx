import back from '../../../assets/svg/commonIcon/back.svg'
import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import Button from '../../../components/common/button'
// import mySchema from '../../../components/status/markdown'


class edit extends Component {
    constructor(props){
      super(props);
    }
  
    render() {
      return (
        <div className="edit">
        <div className="head">
          <ReactSVG className="last" path={back} />
          <input className = "status-write-input" type="text" placeholder="请输入标题"/>
          <div className="status-save-bt">
            <Button text="保存并返回" />
          </div>
        </div>
          {/* <mySchema className="editor" /> */}
        </div>
      );
    }
  }
  
  export default edit;