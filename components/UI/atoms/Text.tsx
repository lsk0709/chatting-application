import * as React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { color } from '../../../styles/theme';


type sizes = 'small' | 'medium' | 'large'
type aligns = 'left' | 'center' | 'right'
type weights = 'thin' | 'bold' | 'regular'

interface TextProps {
    // 내용
    content: string,
    // 색상
    color?: string,
    // 크기
    size?: string,
    // 정렬
    align?: aligns,
    // 굵기
    weight?: weights,
    // 가로 폭
    width?: string,
    // padding
    padding?: string,
    // margin
    margin?: string,
}

const Text: React.FC<TextProps> = ({ ...props })=> {
  return <StyledText {...props}>{props.content}</StyledText>;
};

export default Text;

const StyledText = styled.span<TextProps>`
    ${({ size }) => {
    switch (size) {
      case 'small':
        return 'font-size: 0.688rem;';
      case 'medium':
        return 'font-size: 0.875rem;';
      case 'large':
        return 'font-size: 1rem;';
    }
    return(`font-size: ${size};`)
  }}

  ${({ color, ...props }) => {
    if (!color) {
      return `color: ${props.theme.black};`;
    } else{
      return `color: ${props.theme[color]};`;
    }
  }}

  ${({ align }) => (align ? `text-align:${align};` : '')}

  ${({ weight }) => {
    switch (weight) {
      case 'thin':
        return 'font-weight: 100;';
      case 'regular':
        return 'font-weight: 400;';
      case 'bold':
        return 'font-weight: 600;';
      default:
        return 'font-weight: 400;';
    }
  }}

  ${({ width }) =>  (width ? `width:${width};` : '')}
  ${({ padding }) =>  (padding ? `padding:${padding};` : '')}
  ${({ margin }) =>  (margin ? `margin:${margin};` : '')}
`
