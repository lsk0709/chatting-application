import styled from 'styled-components';
import { color } from './theme';

export const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;

export const MainHeader = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.75rem;
  padding: 0.5rem 0.75rem 0.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${color.purple};
  z-index: 1;

  & > svg {
    flex: 1;
  }
  & > span {
    display: flex;
    flex: 1;
    justify-content: center;
  }
  
`;

export const MainContent = styled.section`
  position: absolute;
  top: 2.75rem;
  bottom: 0rem;
  left: 0px;
  /* padding: 0.625rem 1rem; */
  width: 100%;
  overflow: auto;
`;

export const Notification = styled.span`
  position: absolute;
  display: inline-block;
  color: white;
  background-color: ${color.purple};
  border: none;
  padding: 0.25rem 0.375rem;
  border-radius: 10.5px;
  font-weight: bold;
  width: 1.125rem;
  height: 1.125rem;
  text-align: center;
  font-size: 0.625rem;
  letter-spacing: -0.08px;
  text-align: center;
`;
