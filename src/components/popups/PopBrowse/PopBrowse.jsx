import React from "react";
import Calendar from "../../Calendar/Calendar";

const PopBrowse = ({ isOpen, onClose, card }) => {
  if (!isOpen || !card) return null;

  const {
    title,
    topic,
    status,
    description,
    date
  } = card;

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

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{title}</h3>
              <div className={`categories__theme theme-top ${getThemeClass(topic)} _active-category`}>
                <p className={getThemeClass(topic)}>{topic}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"].map((s) => (
                  <div
                    key={s}
                    className={`status__theme ${s === status ? "_gray" : "_hide"}`}
                  >
                    <p className={s === status ? "_gray" : ""}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    name="text"
                    id="textArea01"
                    readOnly
                    value={description || ""}
                    placeholder="Описание отсутствует..."
                  />
                </div>
              </form>
              <Calendar current={true} active={true} />
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className={`categories__theme ${getThemeClass(topic)} _active-category`}>
                <p className={getThemeClass(topic)}>{topic}</p>
              </div>
            </div>

            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03">Редактировать задачу</button>
                <button className="btn-browse__delete _btn-bor _hover03">Удалить задачу</button>
              </div>
              <button className="btn-browse__close _btn-bg _hover01" onClick={onClose}>Закрыть</button>
            </div>

            <div className="pop-browse__btn-edit _hide">
              <div className="btn-group">
                <button className="btn-edit__edit _btn-bg _hover01">Сохранить</button>
                <button className="btn-edit__edit _btn-bor _hover03">Отменить</button>
                <button className="btn-edit__delete _btn-bor _hover03" id="btnDelete">Удалить задачу</button>
              </div>
              <button className="btn-edit__close _btn-bg _hover01">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopBrowse;
