export type Population = {
  boundaryYear: number
  data: { label: string; data: { year: number; value: number; rate?: number } }
}
export type PopulationsResponse = { message: string; result: Array<Population> }
export type PopulationsRequest = {
  prefCode: string
  cityCode: string | '-'
  addArea?: string
}
