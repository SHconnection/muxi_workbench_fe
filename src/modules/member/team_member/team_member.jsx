/*
团队成员页面组件
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ManageService from "../../../service/manage";
import Avatar from "../../../assets/img/avatar.png";
import "../../../static/css/common.css";
import "./team_member.css";

class TeamMember extends Component {
  constructor(props) {
		super(props);
		
		this.state = {
			members: [
				{name: 'starrynight', avatar: Avatar, email:'123456789@qq.com', id: 1, group: '前端组'},
				{name: '木小犀', avatar: Avatar, email:'123456789@qq.com', id: 2, group: '后端组'},
				{name: 'sta', avatar: Avatar, email:'123456789@qq.com', id: 3, group: '安卓组'},
				{name: 'starry', avatar: Avatar, email:'123456789@qq.com', id: 4, group: '设计组'},
				{name: 'starryni', avatar: Avatar, email:'123456789@qq.com', id: 5, group: '产品组'},
			],
			selectedID: 0,
		}
		this.allMembers = this.allMembers.bind(this);
		this.present = this.present.bind(this);
  }

//   componentDidMount(){
		// const arr = ManageService.getAllMem();

// 		this.setState({members: arr})
//   }

  allMembers(){
		// const arr = ManageService.getAllMem();

		this.setState({
			//members: arr,
			selectedID: 0
		})
  }

  present(id){
 	//const arr = ManageService.groupMember(id);  

	this.setState({
		//members: arr,
		selectedID: id
	})
  }

  render() {
		// const groupList = ManageService.getAllGroup();
		const groupList = [
			{name: '前端组', id: 1, selected: false},
			{name: '后端组', id: 2, selected: false},
			{name: '安卓组', id: 3, selected: false},
			{name: '设计组', id: 4, selected: false},
			{name: '产品组', id: 5, selected: false},
		];
		const {members,selectedID} = this.state;
		let path = {};
		const {match} = this.props;
		
		return (
			<div className="subject minH"> 

				<b className="teamMember-title">木犀团队</b>

				<div className="teamMember-present">
					<div className="teamMember-select">
						<button type="button" className={`teamMember-singleItem teamMember-selectItem ${selectedID === 0 ? "teamMember-singleItemSelected" : ""}`} onClick={this.allMembers}>团队成员</button>
						{
							groupList.map((group1)=>{
								const group = group1;
								return (
									<button type="button" className={`teamMember-singleItem teamMember-selectItem ${group.id === selectedID ? "teamMember-singleItemSelected" : ""}`} key={group.id} onClick={()=>{this.present(group.id)}}>{group.name}</button>
								)
							})
						}
					</div>
					<Link className="fakeBtn teamMember-fakeMarg" to={`${match.url}/addMember`}>添加成员</Link>
					{/* <Link className="fakeBtn" to={`${match.url}/groupManage`}>{localStorage.user.role > 1 ? "管理分组" : ""}</Link> */}

				</div>

				{
					members.map((mem1) => {
						const mem = mem1;
						let role = mem.role === 3 ? "管理员" : "";
						if(role === 7)
							role = "超级管理员";

						return (
							<div className="teamMember-singleList" key={mem.id}>
								<Link to={`${match.url}/personalInfo`} onClick={()=>{localStorage.per = JSON.stringify(mem)}}><img src={mem.avatar} alt="" className="teamMember-imgSize"/></Link>
								<div className="teamMember-personalIntro">
									<b>{mem.name}</b><span className="">{role}</span>
									<div className="teamMember-littleGroup">{mem.group}</div>
								</div>
								<span>{mem.email}</span>
							</div>
						)
					})
				}
    	</div>
		)
  }
}

export default TeamMember;