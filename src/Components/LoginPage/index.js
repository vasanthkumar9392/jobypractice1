import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', isMatched: false, errorMsg: ''}

  loginSuccessfully = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFormDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.loginSuccessfully(data.jwt_token)
    } else {
      this.setState({isMatched: true, errorMsg: data.error_msg})
    }
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatepassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isMatched, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <h1 className="login-heading">Please Login</h1>
        <div className="login-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitFormDetails} className="form-container">
            <div className="username-input-container">
              <label className="login-label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input-element"
                id="username"
                type="text"
                value={username}
                onChange={this.updateUserName}
              />
            </div>
            <div className="password-input-container">
              <label className="login-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input-element"
                id="password"
                type="password"
                value={password}
                onChange={this.updatepassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isMatched && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
        <p className="dev-text">
          Developed by @<span className="my-name"> Vasanthu</span>
        </p>
      </div>
    )
  }
}

export default LoginPage
