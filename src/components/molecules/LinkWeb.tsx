import { IconWeb } from '@/components/svg/materialIcons/IconWeb';
import theme from '@/styles/theme';
import Link from '@material-ui/core/Link';
import React from 'react';
import styled from 'styled-components';

type Props = {
  webSite: string;
  fontSize: 'small' | 'inherit' | 'default' | 'large' | undefined;
};
const StyledLinkWeb = styled(Link)`
  color: #707070;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;

export const LinkWeb: React.FC<Props> = props => {
  return (
    <StyledLinkWeb href={props.webSite} target='_blank' rel='noopener'>
      <IconWeb fontSize={props.fontSize} />
    </StyledLinkWeb>
  );
};
