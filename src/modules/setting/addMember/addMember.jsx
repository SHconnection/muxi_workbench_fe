/*
添加成员页面组件
*/
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GoBack from "../../../components/common/goBack/index";
import ManageService from "../../../service/manage";
import WrongPage from "../../../components/common/wrongPage/wrongPage";

import Save from "../components/save/save";
import "../../../static/css/common.css";
import "./addMember.css";

class AddMem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      wrong: {},
      ifSave: false
    };
  }

  componentDidMount() {
    this.link();
  }

  link = () => {
    const { storeProxy } = this.props;

    ManageService.invitePerson()
      .then(data => {
        this.setState({ inputValue: storeProxy + data.invite_url });
      })
      .catch(error => {
        this.setState({ wrong: error });
      })
      .finally(() => {});
  };

  copy = () => {
    const e = this.textInput;

    e.select();

    document.execCommand("copy");

    this.setState({ ifSave: true });
    setTimeout(() => {
      this.setState({ ifSave: false });
    }, 1000);
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  render() {
    const { inputValue, wrong, ifSave } = this.state;

    return (
      <div className="subject minH">
        <GoBack />
        <b className="title">添加新成员</b>
        <div className="present">
          <b className="title littleSize">发送链接邀请新成员</b>
          <br />
          <input
            type="text"
            placeholder="https://modao.cc/app/c10SrQ7RsFKQ9"
            className="inputSize addMember-inputStyle"
            ref={c => {
              this.textInput = c;
            }}
            value={inputValue}
            readOnly
          />
          <button type="button" className="saveBtn" onClick={this.copy}>
            复制
          </button>
          <p className="addMember-fontMargin">
            复制上面的链接发送给需要邀请的人。任何看到邀请的人，都可以申请加入团队，如果想要链接失效，请
            <span
              className="addMember-fontStyle"
              onClick={this.link}
              onKeyDown={this.handleClick}
              role="button"
              tabIndex="-1"
            >
              重新生成链接。
            </span>
          </p>
        </div>
        <WrongPage info={wrong} cancel={this.cancel} />
        <Save ifSave={ifSave} />
      </div>
    );
  }
}

AddMem.propTypes = {
  storeProxy: PropTypes.string
};

AddMem.defaultProps = {
  storeProxy: ""
};

const mapStateToProps = state => ({
  storeProxy: state.proxy
});

export default connect(mapStateToProps)(AddMem);
