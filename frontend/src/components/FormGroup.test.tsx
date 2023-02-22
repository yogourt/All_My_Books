import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import FormGroup from './FormGroup'
import Chance from 'chance'

const chance = new Chance()

it('renders', () => {
  const inputType = chance.string()
  const label = chance.string()
  render(<FormGroup inputType={inputType} label={label} />)
})
