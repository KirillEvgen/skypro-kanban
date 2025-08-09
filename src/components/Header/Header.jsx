import React, { useState } from "react";
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

const Header = ({ onOpenPopUser, onOpenPopNewCard }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <HeaderContainer>
      <Container>
        <HeaderBlock>
          <HeaderLogo>
            <img src="/images/logo.png" alt="logo" />
          </HeaderLogo>
          <HeaderNav>
            <HeaderBtnMainNew id="btnMainNew" onClick={onOpenPopNewCard}>
              Создать новую задачу
            </HeaderBtnMainNew>
            <HeaderUser onClick={handleUserClick}>Ivan Ivanov</HeaderUser>
            <HeaderPopUserSet isOpen={isUserMenuOpen}>
              <PopUserSetName>Ivan Ivanov</PopUserSetName>
              <PopUserSetMail>ivan.ivanov@gmail.com</PopUserSetMail>
              <PopUserSetTheme>
                <p>Темная тема</p>
                <input type="checkbox" name="checkbox" />
              </PopUserSetTheme>
              <PopUserSetButton
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onOpenPopUser();
                }}
              >
                Выйти
              </PopUserSetButton>
            </HeaderPopUserSet>
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
