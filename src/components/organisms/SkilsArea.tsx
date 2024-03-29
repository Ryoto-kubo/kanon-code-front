import { CustomHeading2 } from '@/components/atoms/CustomHeading2';
import { IconStar } from '@/components/svg/materialIcons/IconStar';
import { YEARS_EXPERIENCES } from '@/consts/years-experiences';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  skils: { language: string; years_experiences: number }[];
};

const StyledBoxSkilsArea = styled(Box)`
  background: #364549;
  padding: 10px;
  border-radius: 4px;
  height: auto;
  width: 100%;
  ${props => props.theme.breakpoints.up('sm')} {
    min-width: 375px;
    height: 250px;
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;
const StyledBoxSkil = styled(Box)`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  ${props => props.theme.breakpoints.up('sm')} {
    width: 31%;
  }
`;
const StyledBoxIconStar = styled(Box)`
  color: #fbbc05;
  display: inline-block;
`;
const StyledDivider = styled(Divider)`
  background: #ffffff;
`;

export const SkilsArea: React.FC<Props> = props => {
  const createInsertIconStars = (roopCount: number) => {
    const icons = [];
    for (let i = 0; i < roopCount; i++) {
      icons.push(
        <StyledBoxIconStar key={uuidv4()}>
          <IconStar fontSize='small' />
        </StyledBoxIconStar>
      );
    }
    return icons;
  };

  return (
    <>
      <CustomHeading2 fontSize={20} marginBottom={1}>
        スキル一覧
      </CustomHeading2>
      <StyledBoxSkilsArea>
        {props.skils.map(
          el =>
            el.language && (
              <StyledBoxSkil key={uuidv4()}>
                <p>
                  {el.language} /{' '}
                  {YEARS_EXPERIENCES[el.years_experiences].label}
                </p>
                {createInsertIconStars(el.years_experiences)}
                <StyledDivider />
              </StyledBoxSkil>
            )
        )}
      </StyledBoxSkilsArea>
    </>
  );
};
