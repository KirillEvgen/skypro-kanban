import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 10px 15px;
  border: 1px solid #d4dbe3;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #000000;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #565eef;
  }

  &::placeholder {
    color: #94a6be;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid #d4dbe3;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #565eef;
  }
`;

const SortSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid #d4dbe3;
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #565eef;
  }
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background-color: #94a6be;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #565eef;
  }
`;

const SearchAndFilter = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortBy,
  onSortChange,
  onClearFilters,
}) => {
  const statusOptions = [
    { value: "", label: "Все статусы" },
    { value: "Без статуса", label: "Без статуса" },
    { value: "Нужно сделать", label: "Нужно сделать" },
    { value: "В работе", label: "В работе" },
    { value: "Тестирование", label: "Тестирование" },
    { value: "Готово", label: "Готово" },
  ];

  const sortOptions = [
    { value: "date-desc", label: "По дате (новые)" },
    { value: "date-asc", label: "По дате (старые)" },
    { value: "title-asc", label: "По названию (А-Я)" },
    { value: "title-desc", label: "По названию (Я-А)" },
    { value: "status", label: "По статусу" },
  ];

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Поиск задач..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <FilterSelect
        value={filterStatus}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FilterSelect>

      <SortSelect value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SortSelect>

      <ClearButton onClick={onClearFilters}>Очистить</ClearButton>
    </SearchContainer>
  );
};

export default SearchAndFilter;
