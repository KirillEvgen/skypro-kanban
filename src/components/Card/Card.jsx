import React from "react";

const Card = ({ themeClass, themeText, title, date, onOpenCard }) => {
  console.log("Card получил props:", { onOpenCard });

  return (
    <div className="cards__item">
      <div className="cards__card card">
        <div className="card__group">
          <div className={`card__theme ${themeClass}`}>
            <p>{themeText}</p>
          </div>
          <button type="button" className="card__btn" onClick={onOpenCard}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </div>
        <div className="card__content">
          <h3 className="card__title" onClick={onOpenCard}>{title}</h3>
          <div className="card__date">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13">
              <path
                d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                stroke="#94A6BE"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <path
                d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                stroke="#94A6BE"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;