import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/hoc/layout';
import Auth from './components/hoc/auth';

import Home from './components/home';
import RegisterLogin from './components/register_login';
import Register from './components/register_login/register';

import UserDashboard from './components/user';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>
        <Route path="/register" exact component={Auth(Register, false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)}/>
        <Route path="/" exact component={Auth(Home, null)}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
