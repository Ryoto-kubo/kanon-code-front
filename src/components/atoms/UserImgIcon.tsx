import React from "react";
import styled from "styled-components";

interface Props {
  picture: string;
}
const StyledImg = styled.img`
  border-radius: 50px;
  width: 40px;
  width: 40px;
`;

export const UserImgIcon: React.FC<Props> = (props) => {
  return <StyledImg src={props.picture} alt="ユーザーアイコン" />;
};
