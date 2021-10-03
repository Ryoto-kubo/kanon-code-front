import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import React from 'react';
import styled from 'styled-components';

type Props = TextFieldProps & {
  index: number;
  listLength: number;
  onClick: VoidFunction;
  onDelete: VoidFunction;
  onChangeFileName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusGetIndex: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlurGetLang: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const StyledIconButton = styled(IconButton)`
  width: 30px;
  height: 30px;
`;

export const TextFieldWithCheckBox: React.FC<Props> = React.memo(props => {
  const {
    index,
    listLength,
    onClick,
    onDelete,
    onChangeFileName,
    onFocusGetIndex,
    onBlurGetLang,
    ...textFieldProps
  } = props;
  return (
    <>
      <Box mr={1} width='100%'>
        <TextField
          {...textFieldProps}
          onChange={onChangeFileName}
          onFocus={onFocusGetIndex}
          onBlur={onBlurGetLang}
          fullWidth
        />
      </Box>
      {listLength === 1 ? (
        <StyledIconButton color='primary' onClick={onClick}>
          <AddOutlinedIcon />
        </StyledIconButton>
      ) : index + 1 === listLength ? (
        <>
          <Box
            display='flex'
            justifyContent='space-between'
            flexDirection='column'
          >
            <StyledIconButton color='default' onClick={onDelete}>
              <DeleteOutlineOutlinedIcon />
            </StyledIconButton>
            <StyledIconButton color='primary' onClick={onClick}>
              <AddOutlinedIcon />
            </StyledIconButton>
          </Box>
        </>
      ) : (
        <StyledIconButton color='default' onClick={onDelete}>
          <DeleteOutlineOutlinedIcon />
        </StyledIconButton>
      )}
    </>
  );
});
