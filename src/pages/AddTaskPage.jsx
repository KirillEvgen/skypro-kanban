import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AddTaskContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const AddTaskForm = styled.form`
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
`;

const AddTaskPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design",
    status: "Без статуса",
    date: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика добавления задачи
    console.log("Новая задача:", formData);
    // После добавления перенаправляем на главную
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <AddTaskContainer>
      <AddTaskForm onSubmit={handleSubmit}>
        <Title>Добавить новую задачу</Title>
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
          <Button type="button" className="secondary" onClick={handleCancel}>
            Отмена
          </Button>
          <Button type="submit" className="primary">
            Добавить задачу
          </Button>
        </ButtonGroup>
      </AddTaskForm>
    </AddTaskContainer>
  );
};

export default AddTaskPage;
