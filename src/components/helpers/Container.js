import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 0 2rem;
  max-width: 80%;

  @media (max-width: 760px) {
    max-width: 90%;
    padding: 0;
  }
`;

export default Container;
