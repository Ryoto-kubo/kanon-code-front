import { CustomLoader } from "@/components/common/loader";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import LinkIcon from "@material-ui/icons/Link";
import PanoramaOutlinedIcon from "@material-ui/icons/PanoramaOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import React from "react";
import styled from "styled-components";

type Props = {
  switchPreview: (event: React.MouseEvent<HTMLButtonElement>) => void;
  insertCodeMde: (event: React.MouseEvent<HTMLButtonElement>) => void;
  insertLinkMde: (event: React.MouseEvent<HTMLButtonElement>) => void;
  insertImageMde: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
};
type TooltipProps = {
  title: string;
  children: any;
};

const StyledBox = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-top: 0px;
    display: inline-block;
    padding: 0 0 0 16px;
  }
`;
const StyledIconButton = styled(IconButton)`
  margin-left: 8px;
  width: 40px;
  height: 40px;
  padding: 0;
  font-size: initial;
  &:hover {
    background: none;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 16px;
    margin-left: 0px;
    display: block;
  }
`;
const StyledBoxCircle = styled(Box)`
  background: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  color: #5f6368;
  position: relative;
  transition: all 0.3s;
  box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
    0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.7),
      0px 0px 0px 1px rgba(92, 107, 192, 0.02);
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 0px;
  }
`;
const StyledBoxCenter = styled(Box)`
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledInputLabel = styled(InputLabel)`
  margin-left: 8px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 0px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const EditorButtons: React.FC<Props> = React.memo((props) => {
  const { switchPreview, insertCodeMde, insertLinkMde, insertImageMde } = props;

  const TooltipWrapper = (props: TooltipProps) => {
    return (
      <Tooltip title={props.title} arrow>
        {props.children}
      </Tooltip>
    );
  };

  return (
    <StyledBox>
      <TooltipWrapper title="Preview">
        <StyledIconButton
          disableFocusRipple
          disableRipple
          onClick={switchPreview}
        >
          <StyledBoxCircle>
            <StyledBoxCenter>
              <VisibilityOutlinedIcon />
            </StyledBoxCenter>
          </StyledBoxCircle>
        </StyledIconButton>
      </TooltipWrapper>
      <TooltipWrapper title="Code">
        <StyledIconButton
          disableFocusRipple
          disableRipple
          onClick={insertCodeMde}
        >
          <StyledBoxCircle>
            <StyledBoxCenter>
              <CodeOutlinedIcon />
            </StyledBoxCenter>
          </StyledBoxCircle>
        </StyledIconButton>
      </TooltipWrapper>
      <TooltipWrapper title="Link">
        <StyledIconButton
          disableFocusRipple
          disableRipple
          onClick={insertLinkMde}
        >
          <StyledBoxCircle>
            <StyledBoxCenter>
              <LinkIcon />
            </StyledBoxCenter>
          </StyledBoxCircle>
        </StyledIconButton>
      </TooltipWrapper>
      <TooltipWrapper title="Image">
          {props.isUploading ? (
            <StyledBoxCircle>
              <StyledBoxCenter>
                <CustomLoader width={25} height={25} />
              </StyledBoxCenter>
            </StyledBoxCircle>
          ) : (
            <StyledInputLabel htmlFor="insert-img-mde">
            <TextField
                id="insert-img-mde"
                type="file"
                style={{ display: "none" }}
                inputProps={{
                  accept: "image/png, image/jpeg, image/gif",
                  multiple: true,
                }}
                onChange={insertImageMde}
              />
              <StyledBoxCircle>
                <StyledBoxCenter>
                  <PanoramaOutlinedIcon />
                </StyledBoxCenter>
              </StyledBoxCircle>
              </StyledInputLabel>
            // </>
          )}
      </TooltipWrapper>
    </StyledBox>
  );
});
