import React from "react";

const PopUser = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="pop-exit" id="popExit" style={{ display: "block" }}>
      <div className="pop-exit__container" onClick={handleBackdropClick}>
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="formExit" action="#">
            <div className="pop-exit__form-group">
              <button
                type="button"
                className="pop-exit__exit-yes _hover01"
                id="exitYes"
                onClick={handleLogout}
              >
                Да, выйти
              </button>
              <button
                type="button"
                className="pop-exit__exit-no _hover03"
                id="exitNo"
                onClick={onClose}
              >
                Нет, остаться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUser;
