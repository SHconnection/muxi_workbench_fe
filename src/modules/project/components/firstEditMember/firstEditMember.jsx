/*
项目设置--编辑成员页面组件
承接自项目设置--项目信息页面
接收项目信息参数
*/
import React from "react";
import PropTypes from "prop-types";
import Select from "components/common/select/index";
import Loading from "components/common/loading/index";
import Member from "../../../setting/components/member/member";
import "static/css/common.scss";
import "./firstEditMember.scss";

const FirstEditMember = ({
  selAll,
  transferMsg,
  members,
  selMembers,
  groups,
  changeGroupCheck,
  checkedIndex,
  proId,
  memberLoading
}) => (
  <div className="firstEditMember">
    {/* <GoBack /> */}
    <div className="title">编辑项目成员</div>
    <br />
    <div className="header">
      <div className="firstEditMember-vice">
        <div className="title littleSize">设置项目成员</div>
        <div className="firstEditMember-tip">选择你要设置的成员</div>
      </div>
      <dir className="right">
        <label
          htmlFor="selectAll"
          className="fakeBtn firstEditMember-fontSize"
          onKeyDown={selAll}
          onClick={selAll}
          role="button"
          tabIndex="-1"
          id="lab"
        >
          {members.length === selMembers.length ? "取消全选" : "全选"}
        </label>
        <div className="firstEditMember-inlineWidth">
          <Select
            items={groups}
            checkedIndex={checkedIndex}
            onChange={changeGroupCheck}
            proId={proId}
          />
        </div>
      </dir>
    </div>

    {memberLoading ? (
      <Loading />
    ) : (
      <Member
        members={members}
        selMembers={selMembers}
        transferMsg={transferMsg}
      />
    )}
  </div>
);

export default FirstEditMember;

FirstEditMember.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      selected: PropTypes.bool
    })
  ),
  selMembers: PropTypes.arrayOf(PropTypes.number),
  transferMsg: PropTypes.func,
  selAll: PropTypes.func,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      id: PropTypes.number
    })
  ),
  changeGroupCheck: PropTypes.func,
  checkedIndex: PropTypes.number,
  proId: PropTypes.number,
  memberLoading: PropTypes.bool
};

FirstEditMember.defaultProps = {
  members: [],
  selMembers: [],
  transferMsg: () => {},
  selAll: () => {},
  groups: [],
  changeGroupCheck: () => {},
  checkedIndex: 0,
  proId: 0,
  memberLoading: false
};
