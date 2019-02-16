import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.restore = this.restore.bind(this);
  }

  restore() {
    const { item, restore } = this.props;
    restore(item);
  }

  render() {
    const { item } = this.props;
    const createTimeArray = item.create_time.split(/\D/);
    const deleteTimeArray = item.delete_time.split(/\D/);
    return (
      <div className="trash-file-list">
        <div className="trash-file-list-left">
          <div className="trash-file-name" title={item.name}>
            {item.name}
          </div>
          <div className="trash-file-delete-time">
            {`${deleteTimeArray[0]}/${deleteTimeArray[1]}/${deleteTimeArray[2]}`}
          </div>
          <div className="trash-file-create-time">
            {`${createTimeArray[0]}/${createTimeArray[1]}/${createTimeArray[2]}`}
          </div>
        </div>
        <div className="trash-file-list-right">
          <div
            className="trash-file-restore"
            onClick={this.restore}
            onKeyDown={() => {}}
            role="presentation"
          >
            恢复
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    create_time: PropTypes.string,
    delete_time: PropTypes.string,
  }),
  restore: PropTypes.func,
};

List.defaultProps = {
  item: {
    id: null,
    name: '',
    create_time: '',
    delete_time: '',
  },
  restore: () => {},
};

export default List;
