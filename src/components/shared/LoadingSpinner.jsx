import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  text-align: center;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #565eef;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
  color: #666;
  font-size: 16px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #565eef;
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

const LoadingSpinner = ({ message = "Загрузка..." }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
      <LoadingDots>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </LoadingDots>
    </LoadingContainer>
  );
};

export default LoadingSpinner;


