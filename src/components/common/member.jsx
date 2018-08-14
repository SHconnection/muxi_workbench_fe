/*
该组件用于选择成员，
自定义成员members:{name:'',selected:false}，
selMembers:[]存储已选择成员，
wrap用于标记是否换行，默认不换行
transferMsg = (mem, selMem) => {this.setState({members: mem,selMembers: selMem});}返回数据
*/

import React, { Component } from 'react';
import './member.css';
import '../../static/css/common.css';

class SelectMem extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    let arr1 = this.props.members,
        arr2 = this.props.selMembers;
    
    arr1.map(function(item){
      let index = arr2.indexOf(item);
      if(item.selected && index === -1){
        arr2.push(item);
      }
    });

    this.props.transferMsg(arr1, arr2);
  }

  select(item){
    let arr1 = this.props.members,
        arr2 = this.props.selMembers;

    item.selected = !item.selected;

    let index = arr2.indexOf(item);

    if(item.selected && index === -1){
      arr2.push(item);
    }
    else if(!item.selected && index !== -1){
      arr2.splice(index, 1);
    }
    
    this.props.transferMsg(arr1, arr2);
  }

  render() { 
    return (
      <div className = "selectMem">
      {
        this.props.members.map((item, index) => {
          return (
            <div className = {this.props.wrap ? "unit" : "unit nowrap"} key = {index}>
              <input type = "checkbox" checked = {item.selected} onChange = {this.select.bind(this, item)} id = {"check" + index}/>
              <label htmlFor = {"check" + index} className = "fontColor">{item.name}</label>
            </div>
          );
        })
      }
      </div>
    );
  }
}

export default SelectMem;
