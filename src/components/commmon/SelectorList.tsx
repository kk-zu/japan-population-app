import React, { useState } from 'react'
import { SelectorItem } from 'src/types/common/selector'
import './SelectorList.scss'

type Props = {
  selectors: Array<SelectorItem>
  title: string
  description: string
  buttonLabel: string
  onClick: (ids: Array<string>) => void
}

const SelectorList: React.FC<Props> = (props) => {
  const [selectedIds, setSelectedIds] = useState<Array<string>>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = e.target.value
    if (selectedIds.includes(targetId)) {
      setSelectedIds(selectedIds.filter((id) => id !== targetId))
    } else {
      setSelectedIds([...selectedIds, targetId])
    }
  }

  const handleClick = () => {
    props.onClick(selectedIds)
  }

  return (
    <div className="selector-list">
      <div className="selector-list__header">
        <div className="selector-list__title">{props.title}</div>
        <div className="selector-list__description">{props.description}</div>
        <div className="selector-list__button">
          <button onClick={handleClick}>{props.buttonLabel}</button>
        </div>
      </div>
      <ul className="selector-list__body">
        {props.selectors.map((item) => (
          <li className="selector-list__selector" key={item.id}>
            <label>
              <input
                className="selector-list__input"
                type="checkbox"
                value={item.id}
                onChange={handleChange}
                checked={selectedIds.includes(item.id)}
              />
              {item.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectorList
