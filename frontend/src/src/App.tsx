import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";
import Login from './components/Login/login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const client_id = '918905675795-8v17u3i912kgqq765k2gk760kc49feba.apps.googleusercontent.com'


function App() {

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: client_id,
        scope:''
      })
    };
    gapi.load('auth2', start);
  } );

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Entry Point to the App */}
          {/* Normally the navigation goes here, I can handle if you guys need me to */}
            <Route path = "/home" Component={Home} />
            <Route path = "/header" Component={Header} />
            <Route path = "/profile" Component={UserProfile} />
            <Route path="/" Component={Login}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
