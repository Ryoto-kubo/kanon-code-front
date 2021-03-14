import { CustomIconButton } from '@/components/atoms/IconButton'
import { CircleGrid } from '@/components/molecules/CircleGrid'
import { SearchField } from '@/components/molecules/SearchField'
import { CircleGrids } from '@/components/organisms/CircleGrids'
import Layout from '@/layouts/standard'
import { icons } from '@/services/icons'
import { CognitoUser } from '@aws-amplify/auth'
import { Container } from '@material-ui/core/'
import React, { useState } from 'react'

type Props = {
  title: string
  authUser: CognitoUser
}

const formFunc = (e: React.FormEvent) => {
  console.log('enterを押した検索')
  e.preventDefault()
}
const func = () => {
  console.log('iconを押した検索')
}

const initIconComponents = () => {
  const resutls = []
  for (const [index, item] of icons.entries()) {
    resutls.push(
      <CircleGrid key={index} text={item.text}>
        <CustomIconButton disableRipple={true} func={func}>
          {item.dom}
        </CustomIconButton>
      </CircleGrid>,
    )
  }
  return resutls
}

const IndexPage: React.FC<Props> = (props) => {
  const [renderIcons, setRenderIcons] = useState(initIconComponents)

  const filterdIcons = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // To identify the dots
    const searchStr =
      e.target.value.toLowerCase() === '.'
        ? '\\.'
        : e.target.value.toLowerCase()
    const updateList = initIconComponents().filter((item: any) => {
      return item.props.text.toLowerCase().search(searchStr) !== -1
    })
    setRenderIcons(updateList)
  }

  return (
    <Layout title="Kanon Code | 検索" authUser={props.authUser}>
      <Container maxWidth="md">
        <SearchField formFunc={formFunc} func={func} onChange={filterdIcons} />
        <CircleGrids func={func} renderIcons={renderIcons} />
      </Container>
    </Layout>
  )
}

export default IndexPage
