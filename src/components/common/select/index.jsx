import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactSVG from "react-svg";
import RectangleDown from "../../../assets/svg/commonIcon/rectangle_down.svg";
import "./index.css";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false
    };
    this.showOption = this.showOption.bind(this);
    this.chooseOption = this.chooseOption.bind(this);
  }

  showOption() {
    const { showInput } = this.state;
    this.setState({
      showInput: !showInput
    });
  }

  chooseOption(index) {
    const { showInput } = this.state;
    const { onChange } = this.props;
    onChange(index);
    this.setState({
      showInput: !showInput
    });
  }

  render() {
    const { showInput } = this.state;
    const { items, checkedIndex } = this.props;
    if (items.length) {
      return (
        <div>
          <div
            className="select-bt"
            onClick={this.showOption.bind(this)}
            onKeyDown={() => {}}
            role="presentation"
          >
            {items[checkedIndex].value}
            <ReactSVG path={RectangleDown} />
          </div>
          {showInput && (
            <div className="select-option-bar">
              {items.map((el, index) => (
                <div
                  key={el.id}
                  className={
                    index === checkedIndex
                      ? "select-option-item-checked select-option-item"
                      : "select-option-item"
                  }
                  onClick={() => {
                    this.chooseOption(index);
                  }}
                  onKeyDown={() => {}}
                  role="presentation"
                >
                  {el.value}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  }
}

Select.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string
    })
  ),
  checkedIndex: PropTypes.number,
  onChange: PropTypes.func
};

Select.defaultProps = {
  items: [],
  checkedIndex: 0,
  onChange: () => {}
};

export default Select;
