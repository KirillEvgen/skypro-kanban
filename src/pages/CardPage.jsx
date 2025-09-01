import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useTasks } from "../contexts/TasksContext";
import Header from "../components/Header/Header";

const CardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const CardPageContent = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const CardContent = styled.div`
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

const CardInfo = styled.div`
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

const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, getTaskById, loadTasks } = useTasks();
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("CardPage получил ID:", id, "тип:", typeof id);
    console.log("Текущие задачи:", tasks);

    // Если задачи еще не загружены, загружаем их
    if (!tasks || tasks.length === 0) {
      console.log("Задачи не загружены, загружаем...");
      loadTasks().then(() => {
        const foundTask = getTaskById(id);
        console.log("Найденная задача после загрузки:", foundTask);

        if (foundTask) {
          setTask(foundTask);
        } else {
          setError("Задача не найдена");
        }
      });
      return;
    }

    const foundTask = getTaskById(id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      setError("Задача не найдена");
    }
  }, [id, getTaskById, tasks]); // Убираем loadTasks из зависимостей

  const getTopicClass = (topic) => {
    return topic.toLowerCase().replace(" ", "-");
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(" ", "-");
  };

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);

      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error("Ошибка форматирования даты:", error);
      return dateString;
    }
  };

  const handleEdit = () => {
    navigate(`/edit-task/${id}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  // Показываем загрузку, если задачи еще не загружены
  if (!tasks || tasks.length === 0) {
    return (
      <CardContainer>
        <Header />
        <CardPageContent>
          <CardContent>
            <div>Загрузка задач...</div>
          </CardContent>
        </CardPageContent>
      </CardContainer>
    );
  }

  // Перенаправляем на 404 только если задачи загружены, но задача не найдена
  if (error) {
    return <Navigate to="/404" replace />;
  }

  // Показываем загрузку, если задача еще не найдена
  if (!task) {
    return (
      <CardContainer>
        <Header />
        <CardPageContent>
          <CardContent>
            <div>Загрузка задачи...</div>
          </CardContent>
        </CardPageContent>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <Header />
      <CardPageContent>
        <CardContent>
          <Title>Просмотр задачи</Title>

          <CardInfo>
            <Label>ID задачи</Label>
            <Value>{task._id || task.id}</Value>
          </CardInfo>

          <CardInfo>
            <Label>Название</Label>
            <Value>{task.title}</Value>
          </CardInfo>

          <CardInfo>
            <Label>Описание</Label>
            <Value>{task.description}</Value>
          </CardInfo>

          <CardInfo>
            <Label>Тема</Label>
            <Value>
              <TopicBadge className={getTopicClass(task.topic)}>
                {task.topic}
              </TopicBadge>
            </Value>
          </CardInfo>

          <CardInfo>
            <Label>Статус</Label>
            <Value>
              <StatusBadge className={getStatusClass(task.status)}>
                {task.status}
              </StatusBadge>
            </Value>
          </CardInfo>

          <CardInfo>
            <Label>Дата</Label>
            <Value>{formatDate(task.date)}</Value>
          </CardInfo>

          <ButtonGroup>
            <Button onClick={handleBack} className="secondary">
              Назад
            </Button>
            <Button onClick={handleEdit} className="primary">
              Редактировать
            </Button>
          </ButtonGroup>
        </CardContent>
      </CardPageContent>
    </CardContainer>
  );
};

export default CardPage;
