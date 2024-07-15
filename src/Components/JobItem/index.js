import {Link} from 'react-router-dom'
import './index.css'

import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {IoBagHandle} from 'react-icons/io5'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-style">
      <li className="job-item-list">
        <div className="logo-and-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo-image"
          />
          <div className="role-and-rating-container">
            <p className="job-title-para">{title}</p>
            <div className="rating-container">
              <IoMdStar className="star-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-and-type-salary-container">
          <div className="location-and-job-type-conainer">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="text">{location}</p>
            </div>
            <div className="job-type-container">
              <IoBagHandle className="bag-icon" />
              <p className="text">{employmentType}</p>
            </div>
          </div>
          <h1 className="salary-text">{packagePerAnnum}</h1>
        </div>
        <hr className="separater-line" />
        <h1 className="description-heading-text">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
