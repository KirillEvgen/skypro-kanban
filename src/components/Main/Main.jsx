import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { useTasks } from "../../contexts/TasksContext";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";
import { Container } from "../shared/Shared.styled";
import { cardList } from "../../data";

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

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    console.log("Main компонент смонтирован, загружаем задачи...");
    loadTasks();
  }, []); // Убираем loadTasks из зависимостей

  // Логируем изменения задач
  useEffect(() => {
    console.log("Задачи изменились:", tasks);
    console.log("Количество задач:", tasks.length);
    console.log(
      "Статусы задач:",
      tasks.map((t) => ({
        id: t._id || t.id,
        title: t.title,
        status: t.status,
      }))
    );
  }, [tasks]);

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
    if (onCardClick) {
      onCardClick(card);
    } else {
      const taskId = card._id || card.id;
      navigate(`/card/${taskId}`);
    }
  };

  const handleCreateNewTask = () => {
    navigate("/add-task");
  };

  const handleCreateTestTasks = async () => {
    try {
      console.log("Создаем тестовые задачи...");
      const createdTasks = [];

      for (const taskData of cardList) {
        try {
          // Преобразуем дату в правильный формат
          const dateParts = taskData.date.split(".");
          const year =
            dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
          const formattedDate = `${year}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}`;

          const newTask = await createTask({
            title: taskData.title,
            description: taskData.description,
            topic: taskData.topic,
            status: taskData.status,
            date: formattedDate,
          });
          createdTasks.push(newTask);
          console.log("Создана задача:", newTask);
        } catch (error) {
          console.error("Ошибка создания задачи:", taskData.title, error);
        }
      }

      console.log("Всего создано тестовых задач:", createdTasks.length);
    } catch (error) {
      console.error("Ошибка создания тестовых задач:", error);
    }
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
  console.log("=== ОТЛАДКА MAIN КОМПОНЕНТА ===");
  console.log("Всего задач:", tasks?.length || 0);
  console.log("Задачи:", tasks);
  console.log("Тип задач:", typeof tasks);
  console.log("Является ли массивом:", Array.isArray(tasks));
  console.log("Статусы всех задач:", tasks?.map((task) => task.status) || []);
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("=== КОНЕЦ ОТЛАДКИ ===");

  // Защита от случаев, когда tasks не является массивом
  if (!Array.isArray(tasks)) {
    console.error("Ошибка: tasks не является массивом:", tasks);
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
                <button onClick={() => window.location.reload()}>
                  Обновить страницу
                </button>
              </div>
            </MainContent>
          </MainBlock>
        </Container>
      </MainContainer>
    );
  }

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
                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={handleCreateTestTasks}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  >
                    Создать тестовые задачи
                  </button>
                  <button
                    onClick={loadTasks}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Загрузить задачи
                  </button>
                </div>
              </div>
            ) : (
              columnTitles.map((title) => {
                const tasksInColumn = getTasksByStatus(title);
                console.log(
                  `Колонка "${title}":`,
                  tasksInColumn.length,
                  "задач"
                );
                console.log(`Задачи в колонке "${title}":`, tasksInColumn);
                console.log(
                  `Количество задач в колонке "${title}":`,
                  tasksInColumn.length
                );
                return (
                  <Column
                    key={`${title}-${tasksInColumn.length}`}
                    title={title}
                  >
                    {tasksInColumn.map((card) => {
                      console.log("Рендерим карточку:", card);
                      return (
                        <Card
                          key={card._id || card.id}
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
              })
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
