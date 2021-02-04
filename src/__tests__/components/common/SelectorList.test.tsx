import React from 'react'
import { render, screen } from '@testing-library/react'
import SelectorList from '../../../components/commmon/SelectorList'
import { SelectorItem } from 'src/types/common/selector'

describe('props', () => {
  test('SelectorList Component renders selectors list', () => {
    const selectors: Array<SelectorItem> = [
      { id: '1', name: '北海道' },
      { id: '2', name: '青森県' },
    ]

    render(<SelectorList selectors={selectors} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  test('SelectorList Component renders no list', () => {
    const selectors: Array<SelectorItem> = []

    render(<SelectorList selectors={selectors} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
