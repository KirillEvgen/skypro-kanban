import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Main from "../components/Main/Main";
import Header from "../components/Header/Header";
import PopNewCard from "../components/popups/PopNewCard/PopNewCard";
import PopBrowse from "../components/popups/PopBrowse/PopBrowse";
import PopEditCard from "../components/popups/PopEditCard/PopEditCard";
import { useTasks } from "../contexts/TasksContext";

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HomePage = () => {
  const { deleteTask } = useTasks();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Определяем какое модальное окно должно быть открыто
  const isNewTaskModalOpen = location.pathname === "/new-task";
  const isBrowseModalOpen = location.pathname.startsWith("/card/") && id;
  const isEditModalOpen = location.pathname.startsWith("/edit-task/") && id;

  // Получаем задачу для модальных окон
  const { getTaskById, tasks } = useTasks();
  const [selectedCard, setSelectedCard] = useState(null);

  // Принудительно обновляем выбранную карточку при изменении задач
  useEffect(() => {
    console.log("=== HomePage: Обновляем выбранную карточку ===");
    console.log("ID:", id);
    console.log("Задачи:", tasks);
    console.log("Количество задач:", tasks.length);
    if (id) {
      const card = getTaskById(id);
      console.log("Найденная карточка:", card);
      setSelectedCard(card);
    } else {
      setSelectedCard(null);
    }
    console.log("=== Конец обновления карточки ===");

    // Принудительно вызываем перерендер
    const timeoutId = setTimeout(() => {
      console.log("=== HomePage: Принудительный перерендер ===");
      // Это вызовет перерендер компонента
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [id, tasks, getTaskById]);

  const handleCreateNewTask = () => {
    console.log("Открываем модальное окно создания задачи");
    navigate("/new-task");
  };

  const handleCloseNewTaskModal = () => {
    console.log("=== HomePage: Закрываем модальное окно создания задачи ===");
    navigate("/");
    console.log("=== HomePage: Навигация выполнена ===");
  };

  const handleCardClick = (card) => {
    console.log("Открываем модальное окно просмотра задачи:", card);
    navigate(`/card/${card._id || card.id}`);
  };

  const handleCloseBrowseModal = () => {
    console.log("Закрываем модальное окно просмотра задачи");
    navigate("/");
  };

  const handleEditCard = (card) => {
    console.log("Открываем модальное окно редактирования задачи:", card);
    navigate(`/edit-task/${card._id || card.id}`);
  };

  const handleCloseEditModal = () => {
    console.log("Закрываем модальное окно редактирования задачи");
    navigate("/");
  };

  const handleDeleteCard = async (card) => {
    try {
      const taskId = card._id || card.id;
      await deleteTask(taskId);
      navigate("/");
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
      alert("Ошибка при удалении задачи");
    }
  };

  return (
    <HomeContainer>
      <Header onCreateTask={handleCreateNewTask} />
      <Main onCardClick={handleCardClick} />
      <PopNewCard
        isOpen={isNewTaskModalOpen}
        onClose={handleCloseNewTaskModal}
      />
      <PopBrowse
        isOpen={isBrowseModalOpen}
        card={selectedCard}
        onClose={handleCloseBrowseModal}
        onEdit={handleEditCard}
        onDelete={handleDeleteCard}
      />
      <PopEditCard
        isOpen={isEditModalOpen}
        card={selectedCard}
        onClose={handleCloseEditModal}
      />
    </HomeContainer>
  );
};

export default HomePage;
