import React from 'react';
import logo from './logo.svg';
import './App.css';
/* eslint import/no-webpack-loader-syntax:0 */
// @ts-ignore
import MyWorker from 'worker-loader?name=dist/[name].js!./worker'

const w = new MyWorker();
// @ts-ignore
w.onmessage = e => {
  console.log(e.data)
};
// @ts-ignore
w.postMessage('yeet?');

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
