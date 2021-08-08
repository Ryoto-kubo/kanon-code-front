import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { SolidLink } from '@/components/atoms/SolidLink';
import { CustomLoader } from '@/components/common/loader';
import { errorMessages } from '@/consts/error-messages';
import { useWithdrawal } from '@/hooks/useWithdrawal';
import { postWithdrawal } from '@/utils/api/post-withdrawal';
import { Player } from '@lottiefiles/react-lottie-player';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
const StyledBoxAbsolute = styled(Box)`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  displayWithdrawableBalance: number,
  value: number,
  changeValue: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
) => {
  return (
    <>
      <StyledBoxMessageWrapper mb={2}>
        残高：¥{displayWithdrawableBalance}
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

const successAnimation = () => {
  const SUCCESS_ANIMATION_SRC =
    'https://assets7.lottiefiles.com/packages/lf20_yom6uvgj.json';
  return (
    <Box height={300} position='relative'>
      <StyledBoxAbsolute>
        <Box mb={1}>
          <Player
            autoplay
            keepLastFrame
            src={SUCCESS_ANIMATION_SRC}
            controls={true}
            style={{ height: '100px', width: '100px' }}
          />
        </Box>
        <StyledBoxMessageWrapper>
          <Box>出金依頼を受け付けました。</Box>
        </StyledBoxMessageWrapper>
        <Box lineHeight={1.7}>
          一週間以内にご登録口座へお振り込みいたします。
          <br />
          キャンセルされる場合や、一週間経っても振り込まれない場合は、
          <br />
          お手数ですが下記までご連絡お願いいたします。
          <br />
          info@kanon-code.com
        </Box>
      </StyledBoxAbsolute>
    </Box>
  );
};

export const DepositDialog: React.FC<Props> = props => {
  const { data, isValidating } = useWithdrawal();
  const [value, setValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [displayWithdrawableBalance, setDisplaytWithdrawableBalance] = useState(
    0
  );
  const [baseWithdrawableBalance, setBaseWithdrawableBalance] = useState(0);
  const [buttonText, setButtonText] = useState<'出金する' | '出金依頼中...'>(
    '出金する'
  );
  const hasBank = data?.data.hasBank;
  useEffect(() => {
    setDisplaytWithdrawableBalance(
      props.totalSales - data?.data.totalWithdrawal
    );
    setBaseWithdrawableBalance(props.totalSales - data?.data.totalWithdrawal);
  }, [data]);

  const validNumber = (value: string) => {
    const regExp = new RegExp(/^[0-9]*$/);
    return regExp.test(value);
  };

  const validLimit = (value: number) => {
    return value <= baseWithdrawableBalance;
  };

  const changeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const isValidNumber = validNumber(event.target.value);
    if (!isValidNumber) return;
    const value = Number(event.target.value);
    const isValidLimit = validLimit(value);
    if (!isValidLimit) return;
    setValue(value);
    setIsDisabled(false);
    setDisplaytWithdrawableBalance(baseWithdrawableBalance - value);
    if (value <= 0) {
      setIsDisabled(true);
    }
  };

  const post = async () => {
    const isValidLimit = validLimit(value);
    if (!isValidLimit) return;
    setButtonText('出金依頼中...');
    setIsDisabled(true);
    try {
      await postWithdrawal({ value });
      setShowSuccess(true);
      setBaseWithdrawableBalance(baseWithdrawableBalance - value);
      setValue(0);
      setButtonText('出金する');
      setIsDisabled(false);
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
      setButtonText('出金する');
      setIsDisabled(false);
    }
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
          ) : showSuccess ? (
            successAnimation()
          ) : baseWithdrawableBalance <= 0 ? (
            <Box mb={'16px'}>残高がありません</Box>
          ) : (
            <>
              <Box mb={4}>
                {renderTextField(
                  displayWithdrawableBalance,
                  value,
                  changeValue
                )}
              </Box>
              <Box textAlign='right'>
                <CustomSolidButton
                  sizing='small'
                  onClick={() => post()}
                  disabled={isDisabled}
                >
                  {buttonText}
                </CustomSolidButton>
              </Box>
            </>
          )}
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
