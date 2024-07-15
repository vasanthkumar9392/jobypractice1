import './index.css'

const SkillItem = props => {
  const {skillDetails} = props

  const imageUrl = skillDetails.image_url
  const skillName = skillDetails.name

  return (
    <li className="skill-list-container">
      <img className="skill-image" src={imageUrl} alt={skillName} />
      <p className="skill-para">{skillName}</p>
    </li>
  )
}

export default SkillItem
