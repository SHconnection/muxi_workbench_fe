import React, { Component } from "react";
import PropTypes from "prop-types";

class DocPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: null,
      id: null
    };
  }

  componentWillMount() {
    const { match } = this.props;
    this.setState({
      pid: match.params.pid,
      id: match.params.id
    });
    console.log(match);
  }

  render() {
    const {pid, id} = this.state
    return (
      <div>
        <div>
          pid:
          {pid}
        </div>
        <div>
          id: 
          {id}
        </div>
      </div>
      
    )
  }
}

DocPreview.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  })
};

DocPreview.defaultProps = {
  match: {}
};

export default DocPreview