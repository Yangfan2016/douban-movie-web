import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Box from '../pages/Box';
import Search from '../pages/Search';

import NotFound from '../errors/NotFound';

export default function () {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/box" component={Box} />
        <Route exact path="/search/:query" component={Search} />
        <Route component={NotFound} />
      </Switch>Î
    </BrowserRouter>
  );
}


