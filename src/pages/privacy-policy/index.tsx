// import { AboutFirstView } from '@/components/parts/aboutFirstView';
import Layout from '@/layouts/standard';
import theme from '@/styles/theme';
import { UserTypes } from '@/types/global';
import { Box, Container } from '@material-ui/core/';
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
const StyledBoxTitle = styled(Box)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const StyledBoxBlock = styled(Box)`
  margin-bottom: 24px;
`;
const StyledBoxText = styled(Box)`
  padding-left: 8px;
  line-height: 1.7;
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
    <Layout
      title='Kanon Code | プライバシーポリシー'
      currentUser={props.currentUser}
    >
      <Container maxWidth='md'>
        <Box my={10} pb={5} component='section'>
          <StyledBoxPageTitle component='h1'>
            プライバシーポリシー
          </StyledBoxPageTitle>
          <StyledBoxBlock>
            <StyledBoxTitle>お客様から取得する情報</StyledBoxTitle>
            <StyledBoxText component='p'>
              当社は、お客様から以下の情報を取得します。
            </StyledBoxText>
            <StyledUl>
              <li>氏名(ニックネームやペンネームも含む)</li>
              <li>メールアドレス</li>
              <li>写真や動画</li>
              <li>
                クレジットカード、銀行口座、電子マネー等のお客様の決済手段に関する情報
              </li>
              <li>Cookie(クッキー)を用いて生成された識別情報</li>
            </StyledUl>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxTitle>お客様の情報を利用する目的</StyledBoxTitle>
            <StyledBoxText component='p'>
              当社は、お客様から取得した情報を、以下の目的のために利用します。
            </StyledBoxText>
            <StyledUl>
              <li>
                当社サービスに関する登録の受付、お客様の本人確認、認証のため
              </li>
              <li>お客様の当社サービスの利用履歴を管理するため</li>
              <li>利用料金の決済のため</li>
              <li>
                当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため
              </li>
              <li>市場分析、マーケティングのため</li>
              <li>当社のサービスに関するご案内をするため</li>
              <li>お客様からのお問い合わせに対応するため</li>
              <li>当社の規約や法令に違反する行為に対応するため</li>
              <li>
                当社サービスの変更、提供中止、終了、契約解除をご連絡するため
              </li>
              <li>当社規約の変更等を通知するため</li>
              <li>以上の他、当社サービスの提供、維持、保護及び改善のため</li>
            </StyledUl>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxTitle>第三者提供</StyledBoxTitle>
            <StyledBoxText component='p'>
              当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
              但し、次の場合は除きます。
            </StyledBoxText>
            <StyledUl>
              <li>個人データの取扱いを外部に委託する場合</li>
              <li>当社や当社サービスが買収された場合</li>
              <li>
                事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
              </li>
              <li>その他、法律によって合法的に第三者提供が許されている場合</li>
            </StyledUl>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxTitle>アクセス解析ツール</StyledBoxTitle>
            <StyledBoxText component='p'>
              当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
              <br />
              <StyledAnchor
                href='https://marketingplatform.google.com/about/analytics/terms/jp/'
                target='_brank'
                rel='noopener'
              >
                Googleアナリティクス
              </StyledAnchor>
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxTitle>プライバシーポリシーの変更</StyledBoxTitle>
            <StyledBoxText component='p'>
              当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。{' '}
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxTitle>お問い合わせ</StyledBoxTitle>
            <StyledBoxText component='p'>
              お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のお問い合わせからご連絡ください。
              <br />
              <StyledAnchor
                href='https://docs.google.com/forms/d/1fVgiLKXY1LrCfZ20DvZXGE39s6HSToZDJbYmFoRUT9s/edit?usp=sharing'
                target='_brank'
              >
                お問い合わせフォーム
              </StyledAnchor>
              <br />
              この場合、必ず、運転免許証のご提示等当社が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。
            </StyledBoxText>
          </StyledBoxBlock>
          <StyledBoxBlock>
            <StyledBoxTitle>事業者の名称</StyledBoxTitle>
            <StyledBoxText component='p'>Kanon Code</StyledBoxText>
          </StyledBoxBlock>
          <span>2021年08月09日 制定</span>
        </Box>
      </Container>
    </Layout>
  );
};

export default IndexPage;
