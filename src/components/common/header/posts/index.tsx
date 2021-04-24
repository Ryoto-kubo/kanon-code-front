import { CustomSwitch } from "@/components/atoms/CustomSwitch";
import { CustomSolidButton } from "@/components/atoms/SolidButton";
import { CustomStickyAppBar } from "@/components/atoms/StickyAppBar";
import { ArrowButton } from "@/components/molecules/ArrowButton";
import theme from "@/styles/theme";
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

export const ThePostsHeader: React.FC = React.memo(() => {
  const mainTextColor = theme.palette.text.primary;
  const disabledColor = "#707070";
  const [value, setValue] = useState("下書き保存");
  const [color, setColor] = useState(disabledColor);
  function draft() {
    console.log("下書き");
  }
  function switchPublish(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.currentTarget.checked;
    const value = isChecked ? "公開する" : "下書き保存";
    const color = isChecked ? mainTextColor : disabledColor;
    setValue(value);
    setColor(color);
  }
  function previousPage() {
    history.back();
  }

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
});
