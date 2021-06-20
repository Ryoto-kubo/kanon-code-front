import { CustomHeading2 } from "@/components/atoms/CustomHeading2";
import { PROGRAMMING_ICONS } from "@/consts/programming-icons";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import { TransitionProps } from "@material-ui/core/transitions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import styled from "styled-components";

type ProgrammingIcon = {
  id: number;
  value: string;
  iconPath: string;
};
type ProgrammingIcons = {
  id: number;
  value: string;
  iconPath: string;
}[];
type Props = {
  title: string;
  isOpenDialog: boolean;
  closeDialog: () => void;
  targetLanguages: {
    id: string;
    value: number;
    text: string;
  }[];
  targetLanguageValue: number;
  programmingIcon: ProgrammingIcon;
  selectTargetLanguage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectProgrammingIcon: (
    event: React.ChangeEvent<{}>,
    value: string | ProgrammingIcon | null
  ) => void;
  registerContent: () => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledBoxWrapper = styled(Box)`
  padding: 20px 24px 0 24px;
`;
const StyledBoxButtonsWrapper = styled(Box)`
  padding: 24px 24px 16px 24px;
  text-align: right;
`;
const StyledBoxFlex = styled(Box)`
  display: block;
  ${(props) => props.theme.breakpoints.up("sm")} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const StyledTitle = styled(Box)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
const StyledBoxIconWrapper = styled(Box)`
  margin-bottom: 16px;
  width: 50px;
  height: 50px;
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-bottom: 0px;
    width: 15%;
  }
`;
const StyledBoxInputWrapper = styled(Box)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 85%;
  }
`;

export const PostSettingDialog: React.FC<Props> = (props) => {
  return (
    <Dialog
      open={props.isOpenDialog}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.closeDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledBoxWrapper>
        <CustomHeading2 fontSize={24} marginBottom={0}>
          {props.title}
        </CustomHeading2>
      </StyledBoxWrapper>
      <Box>
        <DialogContent>
          <StyledTitle>Languages</StyledTitle>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="targetLanguage"
              name="targetLanguage"
              value={props.targetLanguageValue}
              onChange={props.selectTargetLanguage}
            >
              <StyledBoxFlex>
                {props.targetLanguages.map((el) => (
                  <FormControlLabel
                    key={el.id}
                    value={el.value}
                    control={<Radio color="primary" />}
                    label={el.text}
                  />
                ))}
              </StyledBoxFlex>
            </RadioGroup>
          </FormControl>
        </DialogContent>
      </Box>
      <Box>
        <DialogContent>
          <StyledTitle>Icon</StyledTitle>
          <StyledBoxFlex>
            <StyledBoxIconWrapper>
              {props.programmingIcon.id !== 0 && (
                <img
                  width={50}
                  height={50}
                  src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${props.programmingIcon.iconPath}`}
                />
              )}
            </StyledBoxIconWrapper>
            <StyledBoxInputWrapper>
              <Autocomplete
                id="icon"
                onChange={(event, value) =>
                  props.selectProgrammingIcon(event, value)
                }
                options={PROGRAMMING_ICONS as ProgrammingIcons}
                renderOption={(option) => (
                  <React.Fragment>
                    <Box display="flex" alignItems="center">
                      <Box mr={1.5} height={25}>
                        <img
                          width={25}
                          height={25}
                          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${option.iconPath}`}
                        />
                      </Box>
                      <span>{option.value}</span>
                    </Box>
                  </React.Fragment>
                )}
                getOptionLabel={(option) => option.value}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="icon"
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </StyledBoxInputWrapper>
          </StyledBoxFlex>
        </DialogContent>
      </Box>
      <StyledBoxButtonsWrapper>
        <Box mr={1} display="inline-block">
          <Button onClick={props.closeDialog} color="primary">
            キャンセル
          </Button>
        </Box>
        <Button
          onClick={() => props.registerContent()}
          variant="contained"
          color="primary"
          disableElevation
        >
          投稿
        </Button>
      </StyledBoxButtonsWrapper>
    </Dialog>
  );
};