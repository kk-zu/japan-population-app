export type Population = {
  boundaryYear: number
  data: Array<{
    label: string
    data: Array<{ year: number; value: number; rate?: number }>
  }>
}
export type PopulationsResponse = { message: string; result: Population }
export type PopulationsRequest = {
  prefCode: string
  cityCode: string | '-'
  addArea?: string
}
