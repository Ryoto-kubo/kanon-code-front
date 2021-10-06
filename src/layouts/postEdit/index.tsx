import { TheFooter } from '@/components/common/footer/index';
import { CommonHead } from '@/components/common/head/index';
import { ThePostHeader } from '@/components/common/header/post';
import { ThePostEditHeader } from '@/components/common/header/postEdit';
// import { Toolbar } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ButtonText = Readonly<
  '投稿設定' | '編集設定' | '下書き保存' | '保存中...' | '保存済み ✔︎'
>;

type Props = {
  children: ReactNode;
  title: string;
  prepareValidRegister: () => void;
  draftContent: () => void;
  previousPage: () => void;
  updateButtonText: (value: ButtonText) => void;
  buttonText: ButtonText;
  postType: 'post_published' | 'post_draft' | '';
};

const StyleBoxMain = styled(Box)`
  background: #ffffff;
`;

const LayoutPostEdit = ({
  children,
  title,
  prepareValidRegister,
  draftContent,
  previousPage,
  updateButtonText,
  buttonText,
  postType,
}: Props) => {
  console.log(postType);

  return (
    <>
      <CommonHead title={title} />
      {postType === 'post_published' && (
        <ThePostEditHeader
          prepareValidRegister={prepareValidRegister}
          previousPage={previousPage}
          updateButtonText={updateButtonText}
          buttonText={buttonText}
        />
      )}
      {postType === 'post_draft' && (
        <ThePostHeader
          prepareValidRegister={prepareValidRegister}
          draftContent={draftContent}
          previousPage={previousPage}
          updateButtonText={updateButtonText}
          buttonText={buttonText}
        />
      )}
      <StyleBoxMain mt={4} component='main'>
        {children}
      </StyleBoxMain>
      <TheFooter />
    </>
  );
};
export default LayoutPostEdit;
