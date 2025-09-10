import React from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #d4dbe3;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.color || "#565eef"};
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #94a6be;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #d4dbe3;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 10px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${(props) => props.color || "#565eef"};
  width: ${(props) => props.percentage}%;
  transition: width 0.3s ease;
`;

const TaskStats = ({ tasks = [] }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Готово"
  ).length;
  const inProgressTasks = tasks.filter(
    (task) => task.status === "В работе" || task.status === "Тестирование"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status === "Без статуса" || task.status === "Нужно сделать"
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <StatsContainer>
      <StatCard>
        <StatNumber color="#3b82f6">{totalTasks}</StatNumber>
        <StatLabel>Всего задач</StatLabel>
      </StatCard>

      <StatCard>
        <StatNumber color="#10b981">{completedTasks}</StatNumber>
        <StatLabel>Выполнено</StatLabel>
        <ProgressBar>
          <ProgressFill
            color="#10b981"
            percentage={
              totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
            }
          />
        </ProgressBar>
      </StatCard>

      <StatCard>
        <StatNumber color="#f59e0b">{inProgressTasks}</StatNumber>
        <StatLabel>В работе</StatLabel>
      </StatCard>

      <StatCard>
        <StatNumber color="#6b7280">{pendingTasks}</StatNumber>
        <StatLabel>Ожидают</StatLabel>
      </StatCard>

      <StatCard>
        <StatNumber color="#8b5cf6">{completionRate}%</StatNumber>
        <StatLabel>Прогресс</StatLabel>
        <ProgressBar>
          <ProgressFill color="#8b5cf6" percentage={completionRate} />
        </ProgressBar>
      </StatCard>
    </StatsContainer>
  );
};

export default TaskStats;