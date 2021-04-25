import { LinkGithubButton } from '@/components/molecules/LinkGithubButton'
import { TextFieldWithCheckBox } from '@/components/molecules/TextFieldWithCheckBox'
import { InputPostTitleWrapper } from '@/components/organisms/InputPostTitleWrapper'
import { InputTagWrapper } from '@/components/organisms/InputTagWrapper'
import LayoutPosts from '@/layouts/posts'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import dynamic from 'next/dynamic'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import './style.scss'

const Editor = dynamic(
  () => {
    const promise = import('@/components/parts/Editor').then((r) => r.Editor)
    return promise
  },
  { ssr: false },
)

const StyledContainer = styled(Container)`
  max-width: 1200px;
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
  }
`
const IndexPage: React.FC = () => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [sourceCode, setSourceCode] = React.useState('')
  const [tagList, setTagList] = useState<any[]>([])
  const [activeStep, setActiveStep] = React.useState(0)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [inputFileNameLists, setInputFileNameLists] = React.useState([
    {
      key: uuidv4(),
      isChecked: false,
      value: '',
      sourceCode: '',
    },
  ])
  const [isValidTitle, setIsValidTitle] = useState(false)
  // const [stateValid, setStateValid] = useState({
  //   isValidTitle: false,
  //   isValidTagList: false,
  //   isValidDescription: false,
  //   isValidSourceCode: false,
  // })

  const changeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value
      setIsValidTitle(value.length > 32)
      setTitle(value)
    },
    [title],
  )
  const changeTagList = useCallback(
    (values: string[]): void => {
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
  // const changeSourceCode = useCallback(
  //   (sourceCode: string): void => {
  //     const updateSourceCode = sourceCode
  //     setSourceCode(updateSourceCode)
  //     updateInputFileNameLists('sourceCode', updateSourceCode, currentIndex)
  //   },
  //   [sourceCode],
  // )
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
  const changeIsChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const isChecked = event.target.checked
    updateInputFileNameLists('isChecked', isChecked, index)
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
  const EditorSourceCode = useMemo(
    () => (
      <Editor
        id="cord-editor"
        headerText="Source Code"
        onChange={changeSourceCode}
        changeActiveStep={changeActiveStep}
        description={sourceCode}
        activeStep={activeStep}
      />
    ),
    [inputFileNameLists],
  )

  return (
    <LayoutPosts title="Kanon Code | レビュー依頼">
      <StyledContainer>
        <Box component="section">
          <Box mb={3} className="title-wrapper">
            <InputPostTitleWrapper
              title={title}
              onChange={changeTitle}
              placeholder="Title"
              isValidTitle={isValidTitle}
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
                        onClick={() => addListsItem()}
                        onDelete={() => deleteListsItem(el.key, index)}
                        onCnangeFileName={(event) =>
                          cnangeFileName(event, index)
                        }
                        onChangeIsChecked={(event) =>
                          changeIsChecked(event, index)
                        }
                        onFocusGetIndex={() => onFocusGetIndex(index)}
                      />
                    </StyledBoxInputWrapper>
                  ))}
                </Box>
              </StyledBoxInputGroupWrapper>
              <StyledBoxCordEditorWrapper>
                {inputFileNameLists.length > 0 && (
                  <Tabs
                    value={currentIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons={'off'}
                  >
                    {inputFileNameLists.map((el) => (
                      <Tab label={el.value} key={el.key} />
                    ))}
                  </Tabs>
                )}
                {EditorSourceCode}
                {/* <Editor
                  id="cord-editor"
                  headerText="Source Code"
                  onChange={changeSourceCode}
                  changeActiveStep={changeActiveStep}
                  description={sourceCode}
                  activeStep={activeStep}
                /> */}
              </StyledBoxCordEditorWrapper>
            </StyledBoxFlex>
          </Box>
        </Box>
      </StyledContainer>
    </LayoutPosts>
  )
}
export default IndexPage
