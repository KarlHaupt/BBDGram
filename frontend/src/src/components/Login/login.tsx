import { GoogleLogin, CredentialResponse, GoogleOAuthProvider} from '@react-oauth/google';
import { useEffect } from 'react';
import jwt from 'jwt-decode';
import config from '../../config.json';
import { redirect, useSearchParams } from 'react-router-dom';

const client_id: string = config.GOOGLE_CLIENT_ID;

function Login() {

  const onSuccess = (response:  CredentialResponse) => {

  const responsePayload = jwt(response.credential + '');
    localStorage.setItem('token', response.credential + '');
    console.log(responsePayload);
    window.location.href = "http://localhost:3000/home"
  } 


  const onFailure = () => {
    console.log('login failed');
  }

  return (
    <div>
      <GoogleOAuthProvider clientId={client_id}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
        />
      </GoogleOAuthProvider>;
    </div>
  )
}

export default Login;
