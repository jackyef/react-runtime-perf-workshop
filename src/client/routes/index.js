import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import { AboutView } from './About';
import { HomeView } from './Home';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" render={() => <HomeView />} />
        <Route path="/about" render={() => <AboutView />} />
      </Switch>
    </Layout>
  );
};

export default Routes;
