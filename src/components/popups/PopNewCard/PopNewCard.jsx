import React, { useState, useEffect } from "react";
import Calendar from "../../Calendar/Calendar";
import { useTasks } from "../../../contexts/TasksContext";

const PopNewCard = ({ isOpen, onClose }) => {
  const { createTask } = useTasks();

  console.log("=== PopNewCard: Компонент рендерится ===");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Обработка клавиши Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        console.log("Нажата клавиша Escape - закрываем модальное окно");
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Изменение поля ${name}:`, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTopicChange = (topic) => {
    console.log("Выбрана категория:", topic);
    console.log("Текущее состояние до обновления:", formData);

    setFormData((prev) => {
      const updated = {
        ...prev,
        topic,
      };
      console.log("Обновленные данные формы:", updated);
      return updated;
    });

    // Принудительно обновляем состояние
    setTimeout(() => {
      console.log("Принудительно обновляем состояние после выбора категории");
      console.log("Состояние после обновления:", formData);
      setFormData((current) => ({ ...current }));
    }, 0);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      date: formattedDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("=== PopNewCard: handleSubmit вызван ===");

    if (!formData.title.trim()) {
      alert("Пожалуйста, введите название задачи");
      return;
    }

    if (!formData.description.trim()) {
      alert("Пожалуйста, введите описание задачи");
      return;
    }

    try {
      console.log("=== PopNewCard: Начинаем создание задачи ===");
      console.log("Данные формы:", formData);

      // Проверяем, что createTask действительно является функцией
      if (typeof createTask !== "function") {
        console.error("createTask не является функцией!");
        throw new Error("createTask не является функцией");
      }

      const newTask = await createTask({
        title: formData.title,
        description: formData.description,
        topic: formData.topic,
        status: "Без статуса",
        date: formData.date,
      });

      console.log("=== PopNewCard: Задача успешно создана ===");
      console.log("Созданная задача:", newTask);

      // Сброс формы
      setFormData({
        title: "",
        description: "",
        topic: "Web Design",
        date: new Date().toISOString().split("T")[0],
      });
      setSelectedDate(new Date());

      // Принудительно обновляем контекст
      console.log("=== PopNewCard: Принудительно обновляем контекст ===");

      // Закрываем модальное окно
      console.log("=== PopNewCard: Закрываем модальное окно ===");
      onClose();
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      alert("Ошибка при создании задачи");
    }
  };

  const handleContainerClick = (e) => {
    // Дополнительная проверка, чтобы предотвратить случайное закрытие
    if (
      e.target === e.currentTarget &&
      !e.target.closest(".pop-new-card__block")
    ) {
      console.log("Клик по фону модального окна - закрываем");
      onClose();
    }
  };

  // Отладочная информация в useEffect
  useEffect(() => {
    if (isOpen) {
      console.log("PopNewCard - текущее состояние формы:", formData);
      console.log("PopNewCard - выбранная категория:", formData.topic);
    }
  }, [formData, isOpen]);

  // Перемещаем условный рендеринг в конец, после всех вызовов хуков
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="pop-new-card"
      id="popNewCard"
      style={{ display: isOpen ? "block" : "none" }}
      translate="no"
    >
      <div className="pop-new-card__container" onClick={handleContainerClick}>
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a href="#" className="pop-new-card__close" onClick={onClose}>
              &#10006;
            </a>
            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                onSubmit={handleSubmit}
              >
                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="title"
                    id="formTitle"
                    placeholder="Введите название задачи..."
                    value={formData.title}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>
                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="description"
                    id="textArea"
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </form>
              <Calendar
                current={false}
                active={false}
                selectedDate={selectedDate}
                onDateSelect={handleDateChange}
              />
            </div>
            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme _orange ${formData.topic === "Web Design" ? "_active-category" : ""}`}
                  onClick={() => handleTopicChange("Web Design")}
                  style={{ cursor: "pointer" }}
                  data-topic="Web Design"
                  data-active={formData.topic === "Web Design"}
                >
                  <p className="_orange">Web Design</p>
                </div>
                <div
                  className={`categories__theme _green ${formData.topic === "Research" ? "_active-category" : ""}`}
                  onClick={() => handleTopicChange("Research")}
                  style={{ cursor: "pointer" }}
                  data-topic="Research"
                  data-active={formData.topic === "Research"}
                >
                  <p className="_green">Research</p>
                </div>
                <div
                  className={`categories__theme _purple ${formData.topic === "Copywriting" ? "_active-category" : ""}`}
                  onClick={() => handleTopicChange("Copywriting")}
                  style={{ cursor: "pointer" }}
                  data-topic="Copywriting"
                  data-active={formData.topic === "Copywriting"}
                >
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>
            <button
              className="form-new__create _hover01"
              id="btnCreate"
              onClick={handleSubmit}
              style={{ content: "none", color: "#ffffff" }}
              translate="no"
            >
              Создать задачу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopNewCard;
