import { CircleElement } from '@/components/atoms/Circle';
import { ParagraphText } from '@/components/atoms/ParagraphText';
import theme from '@/styles/theme';
import { Box } from '@material-ui/core/';
import { alpha } from '@material-ui/core/styles';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  date: string;
  budget: number;
  userIcon: string;
  width?: string;
  height?: string;
}

const StyledAnchor = styled(`a`)`
  color: ${theme.palette.text.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const StyledBoxNameWrapper = styled(Box)`
  word-break: break-all;
`;
const StyledBoxBudget = styled(Box)`
  color: ${theme.palette.primary.main};
  background: ${alpha(theme.palette.primary.main, 0.1)};
  border-radius: 4px 0 4px 0;
  padding: 2px 5px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

export const PostFooter: React.FC<Props> = props => {
  return (
    <Box display='flex' alignItems='center'>
      <CircleElement width={`${props.width}`} height={`${props.height}`}>
        <Link href={`/${props.name}`} passHref>
          <a>
            <img
              src={props.userIcon}
              style={{
                borderRadius: '50px',
                width: `${props.width}`,
                height: `${props.height}`,
              }}
            />
          </a>
        </Link>
      </CircleElement>
      <Box>
        <Link href={`/${props.name}`} passHref>
          <StyledAnchor>
            <StyledBoxNameWrapper component='p'>{`${props.name}`}</StyledBoxNameWrapper>
          </StyledAnchor>
        </Link>
        <Box display='flex' alignItems='center'>
          <Box mr={1}>
            <ParagraphText variant='body2' component='p' color='textSecondary'>
              {props.date}
            </ParagraphText>
          </Box>
          <StyledBoxBudget>
            <MonetizationOnOutlinedIcon style={{ fontSize: 17 }} />
            <Box ml={0.5}>
              {props.budget ? `~¥${props.budget}` : '予算未設定'}
            </Box>
          </StyledBoxBudget>
        </Box>
      </Box>
    </Box>
  );
};
