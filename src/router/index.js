import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory} from 'react-router'
import guidance from '../components/guidance.js'
import project from '../components/project.js'
import dynamic from '../components/dynamic.js'
import progress from '../components/progress.js'
import number from '../components/number.js'
 
render((
  <Router history={hashHistory}>
    <Route path="/" component={guidance}>
      <Route path="/project" component={project}/>
      <Route path="/dynamic" component={dynamic}/>
      <Route path="/progress" component={progress}/>
      <Route path="/number" component={number}/>
    </Route>
  </Router>
), document.getElementById('guidance'))