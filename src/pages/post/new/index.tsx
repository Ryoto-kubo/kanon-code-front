import { LinkGithubButton } from '@/components/molecules/LinkGithubButton'
import { TextFieldWithCheckBox } from '@/components/molecules/TextFieldWithCheckBox'
import { InputPostTitleWrapper } from '@/components/organisms/InputPostTitleWrapper'
import { InputTagWrapper } from '@/components/organisms/InputTagWrapper'
import { PostSettingDialog } from '@/components/parts/PostSettingDialog'
import { targetLanguages } from '@/consts/target-languages'
import { UserType } from '@/consts/type'
import LayoutPost from '@/layouts/post'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import dynamic from 'next/dynamic'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'

type Props = {
  title: string
  currentUser: null | UserType
}
type ProgrammingIcon = {
  id: string
  text: string
  listIconComponent: JSX.Element
  iconComponent: JSX.Element
}

const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/Editor').then((r) => r.Editor)
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
  const [title, setTitle] = React.useState('')
  const [tagList, setTagList] = useState<any[]>([])
  const [description, setDescription] = React.useState('')
  const [sourceCode, setSourceCode] = React.useState('')
  const [inputFileNameLists, setInputFileNameLists] = React.useState([
    {
      key: uuidv4(),
      isChecked: false,
      value: '',
      sourceCode: '',
    },
  ])
  const [targetLanguageValue, setTargetLanguageValue] = useState(0)
  const [programmingIcon, setProgrammingIcon] = useState<ProgrammingIcon>({
    id: '',
    text: '',
    iconComponent: <></>,
    listIconComponent: <></>,
  })
  const [activeStep, setActiveStep] = React.useState(0)
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const registerContents = () => {
    console.log(title, 'title')
    console.log(tagList, 'tagList')
    console.log(description, 'description')
    console.log(inputFileNameLists, 'inputFileNameLists')
    console.log(targetLanguageValue, 'targetLanguageValue')
    console.log(programmingIcon, 'programmingIcon')
  }
  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      if (value.length > 32) {
        return
      }
      setTitle(value)
    },
    [title],
  )
  const changeTagList = useCallback(
    (values: string[]): void => {
      if (values.length > 5) return
      setTagList(values)
    },
    [tagList],
  )
  const changeDescritption = useCallback(
    (value: string): void => {
      setDescription(value)
    },
    [description],
  )
  const changeSourceCode = (sourceCode: string): void => {
    setSourceCode(sourceCode)
    updateInputFileNameLists('sourceCode', sourceCode, currentIndex)
  }
  const changeActiveStep = useCallback(
    (value: number): void => {
      setActiveStep(value)
    },
    [activeStep],
  )
  const addListsItem = (): void => {
    setInputFileNameLists([
      ...inputFileNameLists,
      {
        key: uuidv4(),
        isChecked: false,
        value: '',
        sourceCode: '',
      },
    ])
  }
  const deleteListsItem = (key: string, index: number): void => {
    const newLists = inputFileNameLists.filter((el) => el.key !== key)
    const currentItem = newLists[index]
    const sourceCode = currentItem.sourceCode
    const newInputFileNameLists = newLists.slice()
    setCurrentIndex(index)
    setSourceCode(sourceCode)
    setInputFileNameLists(newInputFileNameLists)
  }
  const cnangeFileName = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = event.target.value
    setCurrentIndex(index)
    updateInputFileNameLists('value', value, index)
  }
  const updateInputFileNameLists = (key: string, value: any, index: number) => {
    const currentItem = inputFileNameLists[index]
    const newFileItem = { ...currentItem, [key]: value }
    const newInputFileNameLists = inputFileNameLists.slice()
    newInputFileNameLists[index] = newFileItem
    setInputFileNameLists(newInputFileNameLists)
  }
  const onFocusGetIndex = (index: number) => {
    const currentItem = inputFileNameLists[index]
    const sourceCode = currentItem.sourceCode
    setCurrentIndex(index)
    setSourceCode(sourceCode)
    updateInputFileNameLists('sourceCode', sourceCode, index)
  }
  const handleChange = (event: React.ChangeEvent<{}>, index: number) => {
    console.log(event)
    setCurrentIndex(index)
    onFocusGetIndex(index)
  }
  const linkOnGithub = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event)
  }
  const selectTargetLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setTargetLanguageValue(value)
  }
  const selectProgrammingIcon = (
    event: React.ChangeEvent<{}>,
    selectObject: string | ProgrammingIcon | null,
  ) => {
    if (selectObject === null) return
    if (typeof selectObject === 'string') return
    console.log(event)
    setProgrammingIcon({
      ...programmingIcon,
      id: selectObject.id,
      text: selectObject.text,
      iconComponent: selectObject.iconComponent,
    })
  }
  return (
    <LayoutPost
      title="Kanon Code | レビュー依頼"
      currentUser={props.currentUser}
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
            <InputTagWrapper changeTagList={changeTagList} />
          </Box>
          <Box mb={3} className="description-wrapper">
            <Editor
              id="editor"
              headerText="Description"
              onChange={changeDescritption}
              changeActiveStep={changeActiveStep}
              description={description}
              activeStep={activeStep}
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
                        isChecked={el.isChecked}
                        value={el.value}
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
                  headerText="Source Code"
                  onChange={changeSourceCode}
                  changeActiveStep={changeActiveStep}
                  description={sourceCode}
                  activeStep={activeStep}
                  currentIndex={currentIndex}
                  handleChange={handleChange}
                  inputFileNameLists={inputFileNameLists}
                />
              </StyledBoxCordEditorWrapper>
            </StyledBoxFlex>
          </Box>
        </Box>
      </StyledContainer>
      <PostSettingDialog
        title="PostSetting"
        targetLanguages={targetLanguages}
        targetLanguageValue={targetLanguageValue}
        programmingIcon={programmingIcon}
        selectTargetLanguage={selectTargetLanguage}
        selectProgrammingIcon={selectProgrammingIcon}
        registerContents={registerContents}
      />
    </LayoutPost>
  )
}
export default IndexPage

// # registerContents
// - test
// - test
// - test

// src/test/index.tsx
