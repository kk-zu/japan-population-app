import { fetchPrefectures } from 'src/apis/resas_api/prefectures'
import {
  Prefecture,
  PrefecturesResponse,
} from 'src/types/prefectures/prefectures'
import resasApi from 'src/apis/resas_api/resasApi'

jest.mock('src/apis/resas_api/resasApi')
test('fetchPrefectures fetch Array<Prefecture>', async () => {
  const prefectures: Array<Prefecture> = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ]
  const response: PrefecturesResponse = {
    message: '',
    result: prefectures,
  }
  // @ts-ignore
  resasApi.get.mockResolvedValue({ data: response })
  expect(await fetchPrefectures()).toBe(prefectures)
})
