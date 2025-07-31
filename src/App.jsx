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

  const handleOpenPopUser = () => setIsPopUserOpen(true);
  const handleClosePopUser = () => setIsPopUserOpen(false);
  const handleOpenPopNewCard = () => setIsPopNewCardOpen(true);
  const handleClosePopNewCard = () => setIsPopNewCardOpen(false);

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
    <>
      <div className="wrapper">
        {/* pop-up start */}
        <PopUser isOpen={isPopUserOpen} onClose={handleClosePopUser} />
        <PopNewCard isOpen={isPopNewCardOpen} onClose={handleClosePopNewCard} />
        <PopBrowse />
        {/* pop-up end */}
        <Header
          onOpenPopUser={handleOpenPopUser}
          onOpenPopNewCard={handleOpenPopNewCard}
        />
        <Main />
      </div>
    </>
  );
}

export default App;
