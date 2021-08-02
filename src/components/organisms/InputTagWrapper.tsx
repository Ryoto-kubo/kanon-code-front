import { CloseButton } from '@/components/molecules/CloseButton';
import { SUGGEST_LIST } from '@/consts/suggest-list';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { fade } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  changeTagList: any;
  tagList?: string[];
};
const Tag = (props: any) => {
  const { label, onDelete, ...other } = props;
  return (
    <Box {...other}>
      <span>{label}</span>
      <CloseButton fontSize='small' func={onDelete} color='action' />
    </Box>
  );
};
Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
const StyledDivInputWrapper = styled('div')(
  ({ theme }) => `
  width: 100%;
  border: 1px solid #C4C4C4;
  border-radius: 4px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &:hover {
    border-color: #303030;
  }
  &.focused {
    margin: -1px;
    border: 2px solid ${theme.palette.primary.main};
  }
  & input {
    font-size: 16px;
    // transform: scale(0.8);
    height: 35px;
    box-sizing: border-box;
    padding: 8px;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
  & input::placeholder {
    color: #A4A4A4;
  }
`
);
const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${fade(theme.palette.primary.main, 0.1)};
  border: 1px solid ${fade(theme.palette.primary.main, 0.5)};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;
  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }
  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & svg {
    cursor: pointer;
    padding: 4px;
  }
`
);
const StyledListbox = styled(List)(
  ({ theme }) => `
  width: 100%;
  max-width: 375px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #ffffff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  & li {
    padding: 5px 12px;
    display: flex;
    & span {
      flex-grow: 1;
    }
    & svg {
      color: transparent;
    }
  }
  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;
    & svg {
      color: ${theme.palette.primary.main};
    }
  }
  & li[data-focus='true'] {
    background-color: ${fade(theme.palette.primary.main, 0.1)};
    cursor: pointer;
    & svg {
      color: currentColor;
    }
  }
`
);

export const InputTagWrapper: React.FC<Props> = React.memo(props => {
  console.log(props);

  const [tagValue, setTagValue] = useState('');
  const suggestWordList = SUGGEST_LIST.map(el => el.value);
  const MAX_LENGTH = 25;
  const MAX_TAGS_LENGTH = 5;
  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'tags',
    multiple: true,
    options: suggestWordList.sort(),
    freeSolo: true,
    inputValue: tagValue,
    defaultValue: props.tagList ? props.tagList : [],
    getOptionLabel: option => option,
    onChange: (_: React.ChangeEvent<{}>, values: string[]) => {
      if (values.length > MAX_TAGS_LENGTH) {
        values.pop();
      }
      props.changeTagList(values);
    },
    onInputChange: (_: React.ChangeEvent<{}>, value: string) => {
      if (value.length < MAX_LENGTH) {
        setTagValue(value);
      }
    },
  });
  return (
    <>
      <Box {...getRootProps()}>
        <StyledDivInputWrapper
          ref={setAnchorEl}
          className={focused ? 'focused' : ''}
        >
          {value.map((option, index) => (
            <StyledTag label={option} {...getTagProps({ index })} />
          ))}
          <input {...getInputProps()} placeholder='select up to 5 tags' />
        </StyledDivInputWrapper>
      </Box>
      {groupedOptions.length > 0 ? (
        <StyledListbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <ListItem {...getOptionProps({ option, index })}>
              <ListItemText>{option}</ListItemText>
              <CheckIcon fontSize='small' color='primary' />
            </ListItem>
          ))}
        </StyledListbox>
      ) : null}
    </>
  );
});
