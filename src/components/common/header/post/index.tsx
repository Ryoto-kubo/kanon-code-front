import { CustomSwitch } from '@/components/atoms/CustomSwitch';
import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { StandardAppBar } from '@/components/atoms/StandardAppBar';
import { ArrowButton } from '@/components/molecules/ArrowButton';
import theme from '@/styles/theme';
import { Box } from '@material-ui/core/';
import React, { useState } from 'react';
import styled from 'styled-components';

type ButtonText = Readonly<
  '投稿設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>;
type Props = {
  prepareValidRegister: () => void;
  draftContent: () => void;
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
const StyledUseMr = styled(Box)`
  margin-right: 24px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;

export const ThePostHeader: React.FC<Props> = React.memo(props => {
  const mainTextColor = theme.palette.text.primary;
  const disabledColor = '#707070';
  const [isPublish, setIsPublish] = useState(false);
  const [color, setColor] = useState(disabledColor);
  const onPostOrDraft = async () => {
    if (!isPublish) {
      await props.draftContent();
    } else {
      props.prepareValidRegister();
    }
  };
  const switchPublish = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    const value: ButtonText = isChecked ? '投稿設定' : '下書き保存';
    const color = isChecked ? mainTextColor : disabledColor;
    props.updateButtonText(value);
    setIsPublish(isChecked);
    setColor(color);
  };
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
          <StyledUseMr color={color}>
            <CustomSwitch onChange={switchPublish} />
            公開する
          </StyledUseMr>
          <CustomSolidButton
            sizing='small'
            onClick={onPostOrDraft}
            disabled={props.buttonText === '保存済み ✔︎'}
          >
            {props.buttonText}
          </CustomSolidButton>
        </Box>
      </StyledBox>
    </StandardAppBar>
  );
});
