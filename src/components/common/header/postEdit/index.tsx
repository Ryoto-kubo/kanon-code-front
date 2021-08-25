import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { StandardAppBar } from '@/components/atoms/StandardAppBar';
import { ArrowButton } from '@/components/molecules/ArrowButton';
import { Box } from '@material-ui/core/';
import React from 'react';
import styled from 'styled-components';

type ButtonText = Readonly<
  '投稿設定' | '編集設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>;
type Props = {
  prepareValidRegister: () => void;
  previousPage: () => void;
  updateButtonText: (value: ButtonText) => void;
  buttonText: ButtonText;
};
const StyledBox = styled(Box)`
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
  ${props => props.theme.breakpoints.up('sm')} {
    padding: 0 24px;
  }
`;

export const ThePostEditHeader: React.FC<Props> = React.memo(props => {
  return (
    <StandardAppBar>
      <StyledBox
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <ArrowButton
          disableRipple={true}
          func={props.previousPage}
          fontSize='default'
          color='primary'
        />
        <Box display='flex' alignItems='center'>
          <CustomSolidButton
            sizing='small'
            onClick={() => props.prepareValidRegister()}
            disabled={props.buttonText === '保存済み ✔︎'}
          >
            {props.buttonText}
          </CustomSolidButton>
        </Box>
      </StyledBox>
    </StandardAppBar>
  );
});
