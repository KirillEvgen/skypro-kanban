import React from "react";

const PopUser = () => {
  return (
    <div className="pop-exit" id="popExit">
      <div className="pop-exit__container">
        <div className="pop-exit__block">
          <div className="pop-exit__ttl">
            <h2>Выйти из аккаунта?</h2>
          </div>
          <form className="pop-exit__form" id="formExit" action="#">
            <div className="pop-exit__form-group">
              <a
                href="modal/signin.html"
                className="pop-exit__exit-yes _hover01"
                id="exitYes"
              >
                Да, выйти
              </a>
              <a
                href="main.html"
                className="pop-exit__exit-no _hover03"
                id="exitNo"
              >
                Нет, остаться
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUser;
