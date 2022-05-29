import styled from '@emotion/styled';

export const DeletedPerson = styled.button`
  color: brown;
  background-color: transparent;
  height: 15px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border-color: #d68686;
  :hover {
    background-color: #a70303;
    color: #ffffff;
  }
`;

export const Person = styled.li`
  margin-bottom: 8px;
  color: rgb(82, 82, 82);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 25px;
  border-bottom: 1px solid rgb(175, 168, 106);
`;
