import "./App.css";
import { useState, useEffect } from "react";
import { cardList } from "./data";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Column from "./components/Column/Column";
import Card from "./components/Card/Card";
import Calendar from "./components/Calendar/Calendar";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopUser from "./components/popups/PopUser/PopUser";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(cardList);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getThemeClass = (topic) => {
    switch (topic) {
      case "Web Design":
        return "_orange";
      case "Research":
        return "_green";
      case "Copywriting":
        return "_purple";
      default:
        return "_gray";
    }
  };

  
  const getCardsByStatus = (status) => {
    return cards.filter((card) => card.status === status);
  };

  if (isLoading) {
    return (
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
    );
  }

  return (
    <>
      <div className="wrapper">
        {/* pop-up start */}
        <PopUser />
        <PopNewCard />
        <PopBrowse />
        {/* pop-up end */}
        <Header />
        <Main>
          <div className="main__content">
            <Column title="Без статуса">
              {getCardsByStatus("Без статуса").map((card) => (
                <Card
                  key={card.id}
                  themeClass={getThemeClass(card.topic)}
                  themeText={card.topic}
                  title={card.title}
                  date={card.date}
                />
              ))}
            </Column>
            <Column title="Нужно сделать">
              {getCardsByStatus("Нужно сделать").map((card) => (
                <Card
                  key={card.id}
                  themeClass={getThemeClass(card.topic)}
                  themeText={card.topic}
                  title={card.title}
                  date={card.date}
                />
              ))}
            </Column>
            <Column title="В работе">
              {getCardsByStatus("В работе").map((card) => (
                <Card
                  key={card.id}
                  themeClass={getThemeClass(card.topic)}
                  themeText={card.topic}
                  title={card.title}
                  date={card.date}
                />
              ))}
            </Column>
            <Column title="Тестирование">
              {getCardsByStatus("Тестирование").map((card) => (
                <Card
                  key={card.id}
                  themeClass={getThemeClass(card.topic)}
                  themeText={card.topic}
                  title={card.title}
                  date={card.date}
                />
              ))}
            </Column>
            <Column title="Готово">
              {getCardsByStatus("Готово").map((card) => (
                <Card
                  key={card.id}
                  themeClass={getThemeClass(card.topic)}
                  themeText={card.topic}
                  title={card.title}
                  date={card.date}
                />
              ))}
            </Column>
          </div>
        </Main>
      </div>
      <script src="js/script.js"></script>
    </>
  );
}

export default App;
