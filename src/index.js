import React from 'react'
import ReactDOM from 'react-dom';
import {Router, Route, Link}from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import guidance from './guidance'
import project from './components/project.js'
import dynamic from './components/dynamic.js'
import progress from './components/progress.js'
import number from './components/number.js'
 
ReactDOM.render(
    <Router>
    <Route path="/" component={guidance}>
      <Route path="/project" component={project}></Route>
      <Route path="/dynamic" component={dynamic}></Route>
      <Route path="/progress" component={progress}></Route>
      <Route path="/number" component={number}></Route>
    </Route>
  </Router>
,document.getElementById('root'));

registerServiceWorker();
