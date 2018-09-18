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
          kind: 0,
          sourceID: 1,
          recordName: "Web页面UI常识",
          intro:
            "首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？",
          projectID: 0,
          projectName: "这世界就是你的",
          creator: "赵鑫晖",
          time: "1月1日"
        },
        {
          kind: 1,
          sourceID: 1,
          recordName: "web@2xxxxxxxxx.jpg",
          intro: "",
          projectID: 0,
          projectName: "这世界就是你的",
          creator: "木小犀",
          time: "1月1日"
        },
        {
          kind: 0,
          sourceID: 1,
          recordName: "Web页面UI常识",
          intro:
            "首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？",
          projectID: 0,
          projectName: "这世界就是你的",
          creator: "赵鑫晖",
          time: "1月1日"
        }
      ]
      // searchResult: {
      //   "count": 0,
      //   "pageMax": 0,
      //   "pageNow": 0,
      //   "hasNext": true,
      //   "list": [
      //     {
      //       "kind": 0,
      //       "sourceID": 0,
      //       "recordName": "string",
      //       "projectID": 0,
      //       "projectName": "这世界就是你的"",
      //       "creator": "string",
      //       "time": "1月1日"
      //     },{

      //     }
      //   ]
      // }
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
                <div className="search-item-kind">
                  {el.kind === 0 ? "文档：" : "文件："}
                </div>
                {!el.kind ? (
                  <div className="search-item-content">
                    <div className="search-item-name">{el.recordName}</div>
                    <div className="search-item-text">
                      {el.creator}
                      &nbsp;&#160;-&nbsp;&#160;
                      {el.intro}
                    </div>
                  </div>
                ) : (
                  <div className="search-item-content">
                    <img
                      className="search-item-fileimg"
                      src="https://avatars0.githubusercontent.com/u/32706350?s=400&u=447c05e1907044200ab9e66993914ec6821a4795&v=4"
                      alt="搜索结果"
                    />
                    <div className="search-item-filename">{el.recordName}</div>
                    <div className="search-item-filecreator">{el.creator}</div>
                  </div>
                )}
                <div className="search-item-footer">
                  <div className="search-item-project">
                    项目：
                    {el.projectName}
                  </div>
                  <span className="search-item-date">{el.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
