import styled from "styled-components";

export const CardItem = styled.div`
  padding: 8px;
  margin-bottom: 10px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
  flex-shrink: 0;
`;

export const CardContainer = styled.div`
  width: 100%;
  min-height: 130px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 13px 13px 19px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const CardGroup = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const CardTheme = styled.div`
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => {
    switch (props.$themeClass) {
      case "_orange":
        return "#ffe4c2";
      case "_green":
        return "#b4fdd1";
      case "_purple":
        return "#e9d4ff";
      default:
        return "#94a6be";
    }
  }};
  color: ${(props) => {
    switch (props.$themeClass) {
      case "_orange":
        return "#ff6d00";
      case "_green":
        return "#06b16e";
      case "_purple":
        return "#9a48f1";
      default:
        return "#ffffff";
    }
  }};

  p {
    font-size: 10px;
    font-weight: 600;
    line-height: 10px;
    margin: 0;
    white-space: nowrap;
  }
`;

export const CardBtn = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #94a6be;
    margin: 0 1px;
  }
`;

export const CardContent = styled.div`
  min-height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1;
  height: 100%;
`;

export const CardTitle = styled.h3`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 12px;
  margin-top: 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #565eef;
  }
`;

export const CardDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: auto;
  flex-shrink: 0;

  svg {
    width: 13px;
    height: 13px;
  }

  p {
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: #94a6be;
    letter-spacing: 0.2px;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

// Медиа-запросы для адаптивности
export const CardContainerResponsive = styled(CardContainer)`
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: fit-content;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    border: 0.7px solid #d4dbe3;
    position: relative;
    cursor: pointer;
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: fit-content;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 10px;
    border: 0.7px solid #d4dbe3;
    position: relative;
    cursor: pointer;
  }
`;

export const CardTitleResponsive = styled(CardTitle)`
  @media screen and (max-width: 495px) {
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 10px;
    cursor: pointer;
  }
`;

export const CardThemeResponsive = styled(CardTheme)`
  @media screen and (max-width: 495px) {
    width: auto;
    height: 20px;
    padding: 4px 6px;
    border-radius: 4px;
    margin-right: 7px;
  }

  p {
    @media screen and (max-width: 495px) {
      font-size: 10px;
      font-weight: 600;
      line-height: 10px;
    }
  }
`;

export const CardDateResponsive = styled(CardDate)`
  @media screen and (max-width: 495px) {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #94a6be;
    font-size: 10px;
    line-height: 12px;
  }

  p {
    @media screen and (max-width: 495px) {
      color: #94a6be;
      font-size: 10px;
      line-height: 12px;
    }
  }

  svg {
    @media screen and (max-width: 495px) {
      width: 13px;
      height: 13px;
    }
  }
`;
