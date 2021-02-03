import React, { useState } from 'react'
import { SelectorItem } from 'src/types/common/selector'
import './SelectorList.scss'

type Props = { selectors: Array<SelectorItem> }

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

  return (
    <ul className="selector-list">
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
  )
}

export default SelectorList
