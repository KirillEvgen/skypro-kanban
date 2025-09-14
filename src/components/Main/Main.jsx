import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { useTasks } from "../../contexts/TasksContext";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";
import { Container } from "../shared/Shared.styled";
import LoadingSpinner from "../shared/LoadingSpinner";
import EmptyState from "../shared/EmptyState";

const Main = ({ onCardClick }) => {
  const navigate = useNavigate();
  const {
    tasks,
    loading,
    error,
    getTasksByStatus,
    createTask,
    deleteTask,
    loadTasks,
  } = useTasks();

  const tasksArray = useMemo(() => {
    if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
      return tasks.tasks;
    } else if (Array.isArray(tasks)) {
      return tasks;
    } else {
      return [];
    }
  }, [tasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

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
    if (onCardClick) {
      onCardClick(card);
    } else {
      const taskId = card._id || card.id;
      navigate(`/card/${taskId}`);
    }
  };

  if (loading) {
    return (
      <MainContainer>
        <Container>
          <MainBlock>
            <MainContent>
              <LoadingSpinner message="Загрузка задач..." />
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

  if (!Array.isArray(tasksArray)) {
    return (
      <MainContainer>
        <Container>
          <MainBlock>
            <MainContent>
              <div
                style={{
                  textAlign: "center",
                  padding: "50px",
                  color: "red",
                  gridColumn: "1 / -1",
                }}
              >
                <h3>Ошибка данных</h3>
                <p>
                  Получены некорректные данные задач. Попробуйте обновить
                  страницу.
                </p>
                <button onClick={loadTasks}>Обновить данные</button>
              </div>
            </MainContent>
          </MainBlock>
        </Container>
      </MainContainer>
    );
  }

  const unknownStatusTasks = tasksArray.filter(
    (task) => !columnTitles.includes(task.status)
  );

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {tasksArray.length === 0 ? (
              <EmptyState
                title="Нет задач"
                message='Создайте первую задачу, нажав кнопку "Создать новую задачу" в заголовке'
                onLoadTasks={loadTasks}
                isLoading={loading}
              />
            ) : (
              <>
                {columnTitles.map((title) => {
                  const tasksInColumn = getTasksByStatus(title);
                  return (
                    <Column key={title} title={title}>
                      {tasksInColumn.map((card, index) => {
                        const uniqueKey =
                          card._id || card.id || `task-${index}-${card.title}`;
                        return (
                          <Card
                            key={uniqueKey}
                            themeClass={getThemeClass(card.topic)}
                            themeText={card.topic}
                            title={card.title}
                            date={card.date}
                            onOpenCard={() => handleCardClick(card)}
                          />
                        );
                      })}
                    </Column>
                  );
                })}

                {unknownStatusTasks.length > 0 && (
                  <Column key="unknown-status" title="Неизвестный статус">
                    {unknownStatusTasks.map((card, index) => {
                      const uniqueKey =
                        card._id ||
                        card.id ||
                        `unknown-task-${index}-${card.title}`;
                      return (
                        <Card
                          key={uniqueKey}
                          themeClass={getThemeClass(card.topic)}
                          themeText={card.topic}
                          title={card.title}
                          date={card.date}
                          onOpenCard={() => handleCardClick(card)}
                        />
                      );
                    })}
                  </Column>
                )}
              </>
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
