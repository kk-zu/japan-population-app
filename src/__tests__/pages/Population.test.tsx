import React from 'react'
import { render } from '@testing-library/react'
import Population from '../../pages/Population'
import { fetchPrefectures } from 'src/apis/resas_api/prefectures'
import { act } from 'react-dom/test-utils'

jest.mock('src/apis/resas_api/prefectures')

describe('render', () => {
  test('Population Component renders prefecture list', async () => {
    const prefectures = [
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
    ]

    // @ts-ignore
    fetchPrefectures.mockImplementationOnce(() => Promise.resolve(prefectures))
    let dom: any = null
    await act(async () => {
      const { container } = render(<Population />)
      dom = container
    })
    const selectorWrapper = dom.querySelector('.population__prefectures')
    expect(selectorWrapper?.querySelectorAll('li')).toHaveLength(2)
  })
})
