// import { CircleElement } from '@/components/atoms/Circle'
import { CustomSolidButton } from "@/components/atoms/SolidButton";
import theme from "@/styles/theme";
import { UserProfileTypes } from "@/types/global";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  profile: UserProfileTypes;
  price: number;
  width: string;
  height: string;
  showToggleDialog: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const StyledBoxShowMessage = styled(Box)`
  text-align: center;
  margin-bottom: 32px;
  &:after {
    border-top: 1px dashed #a8abb1;
    display: block;
    width: 100%;
    height: 1px;
    margin-top: -12px;
    content: "";
  }
`;
const StyledBoxBg = styled(Box)`
  background: #ffffff;
  display: inline-block;
  padding: 0 8px;
  font-size: 16px;
  font-weight: bold;
`;
const StyledBoxReviewInfo = styled(Box)`
  margin: 16px auto;
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;
const StyledBoxTitleWrapper = styled(Box)`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 8px;
  display: inline-block;
  // border-bottom: 1px dashed #a8abb1;
`;
const StyledAnchor = styled(`a`)`
  color: ${theme.palette.text.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const StyledBoxFlex = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const AnnounceOpenReview: React.FC<Props> = ({
  title,
  profile,
  price,
  width,
  height,
  showToggleDialog,
}) => {
  return (
    <>
      <StyledBoxShowMessage>
        <StyledBoxBg>レビューの続きを見るには</StyledBoxBg>
      </StyledBoxShowMessage>
      <Box textAlign="center">レビューを購入する</Box>
      <StyledBoxReviewInfo>
        <StyledBoxFlex>
          <Link href={`/${profile.display_name}`} passHref>
            <Box component="a" height={`${height}`}>
              <img
                src={profile.icon_src}
                style={{
                  borderRadius: "50px",
                  width: `${width}`,
                  height: `${height}`,
                  marginRight: "8px",
                }}
              />
            </Box>
          </Link>
          <Link href={`/${profile.display_name}`} passHref>
            <StyledAnchor>
              <Box component="p">{profile.display_name}</Box>
            </StyledAnchor>
          </Link>
        </StyledBoxFlex>
        <Box mb={1}>
          <StyledBoxTitleWrapper>{title}</StyledBoxTitleWrapper>
        </Box>
        <CustomSolidButton
          sizing="medium"
          onClick={showToggleDialog}
          color="secondary"
        >
          ¥{price}でレビューを購入する
        </CustomSolidButton>
      </StyledBoxReviewInfo>
    </>
  );
};
