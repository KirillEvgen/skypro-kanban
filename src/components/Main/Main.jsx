import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { useTasks } from "../../contexts/TasksContext";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";
import { Container } from "../shared/Shared.styled";
import { cardList } from "../../data";

const Main = ({ onCardClick }) => {
  const navigate = useNavigate();
  const {
    tasks,
    loading,
    error,
    getTasksByStatus,
    createTask,
    deleteTask,
    loadTasks,
  } = useTasks();

  // Получаем массив задач из правильной структуры
  const tasksArray = useMemo(() => {
    console.log("=== Main: useMemo - обрабатываем задачи ===");
    console.log("Входные данные tasks:", tasks);
    console.log("Тип tasks:", typeof tasks);
    console.log("tasks.tasks:", tasks?.tasks);
    console.log("Array.isArray(tasks):", Array.isArray(tasks));
    console.log("Array.isArray(tasks.tasks):", Array.isArray(tasks?.tasks));

    if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
      console.log("Возвращаем tasks.tasks:", tasks.tasks);
      return tasks.tasks;
    } else if (Array.isArray(tasks)) {
      console.log("Возвращаем tasks как массив:", tasks);
      return tasks;
    } else {
      console.warn("Задачи не являются массивом:", tasks);
      return [];
    }
  }, [tasks]);

  console.log("=== Main компонент рендерится ===");
  console.log("Контекст tasks:", tasks);
  console.log("tasksArray после useMemo:", tasksArray);
  console.log("Количество задач:", tasksArray.length);
  console.log("Задачи:", tasksArray);
  console.log("Загрузка:", loading);
  console.log("Ошибка:", error);

  // Прямая проверка контекста
  console.log("=== ПРЯМАЯ ПРОВЕРКА КОНТЕКСТА ===");
  console.log("tasks:", tasks);
  console.log("typeof tasks:", typeof tasks);
  console.log("tasks.tasks:", tasks?.tasks);
  console.log("Array.isArray(tasks):", Array.isArray(tasks));
  console.log("Array.isArray(tasks.tasks):", Array.isArray(tasks?.tasks));
  console.log("=== КОНЕЦ ПРЯМОЙ ПРОВЕРКИ ===");

  // Загружаем задачи при монтировании компонента
  useEffect(() => {
    console.log("Main компонент смонтирован, загружаем задачи...");
    loadTasks();
  }, [loadTasks]);

  // Принудительно обновляем при изменении задач
  useEffect(() => {
    console.log("=== Main: Задачи изменились, принудительно обновляем ===");

    console.log("Новые задачи:", tasksArray);
    console.log("Количество задач:", tasksArray.length);
    console.log(
      "Статусы задач:",
      tasksArray.map((t) => t.status)
    );

    // Принудительно вызываем перерендер
    const timeoutId = setTimeout(() => {
      console.log("=== Main: Принудительный перерендер ===");
      // Это вызовет перерендер компонента
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [tasks]);

  // Логируем изменения задач
  useEffect(() => {
    console.log("=== Main: Задачи изменились ===");

    console.log("Количество задач:", tasksArray.length);
    console.log("Задачи:", tasksArray);
    console.log(
      "Статусы задач:",
      tasksArray.map((t) => ({
        id: t._id || t.id,
        title: t.title,
        status: t.status,
      }))
    );
    console.log("=== Конец лога Main ===");
  }, [tasks]);

  const columnTitles = [
    "Без статуса",
    "Нужно сделать",
    "В работе",
    "Тестирование",
    "Готово",
  ];

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

  const handleCardClick = (card) => {
    console.log("Клик по карточке:", card);
    if (onCardClick) {
      onCardClick(card);
    } else {
      const taskId = card._id || card.id;
      navigate(`/card/${taskId}`);
    }
  };

  const handleCreateTestTasks = async () => {
    try {
      console.log("Создаем тестовые задачи...");
      const createdTasks = [];

      for (const taskData of cardList) {
        try {
          // Преобразуем дату в правильный формат
          const dateParts = taskData.date.split(".");
          const year =
            dateParts[2].length === 2 ? `20${dateParts[2]}` : dateParts[2];
          const formattedDate = `${year}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}`;

          const newTask = await createTask({
            title: taskData.title,
            description: taskData.description,
            topic: taskData.topic,
            status: taskData.status,
            date: formattedDate,
          });
          createdTasks.push(newTask);
          console.log("Создана задача:", newTask);
        } catch (error) {
          console.error("Ошибка создания задачи:", taskData.title, error);
        }
      }

      console.log("Всего создано тестовых задач:", createdTasks.length);
    } catch (error) {
      console.error("Ошибка создания тестовых задач:", error);
    }
  };

  if (loading) {
    return (
      <MainContainer>
        <Container>
          <MainBlock>
            <MainContent>
              <div style={{ textAlign: "center", padding: "50px" }}>
                Загрузка задач...
              </div>
            </MainContent>
          </MainBlock>
        </Container>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <Container>
          <MainBlock>
            <MainContent>
              <div
                style={{ textAlign: "center", padding: "50px", color: "red" }}
              >
                Ошибка: {error}
              </div>
            </MainContent>
          </MainBlock>
        </Container>
      </MainContainer>
    );
  }

  // Отладочная информация
  console.log("=== ОТЛАДКА MAIN КОМПОНЕНТА ===");

  console.log("Всего задач:", tasksArray?.length || 0);
  console.log("Задачи:", tasksArray);
  console.log("Тип задач:", typeof tasks);
  console.log("Является ли массивом:", Array.isArray(tasksArray));
  console.log(
    "Статусы всех задач:",
    tasksArray?.map((task) => task.status) || []
  );
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("=== КОНЕЦ ОТЛАДКИ ===");

  // Защита от случаев, когда tasks не является массивом
  if (!Array.isArray(tasksArray)) {
    console.error("Ошибка: tasks не является массивом:", tasksArray);
    return (
      <MainContainer>
        <Container>
          <MainBlock>
            <MainContent>
              <div
                style={{
                  textAlign: "center",
                  padding: "50px",
                  color: "red",
                  gridColumn: "1 / -1",
                }}
              >
                <h3>Ошибка данных</h3>
                <p>
                  Получены некорректные данные задач. Попробуйте обновить
                  страницу.
                </p>
                <button onClick={loadTasks}>Обновить данные</button>
              </div>
            </MainContent>
          </MainBlock>
        </Container>
      </MainContainer>
    );
  }

  // Показываем все уникальные статусы
  console.log("Уникальные статусы в задачах:", [
    ...new Set(tasksArray.map((task) => task.status)),
  ]);

  // Дополнительная отладка для понимания проблемы
  console.log("=== ДОПОЛНИТЕЛЬНАЯ ОТЛАДКА ===");
  console.log("Всего задач в массиве:", tasksArray.length);
  tasksArray.forEach((task, index) => {
    console.log(`Задача ${index + 1}:`, {
      id: task._id || task.id,
      title: task.title,
      status: task.status,
      topic: task.topic,
      hasId: !!(task._id || task.id),
    });
  });

  // Проверяем, сколько задач должно быть в каждой колонке
  columnTitles.forEach((title) => {
    const tasksInColumn = getTasksByStatus(title);
    console.log(`Колонка "${title}": ${tasksInColumn.length} задач`);
  });

  // Проверяем, есть ли задачи с неизвестными статусами
  const unknownStatusTasks = tasksArray.filter(
    (task) => !columnTitles.includes(task.status)
  );
  if (unknownStatusTasks.length > 0) {
    console.warn(
      "Найдены задачи с неизвестными статусами:",
      unknownStatusTasks
    );
    console.warn("Эти задачи не будут отображены в колонках!");
  }

  console.log("=== КОНЕЦ ДОПОЛНИТЕЛЬНОЙ ОТЛАДКИ ===");

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {tasksArray.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px",
                  color: "#666",
                  gridColumn: "1 / -1",
                }}
              >
                <h3>Нет задач</h3>
                <p>
                  Создайте первую задачу, нажав кнопку "Создать новую задачу" в
                  заголовке
                </p>
                <div style={{ marginTop: "20px" }}>
                  <button
                    onClick={handleCreateTestTasks}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  >
                    Создать тестовые задачи
                  </button>
                  <button
                    onClick={loadTasks}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginRight: "10px",
                    }}
                  >
                    Загрузить задачи
                  </button>
                  <button
                    onClick={async () => {
                      console.log("=== ТЕСТ: Создаем тестовую задачу ===");
                      await createTask({
                        title: "Тестовая задача " + new Date().getTime(),
                        description: "Описание тестовой задачи",
                        topic: "Web Design",
                        status: "Без статуса",
                        date: new Date().toISOString().split("T")[0],
                      });
                    }}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    ТЕСТ: Создать задачу
                  </button>
                </div>
              </div>
            ) : (
              <>
                {columnTitles.map((title) => {
                  console.log(`=== Main: Обрабатываем колонку "${title}" ===`);
                  const tasksInColumn = getTasksByStatus(title);
                  console.log(`=== Main: Колонка "${title}" ===`);
                  console.log(
                    `Количество задач в колонке:`,
                    tasksInColumn.length
                  );
                  console.log(`Задачи в колонке:`, tasksInColumn);
                  console.log(`=== Main: Рендерим колонку "${title}" ===`);
                  return (
                    <Column key={title} title={title}>
                      {tasksInColumn.map((card, index) => {
                        console.log("Рендерим карточку:", card);
                        const uniqueKey =
                          card._id || card.id || `task-${index}-${card.title}`;
                        return (
                          <Card
                            key={uniqueKey}
                            themeClass={getThemeClass(card.topic)}
                            themeText={card.topic}
                            title={card.title}
                            date={card.date}
                            onOpenCard={() => handleCardClick(card)}
                          />
                        );
                      })}
                    </Column>
                  );
                })}

                {/* Отображаем задачи с неизвестными статусами */}
                {unknownStatusTasks.length > 0 && (
                  <Column key="unknown-status" title="Неизвестный статус">
                    {unknownStatusTasks.map((card, index) => {
                      console.log(
                        "Рендерим карточку с неизвестным статусом:",
                        card
                      );
                      const uniqueKey =
                        card._id ||
                        card.id ||
                        `unknown-task-${index}-${card.title}`;
                      return (
                        <Card
                          key={uniqueKey}
                          themeClass={getThemeClass(card.topic)}
                          themeText={card.topic}
                          title={card.title}
                          date={card.date}
                          onOpenCard={() => handleCardClick(card)}
                        />
                      );
                    })}
                  </Column>
                )}
              </>
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
