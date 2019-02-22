/*
处理申请页面组件
成员数据members:{name:'', mailbox:'',dealed: false,id:0},
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import GoBack from "components/common/goBack/index";
import ManageService from "service/manage";
import Loading from "components/common/loading/index";
import { Store } from "store";
import "static/css/common.css";
import "./joinApply.css";

class JoinApply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
      noMember: true,
      loading: true
    };
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

        if (joinList.length) {
          this.setState({
            noMember: false,
            loading: false,
            members: joinList
          });
        } else {
          this.setState({
            loading: false,
            members: joinList
          });
        }
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  }

  save = mem1 => {
    const mem = mem1;
    const { members } = this.state;
    const { match } = this.props;

    ManageService.addMember(mem.id).catch(error => {
      Store.dispatch({
        type: "substituteWrongInfo",
        payload: error
      });
    });
    ManageService.dealJoinApply(mem.id)
      .then(() => {
        const { history } = this.props;

        mem.dealed = true;
        this.setState({ members });
        history.push({
          pathname: `${match.url}/setPermission`,
          state: { id: mem.id }
        });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  };

  del = mem1 => {
    const mem = mem1;
    const { members } = this.state;

    ManageService.dealJoinApply(mem.id)
      .then(() => {
        mem.dealed = true;
        this.setState({ members });
      })
      .catch(error => {
        Store.dispatch({
          type: "substituteWrongInfo",
          payload: error
        });
      });
  };

  saveAll = () => {
    const { members: arr1 } = this.state;

    arr1.map(mem1 => {
      const mem = mem1;

      ManageService.addMember(mem.id)
        .then(() => {
          mem.dealed = true;
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",
            payload: error
          });
        });

      return mem;
    });

    this.setState({ noMember: true });
  };

  render() {
    const { members, noMember, loading } = this.state;

    return (
      <div>
        {loading ? (
          <Loading loading />
        ) : (
          <div>
            <GoBack />
            <b className="title">未审核的加入申请</b>
            <br />
            {/* <button
              type="button"
              className="saveBtn joinApply-btnFlo"
              onClick={this.saveAll.bind(this)}
            >
              全部同意
            </button> */}
            <p className={noMember ? "noneInfoTip" : "none"}>
              暂无新成员加入～
            </p>
            <div className="clear present joinApply-list">
              {members.map(mem1 => {
                const mem = mem1;

                return (
                  <div
                    className={mem.dealed ? "none" : "joinApply-cell"}
                    key={mem.id}
                  >
                    <b>{mem.name}</b>
                    <span className="llSize joinApply-pos">{mem.email}</span>
                    <div className="joinApply-littleSelect">
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
          </div>
        )}
      </div>
    );
  }
}

export default JoinApply;

JoinApply.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

JoinApply.defaultProps = {
  match: {},
  history: {}
};
