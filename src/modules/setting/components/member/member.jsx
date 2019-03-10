/*
该组件用于选择成员，
自定义成员members:{name:'',id:0,selected:false}，
selMembers:[]存储已选择成员id，
wrap用于标记是否换行，默认不换行，
dis用于标记是否单选，默认多选，
transferMsg更新父组件数据
*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import "static/css/common.css";
import "./member.scss";

class Member extends Component {
  onlyOne(item1) {
    const item2 = item1;
    const { members: arr1, transferMsg } = this.props;
    let { selMembers: arr2 } = this.props;

    if (arr1) {
      arr1.map(item3 => {
        const item = item3;
        item.selected = false;
        return item;
      });
    }

    arr2 = [];
    item2.selected = true;

    arr2.push(item2.id);

    transferMsg(arr1, arr2);
  }

  select(item1) {
    const item = item1;
    const { members: arr1, selMembers: arr2, transferMsg } = this.props;

    item.selected = !item.selected;

    const index = arr2.indexOf(item.id);

    if (item.selected && index === -1) {
      arr2.push(item.id);
    } else if (!item.selected && index !== -1) {
      arr2.splice(index, 1);
    }

    transferMsg(arr1, arr2);
  }

  render() {
    const { wrap, members, dis } = this.props;

    return (
      <div className="member-selectMem">
        {!members.length ? <p className="noneInfoTip">暂无成员～</p> : null}
        {members.map((item1, index) => {
          const item = item1;

          return (
            <div
              className={wrap ? "member-unit" : "member-unit member-nowrap"}
              key={item.id}
            >
              <input
                type="checkbox"
                checked={item.selected || false}
                onChange={
                  dis
                    ? this.onlyOne.bind(this, item)
                    : this.select.bind(this, item)
                }
                onClick={this.dealData}
                id={`check${item.name}${index}`}
              />
              <label htmlFor={`check${item.name}${index}`} id="lab">
                <span className="member-name" title={item.name}>
                  {item.name}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Member;

Member.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      selected: PropTypes.bool,
      id: PropTypes.number
    })
  ),
  selMembers: PropTypes.arrayOf(PropTypes.number),
  wrap: PropTypes.bool,
  dis: PropTypes.bool,
  transferMsg: PropTypes.func
};
Member.defaultProps = {
  members: [],
  selMembers: [],
  wrap: false,
  dis: false,
  transferMsg: () => {}
};
