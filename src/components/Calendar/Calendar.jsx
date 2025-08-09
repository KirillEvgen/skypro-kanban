import React, { useState, useEffect } from "react";
import {
  CalendarContainer,
  CalendarTitle,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  NavActions,
  NavAction,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarCells,
  CalendarCell,
  CalendarPeriod,
  CalendarPeriodText,
} from "./Calendar.styled";

const Calendar = ({ current, active, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Инициализация с переданной датой или текущей
  useEffect(() => {
    if (current) {
      setCurrentDate(new Date(current));
    }
  }, [current]);

  // Установка активной даты
  useEffect(() => {
    if (active) {
      setSelectedDate(new Date(active).getDate());
    }
  }, [active]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayIndex = getFirstDayOfMonth(currentDate);
    const days = [];

    // Добавляем пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: "", isCurrentMonth: false });
    }

    // Добавляем дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true });
    }

    return days;
  };

  const handleDateClick = (day) => {
    if (day && day.isCurrentMonth) {
      setSelectedDate(day.day);

      // Создаем полную дату и вызываем callback
      const selectedFullDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day.day
      );
      if (onDateSelect) {
        onDateSelect(selectedFullDate);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null); // Сбрасываем выбранную дату при смене месяца
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null); // Сбрасываем выбранную дату при смене месяца
  };

  const formatMonthYear = (date) => {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return months[date.getMonth()];
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return "";

    const day = selectedDate.toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <CalendarContainer className="calendar">
      <CalendarTitle className="calendar__ttl">Даты</CalendarTitle>
      <CalendarBlock className="calendar__block">
        <CalendarContent className="calendar__content">
          <CalendarDaysNames className="calendar__days-names">
            <CalendarDayName className="calendar__day-name">пн</CalendarDayName>
            <CalendarDayName className="calendar__day-name">вт</CalendarDayName>
            <CalendarDayName className="calendar__day-name">ср</CalendarDayName>
            <CalendarDayName className="calendar__day-name">чт</CalendarDayName>
            <CalendarDayName className="calendar__day-name">пт</CalendarDayName>
            <CalendarDayName className="calendar__day-name">сб</CalendarDayName>
            <CalendarDayName className="calendar__day-name">вс</CalendarDayName>
          </CalendarDaysNames>
          <CalendarCells className="calendar__cells">
            {generateCalendarDays().map((dayObj, index) => (
              <CalendarCell
                key={index}
                className={`calendar__cell ${dayObj.isOtherMonth ? "_other-month" : ""} ${isToday(dayObj.day) ? "_current" : ""} ${selectedDate === dayObj.day ? "_active-day" : ""}`}
                isOtherMonth={!dayObj.isCurrentMonth}
                isActiveDay={selectedDate === dayObj.day}
                isToday={isToday(dayObj.day)}
                onClick={() => handleDateClick(dayObj)}
              >
                {dayObj.day}
              </CalendarCell>
            ))}
          </CalendarCells>
        </CalendarContent>
        <CalendarNav className="calendar__nav">
          <CalendarMonth className="calendar__month">
            {formatMonthYear(currentDate)}
          </CalendarMonth>
          <NavActions className="nav__actions">
            <NavAction className="nav__action" onClick={handlePrevMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z" />
              </svg>
            </NavAction>
            <NavAction className="nav__action" onClick={handleNextMonth}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="11"
                viewBox="0 0 6 11"
              >
                <path d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z" />
              </svg>
            </NavAction>
          </NavActions>
        </CalendarNav>
        <CalendarPeriod className="calendar__period">
          <CalendarPeriodText className="calendar__p">
            {selectedDate ? (
              <>
                Срок исполнения: <span>{formatSelectedDate()}</span>
              </>
            ) : (
              <>
                Выберите срок исполнения <span></span>
              </>
            )}
          </CalendarPeriodText>
        </CalendarPeriod>
      </CalendarBlock>
    </CalendarContainer>
  );
};

export default Calendar;
