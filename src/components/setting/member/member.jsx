/*
该组件用于选择成员，
自定义成员members:{name:'',selected:false}，
selMembers:[]存储已选择成员，
wrap用于标记是否换行，默认不换行，
dis用于标记是否单选，默认多选，
transferMsg = (mem, selMem) => {this.setState({members: mem,selMembers: selMem});}返回数据
*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../../static/css/common.css";
import "./member.css";

class Mem extends Component {
  componentWillMount() {
    const { members: arr1, selMembers: arr2, transferMsg } = this.props;

    arr1.map(item1 => {
      const item = item1;
      const index = arr2.indexOf(item);
      if (item.selected && index === -1) {
        arr2.push(item);
      }
      return item1;
    });
    transferMsg(arr1, arr2);
  }

  onlyOne(item1) {
    const item2 = item1;
    const { members: arr1, transferMsg } = this.props;
    let { selMembers: arr2 } = this.props;

    if (arr2) {
      arr2.map(item3 => {
        const item = item3;
        item.selected = false;
        return item;
      });
    }

    arr2 = [];
    item2.selected = true;

    arr2.push(item2);

    transferMsg(arr1, arr2);
  }

  select(item1) {
    const item = item1;
    const { members: arr1, selMembers: arr2, transferMsg } = this.props;

    item.selected = !item.selected;

    const index = arr2.indexOf(item);

    if (item.selected && index === -1) {
      arr2.push(item);
    } else if (!item.selected && index !== -1) {
      arr2.splice(index, 1);
    }

    transferMsg(arr1, arr2);
  }

  render() {
    const { wrap, members, dis } = this.props;

    return (
      <div className="selectMem">
        {members.map((item1, index) => {
          const item = item1;

          return (
            <div className={wrap ? "unit" : "unit nowrap"}>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={
                  dis
                    ? this.onlyOne.bind(this, item)
                    : this.select.bind(this, item)
                }
                id={`check${item.name}${index}`}
              />
              <label
                htmlFor={`check${item.name}${index}`}
                className="fontColor"
                id="lab"
              >
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Mem;

Mem.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      selected: PropTypes.bool
    })
  ),
  selMembers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      selected: PropTypes.bool
    })
  ),
  transferMsg: PropTypes.func,
  wrap: PropTypes.bool,
  dis: PropTypes.bool
};
Mem.defaultProps = {
  members: [],
  selMembers: [],
  transferMsg: () => {},
  wrap: false,
  dis: false
};
