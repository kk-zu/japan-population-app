import React from 'react'
import { fetchPrefectures } from 'src/apis/resas_api/prefectures'
import SelectorList from 'src/components/commmon/SelectorList'
import { SelectorItem } from 'src/types/common/selector'
import { Prefecture } from 'src/types/prefectures/prefectures'
import './Population.scss'

type State = {
  prefectures: Array<SelectorItem>
}

export default class Population extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = { prefectures: [] }
  }

  async componentDidMount() {
    await fetchPrefectures()
      .then((prefectures: Array<Prefecture>) => {
        this.setState({
          prefectures: prefectures.map((prefecture) => {
            return {
              id: prefecture.prefCode.toString(),
              name: prefecture.prefName,
            }
          }),
        })
      })
      .catch(() => {
        // エラー画面でリトライを促すメッセージを表示する
        // エラー処理は大抵はアプリケーションごとに決まっているため今回は省く
      })
  }

  render() {
    return (
      <div className="population">
        <div className="population__prefectures">
          <SelectorList selectors={this.state.prefectures}></SelectorList>
        </div>
        <div className="population__graph">グラフを表示する</div>
      </div>
    )
  }
}
