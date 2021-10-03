import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { CustomLoader } from '@/components/common/loader';
import { GithubReposTypes } from '@/types/global/index';
import { TextField } from '@material-ui/core';
// import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  repos: GithubReposTypes[];
  isOpen: boolean;
  isFetch: boolean;
  getBranches: (repository: string) => Promise<void>;
  closeDialog: () => void;
};

const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
`;
const StyledBoxContentWrapper = styled(Box)`
  text-align: center;
  padding-bottom: 24px;
  padding-top: 24px;
  height: 400px;
`;
// const StyledBoxBorder = styled(Box)`
//   margin-bottom: 16px;
//   border-bottom: 1px solid #dddddd;
//   padding: 0 8px 8px 8px;
//   text-align: left;
// `;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const GithubDialog: React.FC<Props> = props => {
  const { repos, isFetch, isOpen, closeDialog } = props;
  const [choosedRepository, setChoosedRepository] = useState('');
  const [isBranchFetch, setIsBranchFetch] = useState(false);

  const getBranches = async (
    _: React.ChangeEvent<{}>,
    githubRepos: GithubReposTypes | null
  ) => {
    const currentRepoFullName = githubRepos!.fullName;
    // 同じリポジトリを選択した場合は、returnする
    if (currentRepoFullName === choosedRepository) return;
    setChoosedRepository(currentRepoFullName);
    const branches = choosedRepositoryBranches(currentRepoFullName);
    // ブランチが存在する場合は、過去に選択されたリポジトリなので、apiを叩かなくて良い
    if (branches.length > 0) return;
    setIsBranchFetch(true);
    await props.getBranches(currentRepoFullName);
    setIsBranchFetch(false);
  };

  const choosedRepositoryBranches = (repositoryName: string) => {
    const repository = repos.filter(el => el.fullName === repositoryName);
    if (repository.length <= 0) return [];
    return repository[0].branches;
  };

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
            <>
              <Box mb={4}>
                <Autocomplete
                  disablePortal
                  autoHighlight
                  autoSelect
                  id='repository'
                  options={repos}
                  style={{ width: '100%' }}
                  getOptionLabel={option => option.name}
                  renderInput={(params: any) => (
                    <TextField {...params} label='Repository' />
                  )}
                  onChange={getBranches}
                />
              </Box>
              <Autocomplete
                disablePortal
                autoHighlight
                autoSelect
                id='branch'
                options={choosedRepositoryBranches(choosedRepository)}
                style={{ width: '100%' }}
                getOptionLabel={option => option.name}
                renderInput={(params: any) => (
                  <TextField {...params} label='Branch' />
                )}
                loading={isBranchFetch}
              />
            </>
            // repos.map((repo, index) => (
            //   <StyledBoxBorder key={index}>
            //     <Button
            //       color='primary'
            //       variant={
            //         repo.fullName === choosedRepository ? 'contained' : 'text'
            //       }
            //       disableElevation
            //       onClick={() => getBranches(repo.fullName)}
            //     >
            //       <span>{repo.name}</span>
            //     </Button>
            //     <ul>
            //       {repo.branches.map(branch => (
            //         <li>{branch}</li>
            //       ))}
            //     </ul>
            //   </StyledBoxBorder>
            // ))
          )}
        </DialogContent>
      </StyledBoxContentWrapper>
    </Dialog>
  );
};
