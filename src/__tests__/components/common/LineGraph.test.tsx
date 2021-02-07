import React from 'react'
import { render, screen } from '@testing-library/react'
import LineGraph from '../../../components/commmon/LineGraph'
import { LineGraphItem } from 'src/types/common/graph'
import { act } from 'react-dom/test-utils'

describe('props', () => {
  const emptyText = '空です'
  test('LineGraph Component renders graph', async () => {
    const lines: Array<LineGraphItem> = [
      {
        id: '北海道',
        data: [
          {
            x: '2000',
            y: 100,
          },
          {
            x: '2010',
            y: 200,
          },
        ],
      },
    ]

    const { container } = render(
      <LineGraph lines={lines} emptyText={emptyText} />,
    )
    expect(screen.queryByText(emptyText)).toBeNull()
    expect(
      container.querySelector('.line-graph')?.childElementCount,
    ).toBeGreaterThanOrEqual(1)
  })

  test('SelectorList Component renders empty text', () => {
    const lines: Array<LineGraphItem> = []

    render(<LineGraph lines={lines} emptyText={emptyText} />)
    expect(screen.queryByText(emptyText)).not.toBeNull()
  })
})
