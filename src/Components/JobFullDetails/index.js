import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoMdStar} from 'react-icons/io'
import {MdLocationOn} from 'react-icons/md'
import {IoBagHandle} from 'react-icons/io5'
import {FaExternalLinkAlt} from 'react-icons/fa'

import './index.css'

import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'

const pageStatusCon = {
  INTIAL: 'intial',
  APISUCCESS: 'success',
  APIFAILED: 'failed',
}

class JobFullDetails extends Component {
  state = {
    jobDetails: '',
    similarJobsList: [],
    skillsList: [],
    pageStatus: pageStatusCon.INTIAL,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    console.log(this.props, 'job')
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const {skills} = jobDetails
      const {description} = jobDetails.life_at_company
      const lifeAtCompanyImage = jobDetails.life_at_company.image_url

      const jobDetailsAftrrEdit = {
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        companyWebsiteUrl: jobDetails.company_website_url,
        lifeAtCompany: description,
        lifeAtCompanyImage,
      }
      this.setState({
        jobDetails: jobDetailsAftrrEdit,
        skillsList: skills,
        similarJobsList: similarJobs,
        pageStatus: pageStatusCon.APISUCCESS,
      })
    } else {
      this.setState({pageStatus: pageStatusCon.APIFAILED})
    }
  }

  showingLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  showApiFailedJobsView = () => (
    <div className="no-jobs-container new-height-width">
      <img
        className="no-jobsimage"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="profile-retry-button" type="button">
        Retry
      </button>
    </div>
  )

  showingSkillsJsx = () => {
    const {skillsList} = this.state

    return (
      <div>
        <h1 className="skill-heading">Skills</h1>
        <ul className="skill-un-lists">
          {skillsList.map(eachObj => (
            <SkillItem key={eachObj.name} skillDetails={eachObj} />
          ))}
        </ul>
      </div>
    )
  }

  lifeAtCompanySection = () => {
    const {jobDetails} = this.state
    const {lifeAtCompany, lifeAtCompanyImage} = jobDetails

    return (
      <div className="life-at-container">
        <h1 className="lifat-company-heading">Life At Company</h1>
        <div className="life-at-company-para-image-container">
          <p className="li-at-para">{lifeAtCompany}</p>
          <img
            className="life-at-image"
            src={lifeAtCompanyImage}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  showingSuccessTopJobDetails = () => {
    const {jobDetails} = this.state

    const {
      companyWebsiteUrl,
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="sp-job-container">
        <div className="job-item-list">
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
          <div className="description-link-container">
            <h1 className="description-heading-text">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              className="link-text"
              rel="noreferrer"
            >
              Visit <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>
          <p className="description-para big-description">{jobDescription}</p>
          {this.showingSkillsJsx()}
          {this.lifeAtCompanySection()}
        </div>
      </div>
    )
  }

  showSimilarCompanyJsx = () => {
    const {similarJobsList} = this.state

    return (
      <ul className="similar-jabs-lists">
        {similarJobsList.map(eachObj => (
          <SimilarJobItem key={eachObj.id} jobDetails={eachObj} />
        ))}
      </ul>
    )
  }

  showingSuccessJobDetails = () => (
    <div className="job-inner-container">
      {this.showingSuccessTopJobDetails()}
      <h1 className="similarjobs-heading">Similar Jobs</h1>
      {this.showSimilarCompanyJsx()}
    </div>
  )

  showingBasedOnState = () => {
    const {pageStatus} = this.state

    switch (pageStatus) {
      case pageStatusCon.INTIAL:
        return this.showingLoadingView()
      case pageStatusCon.APISUCCESS:
        return this.showingSuccessJobDetails()
      case pageStatusCon.APIFAILED:
        return this.showApiFailedJobsView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="job-details-bottom-container">
          {this.showingBasedOnState()}
        </div>
      </div>
    )
  }
}

export default JobFullDetails
