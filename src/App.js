import React, { Component } from "react";
import { BrowserRouter, Route, Router, Link } from "react-router-dom";
import SetProject from "./modules/setting/project_setting/project_setting";
import EditMember from "./modules/setting/edit_member/edit_member";
import PersonalSet from "./modules/setting/personal_setting/personal_setting";
import SetManager from "./modules/setting/set_manager/set_manager";
import AddMember from "./modules/setting/add_member/add_member";
import JoinApply from "./modules/setting/join_apply/join_apply";
import MemberGroup from "./modules/setting/member_group/member_group";
import SetPermission from "./modules/setting/set_permission/set_permission";
import GroupManage from "./modules/setting/group_manage/group_manage";
import GroupMember from "./modules/setting/group_member/group_member";
import AddGroup from "./modules/setting/add_group/add_group";
import SetPersonalInfo from "./modules/setting/set_personInfo/set_personInfo";
import PersonalAttention from "./modules/setting/personal_attention/personal_attention";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selMembers: [],
      members: [
        {
          fileName: "秋季招新海报",
          projectName: "在线任务",
          userName: "kutugu",
          date: "2018/8/20",
          isFolder: false,
          dealed: false
        },
        {
          fileName: "秋季招新海报",
          projectName: "在线任务",
          userName: "木小犀",
          date: "2018/8/20",
          isFolder: true,
          dealed: false
        }
      ]
    };
  }

  transferMsg(mem, selMem) {
    this.setState({
      members: mem,
      selMembers: selMem || []
    });
  }

  render() {
    return (
      // <BrowserRouter>
      //   <div>
      //     <Route exact path="/" component={SetProject} />
      //     <Route path="/EditMem" component={EditMember} />
      //   </div>
      // </BrowserRouter>

      // <PersonalSet />

      // <SetManager />

      // <AddMember />

      // <JoinApply members={this.state.members} selMembers={this.state.selMembers} transferMsg={this.transferMsg.bind(this)} />

      // <MemberGroup />

       <SetPermission />

      // <BrowserRouter>
      //   <div>
      //     <Route path="/GroupManage" component={GroupManage} />
      //     <Route path="/GroupMember" component={GroupMember} />
      //   </div>
      // </BrowserRouter>

      // <AddGroup />

      // <SetPersonalInfo />

      // <PersonalAttention
      //   members={this.state.members}
      //   transferMsg={this.transferMsg.bind(this)}
      // />
    );
  }
}

export default App;
