import { CloseButton } from "@/components/molecules/CloseButton";
import { ValidMessage } from "@/components/molecules/ValidMessage";
import { suggestionWords } from "@/consts/suggestion-words";
import LayoutPosts from "@/layouts/posts";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { fade } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

type Params = {
  title: string;
  tag: string;
  tagList: string[];
  description: string;
  sourceCode: string;
};

const StyledDivInputWrapper = styled("div")(
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
    font-size: 14px;
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

function Tag(props: any) {
  const { label, onDelete, ...other } = props;
  return (
    <Box {...other}>
      <span>{label}</span>
      <CloseButton fontSize="small" func={onDelete} color="action" />
    </Box>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const IndexPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    title: "",
    tag: "",
    tagList: [],
    description: "",
    sourceCode: "",
  });
  const [stateValid, setStateValid] = useState({
    isValidTitle: false,
    isValidTagList: false,
    isValidDescription: false,
    isValidSourceCode: false,
  });
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
    id: "tags",
    multiple: true,
    options: suggestionWords,
    freeSolo: true,
    getOptionLabel: (option) => option,
    onChange: (event: React.ChangeEvent<{}>, value: any) => {
      console.log(event);
      setParams({ ...params, tagList: value });
    },
  });
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setStateValid({ ...stateValid, isValidTitle: title.length > 32 });
    setParams({ ...params, title: title });
  };
  return (
    <LayoutPosts title="Kanon Code | レビュー依頼">
      <Container>
        <Box component="section">
          <Box mb={3}>
            <Box mb={0.5}>
              <TextField
                id="title"
                type="text"
                fullWidth
                inputProps={{ style: { fontSize: 24, fontWeight: "bold" } }}
                value={params.title}
                onChange={changeTitle}
                placeholder="タイトル"
              />
            </Box>
            {stateValid.isValidTitle && (
              <ValidMessage validText="32文字以下で入力してください" />
            )}
          </Box>
          <Box mb={3}>
            <Box {...getRootProps()}>
              <StyledDivInputWrapper
                ref={setAnchorEl}
                className={focused ? "focused" : ""}
              >
                {value.map((option, index) => (
                  <StyledTag label={option} {...getTagProps({ index })} />
                ))}
                <input {...getInputProps()} placeholder="タグを5つまで入力" />
              </StyledDivInputWrapper>
            </Box>
            {groupedOptions.length > 0 ? (
              <StyledListbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <ListItem {...getOptionProps({ option, index })}>
                    <ListItemText>{option}</ListItemText>
                    <CheckIcon fontSize="small" color="primary" />
                  </ListItem>
                ))}
              </StyledListbox>
            ) : null}
          </Box>
        </Box>
      </Container>
    </LayoutPosts>
  );
};
export default IndexPage;
