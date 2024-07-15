import './index.css'

const NotFound = () => (
  <div className="ntfound-bg-container">
    <img
      className="notfound-image"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="notfound-heading">Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
