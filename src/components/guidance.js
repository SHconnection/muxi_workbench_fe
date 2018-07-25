import React from 'react'


export default React.createClass({
    render() {
      return (
        <div>
          <ul>
            <li><Link to="/project" state={{ timestamp : element.timestamp }}>项目</Link></li>
            <li><Link to="/dynamic" state={{ timestamp : element.timestamp }}>动态</Link></li>
            <li><Link to="/progress" state={{ timestamp : element.timestamp }}>进度</Link></li>
            <li><Link to="/number" state={{ timestamp : element.timestamp }}>成员</Link></li>
          </ul>
          {this.props.children}
        </div>
      )
    }
})  