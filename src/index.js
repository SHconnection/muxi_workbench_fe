import React from 'react'
import ReactDOM from 'react-dom';
import {Router, Route}from 'react-router';
import registerServiceWorker from './registerServiceWorker';
import guidance from './guidance'
import file from './modules/project/file'
import dynamic_list from './modules/dynamic/dynamiclist'
import progress_list from './modules/progress/progresslist'
import number from './modules/set/number.js'
 
ReactDOM.render((
    <Router>
    <Route path="/" component={guidance}>
      <Route path="/file" component={file}></Route>
      <Route path="/dynamic_list" component={dynamic_list}></Route>
      <Route path="/progress_list" component={progress_list}></Route>
      <Route path="/number" component={number}></Route>
    </Route>
  </Router>
),document.getElementById('root'));

registerServiceWorker();
