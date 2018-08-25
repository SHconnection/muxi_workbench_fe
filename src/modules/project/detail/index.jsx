import React, { Component } from "react";
import "./index.css";

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "项目名称"
      // intro: '这是简介这是简介这是简介',
      // userCount: 58
    };
  }

  render() {
    const { name } = this.state;
    return <div>{name}</div>;
  }
}

export default ProjectDetail;
