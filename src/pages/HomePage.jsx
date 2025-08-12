import React from "react";
import styled from "styled-components";
import Main from "../components/Main/Main";
import Header from "../components/Header/Header";

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Header />
      <Main />
    </HomeContainer>
  );
};

export default HomePage;
