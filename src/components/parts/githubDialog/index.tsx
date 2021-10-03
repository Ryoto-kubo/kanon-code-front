import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { CustomLoader } from '@/components/common/loader';
import { GihubReposTypes } from '@/types/global/index';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import styled from 'styled-components';

type Props = {
  repos: GihubReposTypes[];
  isOpen: boolean;
  isFetch: boolean;
  closeDialog: () => void;
};

const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
`;
const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 32px;
  padding-top: 24px;
`;
const StyledBoxBorder = styled(Box)`
  margin-bottom: 16px;
  border-bottom: 1px solid #dddddd;
  padding: 0 8px 8px 8px;
  text-align: left;
`;
const StyledBoxAnchorWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const GithubDialog: React.FC<Props> = props => {
  const { repos, isFetch, isOpen, closeDialog } = props;
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth='sm'
      onClose={closeDialog}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <StyledBoxWrapper>
        <CustomHeading2 fontSize={20} marginBottom={0}>
          Repository
        </CustomHeading2>
      </StyledBoxWrapper>
      <StyledBoxContentWrapper>
        <DialogContent>
          {isFetch ? (
            <CustomLoader width={30} height={30} />
          ) : repos.length <= 0 ? (
            <p>レポジトリが存在しません。</p>
          ) : (
            repos.map((repo, index) => (
              <StyledBoxBorder key={index}>
                <StyledBoxAnchorWrapper>
                  <span>{repo.name}</span>
                </StyledBoxAnchorWrapper>
              </StyledBoxBorder>
            ))
          )}
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
