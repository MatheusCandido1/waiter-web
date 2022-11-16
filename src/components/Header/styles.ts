import styled from 'styled-components';

export const Container = styled.header`
  background: #D73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;
`;

export const Content = styled.div`
  max-width: 1216px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    color: #fff;

    h1 {
      font-size: 32px;
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;
