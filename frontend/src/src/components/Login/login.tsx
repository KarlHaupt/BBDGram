import { GoogleLogin, CredentialResponse, GoogleOAuthProvider} from '@react-oauth/google';
import jwt from 'jwt-decode';
import config from '../../config.json';
import { ApiResponse } from '../../providers/userProvider';

const client_id: string = config.GOOGLE_CLIENT_ID;

function Login() {

  const onSuccess = async (response:  CredentialResponse) => {

    const responsePayload: any = jwt(response.credential + '');
    localStorage.setItem('token', response.credential + '');
    await saveUser({ username: responsePayload.name, email: responsePayload.email })
    window.location.href = "http://localhost:3000/home"
  } 

  const saveUser = async (data: { username: string, email: string}) => {
    const url = `${config.API_Base_Url}/user/save`;
    const user = new ApiResponse();

    const userObj = {
      username: data.username,
      email: data.email
    }

    user.saveUser(url, userObj).then((response: any)=>{
      
      if(response.success === true){
        const data = response.user;
        console.log(data)
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
      }
      
    })
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
