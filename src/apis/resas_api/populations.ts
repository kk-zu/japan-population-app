import {
  Population,
  PopulationsRequest,
  PopulationsResponse,
} from 'src/types/populations/populations'
import resasApi from './resasApi'

export async function fetchPopulation(
  params: PopulationsRequest,
): Promise<Population> {
  const response = await resasApi
    .get<PopulationsResponse>('/api/v1/population/composition/perYear', {
      params,
    })
    .catch(() => {
      throw Error('都道府県の人口が取得できませんでした。再度お試しください。')
    })
  return response.data.result
}
