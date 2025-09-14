import React, { useState, useEffect } from "react";
import Calendar from "../../Calendar/Calendar";
import { useTasks } from "../../../contexts/TasksContext";

const PopNewCard = ({ isOpen, onClose }) => {
  const { createTask } = useTasks();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState("");

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

    try {
      if (typeof createTask !== "function") {
        throw new Error("createTask не является функцией");
      }

      const newTask = await createTask({
        title: title,
        description: description,
        topic: formData.topic,
        status: "Без статуса",
        date: formData.date,
      });

      setFormData({
        title: "",
        description: "",
        topic: "Web Design",
        date: new Date().toISOString().split("T")[0],
      });
      setSelectedDate(new Date());

      onClose();
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
      setError(error.message || "Ошибка при создании задачи");
    }
  };

  const handleContainerClick = (e) => {
    if (
      e.target === e.currentTarget &&
      !e.target.closest(".pop-new-card__block")
    ) {
      setError("");
      onClose();
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

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
            <a href="#" className="pop-new-card__close" onClick={handleClose}>
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
