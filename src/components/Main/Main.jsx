import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Column from "../Column/Column";
import Card from "../Card/Card";
import { useTasks } from "../../contexts/TasksContext";
import { MainContainer, MainBlock, MainContent } from "./Main.styled";
import { Container } from "../shared/Shared.styled";
import { cardList } from "../../data";
import LoadingSpinner from "../shared/LoadingSpinner";
import EmptyState from "../shared/EmptyState";
import SearchAndFilter from "../shared/SearchAndFilter";
import TaskStats from "../shared/TaskStats";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const tasksArray = useMemo(() => {
    if (tasks && tasks.tasks && Array.isArray(tasks.tasks)) {
      return tasks.tasks;
    } else if (Array.isArray(tasks)) {
      return tasks;
    } else {
      return [];
    }
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasksArray;

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтрация по статусу
    if (filterStatus) {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasksArray, searchTerm, filterStatus, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterStatus("");
    setSortBy("date-desc");
  };

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

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
    if (onCardClick) {
      onCardClick(card);
    } else {
      const taskId = card._id || card.id;
      navigate(`/card/${taskId}`);
    }
  };

  const handleCreateTestTasks = async () => {
    try {
      const createdTasks = [];

      for (const taskData of cardList) {
        try {
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
        } catch (error) {
          console.error("Ошибка создания задачи:", taskData.title, error);
        }
      }
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
              <LoadingSpinner message="Загрузка задач..." />
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

  if (!Array.isArray(tasksArray)) {
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

  const unknownStatusTasks = tasksArray.filter(
    (task) => !columnTitles.includes(task.status)
  );

  return (
    <MainContainer>
      <Container>
        <MainBlock>
          <MainContent>
            {tasksArray.length === 0 ? (
              <EmptyState
                title="Нет задач"
                message='Создайте первую задачу, нажав кнопку "Создать новую задачу" в заголовке'
                onCreateTestTasks={handleCreateTestTasks}
                onLoadTasks={loadTasks}
                isLoading={loading}
              />
            ) : (
              <>
                <TaskStats tasks={tasksArray} />

                <SearchAndFilter
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  filterStatus={filterStatus}
                  onFilterChange={setFilterStatus}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onClearFilters={handleClearFilters}
                />

                {searchTerm || filterStatus ? (
                  // Показываем отфильтрованные задачи в одной колонке
                  <Column
                    key="filtered"
                    title={`Найдено: ${filteredAndSortedTasks.length}`}
                  >
                    {filteredAndSortedTasks.map((card, index) => {
                      const uniqueKey =
                        card._id ||
                        card.id ||
                        `filtered-task-${index}-${card.title}`;
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
                ) : (
                  // Показываем задачи по колонкам
                  <>
                    {columnTitles.map((title) => {
                      const tasksInColumn = getTasksByStatus(title);
                      return (
                        <Column key={title} title={title}>
                          {tasksInColumn.map((card, index) => {
                            const uniqueKey =
                              card._id ||
                              card.id ||
                              `task-${index}-${card.title}`;
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

                    {unknownStatusTasks.length > 0 && (
                      <Column key="unknown-status" title="Неизвестный статус">
                        {unknownStatusTasks.map((card, index) => {
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
              </>
            )}
          </MainContent>
        </MainBlock>
      </Container>
    </MainContainer>
  );
};

export default Main;
