import "./App.css";
import { useState, useEffect } from "react";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import PopBrowse from "./components/popups/PopBrowse/PopBrowse";
import PopNewCard from "./components/popups/PopNewCard/PopNewCard";
import PopUser from "./components/popups/PopUser/PopUser";

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

  const handleOpenPopBrowse = (cardData) => {
    setSelectedCard(cardData);
    setIsPopBrowseOpen(true);
  };
  const handleClosePopBrowse = () => {
    setIsPopBrowseOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="wrapper">
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
      <Main onOpenPopBrowse={handleOpenPopBrowse} />
    </div>
  );
}

export default App;
