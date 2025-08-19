import React from "react";
import { useNavigate } from "react-router-dom";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { useTasks } from "../../contexts/TasksContext";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";
import { Container } from "../shared/Shared.styled";

const Main = () => {
  const navigate = useNavigate();
  const { tasks, loading, error, getTasksByStatus } = useTasks();

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

  const handleCardClick = (card) => {
    console.log("Клик по карточке:", card);
    navigate(`/card/${card.id}`);
  };

  if (loading) {
    return (
      <MainContainer>
        <Container>
          <MainBlock>
            <MainContent>
              <div style={{ textAlign: "center", padding: "50px" }}>
                Загрузка задач...
              </div>
            </MainContent>
          </MainBlock>
        </Container>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <Container>
          <MainBlock>
            <MainContent>
              <div
                style={{ textAlign: "center", padding: "50px", color: "red" }}
              >
                Ошибка: {error}
              </div>
            </MainContent>
          </MainBlock>
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {columnTitles.map((title) => (
              <Column key={title} title={title}>
                {getTasksByStatus(title).map((card) => (
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
