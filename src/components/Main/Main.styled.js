import styled from "styled-components";

export const MainContainer = styled.main`
  width: 100%;
  background-color: #eaeef6;
  min-height: calc(100vh - 70px);
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: flex-start;
`;

// Медиа-запросы для адаптивности
export const MainBlockResponsive = styled(MainBlock)`
  @media screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }
`;

export const MainContentResponsive = styled(MainContent)`
  @media screen and (max-width: 1200px) {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
