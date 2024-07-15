import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {IoBagHandle} from 'react-icons/io5'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  console.log(props)
  const onClickLogoutButton = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-inner-container">
        <Link to="/">
          <img
            className="app-logo-home"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="un-lists">
          <li>
            <Link to="/" className="list-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="list-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-button"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
        <div className="home-jobs-logout-container-for-mobile">
          <Link to="/" className="link-header">
            <MdHome className="home-icon-header" />
          </Link>
          <Link to="/jobs" className="link-header">
            <IoBagHandle className="job-icon-header" />
          </Link>
          <button
            type="button"
            className="logout-btn-header"
            onClick={onClickLogoutButton}
          >
            <FiLogOut className="logot-icon-header" aria-label="logout" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
