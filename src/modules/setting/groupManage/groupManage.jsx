/*
编辑分组页面组件
*/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import GoBack from "../../../components/common/goBack/index";
import Delete from "../components/delete/delete";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";
import Loading from "../../../components/common/loading/index";
import "../../../static/css/common.css";
import "../joinApply/joinApply.css";
import "./groupManage.css";

class GroupManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteX: false,
      data: undefined,
      members: [],
      wrong: {}
    };
  }

  componentDidMount() {
    Loading.show();
    ManageService.getAllGroup()
      .then(data => {
        if (data) {
          const arr = data.groupList.map(group => {
            const obj = {};

            obj.id = group.groupID;
            obj.name = group.groupName;
            obj.count = group.userCount;

            return obj;
          });

          this.setState({ members: arr });
        }
      })
      .catch(error => {
        this.setState({ wrong: error });
      })
      .finally(() => {
        Loading.hide();
      });
  }

  onDragEnd = result => {
    // 没有释放在指定范围，取消拖拽
    if (!result.destination) {
      return;
    }

    // 拖动结束后改变数据
    const { members } = this.state;
    const item = members.splice(result.source.index, 1);

    members.splice(result.destination.index, 0, item[0]);

    this.setState({ members });
  };

  transferMsgDel = deleteX => {
    this.setState({ deleteX });
  };

  delete = mem => {
    this.setState({
      data: mem,
      deleteX: true
    });
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const { deleteX, data, members, wrong } = this.state;
    const { match, storeRole } = this.props;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">分组管理</b>
        <Link to={`${match.url}/addGroup`}>
          <button
            type="button"
            className={
              parseInt(storeRole, 10) === 7
                ? "saveBtn joinApply-btnFlo"
                : "none"
            }
          >
            添加分组
          </button>
        </Link>
        <br />
        <span className="groupManage-tip tip">上下拖动对分组排序</span>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                ref={provided.innerRef}
                className="clear present joinApply-list groupManage-present"
              >
                {members.map((mem, index) => {
                  const groupMemberPath = {
                    pathname: `${match.url}/groupMember`,
                    state: { per: mem }
                  };

                  return (
                    <Draggable key={mem.id} draggableId={mem.id} index={index}>
                      {provided1 => (
                        <div
                          ref={provided1.innerRef}
                          {...provided1.draggableProps}
                          {...provided1.dragHandleProps}
                          className={
                            mem.dealed
                              ? "none"
                              : "groupManage-reCell joinApply-cell"
                          }
                        >
                          <b className="groupManage-groupSize">{mem.name}</b>
                          <span className="llSize groupManage-numPos">
                            {mem.count}人
                          </span>
                          <div className="joinApply-littleSelect">
                            <Link
                              to={groupMemberPath}
                              className="fakeBtn groupManage-fakeBtn"
                            >
                              编辑
                            </Link>
                            <span
                              className="fakeBtn groupManage-fakeBtn"
                              onClick={() => {
                                this.delete(mem);
                              }}
                              onKeyDown={this.handleClick}
                              role="button"
                              tabIndex="-1"
                            >
                              删除
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Delete
          name="确认要移除该组吗?"
          deleteX={deleteX}
          transferMsg={this.transferMsgDel}
          data={data}
          // del
          groupDel
        />

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

GroupManage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string
  }),
  storeRole: PropTypes.number
};

GroupManage.defaultProps = {
  match: {},
  storeRole: 1
};

const mapStateToProps = state => ({
  storeRole: state.role
});

export default connect(mapStateToProps)(GroupManage);
