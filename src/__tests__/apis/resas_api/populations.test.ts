import { fetchPopulation } from 'src/apis/resas_api/populations'
import {
  Population,
  PopulationsResponse,
  PopulationsRequest,
} from 'src/types/populations/populations'
import resasApi from 'src/apis/resas_api/resasApi'

jest.mock('src/apis/resas_api/resasApi')
test('fetchPopulation fetch Population', async () => {
  const population: Population = {
    boundaryYear: 2015,
    data: [
      {
        label: '人口',
        data: [
          {
            year: 2019,
            value: 10000,
          },
          {
            year: 2020,
            value: 10500,
          },
        ],
      },
    ],
  }
  const request: PopulationsRequest = {
    prefCode: 'prefectureCode',
    cityCode: '-',
  }
  const response: PopulationsResponse = {
    message: '',
    result: population,
  }
  // @ts-ignore
  resasApi.get.mockResolvedValue({ data: response })
  expect(await fetchPopulation(request)).toBe(population)
})
