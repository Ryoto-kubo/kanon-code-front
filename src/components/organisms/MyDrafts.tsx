import theme from '@/styles/theme';
import { DraftsTypes } from '@/types/global';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

type Props = {
  drafts: DraftsTypes[];
};

const StyledAnchor = styled(`a`)`
  font-weight: bold;
  color: ${theme.palette.primary.main};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: ${theme.palette.primary.main};
  }
`;

export const MyDrafts: React.FC<Props> = props => {
  return (
    <>
      {props.drafts.length <= 0 ? (
        <Box mt={1}>
          <p>下書きがありません</p>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='left'>タイトル</TableCell>
                <TableCell align='left'>日付</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.drafts.map((el: DraftsTypes, index: number) => (
                <TableRow key={index}>
                  <TableCell align='left'>
                    <Link href={el.url} passHref>
                      <StyledAnchor>{el.contents.title}</StyledAnchor>
                    </Link>
                  </TableCell>
                  <TableCell align='left'>{el.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
