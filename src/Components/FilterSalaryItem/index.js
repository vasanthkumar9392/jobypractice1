import './index.css'

const FilterSalaryItem = props => {
  const {salaryDetails, updateSalaryRange} = props
  const {salaryRangeId, label} = salaryDetails

  const onClickSalaryChange = () => {
    updateSalaryRange(salaryRangeId)
  }

  return (
    <li className="type-list">
      <input
        type="radio"
        id={salaryRangeId}
        name="salary"
        value={salaryRangeId}
        className="input-chech-box"
        onClick={onClickSalaryChange}
      />
      <label className="type-label-text" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default FilterSalaryItem
