import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
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

const Button = styled.button`
  width: 100%;
  padding: 12px;
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

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;

  a {
    color: #565eef;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isAuth, login } = useAuth();

  // Проверяем, если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика входа
    console.log("Вход:", formData);

    // Проверяем, есть ли сохраненные данные пользователя
    const savedUserData = localStorage.getItem("userData");
    let userData;

    if (savedUserData) {
      // Если есть сохраненные данные, используем их
      userData = JSON.parse(savedUserData);
    } else {
      // Если нет сохраненных данных, создаем новые
      userData = {
        email: formData.email,
        name: formData.email.split("@")[0], // Используем часть email как имя
      };
      // Сохраняем новые данные в localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
    }

    login(userData);

    // После успешного входа перенаправляем на главную
    navigate("/");
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Вход в систему</Title>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Пароль</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Войти</Button>
        <RegisterLink>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;
