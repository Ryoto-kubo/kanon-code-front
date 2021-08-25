import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import styled from 'styled-components';
import CreditSvg from '../../../assets/illustration/credit.svg';

type Props = {
  redirectUri: string;
  isOpenDialog: boolean;
  showToggleDialog: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const StyledPairCreditSvg = styled(CreditSvg)`
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${props => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const RegistCreditAnnounceDialog: React.FC<Props> = props => {
  return (
    <Dialog
      open={props.isOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={'sm'}
      onClose={props.showToggleDialog}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogContent>
        <NoSettingDataWrapper
          text='クレジットカードを登録する'
          description='
            レビューを購入するにはクレジットカードの登録が必要です。
          '
          href={`/billing?redirect_uri=${props.redirectUri}`}
          borderRadius={4}
          mb={6}
        >
          <StyledPairCreditSvg />
        </NoSettingDataWrapper>
      </DialogContent>
    </Dialog>
  );
};
