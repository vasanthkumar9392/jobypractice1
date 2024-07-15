import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const HomePage = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-bottom-container">
      <h1 className="home-heading">Find The Job That Fits Your Life</h1>
      <p className="home-paragraph">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="home-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default HomePage
