import React from 'react'
import { axe } from 'jest-axe'
import { render, userEvent, waitFor } from '~/tests/utils'
import { DarkModeButton } from '../dark-mode-button'
import { defaultColorModeStorage } from '~/tests/utils/chakra'

describe('Shared > Components > <DarkModeButton />', () => {
  beforeEach(() => {
    defaultColorModeStorage.colorMode = 'light'
  })

  it('should match the snapshot', () => {
    const screen = render(<DarkModeButton />)
    expect(screen).toMatchSnapshot()
  })

  it('should have no accessibility violations', async () => {
    const screen = render(<DarkModeButton />)
    const results = await axe(screen.container)
    expect(results).toHaveNoViolations()
  })

  it('should toggle the color mode on click', async () => {
    defaultColorModeStorage.colorMode = 'light'
    const screen = render(<DarkModeButton />)
    userEvent.click(
      screen.getByLabelText(/toggle dark mode/i, {
        selector: 'button',
      })
    )

    await waitFor(() => {
      expect(
        screen.getByLabelText(/toggle light mode/i, { selector: 'button' })
      ).toBeInTheDocument()
      expect(defaultColorModeStorage.colorMode).toBe('dark')
    })
  })
})
