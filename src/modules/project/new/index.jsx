import React, { Component } from 'react'

class NewProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: "/project/new"
    }
  }

  render() {
    const {url} = this.state
    return (
      <div>
        {url}
      </div>
    )
  }
}

export default NewProject;