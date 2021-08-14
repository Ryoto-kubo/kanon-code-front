import { IconTwitter } from '@/components/svg/materialIcons/IconTwitter';
import Link from '@material-ui/core/Link';
import React from 'react';
import styled from 'styled-components';

type Props = {
  twitterName: string;
  fontSize: 'small' | 'inherit' | 'default' | 'large' | undefined;
};
const StyledLinkTwitter = styled(Link)`
  color: #707070;
  &:hover {
    color: #29a1f2;
  }
`;

export const LinkTwitter: React.FC<Props> = props => {
  return (
    <StyledLinkTwitter
      href={`https://twitter.com/${props.twitterName}`}
      target='_blank'
      rel='noopener'
    >
      <IconTwitter fontSize={props.fontSize} />
    </StyledLinkTwitter>
  );
};
