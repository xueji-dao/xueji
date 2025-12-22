import styled from '@emotion/styled'

export const StyledButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => {
    switch (props.variant) {
      case 'primary':
        return '#1976d2'
      case 'secondary':
        return '#9c27b0'
      case 'danger':
        return '#d32f2f'
      default:
        return '#1976d2'
    }
  }};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`
