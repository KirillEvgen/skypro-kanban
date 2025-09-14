import React, { useState, useEffect } from "react";
import Calendar from "../../Calendar/Calendar";
import { useTasks } from "../../../contexts/TasksContext";

const PopEditCard = ({ isOpen, card, onClose }) => {
  const { updateTask, deleteTask } = useTasks();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design",
    status: "Без статуса",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && card) {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаем ошибку при изменении полей
    if (error) {
      setError("");
    }
  };

  const handleTopicChange = (topic) => {
    setFormData((prev) => ({
      ...prev,
      topic,
    }));
  };

  const handleStatusChange = (status) => {
    setFormData((prev) => ({
      ...prev,
      status,
    }));
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

    // Валидация полей
    const title = formData.title.trim();
    const description = formData.description.trim();

    if (!title) {
      setError("Пожалуйста, введите название задачи");
      return;
    }

    if (title.length < 3) {
      setError("Название задачи должно содержать минимум 3 символа");
      return;
    }

    if (!description) {
      setError("Пожалуйста, введите описание задачи");
      return;
    }

    if (description.length < 10) {
      setError("Описание задачи должно содержать минимум 10 символов");
      return;
    }

    setIsSubmitting(true);
    try {
      const taskId = card._id || card.id;
      const updatedTask = await updateTask(taskId, {
        ...formData,
        title: title,
        description: description,
      });
      onClose();
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
      setError(error.message || "Ошибка при обновлении задачи");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getTopicClass = (topic) => {
    switch (topic) {
      case "Web Design":
        return "_orange";
      case "Research":
        return "_green";
      case "Copywriting":
        return "_purple";
      default:
        return "";
    }
  };

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
            {error && (
              <div
                style={{
                  color: "#e74c3c",
                  backgroundColor: "#fdf2f2",
                  border: "1px solid #fecaca",
                  borderRadius: "4px",
                  padding: "10px",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                {error}
              </div>
            )}

            <div className="form-edit__block">
              <div className="form-edit__header">
                <label htmlFor="editTitle" className="subttl">
                  Название задачи
                </label>
                <div
                  className={`categories__theme ${getTopicClass(formData.topic)}`}
                >
                  <p className={getTopicClass(formData.topic)}>
                    {formData.topic}
                  </p>
                </div>
              </div>
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
              <label className="subttl">Статус</label>
              <div className="form-edit__status-buttons">
                <button
                  type="button"
                  className={`form-edit__status-btn ${formData.status === "Без статуса" ? "_active-status" : ""}`}
                  onClick={() => handleStatusChange("Без статуса")}
                >
                  Без статуса
                </button>
                <button
                  type="button"
                  className={`form-edit__status-btn ${formData.status === "Нужно сделать" ? "_active-status" : ""}`}
                  onClick={() => handleStatusChange("Нужно сделать")}
                >
                  Нужно сделать
                </button>
                <button
                  type="button"
                  className={`form-edit__status-btn ${formData.status === "В работе" ? "_active-status" : ""}`}
                  onClick={() => handleStatusChange("В работе")}
                >
                  В работе
                </button>
                <button
                  type="button"
                  className={`form-edit__status-btn ${formData.status === "Тестирование" ? "_active-status" : ""}`}
                  onClick={() => handleStatusChange("Тестирование")}
                >
                  Тестирование
                </button>
                <button
                  type="button"
                  className={`form-edit__status-btn ${formData.status === "Готово" ? "_active-status" : ""}`}
                  onClick={() => handleStatusChange("Готово")}
                >
                  Готово
                </button>
              </div>
            </div>

            <div className="pop-edit-card__wrap">
              <div className="pop-edit-card__form">
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
              </div>

              <div className="pop-edit-card__calendar">
                <label className="subttl">Даты</label>
                <Calendar
                  current={false}
                  active={false}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateChange}
                />
              </div>
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
                className="form-edit__save _btn-bg _hover01"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Сохранение..." : "Сохранить"}
              </button>
              <button
                className="form-edit__cancel _btn-bor _hover03"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Отменить
              </button>
              <button
                className="form-edit__delete _btn-bor _hover03"
                onClick={async () => {
                  if (
                    window.confirm("Вы уверены, что хотите удалить эту задачу?")
                  ) {
                    try {
                      const taskId = card._id || card.id;
                      await deleteTask(taskId);
                      onClose();
                    } catch (error) {
                      console.error("Ошибка удаления задачи:", error);
                      alert("Ошибка при удалении задачи");
                    }
                  }
                }}
                disabled={isSubmitting}
              >
                Удалить задачу
              </button>
              <button
                className="form-edit__close _btn-bg _hover01"
                onClick={onClose}
                disabled={isSubmitting}
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

export default PopEditCard;
