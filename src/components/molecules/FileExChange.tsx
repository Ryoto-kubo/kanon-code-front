import { UserImgIcon } from "@/components/atoms/UserImgIcon";
import { CustomLoader } from "@/components/common/loader";
import theme from "@/styles/theme";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CachedRounded from "@material-ui/icons/CachedRounded";
import React from "react";
import styled from "styled-components";

type Props = {
  htmlFor: string;
  picture: string;
  changeIcon: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
};

const useStyles = makeStyles(() => ({
  size: {
    width: "70px",
    height: "70px",
    margin: "auto",
  },
}));

const StyledBoxShadow = styled(Box)`
  position: relative;
  margin: auto;
  margin-bottom: 8px;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  box-shadow: 0px 8px 16px -2px rgba(92, 107, 192, 0.2),
    0px 0px 0px 1px rgba(92, 107, 192, 0.02);
`;
const StyledBoxHover = styled(Box)`
  transition: all 0.2s;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;
const StyledSpan = styled.span`
  font-size: 12px;
  font-weight: bold;
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;
// const StyledBoxCenter = styled(Box)`
//   position: relative;
//   // top: 50%;
//   // left: 50%;
//   // transform: translate(-50%, -50%);
// `;
export const FileExChange: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        id={props.htmlFor}
        name={props.htmlFor}
        type="file"
        style={{ display: "none" }}
        inputProps={{
          accept: "image/png, image/jpeg, image/gif",
        }}
        onChange={props.changeIcon}
      />
      <Box>
        <StyledBoxShadow>
          {props.isUploading ? (
            // <StyledBoxCenter>
            <CustomLoader width={50} height={50} />
          ) : (
            // </StyledBoxCenter>
            <UserImgIcon className={classes.size} picture={props.picture} />
          )}
        </StyledBoxShadow>
        <StyledBoxHover display="flex" alignItems="center">
          <Box mr={0.5} height={20}>
            <CachedRounded fontSize="small" />
          </Box>
          <StyledSpan>アイコン変更</StyledSpan>
        </StyledBoxHover>
      </Box>
    </div>
  );
};
