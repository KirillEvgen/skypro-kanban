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

  const isNewTaskModalOpen = location.pathname === "/new-task";
  const isBrowseModalOpen = location.pathname.startsWith("/card/") && id;
  const isEditModalOpen = location.pathname.startsWith("/edit-task/") && id;

  const { getTaskById, tasks } = useTasks();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (id) {
      const card = getTaskById(id);
      setSelectedCard(card);
    } else {
      setSelectedCard(null);
    }
  }, [id, tasks, getTaskById]);

  const handleCreateNewTask = () => {
    navigate("/new-task");
  };

  const handleCloseNewTaskModal = () => {
    navigate("/");
  };

  const handleCardClick = (card) => {
    navigate(`/card/${card._id || card.id}`);
  };

  const handleCloseBrowseModal = () => {
    navigate("/");
  };

  const handleEditCard = (card) => {
    navigate(`/edit-task/${card._id || card.id}`);
  };

  const handleCloseEditModal = () => {
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
