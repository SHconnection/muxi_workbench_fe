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

  componentDidMount() {
    document.addEventListener("click", this.clearSelectOptionBar);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clearSelectOptionBar);
  }

  clearSelectOptionBar = e => {
    if (!e.target.classList.contains("clickFlag")) {
      this.setState(preState => {
        if (preState.showInput) {
          return { showInput: false };
        }
      });
    }
  };

  showOption() {
    this.setState(preState => ({
      showInput: !preState.showInput
    }));
  }

  chooseFile(event) {
    const file = event.target.files[0];
    const file1 = document.getElementById("select-file").files[0];
    // console.log(file);
    // console.log(file1);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    const { onChange } = this.props;
    onChange(file1);

    this.showOption();
  }

  render() {
    const { showInput } = this.state;
    const { items, checkedIndex, onChange, autoWidth } = this.props;
    if (items.length) {
      return (
        <div className="select-container clickFlag">
          <div className="select-bt">
            {items[checkedIndex].value}
            <div className="select-selectIcon clickFlag">
              <ReactSVG path={RectangleDown} />
            </div>
          </div>
          <div
            className="clickFlag select-mask"
            onClick={this.showOption.bind(this)}
            onKeyDown={() => {}}
            role="presentation"
          />
          {showInput && (
            <div
              className={
                autoWidth
                  ? "select-option-bar clickFlag"
                  : "select-option-bar width96 clickFlag"
              }
            >
              {items.map((el, index) => (
                <div
                  key={el.id}
                  className={
                    index === checkedIndex
                      ? "select-option-item select-option-item-checked clickFlag"
                      : "select-option-item clickFlag"
                  }
                  onClick={() => {
                    if (el.type !== "file") {
                      onChange(index, el.id);
                      this.setState({
                        showInput: false
                      });
                    }
                  }}
                  onKeyDown={() => {}}
                  role="presentation"
                >
                  {el.value}
                  {el.type === "file" && (
                    <input
                      type="file"
                      id="select-file"
                      className="clickFlag"
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
  autoWidth: PropTypes.bool
};

Select.defaultProps = {
  items: [],
  checkedIndex: 0,
  onChange: () => {},
  autoWidth: false
};

export default Select;
