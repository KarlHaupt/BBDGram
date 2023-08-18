import { GoogleLogout } from 'react-google-login'

const client_id = '918905675795-8v17u3i912kgqq765k2gk760kc49feba.apps.googleusercontent.com'

function Logout() {

  const onSuccess = () => {
    console.log('logged out');
  }


  return (
    <div>
      <GoogleLogout
        clientId= {client_id}
        buttonText='Logout'
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout;