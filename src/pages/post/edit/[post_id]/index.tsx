import { CustomSnackbar } from '@/components/atoms/CustomSnackbar';
import { CustomWhiteOutButton } from '@/components/atoms/WhiteOutButton';
import { NotAuth403View } from '@/components/common/403/';
import { CustomLoader } from '@/components/common/loader';
// import { LinkGithubButton } from '@/components/molecules/LinkGithubButton';
import { TextFieldWithCheckBox } from '@/components/molecules/TextFieldWithCheckBox';
import { InputPostTitleWrapper } from '@/components/organisms/InputPostTitleWrapper';
// import { InputTagWrapper } from '@/components/organisms/InputTagWrapper';
import { PostSettingDialog } from '@/components/parts/postSettingDialog';
import { TreeObjectDialog } from '@/components/parts/treeObjectDialog';
import * as CONSTS from '@/consts/const';
import { errorMessages, validMessages } from '@/consts/error-messages';
import { targetLanguages } from '@/consts/target-languages';
import { useEditPost } from '@/hooks/useEditPost';
import LayoutPostEdit from '@/layouts/postEdit';
import { UserTypes } from '@/types/global';
import { putContent } from '@/utils/api/put-content';
import * as S3 from '@/utils/api/s3';
import { moveToTop } from '@/utils/move-page';
import { PrepareContentBeforePost } from '@/utils/prepare-content-before-post';
import { validLength } from '@/utils/valid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import 'highlight.js/scss/vs2015.scss';
import marked from 'marked';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import './style.scss';

type Props = {
  authUser: any;
  currentUser: UserTypes;
  isFetch: boolean;
};
type ProgrammingIcon = {
  id: number;
  value: string;
  iconPath: string;
};
type ButtonText = Readonly<
  '投稿設定' | '編集設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>;
