import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import React from "react";
import styled from "styled-components";

type Props = TextFieldProps & {
  index: number;
  listLength: number;
  isChecked: boolean;
  onClick: VoidFunction;
  onDelete: VoidFunction;
  onCnangeFileName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeIsChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusGetIndex: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const StyledIconButton = styled(IconButton)`
  width: 30px;
  height: 30px;
`;

export const TextFieldWithCheckBox: React.FC<Props> = (props) => {
  const {
    index,
    listLength,
    isChecked,
    onClick,
    onDelete,
    onCnangeFileName,
    onChangeIsChecked,
    onFocusGetIndex,
    ...textFieldProps
  } = props;
  return (
    <>
      <Box mr={1} width="100%">
        <TextField
          {...textFieldProps}
          onChange={onCnangeFileName}
          onFocus={onFocusGetIndex}
          fullWidth
        />
      </Box>
      {index + 1 === listLength ? (
        <StyledIconButton color="primary" onClick={onClick}>
          <AddOutlinedIcon />
        </StyledIconButton>
      ) : (
        <StyledIconButton color="default" onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </StyledIconButton>
      )}
    </>
  );
};
