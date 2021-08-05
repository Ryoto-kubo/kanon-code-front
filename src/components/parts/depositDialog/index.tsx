import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { SolidLink } from '@/components/atoms/SolidLink';
import { CustomLoader } from '@/components/common/loader';
import { useDeposit } from '@/hooks/useDeposit';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useState } from 'react';
import styled from 'styled-components';
// const NumberEasing = require('react-number-easing');

type Props = {
  isOpenDialog: boolean;
  closeDialog: () => void;
  totalSales: number;
};

const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
  padding-top: 24px;
  padding-bottom: 16px;
`;
const StyledBoxMessageWrapper = styled(Box)`
  font-size: 16px;
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

const renderTextField = (
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
      <TextField
        label='引き出し額'
        value={value}
        onChange={changeValue}
        InputProps={{
          startAdornment: <InputAdornment position='start'>¥</InputAdornment>,
        }}
      />
    </>
  );
};

export const DepositDialog: React.FC<Props> = props => {
  const [value, setValue] = useState(0);
  const [withdrawableBalance, setWithdrawableBalance] = useState(10000);
  const { data, isValidating } = useDeposit();
  const hasBank = data?.data.hasBank;
  const baseWithdrawableBalance = 10000;

  const validNumber = (price: string) => {
    const regExp = new RegExp(/^[0-9]*$/);
    return regExp.test(price);
  };

  const changeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isValidNumber = validNumber(event.target.value);
    if (!isValidNumber) {
      return;
    }
    const value = Number(event.target.value);
    setValue(value);
    setWithdrawableBalance(baseWithdrawableBalance - value);
  };

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
            <>
              <Box mb={4}>
                {renderTextField(withdrawableBalance, value, changeValue)}
              </Box>
              <Box textAlign='right'>
                <CustomSolidButton
                  sizing='small'
                  onClick={() => console.log('hoge')}
                >
                  出金する
                </CustomSolidButton>
              </Box>
            </>
          )}
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
