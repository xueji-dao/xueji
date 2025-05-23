import { render } from '@testing-library/react'

import SemanticUi from './semantic-ui'

describe('SemanticUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SemanticUi />)
    expect(baseElement).toBeTruthy()
  })
})
