/*
    搜索
*/
import React, { Component } from "react";
import Select from "../../components/common/select/index";
import Button from "../../components/common/button/index";
import "../../static/css/common.css";
import "./index.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // projectOption : [
      //     {
      //       id: 0,
      //       value: "所有项目",
      //     },
      //     {
      //       id: 1,
      //       value: "项目一",
      //     },
      //     {
      //       id: 2,
      //       value: "项目二",
      //     }
      // ],
      projectOption: [],
      projectCheckedIndex: 0,
      searchResult: [
        {
          id: 1,
          name: "Web页面UI常识",
          intro:
            " 赵鑫晖 - 首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？",
          project: "项目一",
          date: "1月1日"
        }
      ]
    };
    this.changeProject = this.changeProject.bind(this);
  }

  componentWillMount() {
    const { projectOption } = this.state;
    const projectList = [
      {
        projectID: 1,
        projectName: "项目一",
        userCount: 0
      },
      {
        projectID: 2,
        projectName: "项目二",
        userCount: 0
      }
    ];
    const arr = projectList.map(el => {
      const el1 = { id: 0, value: "" };
      el1.id = el.projectID;
      el1.value = el.projectName;
      return el1;
    });
    arr.unshift({ id: 0, value: "所有项目" });
    // console.log(arr)
    this.setState({
      projectOption: projectOption.concat(arr)
    });
    // console.log(this.state.groups)
  }

  changeProject(index) {
    this.setState({
      projectCheckedIndex: index
    });
  }

  render() {
    const { projectOption, projectCheckedIndex, searchResult } = this.state;
    return (
      <div className="subject">
        <div className="search-container">
          <div className="search-header">
            <Select
              items={projectOption}
              checkedIndex={projectCheckedIndex}
              onChange={this.changeProject}
            />
            <input type="text" className="search-input" placeholder="" />
            <div className="search-but">
              <Button
                text="搜索"
                onClick={this.searching}
                width="65"
                height="32"
                fontSize="14"
              />
            </div>
          </div>
          <div className="search-results">
            {searchResult.map(el => (
              <div className="search-item">
                <div className="search-item-kind">文档：</div>
                <div className="search-item-name">{el.name}</div>
                <div className="search-item-content">{el.intro}</div>
                <div className="search-item-project">{el.project}</div>
                <div className="search-item-date">{el.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
