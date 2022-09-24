import React, { ReactElement } from 'react';
import logo from '../../logo.svg';
import './app.css';
import { useAppDispatch } from '../../hooks/hooks';
import { getDragonData } from '../../store/dragon/actions';

function App(): ReactElement {
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          <button
            onClick={() => {
              dispatch(getDragonData(1));
            }}
          >
            Test
          </button>
        </p>
        <span>
          <span>Learn </span>
          <a className="App-link" href="src/components/app/App" target="_blank" rel="noopener noreferrer">
            React
          </a>
          <span>, </span>
          <a className="App-link" href="src/components/app/App" target="_blank" rel="noopener noreferrer">
            Redux
          </a>
          <span>, </span>
          <a className="App-link" href="src/components/app/App" target="_blank" rel="noopener noreferrer">
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a className="App-link" href="src/components/app/App" target="_blank" rel="noopener noreferrer">
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
