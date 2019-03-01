import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/layout';
import Home from './components/home';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Home}/>
      </Switch>
    </Layout>
  )
}

export default Routes;
