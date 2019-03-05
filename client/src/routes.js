import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/layout';
import Home from './components/home';
import RegisterLogin from './components/register_login';
import Register from './components/register_login/register';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/register" exact component={Register}/>
        <Route path="/register_login" exact component={RegisterLogin}/>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
