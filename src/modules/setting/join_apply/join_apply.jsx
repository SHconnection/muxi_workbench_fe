/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false},
同意的名单selMembers:[]
transferMsg = (mem, selMem) => {this.setState({members: mem,selMembers: selMem});}返回数据
*/
import React, { Component } from 'react';
import '../../../static/css/common.css';
import './join_apply.css';
import { Link } from 'react-router-dom';

class JoinApp extends Component {
  constructor(props){
    super(props);
  }

  cancel(mem, arr){
    let arr1 = this.props.members,
        arr2 = arr || this.props.selMembers,
        index = arr1.indexOf(mem);
    arr1[index].selected = ;
    this.props.transferMsg(arr1, arr2);
  }

  save(mem){
    let arr2 = this.props.selMembers,
        index = arr2.indexOf(mem);

    if(index === -1){
      arr2.push(mem);
    }
    
    this.cancel(mem, arr2);
  }

  func(mem){
    return(
      <div className = "cell">
        <b>{mem.name}</b>
        <span className = "llSize pos">{mem.mailbox}</span>
        <div className = "litSel">
          <span className = "fakeBtn" onClick = {this.cancel(mem)}>不同意</span>
          <span className = "fakeBtn" onClick = {this.save(mem)}>同意</span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className = "subject minH">
        <span className = "reArrow"></span>
        <b className = "title">未审核的加入申请</b><br/>
        <button className = "saveBtn btnFlo">全部同意</button>
        <div className = "clear present">
          {
            // (() => {
						// 	let len = this.props.members.length,
						// 			arr = this.props.members;
							
						// 	for(let i = 0;i < len;i++){
						// 		console.log(arr[i])
						// 		this.func(arr[i])
						// 	}
						// })()
						this.state.members.map(function(mem){
							return(
								<div className = {mem.dealed ? "none" : "cell"}>
									<b>{mem.name}</b>
									<span className = "llSize pos">{mem.mailbox}</span>
									<div className = "litSel">
										<span className = "fakeBtn" onClick = {this.cancel(mem)}>不同意</span>
										<span className = "fakeBtn" onClick = {this.save(mem)}>同意</span>
									</div>
								</div>
							)
						}, this)
          }
        </div>
      </div>
    );
  }
}

export default JoinApp;