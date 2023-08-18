import { googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import config from '../config.json';

const client_id: string = config.GOOGLE_CLIENT_ID;
function Logout() {

  const onSuccess = () => {
    console.log('logged out');
  }


  return (
    <div>
    </div>
  )
}

export default Logout;