import { SolidLink } from '@/components/atoms/SolidLink';
import { CustomLoader } from '@/components/common/loader';
import { useDeposit } from '@/hooks/useDeposit';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useState } from 'react';
import styled from 'styled-components';
type Props = {
  isOpenDialog: boolean;
  closeDialog: () => void;
  totalSales: number;
};

const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 32px;
  padding-top: 24px;
`;
const StyledBoxMessageWrapper = styled(Box)`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const renderMoveAnnounce = () => {
  return (
    <>
      <Box mb={2}>出金申請をするには口座登録が必要です</Box>
      <SolidLink href='/bank?redirect_uri=sales' borderRadius={4}>
        口座を登録する
      </SolidLink>
    </>
  );
};

const renderForm = (
  withdrawableBalance: number,
  value: number,
  changeValue: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
) => {
  return (
    <>
      <StyledBoxMessageWrapper mb={2}>
        残高：¥{withdrawableBalance}
      </StyledBoxMessageWrapper>
      <TextField label='引き出し額' onChange={changeValue} />
    </>
  );
};
export const DepositDialog: React.FC<Props> = props => {
  const [value, setValue] = useState(0);
  const { data, isValidating } = useDeposit();
  const hasBank = data?.data.hasBank;
  const withdrawableBalance = props.totalSales - data?.data.deposit;
  const changeValue = (
    event: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ) => {};
  return (
    <Dialog
      open={props.isOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={'sm'}
      onClose={props.closeDialog}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <StyledBoxContentWrapper>
        <DialogContent>
          {isValidating ? (
            <CustomLoader width={30} height={30} />
          ) : !hasBank ? (
            renderMoveAnnounce()
          ) : (
            renderForm(withdrawableBalance, value, changeValue)
          )}
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
