import React from 'react'
import styled from 'styled-components'

interface Props {
  fontSize: number
  marginBottom: number
  color?: string
}

const StyledHeading3 = styled.h3<
  Pick<Props, 'fontSize' | 'marginBottom' | 'color'>
>`
  font-size: ${({ fontSize }) => fontSize}px;
  margin-bottom: ${({ marginBottom }) => marginBottom * 8}px;
  color: ${({ color }) => color};
`

export const Heading3: React.FC<Props> = (props) => {
  return (
    <StyledHeading3
      fontSize={props.fontSize}
      marginBottom={props.marginBottom}
      color={props.color}
    >
      {props.children}
    </StyledHeading3>
  )
}
