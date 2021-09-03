import { PostFooter } from '@/components/molecules/PostFooter';
import { PostHeader } from '@/components/molecules/PostHeader';
import { Box } from '@material-ui/core/';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  postUrl: string;
  iconPath: string;
  name: string;
  date: string;
  tagArray: Array<string>;
  userIcon: string;
  postStatus: number;
}

const StyledPaper = styled(Paper)`
  height: 100%;
`;
const StyledBoxWraper = styled(Box)`
  min-height: 175px;
  padding: 16px;
`;
const StyledBoxContent = styled(Box)`
  display: flex;
  align-items: center;
`;
const StyledBoxWanted = styled(Box)`
  border-radius: 50px;
  border: 1px solid #0095a8;
  color: #0095a8;
  font-size: 10px;
  font-weight: bold;
  padding: 3px 8px;
`;

export const Post: React.FC<Props> = props => {
  return (
    <StyledPaper>
      <StyledBoxWraper>
        {props.postStatus === 0 && (
          <Box textAlign='right' mb={0.5}>
            <StyledBoxWanted component='span'>レビュー募集中</StyledBoxWanted>
          </Box>
        )}

        <StyledBoxContent display='flex' alignItems='center'>
          <Box mr={2} flexShrink={0}>
            <img
              width={'50px'}
              height={'50px'}
              src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${props.iconPath}`}
            />
          </Box>
          <Box>
            <PostHeader
              title={props.title}
              postUrl={props.postUrl}
              tagArray={props.tagArray}
              postStatus={props.postStatus}
            />
            <PostFooter
              name={props.name}
              date={props.date}
              userIcon={props.userIcon}
              width={'40px'}
              height={'40px'}
            />
          </Box>
        </StyledBoxContent>
      </StyledBoxWraper>
    </StyledPaper>
  );
};
