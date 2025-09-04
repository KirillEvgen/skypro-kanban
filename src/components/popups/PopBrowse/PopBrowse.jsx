import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../Calendar/Calendar";

const PopBrowse = ({ isOpen, card, onClose, onEdit, onDelete }) => {
  const navigate = useNavigate();
  console.log("PopBrowse получил props:", { isOpen, card });

  // Обработка клавиши Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  // Функция для форматирования даты
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);

      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error("Ошибка форматирования даты:", error);
      return dateString;
    }
  };

  // Функция для получения класса статуса
  const getStatusClass = (status) => {
    switch (status) {
      case "Без статуса":
        return "_gray";
      case "Нужно сделать":
        return "_orange";
      case "В работе":
        return "_green";
      case "Тестирование":
        return "_purple";
      case "Готово":
        return "_green";
      default:
        return "_gray";
    }
  };

  // Функция для получения класса категории
  const getTopicClass = (topic) => {
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

  const handleEdit = () => {
    onEdit(card);
  };

  const handleDelete = () => {
    onDelete(card);
  };

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Перемещаем условный рендеринг в конец, после всех вызовов хуков
  if (!isOpen || !card) {
    return null;
  }

  // Дополнительная проверка на существование необходимых полей
  if (!card.title || !card.topic) {
    console.error("Карточка не содержит необходимых данных:", card);
    return null;
  }

  return (
    <div className="pop-browse" style={{ display: isOpen ? "block" : "none" }}>
      <div className="pop-browse__container" onClick={handleContainerClick}>
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{card.title}</h3>
              <div
                className={`categories__theme theme-top ${getTopicClass(card.topic)} _active-category`}
              >
                <p className={getTopicClass(card.topic)}>{card.topic}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                <div className={`status__theme ${getStatusClass(card.status)}`}>
                  <p className={getStatusClass(card.status)}>{card.status}</p>
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
              <Calendar current={true} active={card.date} />
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div
                className={`categories__theme ${getTopicClass(card.topic)} _active-category`}
              >
                <p className={getTopicClass(card.topic)}>{card.topic}</p>
              </div>
            </div>

            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button
                  className="btn-browse__edit _btn-bor _hover03"
                  onClick={handleEdit}
                >
                  Редактировать задачу
                </button>
                <button
                  className="btn-browse__delete _btn-bor _hover03"
                  onClick={handleDelete}
                >
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
