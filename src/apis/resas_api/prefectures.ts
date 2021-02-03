import {
  Prefecture,
  PrefecturesResponse,
} from 'src/types/prefectures/prefectures'
import resasApi from './resasApi'

export async function fetchPrefectures(): Promise<Array<Prefecture>> {
  const response = await resasApi.get<PrefecturesResponse>(
    '/api/v1/prefectures',
  )
  return response.data.result
}
