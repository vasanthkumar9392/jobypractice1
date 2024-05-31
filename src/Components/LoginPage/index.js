import {Component} from 'react'
import './index.css'

class LoginPage extends Component {
  state = {userName: '', userPassword: '', isMatched: true, errorMsg: ''}

  onSubmitFormDetails = async event => {
    event.preventDefault()
    const {userName, userPassword} = this.state

    const userDetails = {userName, userPassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
  }

  updateUserName = event => {
    this.setState({userName: event.target.value})
  }

  updatepassword = event => {
    this.setState({userPassword: event.target.value})
  }

  render() {
    const {userName, userPassword, isMatched, errorMsg} = this.state
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
                value={userName}
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
                value={userPassword}
                onChange={this.updatepassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isMatched ? null : <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
