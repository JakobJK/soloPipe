import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Admin from './Admin';
import Forgot from './Forgot';

export default function App() {
  const isLoggedIn = useSelector(state => state.profile.isLoggedIn);


  if (isLoggedIn) {
    return (
      <React.Fragment>
        <NavBar />
        <main>
          <Route exact path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin" component={Admin} />
        </main>
      </React.Fragment>
    );
  }
  return (
    <main>
      <Route exact path="/" component={Login} />
      <Route path="/forgot" component={Forgot} />
    </main>
  );
}
