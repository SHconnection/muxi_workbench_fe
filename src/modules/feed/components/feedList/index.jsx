import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "../../../../components/common/avatar/index";
import "./index.css";

// const kind = ["status", "project", "doc", "comment", "team", "user", "file"];

function findKind(kind, sourceID) {
  switch (kind) {
    case 0:
      return `/status/${sourceID}/`;
    case 1:
      return `/project/${sourceID}/`;
    case 2:
      return `/project/30/doc/${sourceID}/`;
    case 3:
      return `/status/${sourceID}/`;
    case 4:
      return `/member/teamMember/personalInfo/personalProgress/${sourceID}/`;
    case 5:
      return `/member/teamMember/personalInfo/personalProgress/${sourceID}/`;
    case 6:
      return `/project/doc/${sourceID}/`;
    default:
      return `/`;
  }
}

function findProject(kind, dividerID) {
  switch (kind) {
    case 0:
      return `/status`;
    case 1:
      return `/project/${dividerID}/preview`;
    case 2:
      return `/project/${dividerID}/preview`;
    case 3:
      return `/status`;
    case 4:
      return 0;
    case 5:
      return 0;
    case 6:
      return `/project/${dividerID}/preview`;
    default:
      return `/`;
  }
}

class feedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceID: props.sourceID,
      dividerID: props.dividerID
    };
  }

  render() {
    const { sourceID, dividerID } = this.state;
    const {
      timeHour,
      action,
      divider,
      dividerName,
      kind,
      avatarUrl
    } = this.props;
    return (
      <div className="feed-item">
        <div className="feed-divider">
          <div className={divider ? "line" : "no-line"} />
          <Link
            to={`${findProject(kind, dividerID)}`}
            className={divider ? "feed-project" : "feed-no-project"}
          >
            {divider ? dividerName : ""}
          </Link>
        </div>
        <div className="feed-details">
          <div className="feed-time">{timeHour}</div>
          <div className="feed-item-img">
            <Avatar src={avatarUrl} width="60" height="60" />
          </div>
          <div className="feed-action">
            <Link to={`${findKind(kind, sourceID)}`} className="link">
              {action}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

feedItem.propTypes = {
  // timeDay: PropTypes.string,
  timeHour: PropTypes.string,
  avatarUrl: PropTypes.string,
  // uid: PropTypes.number,
  action: PropTypes.string,
  kind: PropTypes.number,
  sourceID: PropTypes.number,
  divider: PropTypes.bool,
  dividerID: PropTypes.number,
  dividerName: PropTypes.string
};

feedItem.defaultProps = {
  // timeDay: "0000-00-00",
  timeHour: "00:00:00",
  avatarUrl: " ",
  // uid: 0,
  action: " ",
  kind: 0,
  sourceID: 0,
  divider: 0,
  dividerID: 0,
  dividerName: " "
};
export default feedItem;
