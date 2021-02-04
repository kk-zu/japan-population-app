import React from 'react'
import { render, screen } from '@testing-library/react'
import SelectorList from '../../../components/commmon/SelectorList'
import { SelectorItem } from 'src/types/common/selector'

describe('props', () => {
  const commonProps = {
    title: 'title',
    description: 'description',
    buttonLabel: 'button',
    onClick: () => {
      return undefined
    },
  }
  test('SelectorList Component renders selectors list', () => {
    const selectors: Array<SelectorItem> = [
      { id: '1', name: '北海道' },
      { id: '2', name: '青森県' },
    ]

    render(<SelectorList selectors={selectors} {...commonProps} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  test('SelectorList Component renders no list', () => {
    const selectors: Array<SelectorItem> = []

    render(<SelectorList selectors={selectors} {...commonProps} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})

describe('onClick', () => {
  const commonProps = {
    selectors: [
      { id: '1', name: '北海道' },
      { id: '2', name: '青森県' },
    ],
    title: 'title',
    description: 'description',
    buttonLabel: 'button',
  }
  test('call onClick', () => {
    const onClick = jest.fn()

    const { container } = render(
      <SelectorList onClick={onClick} {...commonProps} />,
    )
    const button = container.querySelector('button')
    container.querySelector('input')?.click()
    expect(button?.hasAttribute('disabled')).toBeFalsy()
    button?.click()
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled onClick', () => {
    const onClick = jest.fn()

    const { container } = render(
      <SelectorList onClick={onClick} {...commonProps} />,
    )
    const button = container.querySelector('button')
    expect(button?.hasAttribute('disabled')).toBeTruthy()
  })
})
