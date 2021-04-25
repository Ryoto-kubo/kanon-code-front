import { EditorButtons } from '@/components/organisms/EditorButtons'
import Box from '@material-ui/core/Box'
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'
import marked from 'marked'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'
import './editor.scss'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type Props = {
  id: string
  headerText: string
  changeActiveStep: (value: number) => void
  onChange: (value: string) => void | any
  description: string
  activeStep: number
}

const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up('sm')} {
    display: flex;
    justify-content: space-between;
  }
`
const StyledBoxPreviewWrapper = styled(Box)`
  padding: 16px;
`
const StyledBoxEditorWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  // filter: drop-shadow(0 0 0.75rem crimson);
  // filter: drop-shadow(
  //   0px 8px 16px -2px rgba(92, 107, 192, 0.2),
  //   0px 0px 0px 1px rgba(92, 107, 192, 0.02)
  // );
  // box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
  //   0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  // border-radius: 8px;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 100%;
  }
`

// export const Editor: React.FC<Props> = useMemo((props: Props) => {
export const Editor: React.FC<Props> = React.memo((props) => {
  const [instance, setInstance] = useState<EasyMDE>()

  const getInstance = (instance: EasyMDE) => {
    setInstance(instance)
  }
  const switchPreview = () => {
    if (!instance) return
    const SHOW_EDITOR = 0
    const SHOW_PREVIEW = 1
    if (props.activeStep === SHOW_PREVIEW) {
      props.changeActiveStep(SHOW_EDITOR)
    } else if (props.activeStep === SHOW_EDITOR) {
      props.changeActiveStep(SHOW_PREVIEW)
    }
  }
  const insertCodeMde = () => {
    if (!instance) return
    EasyMDE.toggleCodeBlock(instance)
  }
  const insertLinkMde = () => {
    if (!instance) return
    EasyMDE.drawLink(instance)
  }
  const insertImageMde = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!instance) return
    console.log(event.currentTarget.value) // 画像データ

    EasyMDE.drawImage(instance)
  }
  return (
    <>
      <StyledBoxFlex>
        <SwipeableViews
          index={props.activeStep}
          style={{
            width: '100%',
            boxShadow: `0px 8px 16px -2px rgba(92, 107, 192, 0.2),
          0px 0px 0px 1px rgba(92, 107, 192, 0.02)`,
            borderRadius: 8,
          }}
          slideStyle={{ overflow: 'unset' }}
          slideClassName="slide-childlen"
        >
          <StyledBoxEditorWrapper>
            <div className="editor-header">{props.headerText}</div>
            <SimpleMDE
              id={props.id}
              className="editor"
              getMdeInstance={getInstance}
              options={{
                toolbar: false,
                status: false,
                placeholder: '# Write in markdown',
                nativeSpellcheck: false,
                spellChecker: false,
                styleSelectedText: false,
                lineWrapping: false,
              }}
              onChange={props.onChange}
              value={props.description}
            />
          </StyledBoxEditorWrapper>
          <StyledBoxEditorWrapper>
            <div className="preview-header">Preview</div>
            <StyledBoxPreviewWrapper id="body">
              <span
                dangerouslySetInnerHTML={{
                  __html: marked(props.description),
                }}
              />
            </StyledBoxPreviewWrapper>
          </StyledBoxEditorWrapper>
        </SwipeableViews>
        <EditorButtons
          switchPreview={switchPreview}
          insertCodeMde={insertCodeMde}
          insertLinkMde={insertLinkMde}
          insertImageMde={insertImageMde}
        />
      </StyledBoxFlex>
    </>
  )
})
