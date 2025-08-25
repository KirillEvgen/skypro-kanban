import React, { useState } from "react";
import styled from "styled-components";
import Main from "../components/Main/Main";
import Header from "../components/Header/Header";

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);

  const handleCreateNewTask = () => {
    setIsPopNewCardOpen(true);
  };

  return (
    <HomeContainer>
      <Header onCreateTask={handleCreateNewTask} />
      <Main
        isPopNewCardOpen={isPopNewCardOpen}
        setIsPopNewCardOpen={setIsPopNewCardOpen}
      />
    </HomeContainer>
  );
};

export default HomePage;
