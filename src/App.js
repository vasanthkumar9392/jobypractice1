import {Switch, Redirect, Route} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import NotFound from './Components/NotFound'
import HomePage from './Components/HomePage'
import JobsPage from './Components/JobsPage'
import JobFullDetails from './Components/JobFullDetails'
import ProtectedAuthentication from './Components/ProtectedAuthentication'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path='/login' component={LoginPage} />
    <ProtectedAuthentication exact path='/' component={HomePage} />
    <ProtectedAuthentication exact path='/jobs' component={JobsPage} />
    <ProtectedAuthentication
      exact
      path='/jobs/:id'
      component={JobFullDetails}
    />
    <Route exact path='/not-found' component={NotFound} />
    <Redirect to='/not-found' />
  </Switch>
)

export default App
