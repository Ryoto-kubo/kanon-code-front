import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';
import styled from 'styled-components';

type Props = {
  isOpenDialog: boolean;
  closeDialog: () => void;
};

const StyledBoxMessageWrapper = styled(Box)`
  font-size: 14px;
  margin-bottom: 8px;
`;
const StyledBoxContentWrapper = styled(Box)`
  padding-bottom: 24px;
  height: 310px;
`;
const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const TreeObjectDialog: React.FC<Props> = props => {
  return (
    <Dialog
      open={props.isOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={'sm'}
      onClose={props.closeDialog}
    >
      <StyledBoxContentWrapper>
        <StyledBoxWrapper>
          <CustomHeading2 fontSize={20} marginBottom={0}>
            パスの入力
          </CustomHeading2>
        </StyledBoxWrapper>
        <DialogContent>
          <StyledBoxMessageWrapper component='p'>
            パスを「/」切りで入力すると閲覧画面でtree構造で表示されます。
          </StyledBoxMessageWrapper>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId='5' label='src'>
              <TreeItem nodeId='6' label='components'>
                <TreeItem nodeId='7' label='atoms'>
                  <TreeItem nodeId='8' label='atoms-01.js' />
                  <TreeItem nodeId='9' label='atoms-02.js' />
                </TreeItem>
                <TreeItem nodeId='10' label='molecules'>
                  <TreeItem nodeId='11' label='molecules-01.js' />
                  <TreeItem nodeId='12' label='molecules-02.js' />
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeView>
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
