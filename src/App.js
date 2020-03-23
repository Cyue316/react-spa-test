import React from 'react';
import './app.less';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from 'pages/Login/Login';
import Main from 'router/Router';

const App = (props) => {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/" component={ Main }/>
      <Redirect to="/"/>
    </Switch>
  )
};

export default App;