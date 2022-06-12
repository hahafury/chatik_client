import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::-webkit-scrollbar {
    width: 5px;
  }

  *::-webkit-scrollbar-track {
    background: transparent !important;
  }

  *::-webkit-scrollbar-thumb {
    background: #0c5dff;
    border-radius: 0.35rem;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: #0c5dff;
  }

  .modal {
    transform: translate3d(0, 0, 0);
  }

  .Toastify__progress-bar {
	  background: #0c5dff;
  }

  html {
    height: 100%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #000000;
    background-color: #FFFFFF;
    height: 100%;
	  overflow: hidden;

    #root {
      height: 100%;
    }
  }

  button {
    border: none
  }

  input:focus-visible {
    border: none;
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 5px
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #071739;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #274684;
    border-radius: 0.35rem;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #192f5d;
  }
`
