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

  // Отладочная информация
  console.log("Всего задач:", tasks.length);
  console.log("Задачи:", tasks);

  // Показываем все уникальные статусы
  const uniqueStatuses = [...new Set(tasks.map((task) => task.status))];
  console.log("Уникальные статусы в задачах:", uniqueStatuses);

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {tasks.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px",
                  color: "#666",
                  gridColumn: "1 / -1",
                }}
              >
                <h3>Нет задач</h3>
                <p>
                  Создайте первую задачу, нажав кнопку "Создать новую задачу" в
                  заголовке
                </p>
              </div>
            ) : (
              columnTitles.map((title) => {
                const tasksInColumn = getTasksByStatus(title);
                console.log(
                  `Колонка "${title}":`,
                  tasksInColumn.length,
                  "задач"
                );
                return (
                  <Column key={title} title={title}>
                    {tasksInColumn.map((card) => (
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
                );
              })
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
