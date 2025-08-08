import React from "react";
import { ColumnContainer, ColumnTitle, CardsContainer } from "./Column.styled";

const Column = ({ title, children }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>
      <CardsContainer>{children}</CardsContainer>
    </ColumnContainer>
  );
};

export default Column;
