import React, { useState } from 'react'
import SelectorList from 'src/components/commmon/SelectorList'
import { SelectorItem } from 'src/types/common/selector'
import './Population.scss'

const Population: React.FC = () => {
  // TODO: 確認用の初期値
  const defaultPrefectures: Array<SelectorItem> = [
    {
      id: '1',
      name: '北海道',
    },
    {
      id: '2',
      name: '青森県',
    },
  ]
  const [prefectures, setPrefectures] = useState<Array<SelectorItem>>(
    defaultPrefectures,
  )

  return (
    <div className="population">
      <div className="population__prefectures">
        <SelectorList selectors={prefectures}></SelectorList>
      </div>
      <div className="population__graph">グラフを表示する</div>
    </div>
  )
}

export default Population
