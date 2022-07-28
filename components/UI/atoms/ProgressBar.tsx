import * as React from "react";
import styled from "styled-components";

interface ProgressProps {
    value: number,
    min: number,
    max: number,
}

const ProgressBar: React.FC<ProgressProps> = (props) => {
  return <StyledProgressBar 
    value={props.value}
    min={props.min}
    max={props.max}
  />;
};

export default ProgressBar;

const StyledProgressBar = styled.progress<ProgressProps>`
  & {
    appearance: none;
    width: -webkit-fill-available;
    height: 0.375rem;
  }
  &::-webkit-progress-bar {
    background: #e5e5e7;
    border-radius: 10px;
    /* box-shadow: inset 3px 3px 10px #ccc; */
  }
  &::-webkit-progress-value {
    border-radius: 10px;
    background: ${props => props.theme.purple};
    /* background: -webkit-linear-gradient(to right, #93f9b9, #1d976c);
    background: linear-gradient(to right, #93f9b9, #1d976c); */
  }
`;
