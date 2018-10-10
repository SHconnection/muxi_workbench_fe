/*
    搜索
*/
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Select from "../../components/common/select/index";
import Button from "../../components/common/button/index";
import ProjectService from "../../service/project";
import SearchService from "../../service/search";
import "../../static/css/common.css";
import "./index.css";

class Search extends Component {
  constructor(props) {
    super(props);
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
      searchText: "",
      redirect: false,
      fromHeader: true
    };
    this.changeProject = this.changeProject.bind(this);
    this.searching = this.searching.bind(this);
    this.enterSearch = this.enterSearch.bind(this);
    this.searchtext = window.location.href.split("/").pop();
  }

  componentDidMount() {
    // const { searchtext, projectOption, projectCheckedIndex } = this.state;
    const { projectOption } = this.state;
    ProjectService.getProjectList(1).then(res => {
      // console.log(res.list);
      const projectList = res.list;
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
    });
    this.searching();
  }

  changeProject(index) {
    this.setState({
      projectCheckedIndex: index
    });
    this.searching();
  }

  searching() {
    const {
      searchText,
      projectOption,
      projectCheckedIndex,
      fromHeader
    } = this.state;
    SearchService.getSearchResults(
      1,
      searchText,
      projectOption[projectCheckedIndex]
    ).then(res => {
      this.setState({
        searchResult: res
      });
      console.log(res.list);
    });
    if (fromHeader) {
      this.setState({
        fromHeader: false
      });
    } else {
      this.setState({
        redirect: true
      });
    }
  }

  enterSearch(e) {
    if (e.target.value !== "") {
      this.setState({
        searchText: e.target.value
      });
    }
    if (e.keyCode === 13) {
      this.searching();
    }
  }

  render() {
    const {
      projectOption,
      projectCheckedIndex,
      searchResult,
      redirect,
      searchText
    } = this.state;
    if (redirect) {
      return <Redirect to={`/search/${searchText}`} />;
    }
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
              defaultValue={this.searchtext}
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
            {searchResult.count ? (
              searchResult.list.map(el => (
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
