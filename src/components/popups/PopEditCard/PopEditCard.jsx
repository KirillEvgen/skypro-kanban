import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../Calendar/Calendar";
import { useTasks } from "../../../contexts/TasksContext";

const PopEditCard = ({ isOpen, card, onClose }) => {
  const navigate = useNavigate();
  const { updateTask } = useTasks();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design",
    status: "Без статуса",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Инициализация формы при открытии модального окна
  useEffect(() => {
    if (isOpen && card) {
      console.log("Инициализируем форму с данными карточки:", card);
      console.log("ID карточки:", card._id || card.id);
      setFormData({
        title: card.title || "",
        description: card.description || "",
        topic: card.topic || "Web Design",
        status: card.status || "Без статуса",
        date: card.date
          ? new Date(card.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
      setSelectedDate(card.date ? new Date(card.date) : new Date());
    }
  }, [isOpen, card]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Изменение поля ${name}:`, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTopicChange = (topic) => {
    console.log("Изменение категории:", topic);
    setFormData((prev) => {
      const updated = {
        ...prev,
        topic,
      };
      console.log("Обновленные данные формы:", updated);
      return updated;
    });
  };

  const handleStatusChange = (status) => {
    console.log("Изменение статуса:", status);
    setFormData((prev) => {
      const updated = {
        ...prev,
        status,
      };
      console.log("Обновленные данные формы после изменения статуса:", updated);
      return updated;
    });
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

    if (!formData.title.trim()) {
      alert("Пожалуйста, введите название задачи");
      return;
    }

    setIsSubmitting(true);
    try {
      const taskId = card._id || card.id;
      console.log(
        "Обновляем задачу с ID:",
        taskId,
        "тип:",
        typeof taskId,
        "данные:",
        formData
      );
      console.log("Карточка для обновления:", card);
      console.log("ID карточки (_id):", card._id);
      console.log("ID карточки (id):", card.id);
      const updatedTask = await updateTask(taskId, formData);
      console.log("Задача успешно обновлена:", updatedTask);
      console.log("Обновленная задача ID:", updatedTask._id || updatedTask.id);

      // Принудительно обновляем страницу после обновления задачи
      console.log("Принудительно обновляем страницу после обновления задачи");
      window.location.reload();

      // Закрываем модальное окно
      onClose();
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
      console.error("Детали ошибки:", {
        message: error.message,
        stack: error.stack,
        response: error.response,
        status: error.status,
      });
      alert(`Ошибка при обновлении задачи: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <div
      className="pop-edit-card"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="pop-edit-card__container" onClick={handleContainerClick}>
        <div className="pop-edit-card__block">
          <div className="pop-edit-card__content">
            <h3 className="pop-edit-card__ttl">Редактирование задачи</h3>
            <a href="#" className="pop-edit-card__close" onClick={onClose}>
              &#10006;
            </a>
            <div className="pop-edit-card__wrap">
              <form
                className="pop-edit-card__form form-edit"
                onSubmit={handleSubmit}
              >
                <div className="form-edit__block">
                  <label htmlFor="editTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-edit__input"
                    type="text"
                    name="title"
                    id="editTitle"
                    placeholder="Введите название задачи..."
                    value={formData.title}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>
                <div className="form-edit__block">
                  <label htmlFor="editDescription" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-edit__area"
                    name="description"
                    id="editDescription"
                    placeholder="Введите описание задачи..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-edit__block">
                  <label htmlFor="editStatus" className="subttl">
                    Статус
                  </label>
                  <select
                    className="form-edit__select"
                    name="status"
                    id="editStatus"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Без статуса">Без статуса</option>
                    <option value="Нужно сделать">Нужно сделать</option>
                    <option value="В работе">В работе</option>
                    <option value="Тестирование">Тестирование</option>
                    <option value="Готово">Готово</option>
                  </select>
                </div>
              </form>
              <Calendar
                current={false}
                active={false}
                selectedDate={selectedDate}
                onDateSelect={handleDateChange}
              />
            </div>
            <div className="pop-edit-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                <div
                  className={`categories__theme _orange ${formData.topic === "Web Design" ? "_active-category" : ""}`}
                  onClick={() => handleTopicChange("Web Design")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_orange">Web Design</p>
                </div>
                <div
                  className={`categories__theme _green ${formData.topic === "Research" ? "_active-category" : ""}`}
                  onClick={() => handleTopicChange("Research")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_green">Research</p>
                </div>
                <div
                  className={`categories__theme _purple ${formData.topic === "Copywriting" ? "_active-category" : ""}`}
                  onClick={() => handleTopicChange("Copywriting")}
                  style={{ cursor: "pointer" }}
                >
                  <p className="_purple">Copywriting</p>
                </div>
              </div>
            </div>
            <div className="pop-edit-card__btn-group">
              <button
                className="form-edit__cancel _btn-bor _hover03"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Отмена
              </button>
              <button
                className="form-edit__save _btn-bg _hover01"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopEditCard;
