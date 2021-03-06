import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SearchIcon: React.FC = () => {
  return (
    <FontAwesomeIcon icon={faSearch} width={30} height={30} color="#707070" />
  );
};
