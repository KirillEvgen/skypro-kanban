import React, { useState } from "react";
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
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isBrowseModalOpen, setIsBrowseModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCreateNewTask = () => {
    console.log("Открываем модальное окно создания задачи");
    setIsNewTaskModalOpen(true);
  };

  const handleCloseNewTaskModal = () => {
    console.log("Закрываем модальное окно создания задачи");
    setIsNewTaskModalOpen(false);
  };

  const handleCardClick = (card) => {
    console.log("Открываем модальное окно просмотра задачи:", card);
    setSelectedCard(card);
    setIsBrowseModalOpen(true);
  };

  const handleCloseBrowseModal = () => {
    console.log("Закрываем модальное окно просмотра задачи");
    setIsBrowseModalOpen(false);
    setSelectedCard(null);
  };

  const handleEditCard = (card) => {
    console.log("Открываем модальное окно редактирования задачи:", card);
    setSelectedCard(card);
    setIsBrowseModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    console.log("Закрываем модальное окно редактирования задачи");
    setIsEditModalOpen(false);
    setSelectedCard(null);
  };

  const handleDeleteCard = async (card) => {
    try {
      const taskId = card._id || card.id;
      await deleteTask(taskId);
      setIsBrowseModalOpen(false);
      setSelectedCard(null);
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
