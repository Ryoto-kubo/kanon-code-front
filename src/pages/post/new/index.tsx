import { CustomSnackbar } from '@/components/atoms/CustomSnackbar';
import { CustomLoader } from '@/components/common/loader';
import { LinkGithubButton } from '@/components/molecules/LinkGithubButton';
import { TextFieldWithCheckBox } from '@/components/molecules/TextFieldWithCheckBox';
import { InputPostTitleWrapper } from '@/components/organisms/InputPostTitleWrapper';
import { GithubDialog } from '@/components/parts/githubDialog';
// import { InputTagWrapper } from '@/components/organisms/InputTagWrapper';
import { PostSettingDialog } from '@/components/parts/postSettingDialog';
import { TreeObjectDialog } from '@/components/parts/treeObjectDialog';
import * as CONSTS from '@/consts/const';
import { targetLanguages } from '@/consts/target-languages';
import { usePost } from '@/hooks/usePost';
import LayoutPost from '@/layouts/post';
import { UserTypes } from '@/types/global';
import * as S3 from '@/utils/api/s3';
import { moveToTop } from '@/utils/move-page';
import { validLength } from '@/utils/valid';
// import { IconButton, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
// import Help from '@material-ui/icons/Help';
import 'highlight.js/scss/vs2015.scss';
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
import './style.scss';

type Props = {
  authUser: any;
  currentUser: UserTypes;
  isFetch: boolean;
};

const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/editor').then(r => r.Editor);
    return promise;
  },
  { ssr: false }
);

const StyledContainer = styled(Container)`
  max-width: 1200px;
  margin-bottom: 40px;
`;
const StyledBoxFlex = styled(Box)`
  display: block;
  ${props => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`;
const StyledBoxInputGroupWrapper = styled(Box)`
  margin-bottom: 16px;
  ${props => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0px;
    margin-right: 24px;
    width: 30%;
  }
`;
const StyledBoxInputWrapper = styled(Box)`
  display: flex;
  align-items: center;
`;
const StyledBoxCordEditorWrapper = styled(Box)`
  ${props => props.theme.breakpoints.up('sm')} {
    width: 70%;
    max-width: 70%;
  }
`;

