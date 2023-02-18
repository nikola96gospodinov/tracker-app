import { render, screen } from '@testing-library/react'

import Home from '../pages/index'

describe('Home', () => {
    it('should render properly', () => {
        render(<Home />)
    })
})
