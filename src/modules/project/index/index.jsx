import React, { Component } from "react";
import "./index.css";
import ProjectItem from "../components/itemIcon/index";
import Button from "../../../components/common/button";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [
        {
          id: 1,
          name: "项目一",
          index: 0
        },
        {
          id: 2,
          name: "项目二",
          index: 1
        },
        {
          id: 3,
          name: "项目三",
          index: 2
        },
        {
          id: 4,
          name: "项目四",
          index: 3
        },
        {
          id: 5,
          name: "项目五",
          index: 4
        },
        {
          id: 6,
          name: "项目六",
          index: 5
        }
      ]
    };
  }

  // componentWillMount() {
  //     //do something
  // }

  // componentDidMount() {
  //     //do something
  // }

  render() {
    const { project } = this.state;
    return (
      <div className="project">
        <div className="project-create-bt">
          <Button to="project/new" text="新建项目" />
        </div>
        <div className="projects-container">
          {project.map(el => (
            <div key={el.id} className="project-item">
              <ProjectItem index={el.index} name={el.name} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Index;
