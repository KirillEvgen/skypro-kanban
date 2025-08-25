import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Column from "../Column/Column";
import Card from "../Card/Card";
import PopBrowse from "../popups/PopBrowse/PopBrowse";
import PopNewCard from "../popups/PopNewCard/PopNewCard";
import PopEditCard from "../popups/PopEditCard/PopEditCard";
import { useTasks } from "../../contexts/TasksContext";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";
import { Container } from "../shared/Shared.styled";
import { cardList } from "../../data";

const Main = ({ isPopNewCardOpen, setIsPopNewCardOpen }) => {
  const navigate = useNavigate();
  const { tasks, loading, error, getTasksByStatus, createTask, deleteTask } =
    useTasks();

  // Состояние для модальных окон
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [isPopEditOpen, setIsPopEditOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    setSelectedCard(card);
    setIsPopBrowseOpen(true);
  };

  const handleClosePopBrowse = () => {
    setIsPopBrowseOpen(false);
    setSelectedCard(null);
  };

  const handleClosePopNewCard = () => {
    setIsPopNewCardOpen(false);
  };

  const handleClosePopEdit = () => {
    setIsPopEditOpen(false);
    setSelectedCard(null);
  };

  const handleEditTask = (card) => {
    console.log("Редактируем задачу:", card);
    setSelectedCard(card);
    setIsPopBrowseOpen(false); // Закрываем модальное окно просмотра
    setIsPopEditOpen(true); // Открываем модальное окно редактирования
  };

  const handleDeleteTask = async (card) => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      try {
        const taskId = card._id || card.id;
        await deleteTask(taskId);
        handleClosePopBrowse();
      } catch (error) {
        console.error("Ошибка удаления задачи:", error);
        alert("Ошибка при удалении задачи");
      }
    }
  };

  const handleCreateNewTask = () => {
    setIsPopNewCardOpen(true);
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
  console.log("Всего задач:", tasks?.length || 0);
  console.log("Задачи:", tasks);
  console.log("Тип задач:", typeof tasks);
  console.log("Является ли массивом:", Array.isArray(tasks));

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
                    }}
                  >
                    Создать тестовые задачи
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
                return (
                  <Column key={title} title={title}>
                    {tasksInColumn.map((card) => (
                      <Card
                        key={card._id || card.id}
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
      <PopBrowse
        isOpen={isPopBrowseOpen}
        onClose={handleClosePopBrowse}
        card={selectedCard}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
      <PopNewCard isOpen={isPopNewCardOpen} onClose={handleClosePopNewCard} />
      <PopEditCard
        isOpen={isPopEditOpen}
        onClose={handleClosePopEdit}
        card={selectedCard}
      />
    </MainContainer>
  );
};

export default Main;
