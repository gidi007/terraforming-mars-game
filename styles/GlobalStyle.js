// styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
  background: linear-gradient(to right, #2b2d42, #8d99ae);
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
}
  }

  .game-board, .player-board {
    padding: 20px;
    margin: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  button {
    margin: 5px;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
`;

export default GlobalStyle;

/* styles/globals.css */


