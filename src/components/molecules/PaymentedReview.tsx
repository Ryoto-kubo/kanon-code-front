import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { Price } from '@/components/atoms/Price';
import { ReviewUser } from '@/components/molecules/ReviewUser';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import styled from 'styled-components';

interface Props {
  reviwerName: string;
  date: string;
  userIcon: string;
  price: number;
  title: string;
  fontSize: number;
  marginBottom: number;
}

const StyledPaper = styled(Paper)`
  height: 100%;
  padding: 12px;
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const PaymentedReview: React.FC<Props> = props => {
  return (
    <StyledPaper>
      <StyledBoxFlex>
        <ReviewUser
          name={props.reviwerName}
          date={props.date}
          userIcon={props.userIcon}
          width={'32px'}
          height={'32px'}
        />
        <Price color={'#EC576B'} text={`¥${props.price}`} />
      </StyledBoxFlex>
      <CustomHeading2
        fontSize={props.fontSize}
        marginBottom={props.marginBottom}
      >
        {props.title}
      </CustomHeading2>
    </StyledPaper>
  );
};
