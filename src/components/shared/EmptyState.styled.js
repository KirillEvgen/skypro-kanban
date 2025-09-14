import styled from "styled-components";

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  grid-column: 1 / -1;
  min-height: 300px;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

export const EmptyStateMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`;

export const EmptyStateActions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;
