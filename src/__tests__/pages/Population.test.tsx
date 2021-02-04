import React from 'react'
import { render } from '@testing-library/react'
import Population from '../../pages/Population'
import { fetchPrefectures } from 'src/apis/resas_api/prefectures'

jest.mock('src/apis/resas_api/prefectures')

test('Population Component renders prefecture list', async () => {
  const prefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ]

  // @ts-ignore
  fetchPrefectures.mockImplementationOnce(() => Promise.resolve(prefectures))

  const { container } = await render(<Population />)
  const selectorWrapper = container.querySelector('.population__prefectures')
  expect(selectorWrapper?.querySelectorAll('li')).toHaveLength(2)
})
