import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const BellIcon: React.FC = () => {
  return (
    <FontAwesomeIcon icon={faBell} width={20} height={20} color="#707070" />
  );
};
