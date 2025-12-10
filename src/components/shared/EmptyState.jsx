import React from "react";
import {
  EmptyStateContainer,
  EmptyStateTitle,
  EmptyStateMessage,
  EmptyStateActions,
} from "./EmptyState.styled";

const EmptyState = ({
  title = "Нет данных",
  message = "Здесь пока ничего нет",
  onCreateTestTasks,
  onLoadTasks,
  isLoading = false,
}) => {
  return (
    <EmptyStateContainer>
      <EmptyStateTitle>{title}</EmptyStateTitle>
      <EmptyStateMessage>{message}</EmptyStateMessage>
      <EmptyStateActions>
        {onCreateTestTasks && (
          <button
            onClick={onCreateTestTasks}
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
              marginRight: "10px",
            }}
          >
            {isLoading ? "Создание..." : "Создать тестовые задачи"}
          </button>
        )}
        {onLoadTasks && (
          <button
            onClick={onLoadTasks}
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "Загрузка..." : "Обновить"}
          </button>
        )}
      </EmptyStateActions>
    </EmptyStateContainer>
  );
};

export default EmptyState;
