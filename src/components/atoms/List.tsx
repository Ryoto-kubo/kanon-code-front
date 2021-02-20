import React from 'react'
import styled from 'styled-components'

interface Props {
  fontSize: number
  listArray: Array<string>
  color?: string
}

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`
const StyledList = styled.li<Pick<Props, 'fontSize' | 'color'>>`
  font-size: ${({ fontSize }) => fontSize}px;
  list-style: none;
  margin-bottom: 8px;
`

export const List: React.FC<Props> = (props) => {
  let list = []
  for (const index in props.listArray) {
    list.push(
      <StyledList key={index} fontSize={props.fontSize}>
        {props.listArray[index]}
      </StyledList>,
    )
  }
  return <StyledUl>{list}</StyledUl>
}
