/**
 * 기본 색상
 */
 const COLOR = {
    white: '#ffffff',
    purple: '#5b36ac',
    charcoalGrey: '#464052',
    charcoalGreyTwo: '#363a4266', // Opacity: 40
    black: '#000',
    coolGrey: '#a4a6b0',
    battleshipGrey: '#74747e',
    paleLilac: '#e6e6eb',
    black10: '#0000001a',  // Opacity: 10
    paleGrey: '#f9f9fb'
  };
  
  const THEME = {
    background: {
      primary: '#fafafc',
      secondary: '#ffffff'
    },
    text: {
      primary: '#333333', // Opacity: cc
      secondary: '#666666', // Opacity: 99
      tertiary: '#999999', // Opacity: 66
      quaternary: '#b2b2b2', // Opacity: 4d
      gray: '#00000066',
      darkGray: '#00000099',
      whiteGray: '#E9E9E9',
      boxText: '#0000004D'
    },
    border: '#cccccc', // Opacity: 33
    ...COLOR,
  };
  
  export const color = COLOR;
  export default THEME;
  