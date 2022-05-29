import styled from '@emotion/styled';

export const ListPersons = styled.ul`
  list-style: none;
  color: rgb(0, 3, 36);
  font-weight: 500;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 35px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 1200px) {
    width: 540px;
  }
  @media (max-width: 1199px) {
    width: 460px;
  }
  @media (max-width: 767px) {
    width: 320px;
  }
`;

export const BoxPersons = styled.ul`
  max-width: 600px;
  @media (min-width: 1200px) {
    width: 600px;
  }
  @media (max-width: 1199px) {
    width: 540px;
  }
  @media (max-width: 767px) {
    width: 320px;
  }
`;
