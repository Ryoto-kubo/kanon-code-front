import { GithubSourceTreeTypes } from '@/types/global';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';
import styled from 'styled-components';

type Props = {
  sourceTree: GithubSourceTreeTypes[];
  decodeContent: (name: string, encodedContetnt: string) => void;
};

const StyledTreeView = styled(TreeView)`
  text-align: left;
`;
const StyledButton = styled(Button)`
  padding: 0;
  background: none;
  width: 100%;
  display: block;
  text-align: left;
  &:hover {
    background: none;
  }
  border-radius: 50px;s
`;
const StyledBoxTreeItem = styled(Box)`
  display: flex;
  align-items: center;
`;
const StyledBoxNameWrapper = styled(Box)`
  margin-left: 8px;
`;

export const GithubSourceTree: React.FC<Props> = ({
  sourceTree,
  decodeContent,
}) => {
  const data: GithubSourceTreeTypes = {
    id: 'root',
    name: 'Source Tree',
    children: sourceTree,
  };

  const label = (name: string, type: 'blob' | 'tree') => {
    const LabelIcon = type === 'blob' ? CodeRoundedIcon : FolderOpenIcon;
    return (
      <StyledBoxTreeItem>
        <LabelIcon color='primary' />
        <StyledBoxNameWrapper>{name}</StyledBoxNameWrapper>
      </StyledBoxTreeItem>
    );
  };

  const renderTree = (nodes: GithubSourceTreeTypes) => {
    return nodes.children ? (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={label(nodes.name, nodes.type!)}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map(node => renderTree(node))
          : null}
      </TreeItem>
    ) : (
      <StyledButton
        key={nodes.id}
        disableRipple
        onClick={() => decodeContent(nodes.name, nodes.encodedContetnt!)}
      >
        <TreeItem nodeId={nodes.id} label={label(nodes.name, nodes.type!)} />
      </StyledButton>
    );
  };

  return (
    <>
      <StyledTreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </StyledTreeView>
    </>
  );
};
