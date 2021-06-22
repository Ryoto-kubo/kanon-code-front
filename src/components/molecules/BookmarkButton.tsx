import { RadiusButton } from '@/components/atoms/RadiusButton'
import { IconBookmark } from '@/components/svg/materialIcons/IconBookmark'
import Box from '@material-ui/core/Box'
import React from 'react'

type Props = {
  sizing: 'small' | 'medium' | 'large'
  variant: 'text' | 'outlined' | 'contained' | undefined
  color: 'default' | 'inherit' | 'primary' | 'secondary' | undefined
  onClick: Function
}

export const BookmarkButton: React.FC<Props> = (props) => {
  return (
    <RadiusButton {...props}>
      <Box mr={1} height="20px">
        <IconBookmark fontSize="small" color={undefined} />
      </Box>
      Bookmark
    </RadiusButton>
  )
}
