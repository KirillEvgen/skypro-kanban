import React from "react";
import Calendar from "../../Calendar/Calendar";

const PopBrowse = ({ isOpen, card, onClose }) => {
  console.log("PopBrowse получил props:", { isOpen, card });
  if (!isOpen || !card) return null;

  return (
    <div className="pop-browse" style={{ display: isOpen ? "block" : "none" }}>
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{card.title}</h3>
              <div className="categories__theme theme-top _orange _active-category">
                <p className="_orange">{card.topic}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                <div className="status__theme _gray">
                  <p className="_gray">Нужно сделать</p>
                </div>
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    id="textArea01"
                    value={card.description || ""}
                    readOnly
                  />
                </div>
              </form>
              <Calendar current={true} active={true} />
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__theme _orange _active-category">
                <p className="_orange">{card.topic}</p>
              </div>
            </div>

            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03">
                  Редактировать задачу
                </button>
                <button className="btn-browse__delete _btn-bor _hover03">
                  Удалить задачу
                </button>
              </div>
              <button
                className="btn-browse__close _btn-bg _hover01"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopBrowse;
