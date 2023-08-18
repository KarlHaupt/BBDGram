import { GoogleLogin,GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login'

const client_id = '918905675795-8v17u3i912kgqq765k2gk760kc49feba.apps.googleusercontent.com'

function Login() {

  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {

  let result: any = null;
  let token:any = null;
  if ("profileObj" in response) { result = response.profileObj; }
  if ("tokenId" in response) { token = response.tokenId; }
    console.log('Login SUccessful!');
    console.log('profile', result);
    console.log('token',token);
  }

  const onFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }


  return (
    <div>
      <GoogleLogin
        clientId= {client_id}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy='single_host_origin'
        isSignedIn={true}
      />
    </div>
  )
}

export default Login;