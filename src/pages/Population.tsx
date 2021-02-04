import React from 'react'
import { fetchPopulations } from 'src/apis/resas_api/populations'
import { fetchPrefectures } from 'src/apis/resas_api/prefectures'
import SelectorList from 'src/components/commmon/SelectorList'
import { SelectorItem } from 'src/types/common/selector'
import { PopulationsRequest } from 'src/types/populations/populations'
import { Prefecture } from 'src/types/prefectures/prefectures'
import './Population.scss'

type State = {
  prefectures: Array<SelectorItem>
  populations: Array<any>
}

export default class Population extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = { prefectures: [], populations: [] }
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

  async fetchPopulationsByPrefectureIds(prefectureIds: Array<string>) {
    const requestParams: PopulationsRequest = {
      prefCode: prefectureIds[0],
      cityCode: '-',
    }
    await fetchPopulations(requestParams)
      .then((populations) => {
        console.log(populations)
        this.setState({
          populations: populations,
        })
      })
      .catch(() => {
        // トースター等でリトライを促すメッセージを表示する
        // エラー処理は大抵はアプリケーションごとに決まっているため今回は省く
      })
  }

  render() {
    const title = '都道府県一覧'
    const description =
      '人口推移のグラフを表示したい都道府県をチェックし、ボタンをクリックしてください。'
    const buttonLabel = 'グラフを表示'
    return (
      <div className="population">
        <div className="population__prefectures">
          <SelectorList
            selectors={this.state.prefectures}
            title={title}
            description={description}
            buttonLabel={buttonLabel}
            onClick={this.fetchPopulationsByPrefectureIds}
          ></SelectorList>
        </div>
        <div className="population__graph">グラフを表示する</div>
      </div>
    )
  }
}
