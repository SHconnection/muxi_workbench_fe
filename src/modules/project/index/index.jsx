import React, { Component } from "react";
import ProjectItem from "../components/itemIcon/index";
import Button from "../../../components/common/button";
import ProjectService from "../../../service/project";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import Loading from "../../../components/common/loading/index";
import "./index.css";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: [],
      wrong: {}
    };
  }

  componentDidMount() {
    const userID = localStorage.id;
    Loading.show();
    ProjectService.getAllProjectList(userID)
      .then(res => {
        const project = res
          .map(el => el.list)
          .reduce((el1, el2) => el1.concat(el2), [])
          .map((el, index) => {
            const item = { id: el.projectID, name: el.projectName, index };
            return item;
          });
        this.setState({
          project
        });
      })
      .catch(error => {
        this.setState({ wrong: error });
      })
      .finally(() => {
        Loading.hide();
      });
  }

  cancel() {
    this.setState({
      wrong: {}
    });
  }
  // componentDidMount() {
  //     //do something
  // }

  render() {
    const { project, wrong } = this.state;
    return (
      <div className="project">
        {localStorage.role !== "1" && (
          <div className="project-create-bt">
            <Button to="project/new" text="新建项目" />
          </div>
        )}
        <div className="projects-container">
          {project.map(el => (
            <div key={el.id} className="project-item">
              <ProjectItem index={el.index} name={el.name} id={el.id} />
            </div>
          ))}
        </div>

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default Index;
