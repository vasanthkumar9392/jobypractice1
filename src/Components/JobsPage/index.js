import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {IoSearch} from 'react-icons/io5'

import Header from '../Header'

import JobItem from '../JobItem'

import FilterTypeItem from '../FilterTypeItem'

import FilterSalaryItem from '../FilterSalaryItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const pageStatus = {
  INTIAL: 'intial',
  PROFILEAPISUCCESS: 'success',
  PROFILEAPIFAILED: 'failed',
  JOBSAPISUCCESS: 'success',
  JOBSAPIFAILED: 'failed',
}

class JobsPage extends Component {
  state = {
    jobsList: [],
    profileDetails: '',
    profileDetailsStatus: pageStatus.INTIAL,
    jobsListsStatus: pageStatus.INTIAL,
    userSearchRole: '',
    salaryRange: '',
    employeeTypeList: [],
  }

  componentDidMount() {
    this.getUserPrifile()
    this.getJobsLists()
  }

  getUserPrifile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const userDetails = {
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
        profileImageUrl: data.profile_details.profile_image_url,
      }
      this.setState({
        profileDetails: userDetails,
        profileDetailsStatus: pageStatus.PROFILEAPISUCCESS,
      })
    } else {
      this.setState({profileDetailsStatus: pageStatus.PROFILEAPIFAILED})
    }
  }

  getJobsLists = async () => {
    console.log('suceess')
    const {userSearchRole, employeeTypeList, salaryRange} = this.state
    const types = employeeTypeList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?search=${userSearchRole}&employment_type=${types}&minimum_package=${salaryRange}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const modifiedjobsList = jobs.map(eachObj => ({
        companyLogoUrl: eachObj.company_logo_url,
        employmentType: eachObj.employment_type,
        id: eachObj.id,
        jobDescription: eachObj.job_description,
        location: eachObj.location,
        packagePerAnnum: eachObj.package_per_annum,
        rating: eachObj.rating,
        title: eachObj.title,
      }))
      this.setState({
        jobsList: modifiedjobsList,
        jobsListsStatus: pageStatus.JOBSAPISUCCESS,
      })
    } else {
      this.setState({jobsListsStatus: pageStatus.JOBSAPIFAILED})
    }
  }

  showingLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  showingProfileSuccessJsx = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-success-container">
        <img className="profile-image" src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  reRenderprofilePage = () => {
    this.setState({profileDetailsStatus: pageStatus.INTIAL})
    this.getUserPrifile()
  }

  showingProfileFailed = () => (
    <button
      className="profile-retry-button"
      type="button"
      onClick={this.reRenderprofilePage}
    >
      Retry
    </button>
  )

  addFilterEmployeType = id => {
    const {employeeTypeList} = this.state

    let uniqueArr
    const typeIsInclude = employeeTypeList.includes(id)
    console.log(typeIsInclude)
    if (typeIsInclude) {
      uniqueArr = employeeTypeList.filter(eachObj => eachObj !== id)
    } else {
      uniqueArr = [...employeeTypeList, id]
    }
    this.setState(
      {employeeTypeList: uniqueArr, jobsListsStatus: pageStatus.INTIAL},
      this.getJobsLists,
    )
  }

  fltereBasedOnEmployementType = () => {
    const {employeeTypeList} = this.state

    return (
      <div className="emp-type-container">
        <h1 className="emp-type-heading">Type Of Employement</h1>
        <ul className="emp-type-lists">
          {employmentTypesList.map(eachObj => {
            const isInclude = employeeTypeList.includes(
              eachObj.employmentTypeId,
            )
            return (
              <FilterTypeItem
                key={eachObj.employmentTypeId}
                typeDetails={eachObj}
                addFilterEmployeType={this.addFilterEmployeType}
                isInclude={isInclude}
              />
            )
          })}
        </ul>
      </div>
    )
  }

  updateSalaryRange = id => {
    this.setState(
      {salaryRange: id, jobsListsStatus: pageStatus.INTIAL},
      this.getJobsLists,
    )
  }

  filterBasedOnSalary = () => (
    <div className="emp-type-container">
      <h1 className="emp-type-heading">Salary Range</h1>
      <ul className="emp-type-lists">
        {salaryRangesList.map(eachObj => (
          <FilterSalaryItem
            key={eachObj.salaryRangeId}
            salaryDetails={eachObj}
            updateSalaryRange={this.updateSalaryRange}
          />
        ))}
      </ul>
    </div>
  )

  profilePageShowing = () => {
    const {profileDetailsStatus} = this.state
    switch (profileDetailsStatus) {
      case pageStatus.INTIAL:
        return this.showingLoading()
      case pageStatus.PROFILEAPISUCCESS:
        return this.showingProfileSuccessJsx()
      case pageStatus.PROFILEAPIFAILED:
        return this.showingProfileFailed()
      default:
        return null
    }
  }

  showingCartIsEmty = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobsimage"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  showSuccessJobsJsx = jobsList => (
    <ul className="un-lists-container">
      {jobsList.map(eachObj => (
        <JobItem key={eachObj.id} jobDetails={eachObj} />
      ))}
    </ul>
  )

  showingJobsJsx = () => {
    const {jobsList} = this.state

    const listIsEmpty = jobsList.length === 0
    if (listIsEmpty) {
      return this.showingCartIsEmty()
    }
    return this.showSuccessJobsJsx(jobsList)
  }

  showApiFailedJobsView = () => (
    <div className="no-jobs-container">
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

  getShowingJobsList = () => {
    const {jobsListsStatus} = this.state
    switch (jobsListsStatus) {
      case pageStatus.INTIAL:
        return this.showingLoading()
      case pageStatus.JOBSAPISUCCESS:
        return this.showingJobsJsx()
      case pageStatus.JOBSAPIFAILED:
        return this.showApiFailedJobsView()
      default:
        return null
    }
  }

  updateUserSearch = event => {
    this.setState({userSearchRole: event.target.value})
  }

  userSearchFilterApply = () => {
    this.getJobsLists()
  }

  removeAllFilters = () => {
    this.setState(
      {
        jobsListsStatus: pageStatus.INTIAL,
        userSearchRole: '',
        salaryRange: '',
        employeeTypeList: [],
      },
      this.getJobsLists,
    )
  }

  render() {
    const {userSearchRole} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-inner-container">
            <div className="profile-and-filter-container">
              <div className="input-container-for-mobile">
                <input
                  value={userSearchRole}
                  type="search"
                  className="input-field"
                  placeholder="Search"
                  onChange={this.updateUserSearch}
                />
                <button
                  type="button"
                  className="search-icon-button"
                  data-testid="searchButton"
                  onClick={this.userSearchFilterApply}
                >
                  <IoSearch className="search-icon" aria-label="search" />
                </button>
              </div>
              <div className="jobs-profile-container">
                {this.profilePageShowing()}
              </div>
              <hr className="separater-line" />
              {this.fltereBasedOnEmployementType()}
              <hr className="separater-line" />
              {this.filterBasedOnSalary()}
              <hr className="separater-line" />
              <button
                className="remove-filter-button"
                type="button"
                onClick={this.removeAllFilters}
              >
                Remove Filters
              </button>
            </div>
            <div className="jobs-showing-container">
              <div className="input-container-for-laptop">
                <input
                  value={userSearchRole}
                  type="search"
                  className="input-field"
                  placeholder="Search"
                  onChange={this.updateUserSearch}
                />
                <button
                  type="button"
                  className="search-icon-button"
                  data-testid="searchButton"
                  onClick={this.userSearchFilterApply}
                >
                  <IoSearch className="search-icon" aria-label="search" />
                </button>
              </div>
              {this.getShowingJobsList()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default JobsPage
