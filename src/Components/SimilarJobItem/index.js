import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {IoBagHandle} from 'react-icons/io5'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const companyLogoUrl = jobDetails.company_logo_url
  const employmentType = jobDetails.employment_type
  const jobDescription = jobDetails.job_description
  const {location, rating, title} = jobDetails

  return (
    <li className="similar-job-item">
      <div className="logo-and-role-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
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
      <hr className="separater-line" />
      <h1 className="description-heading-text">Description</h1>
      <p className="description-para">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobItem
