import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { BaseTextField } from '@/components/atoms/TextField';
import { ValidMessage } from '@/components/molecules/ValidMessage';
import { MAX_PRICE, PAYMENT_FEE, PAYMENT_FREE } from '@/consts/const';
import { validMessages } from '@/consts/error-messages';
import { paymentTypes } from '@/consts/payment-types';
import theme from '@/styles/theme';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import marked from 'marked';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
type Props = {
  title: string;
  review: string;
  isOpenDialog: boolean;
  showToggleDialog: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  registerContent: (
    paymentType: number,
    beginPaymentArea: number | null,
    price: number,
    displayBodyHtml: string,
    remainingLength: number
  ) => void;
};

type ValidObject = {
  isValid: boolean;
  message: string;
};

const StyledTitle = styled(Box)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const StyledBoxFlex = styled(Box)`
  display: block;
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
`;
const StyledBoxButtonsWrapper = styled(Box)`
  padding: 24px 24px 16px 24px;
  text-align: right;
`;
const StyledButton = styled(Button)`
  width: 100%;
  margin: 5px 0;
  transition: 0.3s all;
  color: #fafafa;
  font-weight: bold;
  &:hover {
    opacity: 1;
    color: #ffffff;
    background: ${theme.palette.primary.main};
  }
`;
const StyledBoxBg = styled(Box)`
  background: #fafafa;
  padding: 16px;
  border-radius: 4px;
  max-height: 500px;
  overflow-y: scroll;
  margin-bottom: 8px;
`;
const StyledRemainigText = styled(Box)`
  font-weight: bold;
  color: ${theme.palette.primary.main};
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const createValidObject = (defaultValue: boolean, defaultMessage: string) => {
  return {
    isValid: defaultValue,
    message: defaultMessage,
  };
};

const validPrice = (price: number) => {
  return price > 0 && price <= MAX_PRICE;
};

const validNumber = (price: string) => {
  const regExp = new RegExp(/^[0-9]*$/);
  return regExp.test(price);
};

export const ReviewSettingDialog: React.FC<Props> = props => {
  const excludeTags = ['', '<ul>', '</ul>'];
  const BEGIN_CODE_TAG = '<pre>';
  const ENDE_CODE_TAG = '</pre>';
  const [paymentType, setPaymentType] = useState(PAYMENT_FREE); // 0: 無料 1: 有料
  const [beginPaymentArea, setBeginPaymentArea] = useState<number | null>(null);
  const [rawHtmlList, setRawHtmlList] = useState<string[]>(['']);
  const [price, setPrice] = useState(1500);
  const [totalLength, setTotalLength] = useState(0);
  const [remainingLength, setRemainingLength] = useState(0);
  const [isValidPrice, setIsValidPrice] = useState<ValidObject>(
    createValidObject(true, '')
  );
  const [isValidPaymentArea, setIsValidPaymentArea] = useState<ValidObject>(
    createValidObject(true, '')
  );

  useEffect(() => {
    let isCodeBlock = false;
    marked(props.review, (_, result) => {
      let joinedCode: string = '';
      const resultList: string[] = [];
      const splitedList = result.split('\n');
      // Make the code area a single element and push it.
      for (const item of splitedList) {
        const foundBeginCode = item.search(BEGIN_CODE_TAG);
        const foundEndCode = item.search(ENDE_CODE_TAG);
        if (isCodeBlock) {
          joinedCode = `${joinedCode}\n${item}`;
          if (foundEndCode >= 0) {
            resultList.push(joinedCode);
            joinedCode = '';
            isCodeBlock = false;
          }
        } else {
          if (foundBeginCode >= 0) {
            joinedCode = `${joinedCode}\n${item}`;
            isCodeBlock = true;
          } else {
            resultList.push(item);
          }
        }
      }
      setTotalLength(result.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').length);
      setRawHtmlList(resultList.filter(el => el));
    });
  }, [props.review]);

  const changePaymentType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPaymentType(value);
  };

  const changePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValidNumber = validNumber(event.target.value);
    if (!isValidNumber) {
      return;
    }
    const value = Number(event.target.value);
    const isValid = validPrice(value);
    if (!isValid) {
      setIsValidPrice(
        createValidObject(false, validMessages.ZERO_UNDER_OVER_MAX_PRICE)
      );
    } else {
      setIsValidPrice(createValidObject(true, ''));
    }
    setPrice(value);
  };

  const validPaymentArea = () => {
    let isResult = true;
    if (beginPaymentArea === null) {
      isResult = false;
      setIsValidPaymentArea(
        createValidObject(false, validMessages.NOT_SELECTED_PAYMENTAREA)
      );
    }
    return isResult;
  };

  const calcRemainingLength = (selectedIndex: number) => {
    // 残り文字数を計算する
    // 選択したラインのindexだけループさせ、htmlをjoinする
    // ループが終わったらhtmlタグを除去し可視範囲の文字数を算出
    // トータルの文字数からマイナスする
    let joinedCode = '';
    for (let i = 0; i <= selectedIndex; i++) {
      const item = rawHtmlList[i];
      joinedCode = `${joinedCode}\n${item}`;
    }
    const showReviewLength = joinedCode.replace(
      /<("[^"]*"|'[^']*'|[^'">])*>/g,
      ''
    ).length;
    setRemainingLength(totalLength - showReviewLength);
  };

  const selectPaymentArea = (selectedIndex: number) => {
    calcRemainingLength(selectedIndex);
    setIsValidPaymentArea(createValidObject(true, ''));
    setBeginPaymentArea(selectedIndex);
  };

  const makeDisplayBodyHtml = () => {
    if (beginPaymentArea === null) return '';
    let joinedCode: string = '';
    for (let i = 0; i <= beginPaymentArea; i++) {
      const item = rawHtmlList[i!];
      joinedCode = `${joinedCode}\n${item}`;
    }
    return joinedCode;
  };

  const preRegister = () => {
    let displayBodyHtml = '';
    const isValidPaymentArea = validPaymentArea();
    if (paymentType === PAYMENT_FREE) {
      displayBodyHtml = marked(props.review);
    } else if (paymentType === PAYMENT_FEE) {
      if (!isValidPrice.isValid || !isValidPaymentArea) return;
      displayBodyHtml = makeDisplayBodyHtml();
    }
    props.registerContent(
      paymentType,
      beginPaymentArea,
      price,
      displayBodyHtml,
      remainingLength
    );
  };

  return (
    <Dialog
      open={props.isOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={'md'}
      onClose={props.showToggleDialog}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <StyledBoxWrapper>
        <CustomHeading2 fontSize={20} marginBottom={0}>
          レビュー設定
        </CustomHeading2>
      </StyledBoxWrapper>
      <Box>
        <DialogContent>
          <StyledTitle>販売設定</StyledTitle>
          <FormControl component='fieldset'>
            <RadioGroup
              aria-label='praymentTypes'
              name='praymentTypes'
              value={paymentType}
              onChange={changePaymentType}
            >
              <StyledBoxFlex>
                {paymentTypes.map(el => (
                  <FormControlLabel
                    key={el.id}
                    value={el.value}
                    control={<Radio color='primary' />}
                    label={el.text}
                  />
                ))}
              </StyledBoxFlex>
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Box>
      {paymentType === 1 && (
        <>
          <Box>
            <DialogContent>
              <StyledTitle>レビュー価格</StyledTitle>
              <Box mt={2} mb={1}>
                <BaseTextField
                  id='price'
                  type='text'
                  value={price}
                  label='設定金額（円）'
                  placeholder={'0'}
                  rows={0}
                  onChange={changePrice}
                  inputMode='numeric'
                  error={false}
                />
              </Box>
              {!isValidPrice.isValid && (
                <ValidMessage validText={isValidPrice.message} />
              )}
            </DialogContent>
          </Box>
          <Box>
            <DialogContent>
              <Box display='flex' justifyContent='space-between'>
                <StyledTitle>有料エリア設定</StyledTitle>
                <Box>
                  有料エリアの文字数：
                  <StyledRemainigText component='span'>
                    {remainingLength}
                  </StyledRemainigText>
                </Box>
              </Box>
              <StyledBoxBg>
                {rawHtmlList.map((el: string, index: number) => (
                  <Box key={index}>
                    <span
                      id='review'
                      className='review-item-wrapper'
                      dangerouslySetInnerHTML={{
                        __html: marked(el),
                      }}
                    />
                    {!excludeTags.includes(el) &&
                      rawHtmlList.length - 1 !== index && (
                        <StyledButton
                          onClick={() => selectPaymentArea(index)}
                          style={{
                            background:
                              beginPaymentArea === index
                                ? theme.palette.secondary.main
                                : '',
                          }}
                        >
                          Click!このラインより上のエリアが無料で表示されます
                        </StyledButton>
                      )}
                  </Box>
                ))}
              </StyledBoxBg>
              {!isValidPaymentArea.isValid && (
                <ValidMessage validText={isValidPaymentArea.message} />
              )}
            </DialogContent>
          </Box>
        </>
      )}
      <StyledBoxButtonsWrapper>
        <Box mr={1} display='inline-block'>
          <Button onClick={props.showToggleDialog} color='default'>
            キャンセル
          </Button>
        </Box>
        <CustomSolidButton
          sizing='small'
          onClick={() => preRegister()}
          color='secondary'
        >
          レビュー
        </CustomSolidButton>
      </StyledBoxButtonsWrapper>
    </Dialog>
  );
};
