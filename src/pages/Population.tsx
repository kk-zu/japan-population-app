import React, { useState } from 'react'
import PrefectureSelectorList from 'src/components/prefectures/PrefectureSelectorList'
import { Prefecture } from 'src/types/prefectures'
import './Population.scss'

const Population: React.FC = () => {
  // TODO: 確認用の初期値
  const defaultPrefectures: Array<Prefecture> = [
    {
      prefCode: 1,
      prefName: '北海道',
    },
    {
      prefCode: 2,
      prefName: '青森県',
    },
  ]
  const [prefectures, setPrefectures] = useState<Array<Prefecture>>(
    defaultPrefectures,
  )

  return (
    <div className="population">
      <div className="population__prefectures">
        <PrefectureSelectorList
          prefectures={prefectures}
        ></PrefectureSelectorList>
      </div>
      <div className="population__graph">グラフを表示する</div>
    </div>
  )
}

export default Population
