import { GoogleLogin, CredentialResponse, GoogleOAuthProvider} from '@react-oauth/google';
import jwt from 'jwt-decode';
import config from '../config.json';

const client_id: string = config.GOOGLE_CLIENT_ID;

function Login() {

  const onSuccess = (response:  CredentialResponse) => {

  const responsePayload = jwt(response.credential + '');
    console.log('Login SUccessful!');
    console.log('payload', responsePayload);
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