type ValidObject = {
  isValid: boolean;
  message: string;
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

const getPostIdFromPathName = () => {
  const postIdIndex = 3;
  return location.pathname.split('/')[postIdIndex];
};

const createValidObject = (defaultValue: boolean, defaultMessage: string) => {
  return {
    isValid: defaultValue,
    message: defaultMessage,
  };
};

const IndexPage: React.FC<Props> = props => {
  if (props.isFetch) {
    return <></>;
  }
  if (!props.authUser) {
    moveToTop();
    return <></>;
  }
  const postId = getPostIdFromPathName();
  const {
    isLoading,
    authorId,
    keys,
    type,
    buttonText,
    setButtonText,
    title,
    setTitle,
    isSuccessed,
    setIsSuccessed,
    // tagList,
    // setTagList,
    description,
    setDescription,
    sourceCode,
    setSourceCode,
    inputFileNameLists,
    setInputFileNameLists,
    targetLanguageValue,
    setTargetLanguageValue,
    programmingIcon,
    setProgrammingIcon,
    isValidTitleObject,
    setIsValidTitleObject,
    // isValidTagsObject,
    // setIsValidTagsObject,
    isValidDescriptionObject,
    setIsValidDescriptionObject,
    isValidFileNameObject,
    setIsValidFileNameObject,
    isValidSourceCodeObject,
    setIsValidSourceCodeObject,
  } = useEditPost(postId);
  const isMyItem = props.authUser['cognito:username'] === authorId;
  const [activeStep, setActiveStep] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPosted, setIsPosted] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenTreeDialog, setIsOpenTreeDialog] = useState(false);
  const [canPublish, setCanPUblish] = useState<ValidObject>(
    createValidObject(true, '')
  );

  const execPreviousPageIfneeded = (isValidExistData: boolean) => {
    if (isValidExistData && !isPosted) {
      if (confirm('データが入力されています。保存せずに終了しますか？')) {
        history.back();
      }
    } else if (isValidExistData && isPosted) {
      history.back();
    } else if (!isValidExistData) {
      history.back();
    }
  };

  const previousPage = useCallback(() => {
    // データが存在していて下書き保存されていなければ表示させる
    const isValidExistData = validExistData();
    execPreviousPageIfneeded(isValidExistData);
  }, [title, description, inputFileNameLists, isPosted]);
  // }, [title, tagList, description, inputFileNameLists, isPosted]);
  const closeSnackBar = () => {
    setCanPUblish({
      ...canPublish,
      isValid: true,
    });
  };

  const closeDialog = () => {
    setIsOpenDialog(false);
  };

  const createParams = (key: string) => {
    return {
      partitionKey: keys.partition_key,
      sortKey: keys.sort_key,
      postType: key,
      contents: {
        title: title,
        tagList: [],
        // tagList: tagList,
        description: {
          value: description,
          bodyHtml: marked(description),
        },
        inputFileNameLists: inputFileNameLists,
        targetLanguage: targetLanguageValue,
        targetIcon: programmingIcon,
      },
    };
  };

  const initCanPublish = () => {
    setCanPUblish({
      ...canPublish,
      isValid: true,
    });
  };

  const addListsItem = (): void => {
    setInputFileNameLists([
      ...inputFileNameLists,
      {
        key: uuidv4(),
        fileName: '',
        sourceCode: '```\n\n```',
        bodyHtml: '',
        isValid: true,
      },
    ]);
    setIsValidFileNameObject(
      createValidObject(false, validMessages.REQUIRED_FILE_NAME)
    );
  };

  const validExistData = useCallback(() => {
    const isExistTitle = isValidTitleObject.isValid;
    // const isExistTagList = isValidTagsObject.isValid;
    const isExistDescription = isValidDescriptionObject.isValid;
    const isExistFileName = isValidFileNameObject.isValid;
    const isExistSoureCode = isValidSourceCodeObject.isValid;
    return (
      isExistTitle ||
      // isExistTagList ||
      isExistDescription ||
      isExistFileName ||
      isExistSoureCode
    );
  }, [
    isValidTitleObject,
    // isValidTagsObject,
    isValidDescriptionObject,
    isValidFileNameObject,
    isValidSourceCodeObject,
  ]);

  const validFalseIncluded = useCallback(() => {
    const validList = inputFileNameLists.map(el => el.isValid);
    return validList.includes(false);
  }, [inputFileNameLists]);

  const updateButtonText = useCallback((value: ButtonText) => {
    setButtonText(value);
  }, []);

  const updateCanPublish = useCallback((isValid: boolean, message = '') => {
    setCanPUblish({
      ...canPublish,
      isValid: isValid,
      message: message,
    });
  }, []);

  const updateIsValidSourceCode = useCallback(
    (isValid: boolean): void => {
      inputFileNameLists[currentIndex].isValid = isValid;
    },
    [sourceCode, inputFileNameLists]
  );

  const prepareValidRegister = () => {
    if (!isValidTitleObject.isValid) {
      updateCanPublish(false, isValidTitleObject.message);
      return;
    }
    // if (!isValidTagsObject.isValid) {
    //   updateCanPublish(false, isValidTagsObject.message);
    //   return;
    // }
    if (!isValidDescriptionObject.isValid) {
      updateCanPublish(false, isValidDescriptionObject.message);
      return;
    }
    if (!isValidFileNameObject.isValid) {
      updateCanPublish(false, isValidFileNameObject.message);
      return;
    }
    if (!isValidSourceCodeObject.isValid) {
      updateCanPublish(false, isValidSourceCodeObject.message);
      return;
    }
    initCanPublish();
    setIsOpenDialog(true);
  };

  const registerContent = async () => {
    if (programmingIcon.value === '') {
      updateCanPublish(false, 'アイコンを選択してください');
      return;
    }
    const err = new Error();
    const params = createParams('published');
    try {
      const result = await putContent(params);
      if (result.status !== 200) throw err;
      setIsPosted(true);
      setIsSuccessed(true);
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const draftContent = async () => {
    if (!isValidTitleObject.isValid) {
      updateCanPublish(false, isValidTitleObject.message);
      return;
    }
    if (!(description.length <= CONSTS.MAX_DESCRIPTION_LENGTH)) {
      updateCanPublish(false, validMessages.OVER_LENGTH_DESCRIPION);
      return;
    }
    if (!(sourceCode.length <= CONSTS.MAX_SOURCE_CODE_LENGTH)) {
      updateCanPublish(false, validMessages.OVER_LENGTH_SOURCE_CODE);
      return;
    }
    const isValidFalseIncluded = validFalseIncluded();
    if (isValidFalseIncluded) return;
    const err = new Error();
    const params = createParams('draft');
    updateButtonText('保存中...');
    try {
      const result = await putContent(params);
      if (result.status !== 200) throw err;
      setIsPosted(true);
      updateButtonText('保存済み ✔︎');
    } catch {
      alert(errorMessages.SYSTEM_ERROR);
    }
  };

  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value;
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidTitleObject,
        isValidTitleObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_TITLE_LENGTH,
        validMessages.OVER_LENGTH_TITLE
      );
      if (!isValidMaxLength) return;
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_TITLE
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setTitle(value);
    },
    [title]
  );

  // const changeTagList = useCallback(
  //   (values: string[]): void => {
  //     if (values.length > CONSTS.MAX_TAGS_LENGTH) return;
  //     const prepareContentBeforePost = new PrepareContentBeforePost(
  //       values,
  //       setIsValidTagsObject,
  //       isValidTagsObject
  //     );
  //     const isNotValidZeroLength = prepareContentBeforePost.validZeroLength(
  //       validMessages.REQUIRED_TAGS
  //     );
  //     if (isNotValidZeroLength) {
  //       prepareContentBeforePost.successed();
  //     }
  //     setTagList(values);
  //   },
  //   [tagList]
  // );

  const changeDescritption = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidDescriptionObject,
        isValidDescriptionObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_DESCRIPTION_LENGTH,
        validMessages.OVER_LENGTH_DESCRIPION
      );
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_DESCRIPTION
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setDescription(value);
    },
    [description]
  );

  const cnangeFileName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = event.target.value;
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidFileNameObject,
        isValidFileNameObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_FILE_NAME_LENGTH,
        validMessages.OVER_LENGTH_FILE_NAME
      );
      if (!isValidMaxLength) return;
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_FILE_NAME
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setCurrentIndex(index);
      updateInputFileNameLists('fileName', value, index);
    },
    [sourceCode, inputFileNameLists]
  );

  const changeSourceCode = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidSourceCodeObject,
        isValidSourceCodeObject
      );
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_SOURCE_CODE_LENGTH,
        validMessages.OVER_LENGTH_SOURCE_CODE
      );
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_SOURCE_CODE
      );
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed();
      }
      setSourceCode(value);
      updateIsValidSourceCode(isValidMaxLength);
      updateSourceCodeAndBodyHtml(value, currentIndex);
    },
    [sourceCode, inputFileNameLists]
  );

  const changeActiveStep = useCallback(
    (value: number): void => {
      setActiveStep(value);
    },
    [activeStep]
  );

  const deleteListsItem = useCallback(
    (key: string, index: number): void => {
      const newLists = inputFileNameLists.filter(el => el.key !== key);
      const currentItem = newLists[index];
      const sourceCode = currentItem.sourceCode;
      const newInputFileNameLists = newLists.slice();
      setCurrentIndex(index);
      setSourceCode(sourceCode);
      setInputFileNameLists(newInputFileNameLists);
    },
    [sourceCode, inputFileNameLists]
  );

  const updateSourceCodeAndBodyHtml = (value: any, index: number) => {
    const currentItem = inputFileNameLists[index];
    const newFileItem = {
      ...currentItem,
      sourceCode: value,
      bodyHtml: marked(value),
    };
    const newInputFileNameLists = inputFileNameLists.slice();
    newInputFileNameLists[index] = newFileItem;
    setInputFileNameLists(newInputFileNameLists);
  };

  const updateInputFileNameLists = (key: string, value: any, index: number) => {
    const currentItem = inputFileNameLists[index];
    const newFileItem = { ...currentItem, [key]: value };
    const newInputFileNameLists = inputFileNameLists.slice();
    newInputFileNameLists[index] = newFileItem;
    setInputFileNameLists(newInputFileNameLists);
  };

  const onFocusGetIndex = useCallback(
    (index: number) => {
      const currentItem = inputFileNameLists[index];
      const sourceCode = currentItem.sourceCode;
      setCurrentIndex(index);
      setSourceCode(sourceCode);
    },
    [sourceCode, inputFileNameLists]
  );

  const handleTabChange = useCallback(
    (_: React.ChangeEvent<{}>, index: number) => {
      setCurrentIndex(index);
      onFocusGetIndex(index);
    },
    [sourceCode, inputFileNameLists]
  );

  // const linkOnGithub = useCallback(
  //   (event: React.MouseEvent<HTMLButtonElement>) => {
  //     console.log(event);
  //   },
  //   []
  // );

  const selectTargetLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setTargetLanguageValue(value);
  };

  const selectProgrammingIcon = (
    _: React.ChangeEvent<{}>,
    selectObject: string | ProgrammingIcon | null
  ) => {
    if (selectObject === null) return;
    if (typeof selectObject === 'string') return;
    setProgrammingIcon({
      ...programmingIcon,
      id: selectObject.id,
      value: selectObject.value,
      iconPath: selectObject.iconPath,
    });
  };

  if (isLoading) {
    return <CustomLoader width={30} height={30} />;
  }

  if (!isLoading && !isMyItem) {
    return <NotAuth403View />;
  }

  return (
    <LayoutPostEdit
      title='Kanon Code | 編集'
      prepareValidRegister={prepareValidRegister}
      draftContent={draftContent}
      previousPage={previousPage}
      updateButtonText={updateButtonText}
      buttonText={buttonText}
      postType={type}
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
            <InputTagWrapper changeTagList={changeTagList} tagList={tagList} />
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
                <Box className='github-wrapper' mb={1}>
                  <CustomWhiteOutButton
                    sizing='small'
                    onClick={() => setIsOpenTreeDialog(true)}
                  >
                    パスの入力について
                  </CustomWhiteOutButton>
                  {/* <Box mb={1}>
                    <LinkGithubButton onClick={linkOnGithub} />
                  </Box>
                  <p className='notification'>
                    ※
                    Githubに連携するとディレクトリ構成の中からファイルを選択できるようになります。
                  </p> */}
                </Box>
                <Box className='input-wrapper'>
                  {inputFileNameLists.map((el, index) => (
                    <StyledBoxInputWrapper mb={1.5} key={el.key}>
                      <TextFieldWithCheckBox
                        index={index}
                        listLength={inputFileNameLists.length}
                        value={el.fileName}
                        variant='outlined'
                        size='small'
                        placeholder='some/path/file.ext'
                        onClick={() => addListsItem()}
                        onDelete={() => deleteListsItem(el.key, index)}
                        onCnangeFileName={event => cnangeFileName(event, index)}
                        onFocusGetIndex={() => onFocusGetIndex(index)}
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
                    CONSTS.MAX_DESCRIPTION_LENGTH
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
        closeDialog={closeDialog}
        contentsTitle={title}
        postId={postId}
        displayName={props.currentUser.user_profile.display_name}
        targetLanguages={targetLanguages}
        targetLanguageValue={targetLanguageValue}
        programmingIcon={programmingIcon}
        selectTargetLanguage={selectTargetLanguage}
        selectProgrammingIcon={selectProgrammingIcon}
        registerContent={registerContent}
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
    </LayoutPostEdit>
  );
};
export default IndexPage;
