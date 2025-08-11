import React from "react";
import { useNavigate } from "react-router-dom";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { cardList } from "../../data";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";
import { Container } from "../shared/Shared.styled";

const Main = () => {
  const navigate = useNavigate();
  const columnTitles = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

  const getThemeClass = (topic) => {
    switch (topic) {
      case "Web Design":
        return "_orange";
      case "Research":
        return "_green";
      case "Copywriting":
        return "_purple";
      default:
        return "_gray";
    }
  };

  const getCardsByStatus = (status) => {
    return cardList.filter((card) => card.status === status);
  };

  const handleCardClick = (card) => {
    console.log("Клик по карточке:", card);
    navigate(`/card/${card.id}`);
  };

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {columnTitles.map((title) => (
              <Column key={title} title={title}>
                {getCardsByStatus(title).map((card) => (
                  <Card
                    key={card.id}
                    themeClass={getThemeClass(card.topic)}
                    themeText={card.topic}
                    title={card.title}
                    date={card.date}
                    onOpenCard={() => handleCardClick(card)}
                  />
                ))}
              </Column>
            ))}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
