import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { SolidLink } from '@/components/atoms/SolidLink';
import { CustomLoader } from '@/components/common/loader';
import { errorMessages } from '@/consts/error-messages';
import { useBank } from '@/hooks/useBank';
import theme from '@/styles/theme';
import { postWithdrawal } from '@/utils/api/post-withdrawal';
import { Player } from '@lottiefiles/react-lottie-player';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  isOpenDialog: boolean;
  closeDialog: () => void;
  displayConfirmedSales: number;
  setDisplayConfirmedSales: React.Dispatch<React.SetStateAction<number>>;
  baseWithdrawableBalance: number;
  setBaseWithdrawalBalance: React.Dispatch<React.SetStateAction<number>>;
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
const StyledAnchor = styled(`a`)`
  color: ${theme.palette.primary.main};
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
      <Box mb={2}>振り込み申請をするには口座登録が必要です</Box>
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

const successApplication = () => {
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
          <Box>振り込み申請を受け付けました。</Box>
        </StyledBoxMessageWrapper>
        <Box lineHeight={1.7}>
          一週間以内にご登録口座へお振り込みいたします。
          <br />
          キャンセルされる場合や、一週間経っても振り込まれない場合は、
          <br />
          お手数ですが下記のフォームからお問い合わせください。
          <br />
          <Link href='https://forms.gle/rrKhLEXspvqCcuCAA' passHref>
            <StyledAnchor target='_brank' rel='noopener'>
              振り込み申請に関するお問い合わせ
            </StyledAnchor>
          </Link>
        </Box>
      </StyledBoxAbsolute>
    </Box>
  );
};

export const DepositDialog: React.FC<Props> = props => {
  const [value, setValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonText, setButtonText] = useState<
    '振り込みする' | '振り込み申請中...'
  >('振り込みする');
  const { bank, isLoading } = useBank();
  const hasBank = !!bank;

  const validNumber = (value: string) => {
    const regExp = new RegExp(/^[0-9]*$/);
    return regExp.test(value);
  };

  const validLimit = (value: number) => {
    return value <= props.baseWithdrawableBalance;
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
    props.setDisplayConfirmedSales(props.baseWithdrawableBalance - value);
    if (value <= 0) {
      setIsDisabled(true);
    }
  };

  const post = async () => {
    const isValidLimit = validLimit(value);
    if (!isValidLimit) return;
    setButtonText('振り込み申請中...');
    setIsDisabled(true);
    try {
      await postWithdrawal({ value });
      setShowSuccess(true);
      props.setBaseWithdrawalBalance(props.baseWithdrawableBalance - value);
      setValue(0);
      setButtonText('振り込みする');
      setIsDisabled(false);
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
      setButtonText('振り込みする');
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
          {isLoading ? (
            <CustomLoader width={30} height={30} />
          ) : !hasBank ? (
            renderMoveAnnounce()
          ) : showSuccess ? (
            successApplication()
          ) : props.baseWithdrawableBalance <= 0 ? (
            <Box mb={'16px'}>残高がありません</Box>
          ) : (
            <>
              <Box mb={4}>
                {renderTextField(
                  props.displayConfirmedSales,
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
