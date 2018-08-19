import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Index from './index/index'
import NewProject from './new/index'
import NoMatch from '../../components/common/noMatch/index'

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
       url: '/project'
    }
}

  render() {
    const {url} = this.state
    return (
      <Router>
        <Switch>
          <Route exact path={`${url}/`} component={Index} />
          <Route path={`${url}/new`} component={NewProject} />
          <Route exact path="/" component={Index} />
          <Route path="/new" component={NewProject} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    )
  }
}


export default Project;