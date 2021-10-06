import { GithubSourceTreeTypes } from '@/types/global';
import { Box } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';
import styled from 'styled-components';

type TreeObjectTypes = {
  tree: GithubSourceTreeTypes[];
  contents: {
    [key: string]: string;
  };
};

type Props = {
  sourceTreeObject: TreeObjectTypes;
  getContent: (name: string, sha: string, path: string) => Promise<void>;
};

const StyledTreeView = styled(TreeView)`
  text-align: left;
`;
const StyledBoxTreeItem = styled(Box)`
  display: flex;
  align-items: center;
`;
const StyledBoxNameWrapper = styled(Box)`
  margin-left: 8px;
`;

export const GithubSourceTree: React.FC<Props> = ({
  sourceTreeObject,
  getContent,
}) => {
  const data: GithubSourceTreeTypes = {
    id: 'root',
    name: 'Source Tree',
    type: 'dir',
    children: sourceTreeObject === undefined ? [] : sourceTreeObject.tree,
  };

  const label = (name: string, type: 'file' | 'dir') => {
    const LabelIcon = type === 'file' ? CodeRoundedIcon : FolderOpenIcon;
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
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={label(nodes.name, nodes.type!)}
        onLabelClick={() => getContent(nodes.name, nodes.sha!, nodes.fullPath!)}
      />
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
