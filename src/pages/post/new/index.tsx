import { CustomSnackbar } from '@/components/atoms/CustomSnackbar'
import { LinkGithubButton } from '@/components/molecules/LinkGithubButton'
import { TextFieldWithCheckBox } from '@/components/molecules/TextFieldWithCheckBox'
import { InputPostTitleWrapper } from '@/components/organisms/InputPostTitleWrapper'
import { InputTagWrapper } from '@/components/organisms/InputTagWrapper'
import { PostSettingDialog } from '@/components/parts/postSettingDialog'
import * as CONSTS from '@/consts/const'
import { errorMessages, validMessages } from '@/consts/error-messages'
import { targetLanguages } from '@/consts/target-languages'
import LayoutPost from '@/layouts/post'
import { UserTypes } from '@/types/global'
import { postContent } from '@/utils/api/post-content'
import * as S3 from '@/utils/api/s3'
import { PrepareContentBeforePost } from '@/utils/prepare-content-before-post'
import { validLength } from '@/utils/valid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import 'highlight.js/scss/vs2015.scss'
import marked from 'marked'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'

type Props = {
  title: string
  currentUser: null | UserTypes
}
type ProgrammingIcon = {
  id: number
  value: string
  iconPath: string
}
type ButtonText = Readonly<
  '投稿設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>
type ValidObject = {
  isValid: boolean
  message: string
}

const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/editor').then((r) => r.Editor)
    return promise
  },
  { ssr: false },
)

const StyledContainer = styled(Container)`
  max-width: 1200px;
  margin-bottom: 40px;
`
const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`
const StyledBoxInputGroupWrapper = styled(Box)`
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    margin-bottom: 0px;
    margin-right: 24px;
    width: 30%;
  }
`
const StyledBoxInputWrapper = styled(Box)`
  display: flex;
  align-items: center;
`
const StyledBoxCordEditorWrapper = styled(Box)`
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 70%;
    max-width: 70%;
  }
