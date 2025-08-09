import styled from "styled-components";

export const CalendarContainer = styled.div`
  width: 182px;
  margin-bottom: 25px;
`;

export const CalendarTitle = styled.p`
  margin-bottom: 16px;
  padding: 0 7px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
`;

export const CalendarBlock = styled.div`
  display: block;
`;

export const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 0 7px;
`;

export const CalendarMonth = styled.div`
  color: #94a6be;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavAction = styled.div`
  width: 18px;
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: #94a6be;
  }
`;

export const CalendarContent = styled.div`
  margin-bottom: 15px;
`;

export const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 0 7px;
`;

export const CalendarDayName = styled.div`
  color: #94a6be;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
`;

export const CalendarCells = styled.div`
  width: 182px;
  height: 126px;
  display: flex;
  flex-wrap: wrap;
`;

export const CalendarCell = styled.div`
  width: 22px;
  height: 22px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: #94a6be;
  font-size: 10px;
  line-height: 1;
  letter-spacing: -0.2px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #94a6be;
    background-color: #eaeef6;
  }

  ${(props) =>
    props.isOtherMonth &&
    `
    opacity: 0;
  `}

  ${(props) =>
    props.isActiveDay &&
    `
    background-color: #94a6be;
    color: #ffffff;
  `}

  ${(props) =>
    props.isToday &&
    `
    font-weight: 700;
  `}
`;

export const CalendarPeriod = styled.div`
  padding: 0 7px;
`;

export const CalendarPeriodText = styled.p`
  color: #94a6be;
  font-size: 10px;
  line-height: 1;

  span {
    color: #000000;
  }
`;

// Медиа-запросы для адаптивности строго по макету
export const CalendarContainerResponsive = styled(CalendarContainer)`
  @media screen and (max-width: 660px) {
    max-width: 340px;
    width: 100%;
  }
`;

export const CalendarTitleResponsive = styled(CalendarTitle)`
  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

export const CalendarNavResponsive = styled(CalendarNav)`
  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

export const CalendarPeriodResponsive = styled(CalendarPeriod)`
  @media screen and (max-width: 660px) {
    padding: 0;
  }
`;

export const CalendarCellsResponsive = styled(CalendarCells)`
  @media screen and (max-width: 660px) {
    width: 344px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

export const CalendarCellResponsive = styled(CalendarCell)`
  @media screen and (max-width: 660px) {
    width: 42px;
    height: 42px;
    font-size: 14px;
  }
`;
