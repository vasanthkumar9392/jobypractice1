import {Switch, Redirect, Route} from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
  </Switch>
)

export default App
