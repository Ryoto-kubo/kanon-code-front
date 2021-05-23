import { CustomHeading2 } from '@/components/atoms/CustomHeading2'
import { IconArrowBack } from '@/components/svg/materialIcons/IconArrowBack'
import Box from '@material-ui/core/Box'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

type HrefProps = {
  href: string
}
type HeadingProps = {
  headingFontSize: number
  marginBottom: number
}
type IconProps = {
  fontSize: 'small' | 'inherit' | 'default' | 'large' | undefined
  color:
    | 'inherit'
    | 'disabled'
    | 'action'
    | 'primary'
    | 'secondary'
    | 'error'
    | undefined
}

const StyledBoxFlex = styled(Box)`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

export const BackPage: React.FC<HrefProps & IconProps & HeadingProps> = (
  props,
) => {
  const { href, headingFontSize, marginBottom, ...iconProps } = props
  return (
    <Link href={href}>
      <StyledBoxFlex>
        <Box mr={0.5} height={24}>
          <IconArrowBack {...iconProps} />
        </Box>
        <CustomHeading2 fontSize={headingFontSize} marginBottom={marginBottom}>
          {props.children}
        </CustomHeading2>
      </StyledBoxFlex>
    </Link>
  )
}
