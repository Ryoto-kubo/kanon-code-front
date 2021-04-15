// import { CustomSolidButton } from "@/components/atoms/SolidButton";
// import TextField from "@material-ui/core/TextField";
import { ContentWrapper } from '@/components/organisms/ContentWrapper'
import { NoSettingDataWrapper } from '@/components/organisms/NoSettingDataWrapper'
// import { CognitoUser } from '@aws-amplify/auth'
import React from 'react'
import styled from 'styled-components'
import SkilSvg from '../../../assets/illustration/skil.svg'
const StyledPairSkilSvg = styled(SkilSvg)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up('sm')} {
    width: 60%;
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    width: 450px;
  }
`

// import styled from "styled-components";

// type TypeParams = {
//   language: string;
//   yearsExperience: string;
//   value: number;
// }[];

// const StyledBoxCalcWidth = styled(Box)`
//   ${(props) => props.theme.breakpoints.up("sm")} {
//     // width: calc(100% - 150px);
//   }
// `;
// const StyledTextFieldService = styled(TextField)`
//   margin-bottom: 32px;
//   width: 47%;
// `;

export const getServerSideProps = async () => ({
  props: {
    layout: 'SettingLayout',
    title: 'スキル設定',
  },
})

const IndexPage: React.FC = () => {
  const skilsLength = 0
  // const skilsLength = yearsExperiences.length
  // const [skilParams, setSkilParams] = useState<TypeParams>([
  //   {
  //     language: "",
  //     yearsExperience: "1年~2年",
  //     value: 1,
  //   },
  //   {
  //     language: "",
  //     yearsExperience: "1年~2年",
  //     value: 1,
  //   },
  //   {
  //     language: "",
  //     yearsExperience: "1年~2年",
  //     value: 1,
  //   },
  //   {
  //     language: "",
  //     yearsExperience: "1年~2年",
  //     value: 1,
  //   },
  //   {
  //     language: "",
  //     yearsExperience: "1年~2年",
  //     value: 1,
  //   },
  // ]);

  // const update = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   console.log(...skilParams);
  // };
  // const renderOptions = (): JSX.Element[] => {
  //   return yearsExperiences.map((option) => (
  //     <MenuItem key={option.value} value={option.value}>
  //       {option.label}
  //     </MenuItem>
  //   ));
  // };
  // const renderTextFields = () => {
  //   return skilParams.map((elemet, index) => (
  //     <Box display="flex" justifyContent="space-between" key={index}>
  //       <StyledTextFieldService
  //         type="text"
  //         style={{ display: "block" }}
  //         defaultValue={elemet.language}
  //         placeholder="例：php"
  //         label="プログラミング言語"
  //         fullWidth={true}
  //         variant="outlined"
  //         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //           elemet.language = e.target.value;
  //         }}
  //         InputLabelProps={{
  //           shrink: true,
  //         }}
  //       />
  //       <StyledTextFieldService
  //         select
  //         type="text"
  //         style={{ display: "block" }}
  //         defaultValue={elemet.value}
  //         label="経験年数"
  //         fullWidth={true}
  //         variant="outlined"
  //         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //           const value = Number(e.target.value);
  //           const yearsExperience = yearsExperiences[value - 1].label;
  //           elemet.value = value;
  //           elemet.yearsExperience = yearsExperience;
  //         }}
  //         InputLabelProps={{
  //           shrink: true,
  //         }}
  //       >
  //         {renderOptions()}
  //       </StyledTextFieldService>
  //     </Box>
  //   ));
  // };

  return (
    <section>
      {skilsLength > 0 ? (
        <ContentWrapper>hoge</ContentWrapper>
      ) : (
        <NoSettingDataWrapper
          text="スキルを登録する"
          description="スキルはまだ登録されていません"
          href="/skils"
          borderRadius={4}
          mb={6}
        >
          <StyledPairSkilSvg />
        </NoSettingDataWrapper>
      )}
      {/* <Box>
        <StyledBoxCalcWidth mb={5}>
          <div>{renderTextFields()}</div>
          <Box textAlign="center">
            <CustomSolidButton sizing="medium" onClick={update}>
              更新する
            </CustomSolidButton>
          </Box>
        </StyledBoxCalcWidth>
      </Box> */}
    </section>
  )
}

export default IndexPage