`

const IndexPage: React.FC<Props> = (props) => {
  const userId = props.currentUser!.user_id
  const userProfile = props.currentUser!.user_profile
  const createValidObject = useCallback((defaultValue, defaultMessage) => {
    return {
      isValid: defaultValue,
      message: defaultMessage,
    }
  }, [])
  const [title, setTitle] = useState('')
  const [tagList, setTagList] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [sourceCode, setSourceCode] = useState('```\n\n```')
  const [inputFileNameLists, setInputFileNameLists] = useState([
    {
      key: uuidv4(),
      fileName: '',
      sourceCode: '```\n\n```',
      bodyHtml: '',
      isValid: true,
    },
  ])
  const [targetLanguageValue, setTargetLanguageValue] = useState(0)
  const [programmingIcon, setProgrammingIcon] = useState<ProgrammingIcon>({
    id: 0,
    value: '',
    iconPath: '',
  })
  const [activeStep, setActiveStep] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPosted, setIsPosted] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)
  const [buttonText, setButtonText] = useState<ButtonText>('下書き保存')
  const [canPublish, setCanPUblish] = useState<ValidObject>(
    createValidObject(true, ''),
  )
  const [isValidTitleObject, setIsValidTitleObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_TITLE),
  )
  const [isValidTagsObject, setIsValidTagsObject] = useState<ValidObject>(
    createValidObject(false, validMessages.REQUIRED_TAGS),
  )
  const [isValidDescriptionObject, setIsValidDescriptionObject] = useState<
    ValidObject
  >(createValidObject(false, validMessages.REQUIRED_DESCRIPTION))
  const [isValidFileNameObject, setIsValidFileNameObject] = useState<
    ValidObject
  >(createValidObject(false, validMessages.REQUIRED_FILE_NAME))
  const [isValidSourceCodeObject, setIsValidSourceCodeObject] = useState<
    ValidObject
  >(createValidObject(false, validMessages.REQUIRED_SOURCE_CODE))
  const [uuid] = useState(uuidv4())

  const execPreviousPageIfneeded = (isValidExistData: boolean) => {
    if (isValidExistData && !isPosted) {
      if (confirm('データが入力されています。保存せずに終了しますか？')) {
        history.back()
      }
    } else if (isValidExistData && isPosted) {
      history.back()
    } else if (!isValidExistData) {
      history.back()
    }
  }
  const previousPage = useCallback(() => {
    // データが存在していて下書き保存されていなければ表示させる
    const isValidExistData = validExistData()
    execPreviousPageIfneeded(isValidExistData)
  }, [title, tagList, description, inputFileNameLists])
  const closeSnackBar = () => {
    setCanPUblish({
      ...canPublish,
      isValid: true,
    })
  }
  const closeDialog = () => {
    setIsOpenDialog(false)
  }
  const createParams = (key: string) => {
    return {
      uuid: uuid,
      userId: userId,
      userProfile: userProfile,
      postType: key,
      contents: {
        title: title,
        tagList: tagList,
        description: {
          value: description,
          bodyHtml: marked(description),
        },
        inputFileNameLists: inputFileNameLists,
        targetLanguage: targetLanguageValue,
        targetIcon: programmingIcon,
      },
    }
  }
  const initCanPublish = () => {
    setCanPUblish({
      ...canPublish,
      isValid: true,
    })
  }
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
    ])
    setIsValidFileNameObject(
      createValidObject(false, validMessages.REQUIRED_FILE_NAME),
    )
  }
  const validExistData = useCallback(() => {
    const isExistTitle = isValidTitleObject.isValid
    const isExistTagList = isValidTagsObject.isValid
    const isExistDescription = isValidDescriptionObject.isValid
    const isExistFileName = isValidFileNameObject.isValid
    const isExistSoureCode = isValidSourceCodeObject.isValid
    return (
      isExistTitle ||
      isExistTagList ||
      isExistDescription ||
      isExistFileName ||
      isExistSoureCode
    )
  }, [
    isValidTitleObject,
    isValidTagsObject,
    isValidDescriptionObject,
    isValidFileNameObject,
    isValidSourceCodeObject,
  ])
  const validFalseIncluded = useCallback(() => {
    const validList = inputFileNameLists.map((el) => el.isValid)
    return validList.includes(false)
  }, [inputFileNameLists])
  const updateButtonText = useCallback((value: ButtonText) => {
    setButtonText(value)
  }, [])
  const updateCanPublish = useCallback((isValid: boolean, message = '') => {
    setCanPUblish({
      ...canPublish,
      isValid: isValid,
      message: message,
    })
  }, [])
  const updateIsValidSourceCode = useCallback(
    (isValid: boolean): void => {
      inputFileNameLists[currentIndex].isValid = isValid
    },
    [sourceCode, inputFileNameLists],
  )
  const prepareValidRegister = useCallback(() => {
    if (!isValidTitleObject.isValid) {
      updateCanPublish(false, isValidTitleObject.message)
      return
    }
    if (!isValidTagsObject.isValid) {
      updateCanPublish(false, isValidTagsObject.message)
      return
    }
    if (!isValidDescriptionObject.isValid) {
      updateCanPublish(false, isValidDescriptionObject.message)
      return
    }
    if (!isValidFileNameObject.isValid) {
      updateCanPublish(false, isValidFileNameObject.message)
      return
    }
    if (!isValidSourceCodeObject.isValid) {
      updateCanPublish(false, isValidSourceCodeObject.message)
      return
    }
    initCanPublish()
    setIsOpenDialog(true)
  }, [title, tagList, description, inputFileNameLists])
  const registerContent = async () => {
    if (programmingIcon.value === '') {
      updateCanPublish(false, 'アイコンを選択してください')
      return
    }
    const err = new Error()
    const params = createParams('regist')
    try {
      const result = await postContent(params)
      if (result.status !== 200) throw err
      setIsPosted(true)
    } catch {
      console.error(err)
      alert(errorMessages.SYSTEM_ERROR)
    }
  }
  const draftContent = useCallback(async () => {
    if (!isValidTitleObject.isValid) {
      updateCanPublish(false, isValidTitleObject.message)
      return
    }
    if (!(description.length <= CONSTS.MAX_DESCRIPTION_LENGTH)) {
      updateCanPublish(false, validMessages.OVER_LENGTH_DESCRIPION)
      return
    }
    if (!(sourceCode.length <= CONSTS.MAX_SOURCE_CODE_LENGTH)) {
      updateCanPublish(false, validMessages.OVER_LENGTH_SOURCE_CODE)
      return
    }
    const isValidFalseIncluded = validFalseIncluded()
    if (isValidFalseIncluded) return
    const err = new Error()
    const params = createParams('draft')
    updateButtonText('保存中...')
    try {
      const result = await postContent(params)
      if (result.status !== 200) throw err
      setIsPosted(true)
      updateButtonText('保存済み ✔︎')
    } catch {
      console.error(err)
      alert(errorMessages.SYSTEM_ERROR)
    }
  }, [title, description, inputFileNameLists])
  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidTitleObject,
        isValidTitleObject,
      )
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_TITLE_LENGTH,
        validMessages.OVER_LENGTH_TITLE,
      )
      if (!isValidMaxLength) return
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_TITLE,
      )
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed()
      }
      setTitle(value)
    },
    [title],
  )
  const changeTagList = useCallback(
    (values: string[]): void => {
      if (values.length > CONSTS.MAX_TAGS_LENGTH) return
      const prepareContentBeforePost = new PrepareContentBeforePost(
        values,
        setIsValidTagsObject,
        isValidTagsObject,
      )
      const isNotValidZeroLength = prepareContentBeforePost.validZeroLength(
        validMessages.REQUIRED_TAGS,
      )
      if (isNotValidZeroLength) {
        prepareContentBeforePost.successed()
      }
      setTagList(values)
    },
    [tagList],
  )
  const changeDescritption = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidDescriptionObject,
        isValidDescriptionObject,
      )
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_DESCRIPTION_LENGTH,
        validMessages.OVER_LENGTH_DESCRIPION,
      )
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_DESCRIPTION,
      )
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed()
      }
      setDescription(value)
    },
    [description],
  )
  const cnangeFileName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = event.target.value
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidFileNameObject,
        isValidFileNameObject,
      )
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_FILE_NAME_LENGTH,
        validMessages.OVER_LENGTH_FILE_NAME,
      )
      if (!isValidMaxLength) return
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_FILE_NAME,
      )
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed()
      }
      setCurrentIndex(index)
      updateInputFileNameLists('fileName', value, index)
    },
    [sourceCode, inputFileNameLists],
  )
  const changeSourceCode = useCallback(
    (value: string): void => {
      const prepareContentBeforePost = new PrepareContentBeforePost(
        value,
        setIsValidSourceCodeObject,
        isValidSourceCodeObject,
      )
      const isValidMaxLength = prepareContentBeforePost.validLength(
        CONSTS.MAX_SOURCE_CODE_LENGTH,
        validMessages.OVER_LENGTH_SOURCE_CODE,
      )
      const isExist = prepareContentBeforePost.validEmpty(
        validMessages.REQUIRED_SOURCE_CODE,
      )
      if (isValidMaxLength && isExist) {
        prepareContentBeforePost.successed()
      }
      setSourceCode(value)
      updateIsValidSourceCode(isValidMaxLength)
      // updateInputFileNameLists("sourceCode", value, currentIndex);
      // console.log(marked(value));
      // console.log('fin');
      updateSourceCodeAndBodyHtml(value, currentIndex)

      // await updateInputFileNameLists("bodyHtml", marked(value), currentIndex);
    },
    [sourceCode, inputFileNameLists],
  )
  const changeActiveStep = useCallback(
    (value: number): void => {
      setActiveStep(value)
    },
    [activeStep],
  )
  const deleteListsItem = useCallback(
    (key: string, index: number): void => {
      const newLists = inputFileNameLists.filter((el) => el.key !== key)
      const currentItem = newLists[index]
      const sourceCode = currentItem.sourceCode
      const newInputFileNameLists = newLists.slice()
      setCurrentIndex(index)
      setSourceCode(sourceCode)
      setInputFileNameLists(newInputFileNameLists)
    },
    [sourceCode, inputFileNameLists],
  )
  const updateSourceCodeAndBodyHtml = (value: any, index: number) => {
    const currentItem = inputFileNameLists[index]
    const newFileItem = {
      ...currentItem,
      sourceCode: value,
      bodyHtml: marked(value),
    }
    const newInputFileNameLists = inputFileNameLists.slice()
    newInputFileNameLists[index] = newFileItem
    setInputFileNameLists(newInputFileNameLists)
  }
  const updateInputFileNameLists = (key: string, value: any, index: number) => {
    const currentItem = inputFileNameLists[index]
    const newFileItem = { ...currentItem, [key]: value }
    const newInputFileNameLists = inputFileNameLists.slice()
    newInputFileNameLists[index] = newFileItem
    setInputFileNameLists(newInputFileNameLists)
  }
  const onFocusGetIndex = useCallback(
    (index: number) => {
      const currentItem = inputFileNameLists[index]
      const sourceCode = currentItem.sourceCode
      setCurrentIndex(index)
      setSourceCode(sourceCode)
    },
    [sourceCode, inputFileNameLists],
  )
  const handleTabChange = useCallback(
    (_: React.ChangeEvent<{}>, index: number) => {
      setCurrentIndex(index)
      onFocusGetIndex(index)
    },
    [sourceCode, inputFileNameLists],
  )
  const linkOnGithub = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log(event)
    },
    [],
  )
  const selectTargetLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    console.log(value, 'selectTargetLanguage')

    setTargetLanguageValue(value)
  }
  const selectProgrammingIcon = (
    _: React.ChangeEvent<{}>,
    selectObject: string | ProgrammingIcon | null,
  ) => {
    if (selectObject === null) return
    if (typeof selectObject === 'string') return
    setProgrammingIcon({
      ...programmingIcon,
      id: selectObject.id,
      value: selectObject.value,
      iconPath: selectObject.iconPath,
    })
  }
  return (
    <LayoutPost
      title="Kanon Code | レビュー依頼"
      currentUser={props.currentUser}
      prepareValidRegister={prepareValidRegister}
      draftContent={draftContent}
      previousPage={previousPage}
      updateButtonText={updateButtonText}
      buttonText={buttonText}
    >
      <StyledContainer>
        <Box component="section">
          <Box mb={3} className="title-wrapper">
            <InputPostTitleWrapper
              title={title}
              onChange={changeTitle}
              placeholder="Title"
            />
          </Box>
          <Box mb={3} className="tag-list-wrapper">
            <InputTagWrapper
              changeTagList={changeTagList}
              // suggestList={suggestList!}
            />
          </Box>
          <Box mb={5} className="description-wrapper">
            <Editor
              id="editor"
              isFullDisplayButton={true}
              headerText="Description"
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
          <Box mb={3} className="source-code-wrapper">
            <StyledBoxFlex>
              <StyledBoxInputGroupWrapper>
                <Box className="github-wrapper" mb={1}>
                  <Box mb={1}>
                    <LinkGithubButton onClick={linkOnGithub} />
                  </Box>
                  <p className="notification">
                    ※
                    Githubに連携するとディレクトリ構成の中からファイルを選択できるようになります。
                  </p>
                </Box>
                <Box className="input-wrapper">
                  {inputFileNameLists.map((el, index) => (
                    <StyledBoxInputWrapper mb={1.5} key={el.key}>
                      <TextFieldWithCheckBox
                        index={index}
                        listLength={inputFileNameLists.length}
                        value={el.fileName}
                        variant="outlined"
                        size="small"
                        placeholder="some/path/file.ext"
                        onClick={() => addListsItem()}
                        onDelete={() => deleteListsItem(el.key, index)}
                        onCnangeFileName={(event) =>
                          cnangeFileName(event, index)
                        }
                        onFocusGetIndex={() => onFocusGetIndex(index)}
                      />
                    </StyledBoxInputWrapper>
                  ))}
                </Box>
              </StyledBoxInputGroupWrapper>
              <StyledBoxCordEditorWrapper>
                <Editor
                  id="cord-editor"
                  isFullDisplayButton={false}
                  headerText="Source Code"
                  onChange={changeSourceCode}
                  changeActiveStep={changeActiveStep}
                  value={sourceCode}
                  activeStep={activeStep}
                  isValid={validLength(
                    sourceCode,
                    CONSTS.MAX_DESCRIPTION_LENGTH,
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
        title="PostSetting"
        isOpenDialog={isOpenDialog}
        closeDialog={closeDialog}
        targetLanguages={targetLanguages}
        targetLanguageValue={targetLanguageValue}
        programmingIcon={programmingIcon}
        selectTargetLanguage={selectTargetLanguage}
        selectProgrammingIcon={selectProgrammingIcon}
        registerContent={registerContent}
      />
      <CustomSnackbar
        isOpen={!canPublish.isValid}
        closeSnackBar={closeSnackBar}
      >
        <Box fontWeight="bold">{canPublish.message}</Box>
      </CustomSnackbar>
    </LayoutPost>
  )
}
export default IndexPage
