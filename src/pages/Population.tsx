import React from 'react'
import { fetchPopulation } from 'src/apis/resas_api/populations'
import { fetchPrefectures } from 'src/apis/resas_api/prefectures'
import LineGraph from 'src/components/commmon/LineGraph'
import SelectorList from 'src/components/commmon/SelectorList'
import { SelectorItem } from 'src/types/common/selector'
import { LineGraphItem } from 'src/types/common/graph'
import { PopulationsRequest } from 'src/types/populations/populations'
import { Prefecture } from 'src/types/prefectures/prefectures'
import './scss/Population.scss'

type PopulatiomGraphItem = LineGraphItem & { prefectureId: string }
type State = {
  prefectures: Array<SelectorItem>
  populations: Array<PopulatiomGraphItem>
  selectedPrefectureIds: Array<string>
}

export default class Population extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)
    this.state = { prefectures: [], populations: [], selectedPrefectureIds: [] }
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

  setStateSelectedPrefectureIds(prefectureId: string): boolean {
    const currentSelectedPrefectureIds = this.state.selectedPrefectureIds
    if (currentSelectedPrefectureIds.includes(prefectureId)) {
      this.setState({
        selectedPrefectureIds: currentSelectedPrefectureIds.filter(
          (id) => id !== prefectureId,
        ),
      })
      return false
    } else {
      this.setState({
        selectedPrefectureIds: [...currentSelectedPrefectureIds, prefectureId],
      })
      return true
    }
  }

  hasPopulation(prefectureId: string): boolean {
    return this.state.populations.some(
      (population) => population.prefectureId === prefectureId,
    )
  }

  async fetchPopulationsByPrefectureId(prefectureId: string) {
    // 取得済みは再取得しない
    if (
      this.setStateSelectedPrefectureIds(prefectureId) &&
      this.hasPopulation(prefectureId)
    )
      return
    // TODO: リクエストの回数制限気をつける
    // TODO: status=429の時は0.5秒待ってリトライ
    const requestParams: PopulationsRequest = {
      prefCode: prefectureId,
      cityCode: '-',
    }
    await fetchPopulation(requestParams)
      .then((population) => {
        const selectedPrefecture = this.state.prefectures.find(
          (prefecture) => prefecture.id === prefectureId,
        )
        // selectedPrefectureが存在しない時、画面にも描画されていないので無言で処理をやめる
        if (!selectedPrefecture) return
        const populationDataForDraw = population.data.find(
          (datum) => datum.label === '総人口',
        )
        if (!populationDataForDraw) return // 選択した都道府県に人口のデータがないことを伝える
        const convertedPopulationForGraph: PopulatiomGraphItem = {
          id: selectedPrefecture.name,
          color: '',
          data: populationDataForDraw.data.map((datum) => {
            return { x: datum.year, y: datum.value }
          }),
          prefectureId: prefectureId,
        }
        this.setState({
          populations: [...this.state.populations, convertedPopulationForGraph],
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
      '人口推移のグラフを表示したい都道府県をチェックしてください。'
    return (
      <div className="population">
        <div className="population__prefectures">
          <SelectorList
            selectors={this.state.prefectures}
            title={title}
            description={description}
            onCheck={this.fetchPopulationsByPrefectureId}
          ></SelectorList>
        </div>
        <div className="population__graph">
          <LineGraph lines={this.state.populations} />
        </div>
      </div>
    )
  }
}
