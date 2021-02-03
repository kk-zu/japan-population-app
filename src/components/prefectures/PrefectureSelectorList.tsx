import React from 'react'
import { Prefecture } from 'src/types/prefectures'

type PrefectureProps = { prefectures: Array<Prefecture> }

const PrefectureSelectorList: React.FC<PrefectureProps> = (props) => {
  // TODO: チェックボックス付きでメモ可
  // TODO: チェックボックス
  return (
    <ul>
      {props.prefectures.map((prefecture) => (
        <li>{prefecture.prefName}</li>
      ))}
    </ul>
  )
}

export default PrefectureSelectorList
