import React, { useEffect, useMemo, useState } from 'react'
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

const Population: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Array<SelectorItem>>([])
  const [populations, setPopulations] = useState<Array<PopulatiomGraphItem>>([])
  const [selectedPrefectureIds, setSelectedPrefectureIds] = useState<
    Array<string>
  >([])

  useEffect(() => {
    fetchPrefectures()
      .then((prefectures: Array<Prefecture>) => {
        setPrefectures(
          prefectures.map((prefecture) => {
            return {
              id: prefecture.prefCode.toString(),
              name: prefecture.prefName,
            }
          }),
        )
      })
      .catch(() => {
        // エラー画面でリトライを促すメッセージを表示する
        // エラー処理は大抵はアプリケーションごとに決まっているため今回は省く
      })
  }, [])

  /**
   * 選択された都道府県のみグラフに描画するための人口を保持する
   */
  const populationsForDraw = useMemo(() => {
    return populations.filter((population) => {
      return selectedPrefectureIds.includes(population.prefectureId)
    })
  }, [populations, selectedPrefectureIds])

  /**
   * 選択された都道府県IDを保持する
   * @returns {boolean} true:保持、false:破棄
   */
  const setStateSelectedPrefectureIds = (prefectureId: string): boolean => {
    if (selectedPrefectureIds.includes(prefectureId)) {
      setSelectedPrefectureIds(
        selectedPrefectureIds.filter((id) => id !== prefectureId),
      )
      return false
    } else {
      setSelectedPrefectureIds([...selectedPrefectureIds, prefectureId])
      return true
    }
  }

  /**
   * 人口データを保持していたらtrue
   */
  const hasPopulation = (prefectureId: string): boolean => {
    return populations.some(
      (population) => population.prefectureId === prefectureId,
    )
  }

  /**
   * 都道府県の人口を取得する
   */
  const fetchPopulationsByPrefectureId = (prefectureId: string) => {
    // 取得済みは再取得しない
    if (
      !setStateSelectedPrefectureIds(prefectureId) ||
      hasPopulation(prefectureId)
    )
      return
    const requestParams: PopulationsRequest = {
      prefCode: prefectureId,
      cityCode: '-',
    }
    fetchPopulation(requestParams)
      .then((population) => {
        const selectedPrefecture = prefectures.find(
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
          data: populationDataForDraw.data.map((datum) => {
            return { x: datum.year, y: datum.value }
          }),
          prefectureId: prefectureId,
        }
        setPopulations([...populations, convertedPopulationForGraph])
      })
      .catch(() => {
        // トースター等でリトライを促すメッセージを表示する
        // エラー処理は大抵はアプリケーションごとに決まっているため今回は省く
      })
  }
  const title = '都道府県一覧'
  const description = 'グラフを表示したい都道府県をチェックしてください。'
  const graphEmptyTitle =
    '人口推移を表示したい都道府県を選択するとグラフが表示されます。'

  return (
    <div className="population">
      <div className="population__prefectures">
        <SelectorList
          selectors={prefectures}
          title={title}
          description={description}
          onCheck={fetchPopulationsByPrefectureId}
        ></SelectorList>
      </div>
      <div className="population__graph">
        <LineGraph lines={populationsForDraw} emptyText={graphEmptyTitle} />
      </div>
    </div>
  )
}

export default Population
