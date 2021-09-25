// import { AboutFirstView } from '@/components/parts/aboutFirstView';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { Box, Container } from '@material-ui/core/';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

type Props = {
  authUser: any;
  currentUser: UserTypes | null;
};

const StyledBoxPageTitle = styled(Box)`
  font-size: 24px;
  margin-bottom: 24px;
`;
const StyledBoxQuestionTitle = styled(Box)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  &::before {
    content: 'Q';
    font-size: 18px;
    display: inline-block;
    background: ${theme.palette.primary.main};
    padding: 1px 8px;
    color: white;
    margin-right: 8px;
    border-radius: 4px;
  }
`;
const StyledBoxBlock = styled(Box)`
  margin-bottom: 24px;
`;
const StyledBoxText = styled(Box)`
  padding-left: 8px;
  line-height: 1.7;
`;
const StyledBoxTextBold = styled(Box)`
  padding-left: 8px;
  line-height: 1.7;
  font-weight: bold;
`;
const StyledUl = styled('ul')`
  line-height: 2;
`;
const StyledAnchor = styled(`a`)`
  color: ${theme.palette.primary.main};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const IndexPage: React.FC<Props> = props => {
  return (
    <Layout title='よくある質問 | Kanon Code' currentUser={props.currentUser}>
      <Container maxWidth='md'>
        <Box my={10} pb={5} component='section'>
          <StyledBoxPageTitle component='h1'>よくある質問</StyledBoxPageTitle>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>
              サービスを利用するのにお金が必要ですか？
            </StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              基本使用料は無料です。レビューを購入する際に課金が必要となります。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>
              購入したレビューの返金はできますか？
            </StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              現在サービス画面からはまだできませんが、お問い合わせから返金申請が可能です。
              <br />
              返金申請は以下のケースです。
            </StyledBoxText>
            <StyledUl>
              <li>「ああああああ」など文字稼ぎの傾向が見られる。</li>
              <li>暴言や誹謗中傷が含まれている。</li>
              <li>どこかの記事をそのまま自身のレビューとしている。</li>
            </StyledUl>
            <StyledBoxText component='p'>
              実際に運営でレビューを確認してからの判断となります。
              <br />
              全ての返金に応じれるわけではございませんのでご了承ください。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>
              自分のレビュー依頼を削除または非公開にすることはできますか？
            </StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              現時点では対応していません。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>金額は手数料込み？</StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              はい、表示されている金額のみをお支払いいただくことになります。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>
              カード情報はどのように保存される？
            </StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              決済サービスのStripe上に暗号化されて保存されます。Kanon
              CodeではStripeの決済アカウントのIDを保持しますが、カード情報自体は一切保持しません。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>
              レビューの設定可能金額は？
            </StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              ¥1,000~¥100,000の範囲で設定できます。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>
              ダッシュボードの売上にある確定金額とは？
            </StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              「確定金額」は今すぐ振込申請を行うことができる金額です。決済手数料とプラットフォーム利用料が引かれた後の金額です。振込時にはこの金額から振込手数料¥350を除いた額が振り込まれます。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxQuestionTitle>販売手数料は？</StyledBoxQuestionTitle>
            <StyledBoxText component='p'>
              レビューの販売には、以下の手数料がかかります。
            </StyledBoxText>
            <Box my={2}>
              <Box mb={2}>
                <StyledBoxTextBold component='p'>決済手数料</StyledBoxTextBold>
                <StyledBoxText component='p'>
                  販売価格の3.6%（
                  <StyledAnchor
                    href='https://stripe.com/jp'
                    target='_blank'
                    rel='noopener'
                  >
                    Stripe
                  </StyledAnchor>
                  の決済手数料に準拠しています）
                </StyledBoxText>
              </Box>
              <Box mb={2}>
                <StyledBoxTextBold component='p'>
                  プラットフォーム利用料
                </StyledBoxTextBold>
                <StyledBoxText component='p'>
                  販売価格から決済手数料を引いた額の10%
                </StyledBoxText>
              </Box>
              <Box>
                <StyledBoxTextBold component='p'>
                  振り込み手数料
                </StyledBoxTextBold>
                <StyledBoxText component='p'>
                  振り込み申請1回につき¥350
                </StyledBoxText>
              </Box>
            </Box>
            <StyledBoxText component='p'>
              例えば、¥1,000の質問チケットが購入された場合、販売者の受取金額は(1000
              - 1000 * 0.036) * 0.9= ¥868
              となります。この質問チケットが10回購入された後に振込申請を行ったとすると、販売者の口座には(868
              * 10) - 350= ¥8,645 が振り込まれます。
              <StyledAnchor
                href='https://help.note.com/hc/ja/articles/360011358873-%E3%82%B3%E3%83%B3%E3%83%86%E3%83%B3%E3%83%84%E3%82%92%E8%B2%A9%E5%A3%B2%E3%81%99%E3%82%8B%E9%9A%9B%E3%81%AB%E5%BC%95%E3%81%8B%E3%82%8C%E3%82%8B%E6%89%8B%E6%95%B0%E6%96%99'
                target='_blank'
                rel='noopener'
              >
                note.comの手数料
              </StyledAnchor>
              を参考に設定しました。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxText component='p'>
            課題が解決しなかった場合は
            <Link href='/contact-us' passHref>
              <StyledAnchor>お問い合わせフォーム</StyledAnchor>
            </Link>
            をご利用ください。
          </StyledBoxText>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
