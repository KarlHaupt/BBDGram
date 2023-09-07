import { GoogleLogin, CredentialResponse, GoogleOAuthProvider} from '@react-oauth/google';
import jwt from 'jwt-decode';
import './login.css'
import config from '../../config.json';
import { ApiResponse } from '../../providers/userProvider';

const client_id: string = process.env.GOOGLE_CLIENT_ID ?? '';

function Login() {

  const onSuccess = async (response:  CredentialResponse) => {

    const responsePayload: any = jwt(response.credential + '');
    localStorage.setItem('token', response.credential + '');
    await saveUser({ username: responsePayload.name, email: responsePayload.email })
    // window.location.href = "http://localhost:3000/home"
    window.location.href = "https://main.ddhyb4p9wz5gw.amplifyapp.com/home"
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
    <section>
      <header>
        <img alt="bbd-gram-logo" src={process.env.PUBLIC_URL + '/bbdgram512.png'}/>
        <h1>
          BBDGRAM
        </h1>
      </header>
      <main>
        <section>
        <h3>Login</h3>
        <GoogleOAuthProvider clientId={client_id}>
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onFailure}
          />
        </GoogleOAuthProvider>

        </section>

      </main>
    </section>    
  )
}

export default Login;
