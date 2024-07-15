import './index.css'

const FilterTypeItem = props => {
  const {typeDetails, addFilterEmployeType, isInclude} = props
  const {employmentTypeId, label} = typeDetails

  console.log(isInclude, employmentTypeId)
  const onClickfilterType = () => {
    addFilterEmployeType(employmentTypeId)
  }

  return (
    <li className="type-list">
      <input
        type="checkbox"
        id={employmentTypeId}
        className="input-chech-box"
        onClick={onClickfilterType}
        checked={isInclude}
      />
      <label htmlFor={employmentTypeId} className="type-label-text">
        {label}
      </label>
    </li>
  )
}

export default FilterTypeItem
