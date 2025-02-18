import { GoogleLogin, CredentialResponse, GoogleOAuthProvider} from '@react-oauth/google';
import jwt from 'jwt-decode';
import './login.css'
import { ApiResponse } from '../../providers/userProvider';

const client_id: string ='639134156863-t757kboucq6bvm8pp6sivl59tth2qm73.apps.googleusercontent.com'

function Login() {

  const onSuccess = async (response:  CredentialResponse) => {
    try {
      const responsePayload: any = jwt(response.credential + '');
      localStorage.setItem('token', response.credential + '');
      await saveUser({ username: responsePayload.name, email: responsePayload.email });
      // window.location.href = "http://localhost:3000/home"
      window.location.href = "https://main.dv8k953i2sr0b.amplifyapp.com/home";
    } catch(err) {
      console.log(err);
    }
  } 

    const saveUser = async (data: { username: string, email: string}) => {
    try {
        const url = 'https://ztd82gntsi.eu-west-1.awsapprunner.com/user/save';
        const userObj = {
            username: data.username,
            email: data.email
        };
        const user = new ApiResponse();

        const response:any = await user.saveUser(url, userObj);

        console.log(response);

        if (response.success === true) {
            const userData = response.user;
            console.log(userData);
            localStorage.setItem('username', userData.username);
            localStorage.setItem('email', userData.email);
        } else {
            console.log('Save user operation failed.');
        }
    } catch (err) {
        console.log('ERROR:', err);
    }
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
