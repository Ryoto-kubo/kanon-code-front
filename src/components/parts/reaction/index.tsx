import theme from "@/styles/theme";
import { postReaction } from "@/utils/api/post-reaction";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import React from "react";
import styled from "styled-components";

type Props = {
  postId: string;
};

const StyledBoxWrapper = styled(Box)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 24px;
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 4px;
    width: 100%;
    content: "";
  }
`;

const StyledBoxTitleWrapper = styled(Box)`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.palette.primary.main};
  position: relative;
  background: #ffffff;
  padding: 0 8px;
  margin-top: -33px;
  margin-bottom: 16px;
  z-index: 3;
}
`;

const StyledButton = styled(Button)`
  padding-left: 40px;
  padding-right: 40px;
}
`;

export const Reaction: React.FC<Props> = ({ postId }) => {
  const post = async () => {
    const err = new Error();
    try {
      await postReaction({ postId });
    } catch {
      console.error(err);
    }
  };
  return (
    <StyledBoxWrapper>
      <StyledBoxTitleWrapper component="span">
        このレビューをみんなにもオススメしますか？
      </StyledBoxTitleWrapper>
      <Box mb={2}>
        <StyledButton
          variant="outlined"
          color="primary"
          startIcon={<SentimentSatisfiedOutlinedIcon />}
          onClick={() => post()}
        >
          オススメする
        </StyledButton>
      </Box>
      <AvatarGroup max={8}>
        <Avatar
          alt="Remy Sharp"
          src="https://lh3.googleusercontent.com/a-/AOh14GjgGU-zizRNT4PH4sStws_dh1kfEmXmhNtaTxGD=s96-c"
        />
        <Avatar
          alt="Travis Howard"
          src="https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/upload/e3ea491d-e04a-4a81-b988-115393a82e24.jpeg"
        />
        <Avatar
          alt="Remy Sharp"
          src="https://lh3.googleusercontent.com/a-/AOh14GjgGU-zizRNT4PH4sStws_dh1kfEmXmhNtaTxGD=s96-c"
        />
        <Avatar
          alt="Travis Howard"
          src="https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/upload/e3ea491d-e04a-4a81-b988-115393a82e24.jpeg"
        />
        <Avatar
          alt="Remy Sharp"
          src="https://lh3.googleusercontent.com/a-/AOh14GjgGU-zizRNT4PH4sStws_dh1kfEmXmhNtaTxGD=s96-c"
        />
        <Avatar
          alt="Travis Howard"
          src="https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/upload/e3ea491d-e04a-4a81-b988-115393a82e24.jpeg"
        />
        <Avatar
          alt="Remy Sharp"
          src="https://lh3.googleusercontent.com/a-/AOh14GjgGU-zizRNT4PH4sStws_dh1kfEmXmhNtaTxGD=s96-c"
        />
        <Avatar
          alt="Travis Howard"
          src="https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/upload/e3ea491d-e04a-4a81-b988-115393a82e24.jpeg"
        />
        <Avatar
          alt="Remy Sharp"
          src="https://lh3.googleusercontent.com/a-/AOh14GjgGU-zizRNT4PH4sStws_dh1kfEmXmhNtaTxGD=s96-c"
        />
        <Avatar
          alt="Travis Howard"
          src="https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/upload/e3ea491d-e04a-4a81-b988-115393a82e24.jpeg"
        />
        <Avatar
          alt="Remy Sharp"
          src="https://lh3.googleusercontent.com/a-/AOh14GjgGU-zizRNT4PH4sStws_dh1kfEmXmhNtaTxGD=s96-c"
        />
        <Avatar
          alt="Travis Howard"
          src="https://stg-contents-kanon-code.s3-ap-northeast-1.amazonaws.com/upload/e3ea491d-e04a-4a81-b988-115393a82e24.jpeg"
        />
      </AvatarGroup>
    </StyledBoxWrapper>
  );
};
