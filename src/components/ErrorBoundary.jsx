import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: #f5f5f5;
`;

const ErrorTitle = styled.h1`
  color: #e74c3c;
  margin-bottom: 20px;
  font-size: 24px;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
  max-width: 500px;
`;

const RetryButton = styled.button`
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы следующий рендер показал fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Логируем ошибку
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Что-то пошло не так</ErrorTitle>
          <ErrorMessage>
            Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить
            страницу или вернуться позже.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            Попробовать снова
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
