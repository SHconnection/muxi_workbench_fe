/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false,id:0},
*/
import React, { Component } from "react";
import GoBack from "../../../components/common/goBack/index";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import "../../../static/css/common.css";
import "./joinApply.css";

class JoinApply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      wrong: ""
    };

    this.save = this.save.bind(this);
    this.del = this.del.bind(this);
    this.saveAll = this.saveAll.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    ManageService.getJoinApply()
      .then(persons => {
        const joinList = persons.list.map(person => {
          const obj = {};

          obj.id = person.userID;
          obj.name = person.userName;
          obj.email = person.userEmail;

          return obj;
        });

        this.setState({ members: joinList });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  save(mem1) {
    const mem = mem1;
    const { members } = this.state;

    ManageService.addMember(mem.id).catch(error => {
      this.setState({ wrong: error });
    });
    ManageService.dealJoinApply(mem.id)
      .then(() => {
        mem.dealed = true;
        this.setState({ members });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  del(mem1) {
    const mem = mem1;
    const { members } = this.state;

    ManageService.dealJoinApply(mem.id)
      .then(() => {
        mem.dealed = true;
        this.setState({ members });
      })
      .catch(error => {
        this.setState({ wrong: error });
      });
  }

  cancel() {
    this.setState({ wrong: "" });
  }

  saveAll() {
    const { members: arr1 } = this.state;

    arr1.map(mem1 => {
      const mem = mem1;

      ManageService.addMember(mem.id)
        .then(() => {
          mem.dealed = true;
        })
        .catch(error => {
          this.setState({ wrong: error });
        });

      return mem;
    });
  }

  render() {
    const { members, wrong } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">未审核的加入申请</b>
        <br />
        <button
          type="button"
          className="saveBtn btnFlo"
          onClick={this.saveAll.bind(this)}
        >
          全部同意
        </button>
        <div className="clear present">
          {members.map(mem1 => {
            const mem = mem1;

            return (
              <div className={mem.dealed ? "none" : "cell"} key={mem.id}>
                <b>{mem.name}</b>
                <span className="llSize pos">{mem.email}</span>
                <div className="litSel">
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      this.del(mem);
                    }}
                    onKeyDown={this.handleClick}
                  >
                    不同意
                  </span>
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn"
                    onClick={() => {
                      this.save(mem);
                    }}
                    onKeyDown={this.handleClick}
                  >
                    同意
                  </span>
                </div>
              </div>
            );
          }, this)}
        </div>
        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default JoinApply;
