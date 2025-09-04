import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  HeaderContainer,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnMainNew,
  HeaderUser,
  HeaderPopUserSet,
  PopUserSetName,
  PopUserSetMail,
  PopUserSetTheme,
  PopUserSetButton,
} from "./Header.styled";
import { Container } from "../shared/Shared.styled";

const Header = ({ onCreateTask }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Используем данные пользователя из контекста или дефолтные значения
  const userData = user || {
    name: "Ivan Ivanov",
    email: "ivan.ivanov@gmail.com",
  };

  const handleUserClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCreateTask = () => {
    if (onCreateTask) {
      onCreateTask();
    } else {
      navigate("/add-task");
    }
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    navigate("/exit");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          <HeaderLogo onClick={handleLogoClick}>
            <img src="/images/logo.png" alt="logo" />
          </HeaderLogo>
          <HeaderNav>
            <HeaderBtnMainNew id="btnMainNew" onClick={handleCreateTask}>
              Создать новую задачу
            </HeaderBtnMainNew>
            <HeaderUser onClick={handleUserClick}>{userData.name}</HeaderUser>
            <HeaderPopUserSet $isOpen={isUserMenuOpen}>
              <PopUserSetName>{userData.name}</PopUserSetName>
              <PopUserSetMail>{userData.email}</PopUserSetMail>
              <PopUserSetTheme>
                <p>Темная тема</p>
                <input type="checkbox" name="checkbox" />
              </PopUserSetTheme>
              <PopUserSetButton onClick={handleLogout}>Выйти</PopUserSetButton>
            </HeaderPopUserSet>
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
