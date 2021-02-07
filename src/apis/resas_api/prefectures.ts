import {
  Prefecture,
  PrefecturesResponse,
} from 'src/types/prefectures/prefectures'
import resasApi from './resasApi'

export async function fetchPrefectures(): Promise<Array<Prefecture>> {
  const response = await resasApi
    .get<PrefecturesResponse>('/api/v1/prefectures')
    .catch(() => {
      throw Error('都道府県一覧が取得できませんでした。再度お試しください。')
    })
  return response.data.result
}
