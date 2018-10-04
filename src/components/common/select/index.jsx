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
    this.chooseFile = this.chooseFile.bind(this);
    this.myRef = React.createRef();
  }

  showOption() {
    const { showInput } = this.state;
    this.setState({
      showInput: !showInput
    });
  }

  chooseFile(event) {
    const { showInput } = this.state;
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    const { onChange } = this.props;
    onChange(file);
    this.setState({
      showInput: !showInput
    });
  }

  render() {
    const { showInput } = this.state;
    const { items, checkedIndex, onChange } = this.props;
    if (items.length) {
      return (
        <div className="select-container">
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
                      ? "select-option-item select-option-item-checked"
                      : "select-option-item"
                  }
                  onClick={() => {
                    onChange(index, el.id);
                    this.showOption();
                  }}
                  onKeyDown={() => {}}
                  role="presentation"
                >
                  {el.value}
                  {el.type === "file" && (
                    <input
                      type="file"
                      id=""
                      ref={this.myRef}
                      onChange={this.chooseFile}
                    />
                  )}
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
      value: PropTypes.string,
      type: PropTypes.string
    })
  ),
  checkedIndex: PropTypes.number,
  onChange: PropTypes.func,
  proId: PropTypes.number
};

Select.defaultProps = {
  items: [],
  checkedIndex: 0,
  onChange: () => {},
  proId: 0
};

export default Select;
