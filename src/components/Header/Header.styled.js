import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const HeaderLogo = styled.div`
  width: 85px;
  display: flex;
  align-items: center;
  position: relative;

  img {
    width: 85px;
    height: auto;
  }

  img:hover {
    transform: scale(1.02);
  }
`;

export const HeaderNav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

export const HeaderBtnMainNew = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
  }

  a {
    color: #ffffff;
  }
`;

export const HeaderUser = styled.button`
  height: 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #565eef;
  position: relative;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: #33399b;
  }

  &::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 1px;
    border-left: 1.9px solid #565eef;
    border-bottom: 1.9px solid #565eef;
    transform: rotate(-45deg);
    margin: -6px 0 0 5px;
    padding: 0;
  }

  &:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }
`;

export const HeaderPopUserSet = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  width: 213px;
  height: 205px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe3;
  background: #fff;
  padding: 34px;
  text-align: center;
  z-index: 2;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

export const PopUserSetName = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  margin-bottom: 4px;
`;

export const PopUserSetMail = styled.p`
  color: #94a6be;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 10px;
`;


export const PopUserSetButton = styled.button`
  width: 72px;
  height: 30px;
  background: transparent;
  color: #565eef;
  border: 1px solid #565eef;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #33399b;
    color: #ffffff;
  }

  a {
    color: inherit;
  }
`;

// Медиа-запросы для адаптивности
export const HeaderContainerResponsive = styled(HeaderContainer)`
  @media screen and (max-width: 660px) {
    padding: 0 20px;
  }
`;

export const HeaderNavResponsive = styled(HeaderNav)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const HeaderBtnMainNewResponsive = styled(HeaderBtnMainNew)`
  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-width: 495px) {
    width: 132px;
    height: 30px;
    background-color: #565eef;
    margin-right: 20px;
  }
`;

export const HeaderBlockResponsive = styled(HeaderBlock)`
  @media screen and (max-width: 495px) {
    width: 100%;
    height: 55px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
`;

export const HeaderUserResponsive = styled(HeaderUser)`
  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const HeaderPopUserSetResponsive = styled(HeaderPopUserSet)`
  @media screen and (max-width: 495px) {
    width: 100%;
    height: 55px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;

export const PopUserSetNameResponsive = styled(PopUserSetName)`
  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const PopUserSetButtonResponsive = styled(PopUserSetButton)`
  @media screen and (max-width: 495px) {
    display: none;
  }
`;
