/*
个人关注组件
*/
import React, { useState, useEffect } from "react";
import { List } from "react-virtualized";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import File from "assets/img/file.png";
import MessageService from "service/message";
import Loading from "components/common/loading/index";
import { Store } from "store";
import Delete from "../delete/delete";
import "static/css/common.css";
import "./personalAttention.css";

const PersonalAttention = ({
  storeId,
  match: {
    params: { uid }
  }
}) => {
  const [data, setData] = useState(undefined);
  const [deleteX, setDeleteX] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteFunc = attentionData => {
    setData(attentionData);
    setDeleteX(true);
  };

  const transferMsgDel = attentiondeleteX => {
    setDeleteX(attentiondeleteX);
  };

  useEffect(
    () => {
      setLoading(true);
      MessageService.getPersonalAttention(uid)
        .then(attention => {
          const arr = attention.list.map((item1, index) => {
            const item = item1;
            item.id = index;
            item.dealed = false;
            return item;
          });

          setLoading(false);
          setMembers(arr);
        })
        .catch(error => {
          Store.dispatch({
            type: "substituteWrongInfo",

            payload: error
          });
        });
    },
    [uid]
  );

  const renderRow = info => {
    const mem = members[info.index];
    return (
      <div
        className={mem.dealed ? "none" : "personalAttention-cell"}
        key={info.key}
        style={info.style}
      >
        <Link to={mem.url}>
          <img
            src={File}
            className="personalAttention-imgSize personalAttention-goFile"
            alt=""
          />
        </Link>

        <div className="personalAttention-vice IB">
          <Link to={mem.url}>
            <span className="llSize personalAttention-goFile">
              {mem.fileName}
            </span>
          </Link>
          <br />
          <span className="tip">
            项目：
            {mem.projectName}
          </span>
        </div>

        <div className="IB">
          <div className="personalAttention-litSel">
            <span className="personalAttention-name" title={mem.userName}>
              {mem.userName}
            </span>
            <span className="personalAttention-name" title={mem.date}>
              {mem.date}
            </span>
            <span
              role="button"
              tabIndex="-1"
              className="fakeBtn personalAttention-btnMargin"
              onKeyDown={() => {}}
              onClick={() => {
                deleteFunc(mem);
              }}
            >
              {parseInt(storeId, 10) === parseInt(uid, 10) ? "取消关注" : ""}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="present">
      <div className="noneInfoTip">
        {members.length > 0 ? (
          <List
            width={853}
            height={500}
            rowHeight={80}
            rowRenderer={renderRow}
            rowCount={members.length}
          />
        ) : (
          "暂时未关注文档~"
        )}
      </div>

      <Delete
        name="确认要取消关注该项目吗?"
        data={data}
        deleteX={deleteX}
        transferMsg={transferMsgDel}
        attentionDel
      />
    </div>
  );
};

PersonalAttention.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string
    })
  }),
  storeId: PropTypes.number
};

PersonalAttention.defaultProps = {
  history: {},
  match: {},
  storeId: 0
};

const mapStateToProps = state => ({
  storeId: state.id
});

export default connect(mapStateToProps)(PersonalAttention);
