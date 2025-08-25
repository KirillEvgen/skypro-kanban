import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useTasks } from "../contexts/TasksContext";

const EditTaskContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const EditTaskForm = styled.form`
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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #565eef;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: #565eef;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #565eef;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
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

  &.danger {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }
`;

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, loading, error, loadTasks } =
    useTasks();
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    status: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("EditTaskPage получил ID:", id, "тип:", typeof id);
    console.log("Состояние загрузки:", loading);

    // Если задачи еще загружаются, ждем
    if (loading) {
      console.log("Задачи загружаются, ждем...");
      return;
    }

    const foundTask = getTaskById(id);
    console.log("Найденная задача:", foundTask);

    if (foundTask) {
      console.log("Устанавливаем данные задачи:", foundTask);
      setTask(foundTask);
      setFormData({
        title: foundTask.title,
        description: foundTask.description,
        topic: foundTask.topic,
        status: foundTask.status,
        date: foundTask.date,
      });
    } else {
      console.log("Задача не найдена, попробуем перезагрузить задачи...");
      // Попробуем перезагрузить задачи
      loadTasks().then(() => {
        const retryTask = getTaskById(id);
        if (retryTask) {
          console.log("Задача найдена после перезагрузки:", retryTask);
          setTask(retryTask);
          setFormData({
            title: retryTask.title,
            description: retryTask.description,
            topic: retryTask.topic,
            status: retryTask.status,
            date: retryTask.date,
          });
        } else {
          console.log("Задача не найдена даже после перезагрузки");
          setTask(null);
        }
      });
    }
  }, [id, getTaskById, loading, loadTasks]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateTask(id, formData);
      navigate("/");
    } catch (err) {
      console.error("Ошибка обновления задачи:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleDelete = async () => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      setIsSubmitting(true);
      try {
        await deleteTask(id);
        navigate("/");
      } catch (err) {
        console.error("Ошибка удаления задачи:", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <EditTaskContainer>
        <EditTaskForm>
          <div>Загрузка...</div>
        </EditTaskForm>
      </EditTaskContainer>
    );
  }

  if (error) {
    return (
      <EditTaskContainer>
        <EditTaskForm>
          <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>
          <Button onClick={handleCancel} className="secondary">
            Назад
          </Button>
        </EditTaskForm>
      </EditTaskContainer>
    );
  }

  if (!task) {
    return <Navigate to="/404" replace />;
  }

  return (
    <EditTaskContainer>
      <EditTaskForm onSubmit={handleSubmit}>
        <Title>Редактировать задачу</Title>
        <FormGroup>
          <Label htmlFor="title">Название задачи</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Описание</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="topic">Тема</Label>
          <Select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
          >
            <option value="Web Design">Web Design</option>
            <option value="Research">Research</option>
            <option value="Copywriting">Copywriting</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="status">Статус</Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Без статуса">Без статуса</option>
            <option value="Нужно сделать">Нужно сделать</option>
            <option value="В работе">В работе</option>
            <option value="Тестирование">Тестирование</option>
            <option value="Готово">Готово</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="date">Дата</Label>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <ButtonGroup>
          <Button
            type="button"
            className="danger"
            onClick={handleDelete}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Удаление..." : "Удалить"}
          </Button>
          <Button
            type="button"
            className="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button type="submit" className="primary" disabled={isSubmitting}>
            {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
          </Button>
        </ButtonGroup>
      </EditTaskForm>
    </EditTaskContainer>
  );
};

export default EditTaskPage;
