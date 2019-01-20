/*
个人关注组件
*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Delete from "../delete/delete";
import File from "../../../../assets/img/file.png";
import MessageService from "../../../../service/message";
import WrongPage from "../../../../components/common/wrongPage/wrongPage";
import Loading from "../../../../components/common/loading/index";
import "../../../../static/css/common.css";
import "./personalAttention.css";

class PersonalAttention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      deleteX: false,
      members: [],
      wrong: {}
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { uid }
      }
    } = this.props;

    Loading.show();
    MessageService.getPersonalAttention(uid)
      .then(attention => {
        console.log(attention);
        const arr = attention.list.map((item1, index) => {
          const item = item1;
          item.id = index;
          item.dealed = false;

          return item;
        });
        this.setState({ members: arr });
      })
      .catch(error => {
        this.setState({ wrong: error });
      })
      .finally(() => {
        Loading.hide();
      });
  }

  delete = data => {
    this.setState({
      data,
      deleteX: true
    });
  };

  transferMsgDel = deleteX => {
    this.setState({
      deleteX
    });
  };

  cancel = () => {
    this.setState({ wrong: {} });
  };

  goFile = mem => {
    const { history } = this.props;

    history.push(mem.url);
  };

  render() {
    const { data, deleteX, members, wrong } = this.state;

    return (
      <div className="present">
        <p className={members.length === 0 ? "noneInfoTip" : "none"}>
          暂时未关注文档~
        </p>

        {members.map(mem1 => {
          const mem = mem1;

          return (
            <div
              className={mem.dealed ? "none" : "personalAttention-cell"}
              key={mem.id}
            >
              <img
                src={File}
                className="personalAttention-imgSize personalAttention-goFile"
                alt=""
                onClick={() => {
                  this.goFile(mem);
                }}
              />

              <div className="personalAttention-vice IB">
                <span
                  className="llSize personalAttention-goFile"
                  role="button"
                  tabIndex="-1"
                  onClick={() => {
                    this.goFile(mem);
                  }}
                  onKeyDown={this.handleClick}
                >
                  {mem.fileName}
                </span>
                <br />
                <span className="tip">
                  项目：
                  {mem.projectName}
                </span>
              </div>

              <div className="IB">
                <div className="personalAttention-litSel">
                  <span className="personalAttention-size IB">
                    {mem.userName}
                  </span>
                  <span className="personalAttention-size IB">{mem.date}</span>
                  <span
                    role="button"
                    tabIndex="-1"
                    className="fakeBtn personalAttention-btnMargin"
                    onKeyDown={() => {
                      this.delete(mem);
                    }}
                    onClick={() => {
                      this.delete(mem);
                    }}
                  >
                    {parseInt(localStorage.id, 10) ===
                    parseInt(localStorage.per, 10)
                      ? "取消关注"
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          );
        }, this)}

        <Delete
          name="确认要取消关注该项目吗?"
          data={data}
          deleteX={deleteX}
          transferMsg={this.transferMsgDel}
          attentionDel
        />

        <WrongPage info={wrong} cancel={this.cancel} />
      </div>
    );
  }
}

export default PersonalAttention;

PersonalAttention.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

PersonalAttention.defaultProps = {
  history: {}
};
