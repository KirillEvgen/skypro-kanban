import "./App.css";
import { useState, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopUser from "./components/popups/PopUser/PopUser";


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    color: #000;
    line-height: 1.5;
  }

  html {
    font-size: 16px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex: 1;
    padding: 20px 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 30px;
  }

  .main__block {
    width: 100%;
  }

  
  .calendar {
    width: 182px;
    margin-bottom: 25px;
  }

  .calendar__ttl {
    margin-bottom: 16px;
    padding: 0 7px;
  }

  .calendar__p {
    color: #94a6be;
    font-size: 10px;
    line-height: 1;
  }

  .calendar__p span {
    color: #000000;
  }

  .calendar__block {
    display: block;
  }

  .calendar__month {
    color: #94a6be;
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
  }

  .calendar__content {
    margin-bottom: 15px;
  }

  .calendar__days-names {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 0 7px;
  }

  .calendar__day-name {
    color: #94a6be;
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.2px;
  }

  .calendar__cells {
    width: 182px;
    height: 126px;
    display: flex;
    flex-wrap: wrap;
  }

  .calendar__cell {
    width: 22px;
    height: 22px;
    margin: 2px;
    border-radius: 50%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    color: #94a6be;
    font-size: 10px;
    line-height: 1;
    letter-spacing: -0.2px;
    cursor: pointer;
  }

  .calendar__nav {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding: 0 7px;
  }

  .calendar__period {
    padding: 0 7px;
  }

  .nav__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__action {
    width: 18px;
    height: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav__action svg {
    fill: #94a6be;
  }

  ._other-month {
    opacity: 0;
  }

  ._cell-day:hover {
    color: #94a6be;
    background-color: #eaeef6;
  }

  ._active-day {
    background-color: #94a6be;
    color: #ffffff;
  }

  ._current {
    font-weight: 700;
  }

  @media screen and (max-width: 660px) {
    .container {
      padding: 0 20px;
    }

    .calendar {
      max-width: 340px;
      width: 100%;
    }

    .calendar__ttl,
    .calendar__nav,
    .calendar__period {
      padding: 0;
    }

    .calendar__p {
      font-size: 14px;
    }

    .calendar__day-name {
      font-size: 14px;
    }

    .calendar__cells {
      width: 344px;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .calendar__cell {
      width: 42px;
      height: 42px;
      font-size: 14px;
    }
  }
`;

// Тема для styled-components
const theme = {
  colors: {
    primary: "#565eef",
    secondary: "#94a6be",
    background: "#f5f5f5",
    white: "#ffffff",
    black: "#000000",
    gray: "#d4dbe3",
    hover: "#f4f5f6",
  },
  breakpoints: {
    mobile: "660px",
    tablet: "1024px",
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPopUserOpen, setIsPopUserOpen] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpenPopUser = () => setIsPopUserOpen(true);
  const handleClosePopUser = () => setIsPopUserOpen(false);

  const handleOpenPopNewCard = () => setIsPopNewCardOpen(true);
  const handleClosePopNewCard = () => setIsPopNewCardOpen(false);

  const handleOpenCard = (card) => {
    console.log("handleOpenCard вызван с карточкой:", card);
    setSelectedCard(card);
    setIsPopBrowseOpen(true);
  };

  const handleClosePopBrowse = () => {
    setIsPopBrowseOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="wrapper">
          <Header />
          <main className="main">
            <div className="container">
              <div className="main__block">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50vh",
                    fontSize: "18px",
                    color: "#94A6BE",
                  }}
                >
                  Данные загружаются...
                </div>
              </div>
            </div>
          </main>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PopUser isOpen={isPopUserOpen} onClose={handleClosePopUser} />
      <PopNewCard isOpen={isPopNewCardOpen} onClose={handleClosePopNewCard} />
      <PopBrowse
        isOpen={isPopBrowseOpen}
        onClose={handleClosePopBrowse}
        card={selectedCard}
      />

      <Header
        onOpenPopUser={handleOpenPopUser}
        onOpenPopNewCard={handleOpenPopNewCard}
      />
      <Main onOpenPopBrowse={handleOpenCard} />
    </ThemeProvider>
  );
}

export default App;
