/*
    搜索
*/
import React, { Component } from "react";
import Select from "../../components/common/select/index";
import Button from "../../components/common/button/index";
import ProjectService from "../../service/project";
import SearchService from "../../service/search";
import "../../static/css/common.css";
import "./index.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.changeProject = this.changeProject.bind(this);
    this.searching = this.searching.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
    this.changSearchText = this.changSearchText.bind(this);
    this.encode = window.location.href.split("/").pop(); // 编码后的url
    this.uncode = decodeURIComponent(decodeURIComponent(this.encode)); // 解码后的url
    this.state = {
      projectOption: [],
      projectCheckedIndex: 0,
      searchResult: {
        count: 0,
        pageMax: 0,
        pageNow: 0,
        hasNext: true,
        list: []
      },
      filterList: [],
      encodeText: this.encode,
      searchText: this.uncode
    };
  }

  componentDidMount() {
    const { projectOption } = this.state;
    ProjectService.getProjectList(1)
      .then(res => {
        // console.log(res.list);
        const projectList = res.list;
        const arr = projectList.map(el => {
          const el1 = { id: 0, value: "" };
          el1.id = el.projectID;
          el1.value = el.projectName;
          return el1;
        });
        arr.unshift({ id: 0, value: "所有项目" });
        this.setState({
          projectOption: projectOption.concat(arr)
        });
      })
      .then(() => {
        this.searching();
      });
  }

  changeProject(index) {
    const { projectOption, searchResult } = this.state;
    this.setState({
      projectCheckedIndex: index
    });
    // console.log(searchResult);
    const result = searchResult.list.filter(item => {
      if (index) {
        return item.projectID === projectOption[index].id;
      }
      return true;
    });
    this.setState({
      filterList: result
    });
  }

  searching() {
    const {
      encodeText,
      searchText,
      projectOption,
      projectCheckedIndex
    } = this.state;
    const pid = projectOption[projectCheckedIndex].id;
    SearchService.getSearchResults(1, searchText, pid).then(res => {
      this.setState({
        searchResult: res,
        filterList: res.list
      });
      // console.log(res.list);
    });
    // const test = {
    //   count: 3,
    //   pageMax: 1,
    //   pageNow: 1,
    //   hasNext: false,
    //   list: [
    //       {
    //         kind: 0,
    //         sourceID: 1,
    //         recordName: "Web页面UI常识",
    //         intro:
    //           "首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？",
    //         projectID: 48,
    //         projectName: "这世界就是你的",
    //         creator: "赵鑫晖",
    //         time: "1月1日"
    //       },
    //       {
    //         kind: 1,
    //         sourceID: 1,
    //         recordName: "web@2xxxxxxxxx.jpg",
    //         intro: "",
    //         projectID: 50,
    //         projectName: "这世界就是你的",
    //         creator: "木小犀",
    //         time: "1月1日"
    //       },
    //       {
    //         kind: 0,
    //         sourceID: 1,
    //         recordName: "Web页面UI常识",
    //         intro:
    //           "首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？首先，在做页面之前，把竞品的页面都列出来，自己好好看一下，找找共同点。 整体的色调、风格、布局等做之前脑子里有个概念。 可以用什么字体？ 字体大小怎么确定？ 导航、字体、背景等等的颜色可以随便用吗？ 水平和垂直的间距、水平布局时每一块内容的宽度等等是如何确定的？ 页面画布多大？页面主体内容多宽？ 移动端页面在布局上有什么特点？",
    //         projectID: 51,
    //         projectName: "这世界就是你的",
    //         creator: "赵鑫晖",
    //         time: "1月1日"
    //       }]

    // }
    // this.setState({
    //   searchResult: test,
    //   filterList: test.list,
    // })
    window.history.pushState(this.state, "", `${encodeText}`);
  }

  enterSearch(e) {
    if (e.keyCode === 13) {
      this.searching();
    }
  }

  changSearchText(event) {
    const encode = encodeURIComponent(encodeURIComponent(event.target.value));
    this.setState({
      encodeText: encode,
      searchText: event.target.value
    });
  }

  render() {
    const {
      projectOption,
      projectCheckedIndex,
      filterList,
      searchText
    } = this.state;
    return (
      <div className="subject">
        <div className="search-container">
          <div className="search-header">
            <div className="search-select">
              <Select
                items={projectOption}
                checkedIndex={projectCheckedIndex}
                onChange={this.changeProject}
              />
            </div>
            <input
              type="text"
              className="search-input"
              placeholder=""
              onKeyUp={this.enterSearch}
              onChange={this.changSearchText}
              value={searchText}
            />
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
            {filterList.length ? (
              filterList.map(el => (
                <div className="search-item" key={el.sourceID}>
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
                      <div className="search-item-filename">
                        {el.recordName}
                      </div>
                      <div className="search-item-filecreator">
                        {el.creator}
                      </div>
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
              ))
            ) : (
              <div className="search-item-none">没有找到相关内容！</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
