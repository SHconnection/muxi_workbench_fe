import { Component } from "react";
import { Store } from "store";
import PropTypes from "prop-types";

class WrongOperate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error) {
    Store.dispatch({
      type: "substituteWrongInfo",
      payload: error
    });
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? null : children;
  }
}

WrongOperate.propTypes = {
  children: PropTypes.node.isRequired
};
export default WrongOperate;
