import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/tasks" component={TaskList} />
          <Route path="/create-task" component={CreateTask} />
          {/* Add other routes here */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