const IndexPage: React.FC<Props> = props => {
  if (props.isFetch) {
    return <></>;
  }
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const {
    title,
    postId,
    isSuccessed,
    description,
    sourceCode,
    inputFileNameLists,
    targetLanguageValue,
    budget,
    programmingIcon,
    activeStep,
    currentIndex,
    isOpenDialog,
    isOpenTreeDialog,
    setIsOpenTreeDialog,
    isOpenGithubDialog,
    buttonText,
    canPublish,
    isValidBudget,
    hasGithubAccessToken,
    isLoading,
    isFetchGithubData,
    repos,

    previousPage,
    closeSnackBar,
    closeDialog,
    prepareValidRegister,
    registerContent,
    draftContent,
    changeTitle,
    changeDescritption,
    changeFileName,
    changeSourceCode,
    changeActiveStep,
    addListsItem,
    deleteListsItem,
    onBlurGetLang,
    onFocusGetIndex,
    handleTabChange,
    selectTargetLanguage,
    changeBudget,
    selectProgrammingIcon,
    updateButtonText,
    updateCanPublish,
    getRepos,
    getBranches,
    getSourceTreeByBranch,
    insertToInputFileNameLists,
    closeGithubDialog,
  } = usePost();

  // const HelpToolTip = () => {
  //   return (
  //     <Tooltip title='パスの入力について'>
  //       <IconButton size='small' onClick={() => setIsOpenTreeDialog(true)}>
  //         <Help />
  //       </IconButton>
  //     </Tooltip>
  //   );
  // };

  return (
    <LayoutPost
      title='Kanon Code | レビュー依頼'
      currentUser={props.currentUser}
      prepareValidRegister={prepareValidRegister}
      draftContent={draftContent}
      previousPage={previousPage}
      updateButtonText={updateButtonText}
      buttonText={buttonText}
    >
      <StyledContainer>
        <Box component='section' pb={5}>
          <Box mb={3} className='title-wrapper'>
            <InputPostTitleWrapper
              title={title}
              onChange={changeTitle}
              placeholder='Title'
            />
          </Box>
          {/* <Box mb={3} className='tag-list-wrapper'>
            <InputTagWrapper changeTagList={changeTagList} />
          </Box> */}
          <Box mb={5} className='description-wrapper'>
            <Editor
              id='editor'
              isFullDisplayButton={true}
              headerText='Description'
              onChange={changeDescritption}
              changeActiveStep={changeActiveStep}
              value={description}
              activeStep={activeStep}
              isValid={validLength(description, CONSTS.MAX_DESCRIPTION_LENGTH)}
              updateCanPublish={updateCanPublish}
              uploadImageToS3={S3.uploadImageToS3}
              MAX_LENGTH={CONSTS.MAX_DESCRIPTION_LENGTH}
            />
          </Box>
          <Box mb={3} className='source-code-wrapper'>
            <StyledBoxFlex>
              <StyledBoxInputGroupWrapper>
                <Box mb={2}>
                  <Box mb={1} position='relative' height='36px'>
                    {isLoading ? (
                      <CustomLoader width={25} height={25} />
                    ) : (
                      <LinkGithubButton
                        text={
                          hasGithubAccessToken
                            ? 'リポジトリからファイルを選択'
                            : 'Githubと連携する'
                        }
                        onClick={getRepos}
                      />
                    )}
                  </Box>
                  <p className='notification'>
                    ※
                    Githubに連携するとリポジトリからファイルを選択できるようになります。
                  </p>
                </Box>
                <Box className='input-wrapper'>
                  {/* {HelpToolTip()} */}
                  {inputFileNameLists.map((el, index) => (
                    <StyledBoxInputWrapper mb={2} key={el.key}>
                      <TextFieldWithCheckBox
                        index={index}
                        listLength={inputFileNameLists.length}
                        value={el.fileName}
                        variant='outlined'
                        size='small'
                        placeholder='some/path/file.ext'
                        onClick={() => addListsItem()}
                        onDelete={() => deleteListsItem(el.key, index)}
                        onChangeFileName={event =>
                          changeFileName(event.target.value, index)
                        }
                        onFocusGetIndex={() => onFocusGetIndex(index)}
                        onBlurGetLang={() => onBlurGetLang(index)}
                      />
                    </StyledBoxInputWrapper>
                  ))}
                </Box>
              </StyledBoxInputGroupWrapper>
              <StyledBoxCordEditorWrapper>
                <Editor
                  id='cord-editor'
                  isFullDisplayButton={false}
                  headerText='Source Code'
                  onChange={changeSourceCode}
                  changeActiveStep={changeActiveStep}
                  value={sourceCode}
                  activeStep={activeStep}
                  isValid={validLength(
                    sourceCode,
                    CONSTS.MAX_SOURCE_CODE_LENGTH
                  )}
                  updateCanPublish={updateCanPublish}
                  uploadImageToS3={S3.uploadImageToS3}
                  currentIndex={currentIndex}
                  handleTabChange={handleTabChange}
                  inputFileNameLists={inputFileNameLists}
                  MAX_LENGTH={CONSTS.MAX_SOURCE_CODE_LENGTH}
                />
              </StyledBoxCordEditorWrapper>
            </StyledBoxFlex>
          </Box>
        </Box>
      </StyledContainer>
      <PostSettingDialog
        title='PostSetting'
        isSuccessed={isSuccessed}
        isOpenDialog={isOpenDialog}
        isValidBudget={isValidBudget}
        closeDialog={closeDialog}
        contentsTitle={title}
        postId={postId}
        displayName={props.currentUser!.user_profile.display_name}
        targetLanguages={targetLanguages}
        targetLanguageValue={targetLanguageValue}
        budget={budget}
        programmingIcon={programmingIcon}
        selectTargetLanguage={selectTargetLanguage}
        changeBudget={changeBudget}
        selectProgrammingIcon={selectProgrammingIcon}
        registerContent={registerContent}
      />
      <GithubDialog
        repos={repos}
        isOpen={isOpenGithubDialog}
        isFetch={isFetchGithubData}
        getBranches={getBranches}
        getSourceTreeByBranch={getSourceTreeByBranch}
        insertToInputFileNameLists={insertToInputFileNameLists}
        closeDialog={closeGithubDialog}
      />
      <TreeObjectDialog
        isOpenDialog={isOpenTreeDialog}
        closeDialog={() => setIsOpenTreeDialog(false)}
      />
      <CustomSnackbar
        isOpen={!canPublish.isValid}
        closeSnackBar={closeSnackBar}
      >
        <Box fontWeight='bold'>{canPublish.message}</Box>
      </CustomSnackbar>
    </LayoutPost>
  );
};
export default IndexPage;
