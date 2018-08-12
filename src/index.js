import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import Project from './modules/project/project'
import dynamic_list from './modules/status/status'
import progress_list from './modules/feed/feed'
import member from './modules/member/member'
import Header from './components/common/header/header';
 
ReactDOM.render((
  <Router> 
    <div>
      <Header></Header>
      <Route exact path="/" component={Project}></Route>
      <Route path="/project" component={Project}></Route>
      <Route path="/dynamic_list" component={dynamic_list}></Route>
      <Route path="/progress_list" component={progress_list}></Route>
      <Route path="/member" component={member}></Route>
    </div>
  </Router>
),document.getElementById('root'));
registerServiceWorker();
