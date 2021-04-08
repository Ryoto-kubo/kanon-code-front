import { CustomSwitch } from "@/components/atoms/CustomSwitch";
// import { LinkWrapper } from "@/components/atoms/Link";
// import { KanonCodeLogo } from "@/components/atoms/Logo";
import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { CustomStickyAppBar } from "@/components/atoms/StickyAppBar";
import { ArrowButton } from "@/components/molecules/ArrowButton";
import { Box } from "@material-ui/core/";
import React, { useState } from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  padding: 0 16px;
  max-width: 1280px;
  width: 100%;
  margin: auto;
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 0 24px;
  }
`;
const StyledUseMr = styled(Box)`
  margin-right: 24px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
`;

export const ThePostsHeader: React.FC = () => {
  const [value, setValue] = useState("下書き保存");
  const [color, setColor] = useState("#707070");
  const draft = () => {
    console.log("下書き");
  };
  const switchPublish = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    const value = isChecked ? "公開する" : "下書き保存";
    const color = isChecked ? "#202020" : "#707070";
    setValue(value);
    setColor(color);
  };
  const previousPage = () => {
    history.back();
  };

  return (
    <CustomStickyAppBar>
      <StyledBox
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <ArrowButton
          disableRipple={true}
          func={previousPage}
          fontSize="default"
          color="primary"
        />
        {/* <LinkWrapper href="/">
          <KanonCodeLogo />
        </LinkWrapper> */}
        <Box display="flex" alignItems="center">
          <StyledUseMr color={color}>
            <CustomSwitch onChange={switchPublish} />
            公開する
          </StyledUseMr>
          <CustomSolidButton sizing="small" onClick={draft}>
            {value}
          </CustomSolidButton>
        </Box>
      </StyledBox>
    </CustomStickyAppBar>
  );
};
