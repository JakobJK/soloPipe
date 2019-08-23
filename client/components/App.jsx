import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Admin from './Admin';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(1);


  if (loggedIn) {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <main>
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
            <Route path="/admin" component={Admin} />
          </main>
        </React.Fragment>
      </Router>
    );
  }
  return (
    <main>
      <div>
        <Login />
      </div>
    </main>
  );
}
