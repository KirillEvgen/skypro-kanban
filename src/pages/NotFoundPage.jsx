import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const NotFoundCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 72px;
  color: #565eef;
  margin: 0;
  font-weight: bold;
`;

const Title = styled.h2`
  margin: 20px 0;
  color: #333;
  font-size: 24px;
`;

const Message = styled.p`
  margin-bottom: 30px;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4a4fd8;
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <NotFoundContainer>
      <NotFoundCard>
        <ErrorCode>404</ErrorCode>
        <Title>Страница не найдена</Title>
        <Message>
          К сожалению, запрашиваемая страница не существует. Возможно, она была
          удалена или перемещена.
        </Message>
        <Button onClick={handleGoHome}>Вернуться на главную</Button>
      </NotFoundCard>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
