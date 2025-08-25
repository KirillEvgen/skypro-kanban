import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../contexts/TasksContext";

const ViewTaskContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const TaskCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
`;

const TaskInfo = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
  font-size: 14px;
  text-transform: uppercase;
`;

const Value = styled.div`
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #565eef;
`;

const TopicBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  &.web-design {
    background-color: #ffe4c2;
    color: #ff6d00;
  }

  &.research {
    background-color: #b4fdd1;
    color: #06b16e;
  }

  &.copywriting {
    background-color: #e9d4ff;
    color: #9a48f1;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  &.без-статуса {
    background-color: #94a6be;
    color: #ffffff;
  }

  &.нужно-сделать {
    background-color: #ffe4c2;
    color: #ff6d00;
  }

  &.в-работе {
    background-color: #b4fdd1;
    color: #06b16e;
  }

  &.тестирование {
    background-color: #e9d4ff;
    color: #9a48f1;
  }

  &.готово {
    background-color: #94a6be;
    color: #ffffff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &.primary {
    background-color: #565eef;
    color: white;

    &:hover {
      background-color: #4a4fd8;
    }
  }

  &.secondary {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #5a6268;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8d7da;
  border-radius: 4px;
`;

const ViewTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, loading, error } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const taskId = parseInt(id);
    const foundTask = getTaskById(taskId);
    if (foundTask) {
      setTask(foundTask);
    } else {
      setTask(null);
    }
  }, [id, getTaskById]);

  const getTopicClass = (topic) => {
    return topic.toLowerCase().replace(" ", "-");
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(" ", "-");
  };

  const handleEdit = () => {
    navigate(`/edit-task/${id}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <ViewTaskContainer>
        <TaskCard>
          <div>Загрузка...</div>
        </TaskCard>
      </ViewTaskContainer>
    );
  }

  if (error) {
    return (
      <ViewTaskContainer>
        <TaskCard>
          <ErrorMessage>{error}</ErrorMessage>
          <Button onClick={handleBack} className="secondary">
            Вернуться на главную
          </Button>
        </TaskCard>
      </ViewTaskContainer>
    );
  }

  if (!task) {
    return (
      <ViewTaskContainer>
        <TaskCard>
          <ErrorMessage>Задача не найдена</ErrorMessage>
          <Button onClick={handleBack} className="secondary">
            Вернуться на главную
          </Button>
        </TaskCard>
      </ViewTaskContainer>
    );
  }

  return (
    <ViewTaskContainer>
      <TaskCard>
        <Title>Просмотр задачи</Title>

        <TaskInfo>
          <Label>Название</Label>
          <Value>{task.title}</Value>
        </TaskInfo>

        <TaskInfo>
          <Label>Описание</Label>
          <Value>{task.description}</Value>
        </TaskInfo>

        <TaskInfo>
          <Label>Тема</Label>
          <Value>
            <TopicBadge className={getTopicClass(task.topic)}>
              {task.topic}
            </TopicBadge>
          </Value>
        </TaskInfo>

        <TaskInfo>
          <Label>Статус</Label>
          <Value>
            <StatusBadge className={getStatusClass(task.status)}>
              {task.status}
            </StatusBadge>
          </Value>
        </TaskInfo>

        <TaskInfo>
          <Label>Дата</Label>
          <Value>{task.date}</Value>
        </TaskInfo>

        <ButtonGroup>
          <Button onClick={handleBack} className="secondary">
            Назад
          </Button>
          <Button onClick={handleEdit} className="primary">
            Редактировать
          </Button>
        </ButtonGroup>
      </TaskCard>
    </ViewTaskContainer>
  );
};

export default ViewTaskPage;
