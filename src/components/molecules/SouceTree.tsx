import { SourceTreeTypes } from '@/types/global'
import Button from '@material-ui/core/Button'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TreeItem from '@material-ui/lab/TreeItem'
import TreeView from '@material-ui/lab/TreeView'
import React from 'react'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  padding: 0;
  background: none;
  &:hover {
    background: none;
  }
`
type Props = {
  nodeIds: string[]
  sourceTree: SourceTreeTypes[]
  switchSourceCode: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

export const SouceTree: React.FC<Props> = ({
  nodeIds,
  sourceTree,
  switchSourceCode,
}) => {
  console.log(sourceTree)
  const data: SourceTreeTypes = {
    id: 'root',
    name: 'Source Tree',
    children: sourceTree,
  }

  const renderTree = (nodes: SourceTreeTypes) =>
    nodes.children ? (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    ) : (
      <StyledButton
        key={nodes.id}
        disableRipple
        value={nodes.active_step}
        onClick={switchSourceCode}
      >
        <TreeItem nodeId={nodes.id} label={nodes.name} />
      </StyledButton>
    )

  return (
    <>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root', ...nodeIds]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
    </>
  )
}
