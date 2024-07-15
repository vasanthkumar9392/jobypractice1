import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedAuthentication = props => {
  console.log(props, 'protect')
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedAuthentication
