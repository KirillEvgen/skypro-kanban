import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LogoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const LogoutCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;

  &.primary {
    background-color: #565eef;
    color: white;
    border: none;

    &:hover {
      background-color: #4a4fd8;
    }
  }

  &.secondary {
    background-color: white;
    color: #565eef;
    border: 1px solid #565eef;

    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Здесь будет логика выхода
    // Очистка данных пользователя через контекст
    logout();
    // Перенаправление на страницу входа
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <LogoutContainer>
      <LogoutCard>
        <Title>Выйти из аккаунта?</Title>
        <ButtonGroup>
          <Button onClick={handleLogout} className="primary">
            Да, выйти
          </Button>
          <Button onClick={handleCancel} className="secondary">
            Нет, остаться
          </Button>
        </ButtonGroup>
      </LogoutCard>
    </LogoutContainer>
  );
};

export default LogoutPage;
