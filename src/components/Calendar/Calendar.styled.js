import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CalendarTitle = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;

export const CalendarBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

export const CalendarMonth = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const NavAction = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f4f5f6;
  }

  svg {
    width: 6px;
    height: 11px;
    fill: #94a6be;
  }
`;

export const CalendarContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CalendarDaysNames = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const CalendarDayName = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  text-transform: lowercase;
`;

export const CalendarCells = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const CalendarCell = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isOtherMonth ? "#94a6be" : "#000")};
  font-size: 10px;
  font-weight: 400;
  line-height: 1;
  cursor: ${(props) => (props.isOtherMonth ? "default" : "pointer")};
  border-radius: 2px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isOtherMonth ? "transparent" : "#f4f5f6"};
  }

  ${(props) =>
    props.isActiveDay &&
    `
    background-color: #565eef;
    color: #ffffff;
  `}
`;

export const CalendarPeriod = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CalendarPeriodText = styled.p`
  color: #000;
  font-size: 10px;
  font-weight: 400;
  line-height: 1;

  span {
    color: #565eef;
    font-weight: 600;
  }
`;

// Медиа-запросы для адаптивности
export const CalendarContainerResponsive = styled(CalendarContainer)`
  @media screen and (max-width: 660px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const CalendarTitleResponsive = styled(CalendarTitle)`
  @media screen and (max-width: 660px) {
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }
`;

export const CalendarBlockResponsive = styled(CalendarBlock)`
  @media screen and (max-width: 660px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const CalendarCellsResponsive = styled(CalendarCells)`
  @media screen and (max-width: 660px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }
`;

export const CalendarCellResponsive = styled(CalendarCell)`
  @media screen and (max-width: 660px) {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.isOtherMonth ? "#94a6be" : "#000")};
    font-size: 10px;
    font-weight: 400;
    line-height: 1;
    cursor: ${(props) => (props.isOtherMonth ? "default" : "pointer")};
    border-radius: 2px;
    transition: all 0.2s ease;
  }
`;

export const CalendarPeriodResponsive = styled(CalendarPeriod)`
  @media screen and (max-width: 660px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
