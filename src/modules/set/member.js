import React, { Component } from 'react';
import './member.css';

class SelectMem extends Component {
  constructor(props){
    super(props);
  }

  select(member){
    this.props.select(member);
  }

  render() {
    return (
      <div className = "selectMem">
      {
        this.props.members.map((item, index) => {
          return (
            <div className = "nowrap" key = {index}>
              <input type = "checkbox" checked = {item.selected} onChange = {this.select.bind(this, item)} id = {"check" + index}/>
              <label for = {"check" + index}>{item.name}</label>
            </div>
          );
        })
      }
      </div>
    );
  }
}

export default SelectMem;
