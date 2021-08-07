import React from 'react'
import { axe } from 'jest-axe'
import { render, sleep } from '~/tests/utils'
import { Delayed } from '../delayed'

describe('Shared > Components > <Delayed />', () => {
  it('should match the snapshot', () => {
    const screen = render(
      <Delayed>
        <h1>Hello world</h1>
      </Delayed>
    )
    expect(screen).toMatchSnapshot()
  })

  it('should have no accessibility violations', async () => {
    const screen = render(
      <Delayed>
        <h1>Hello world</h1>
      </Delayed>
    )
    const results = await axe(screen.container)
    expect(results).toHaveNoViolations()
  })

  it('should hide the elements for the specified delayMs', async () => {
    const screen = render(
      <Delayed delayMs={500}>
        <h1>Delayed content</h1>
      </Delayed>
    )
    expect(screen.queryByText(/delayed content/i)).toBeFalsy()
    await sleep(500)
    expect(await screen.findByText(/delayed content/i)).toBeVisible()
  })
})
