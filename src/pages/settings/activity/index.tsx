import { Heading3 } from "@/components/atoms/Heading3";
import { LinkGithubButton } from "@/components/molecules/LinkGithubButton";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  title: string;
  authUser: any;
};

const StyledBoxFlex = styled(Box)`
  margin-bottom: 16px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const StyledBoxParagraf = styled(Box)`
  margin-bottom: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 0px;
  }
`;

export const getServerSideProps = async () => ({
  props: {
    layout: "SettingLayout",
    title: "アクティビティ",
  },
});

const IndexPage: React.FC<Props> = (props) => {
  if (!props.authUser) return <></>;
  const [state, setState] = useState({
    isOpenedReview: false,
    isReviewRequest: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const linkOnGithub = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
  };
  const googleEmail = props.authUser.signInUserSession.idToken.payload.email;

  return (
    <section>
      <Box mb={5}>
        <Box mb={2}>
          <Box mb={1}>
            <Box mb={1}>
              <Heading3 fontSize={18} marginBottom={0}>
                メール通知
              </Heading3>
            </Box>
            <Box component="div" mb={0.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    checked={state.isOpenedReview}
                    onChange={handleChange}
                    name="isOpenedReview"
                    color="primary"
                    size="small"
                  />
                }
                label="レビューが開封されたとき"
              />
            </Box>
            <Box component="div">
              <FormControlLabel
                control={
                  <Checkbox
                    disableRipple
                    checked={state.isReviewRequest}
                    onChange={handleChange}
                    name="isReviewRequest"
                    color="primary"
                    size="small"
                  />
                }
                label="レビューリクエストを受け取ったとき"
              />
            </Box>
          </Box>
          <Divider />
        </Box>
        <Box mb={2}>
          <Box mb={1}>
            <Box mb={1}>
              <Heading3 fontSize={18} marginBottom={0}>
                Github連携
              </Heading3>
            </Box>
            <StyledBoxFlex>
              <StyledBoxParagraf component="p">{googleEmail}</StyledBoxParagraf>
              <LinkGithubButton onClick={linkOnGithub} />
            </StyledBoxFlex>
          </Box>
          <Divider />
        </Box>
      </Box>
    </section>
  );
};

export default IndexPage;
