import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { CustomSolidButton } from '@/components/atoms/SolidButton';
import { CustomLoader } from '@/components/common/loader';
import { GithubSourceTree } from '@/components/molecules/GithubSourceTree';
import { ValidMessage } from '@/components/molecules/ValidMessage';
import { useGithubDialog } from '@/hooks/useGithubDialog';
import { ResponseGithubSourceTreeTypes } from '@/types/api/get-github-source-tree';
import { GithubReposTypes } from '@/types/global/index';
import { IconButton, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AxiosResponse } from 'axios';
import marked from 'marked';
import React from 'react';
import styled from 'styled-components';

type Props = {
  repos: GithubReposTypes[];
  isOpen: boolean;
  isFetch: boolean;
  getBranches: (repository: string) => Promise<void>;
  getSourceTreeByBranch: (
    repository: string,
    branch: string
  ) => Promise<AxiosResponse<ResponseGithubSourceTreeTypes>>;
  closeDialog: () => void;
};

const StyledBoxHeaderWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledBoxWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 24px;
  padding-top: 24px;
  height: 400px;
`;
const StyledBoxContetntWrapper = styled(Box)`
  display: block;
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxSettingWrapper = styled(Box)`
  width: 100%;
  margin-bottom: 24px;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 30%;
    max-width: 320px;
  }
`;
const StyledBoxAutoCompleteChild = styled(Box)`
  margin-bottom: 16px;
`;
const StyledBoxGetCodeButton = styled(Box)`
  text-align: right;
  margin-bottom: 32px;
`;
const StyledBoxTreeWrapper = styled(Box)`
  position: relative;
  padding-bottom: 20px;
`;
const StyledBoxSourceCodeWrapper = styled(Box)`
  text-align: left;
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 77%;
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const GithubDialog: React.FC<Props> = props => {
  const {
    repos,
    isFetch,
    isOpen,
    getBranches,
    getSourceTreeByBranch,
    closeDialog,
  } = props;

  const {
    choosedRepository,
    choosedBranch,
    isBranchFetch,
    isTreeFetch,
    treeObject,
    decodedContent,
    isChoosedRepository,
    isChoosedBranch,
    getBranchesBySelectedRepo,
    getChoosedRepositoryBranches,
    selectBranch,
    getTree,
    getContent,
  } = useGithubDialog(repos, getBranches, getSourceTreeByBranch);

  const key = `${choosedRepository}#${choosedBranch}`;
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      fullScreen
      fullWidth
      maxWidth='sm'
      onClose={closeDialog}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <StyledBoxHeaderWrapper>
        <CustomHeading2 fontSize={20} marginBottom={0}>
          Repository
        </CustomHeading2>
        <IconButton
          edge='start'
          color='inherit'
          onClick={closeDialog}
          aria-label='close'
        >
          <CloseIcon />
        </IconButton>
      </StyledBoxHeaderWrapper>
      <StyledBoxWrapper>
        <DialogContent>
          <StyledBoxContetntWrapper>
            <StyledBoxSettingWrapper>
              {isFetch ? (
                <CustomLoader width={30} height={30} />
              ) : repos.length <= 0 ? (
                <p>レポジトリが存在しません。</p>
              ) : (
                <>
                  <StyledBoxAutoCompleteChild>
                    <Box mb={0.5}>
                      <Autocomplete
                        disablePortal
                        autoHighlight
                        autoSelect
                        id='repository'
                        options={repos}
                        style={{ width: '100%' }}
                        getOptionLabel={option => option.name}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label='Repository'
                            error={!isChoosedRepository}
                          />
                        )}
                        onChange={getBranchesBySelectedRepo}
                      />
                    </Box>
                    {!isChoosedRepository && (
                      <ValidMessage validText='リポジトリを選択してください' />
                    )}
                  </StyledBoxAutoCompleteChild>
                  <StyledBoxAutoCompleteChild>
                    <Box mb={0.5}>
                      <Autocomplete
                        disablePortal
                        autoHighlight
                        autoSelect
                        id='branch'
                        options={getChoosedRepositoryBranches(
                          choosedRepository
                        )}
                        style={{ width: '100%' }}
                        getOptionLabel={option => option.name}
                        renderInput={(params: any) => (
                          <TextField
                            {...params}
                            label='Branch'
                            error={!isChoosedBranch}
                          />
                        )}
                        loading={isBranchFetch}
                        onChange={selectBranch}
                      />
                    </Box>
                    {!isChoosedBranch && (
                      <ValidMessage validText='ブランチを選択してください' />
                    )}
                  </StyledBoxAutoCompleteChild>
                  <StyledBoxGetCodeButton>
                    <CustomSolidButton
                      sizing='small'
                      color='primary'
                      onClick={getTree}
                    >
                      コードを取得
                    </CustomSolidButton>
                  </StyledBoxGetCodeButton>
                  <StyledBoxTreeWrapper>
                    {isTreeFetch ? (
                      <CustomLoader width={25} height={25} />
                    ) : (
                      <GithubSourceTree
                        sourceTree={treeObject[key]}
                        getContent={getContent}
                      />
                    )}
                  </StyledBoxTreeWrapper>
                </>
              )}
            </StyledBoxSettingWrapper>
            <StyledBoxSourceCodeWrapper>
              <span
                className='decode-item-wrapper'
                dangerouslySetInnerHTML={{
                  __html: marked(decodedContent),
                }}
              />
            </StyledBoxSourceCodeWrapper>
          </StyledBoxContetntWrapper>
        </DialogContent>
      </StyledBoxWrapper>
    </Dialog>
  );
};
