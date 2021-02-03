import React from 'react'
import { SelectorItem } from 'src/types/common/selector'

type Props = { selectors: Array<SelectorItem> }

const SelectorList: React.FC<Props> = (props) => {
  // TODO: チェックボックス付きステート
  // TODO: チェックボックス
  return (
    <ul>
      {props.selectors.map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  )
}

export default SelectorList
