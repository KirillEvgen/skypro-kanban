import styled from "styled-components";

// Общие стили для контейнеров
export const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;

  @media screen and (max-width: 495px) {
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
  }
`;

// Общие стили для кнопок
export const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  font-family: inherit;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

// Общие стили для hover эффектов
export const Hover01 = styled.div`
  &:hover {
    background-color: #33399b;
  }
`;

export const Hover02 = styled.div`
  &:hover {
    color: #33399b;
  }

  &:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }
`;

export const Hover03 = styled.div`
  &:hover {
    background-color: #33399b;
    color: #ffffff;
  }

  &:hover a {
    color: #ffffff;
  }
`;

// Общие стили для цветовых тем
export const ThemeOrange = styled.div`
  background-color: #ffe4c2;
  color: #ff6d00;
`;

export const ThemeGreen = styled.div`
  background-color: #b4fdd1;
  color: #06b16e;
`;

export const ThemePurple = styled.div`
  background-color: #e9d4ff;
  color: #9a48f1;
`;

export const ThemeGray = styled.div`
  background-color: #94a6be;
  color: #ffffff;
`;

// Общие стили для текста
export const Subtitle = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;

// Общие стили для форм
export const FormInput = styled.input`
  width: 100%;
  height: 40px;
  border: 0.7px solid #d4dbe3;
  border-radius: 8px;
  outline: none;
  padding: 0 15px;
  font-size: 14px;
  line-height: 1;
  color: #000;
  background-color: #ffffff;

  &::placeholder {
    color: #94a6be;
  }

  &:focus {
    border-color: #565eef;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 0.7px solid #d4dbe3;
  border-radius: 8px;
  outline: none;
  padding: 15px;
  font-size: 14px;
  line-height: 1;
  color: #000;
  background-color: #ffffff;
  resize: none;

  &::placeholder {
    color: #94a6be;
  }

  &:focus {
    border-color: #565eef;
  }
`;

// Общие стили для попапов
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

export const PopupContainer = styled.div`
  width: 100%;
  max-width: 630px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 40px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  @media screen and (max-width: 660px) {
    width: 100%;
    max-width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
  }
`;

// Общие стили для анимаций
export const CardAnimation = styled.div`
  animation: card-animation 0.3s ease-in-out;

  @keyframes card-animation {
    0% {
      height: 0;
      opacity: 0;
    }
    100% {
      height: auto;
      opacity: 1;
    }
  }
`;
