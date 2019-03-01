import React, { Component } from "react";
import { Store } from "store";

class WrongOperate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {}
    };
  }

  componentDidCatch(error) {
    Store.dispatch({
      type: "substituteWrongInfo",
      payload: error
    });
    this.setState({
      hasError: true,
      error
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? null : children;
  }
}
export default WrongOperate;
