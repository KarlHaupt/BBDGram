import React from 'react';
import logo from './logo.svg';
import './App.css';
import  LoginButton  from './components/login';
import LogoutButton from './components/logout';
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
    <div className="App">
      <LoginButton/>
    </div>
  );
}

export default App;
