import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import Project from './modules/project/index'
import Dynamic from './modules/feed/dynamic'
import Progress from './modules/status/progress'
import member from './modules/member/member'
import Header from './components/common/header/index'
import edit from './modules/status/markdown/edit.jsx'
import './index.css'
 
ReactDOM.render((
  <Router> 
    <div className="app-container">
      <Header className="header" />
      <div className="card-container">
        <Route exact path="/" component={Project} />
        <Route path="/project" component={Project} />
        <Route path="/dynamic_list" component={Dynamic} />
        <Route path="/progress_list" component={Progress} />
        <Route path="/member" component={member} />
        <Route path="/edit" component={edit} />
      </div>
    </div>
  </Router>
),document.getElementById('root'));
registerServiceWorker();
