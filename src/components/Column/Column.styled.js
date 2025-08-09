import styled from "styled-components";

export const ColumnContainer = styled.div`
  width: 18%;
  min-width: 200px;
  max-width: 250px;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 20px 0 15px;

  p {
    color: #94a6be;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    margin: 0;
  }
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;

// Медиа-запросы для адаптивности
export const ColumnContainerResponsive = styled(ColumnContainer)`
  @media screen and (max-width: 1200px) {
    width: 100%;
    min-width: 300px;
    max-width: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    min-width: 300px;
    max-width: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
