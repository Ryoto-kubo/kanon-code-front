import { SolidLink } from '@/components/atoms/SolidLink';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  href: string;
  isOpenDialog: boolean;
  closeDialog: () => void;
};

const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 32px;
  padding-top: 24px;
`;
const StyledBoxTextWrapper = styled(Box)`
  font-size: 14px;
  margin-bottom: 24px;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const MovePageDialog: React.FC<Props> = props => {
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
          <StyledBoxTextWrapper>
            {props.text}
            <br />
            前のページへ戻りますか？
          </StyledBoxTextWrapper>
          <SolidLink href={props.href} borderRadius={4}>
            前のページへもどる
          </SolidLink>
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
