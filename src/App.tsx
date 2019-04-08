import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getHotShowing, getNew, getTop250, getDetail } from "./api";

class App extends Component {
  render() {

    getHotShowing()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })


    getTop250()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })


    getNew()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })


    getDetail("4864908")
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })

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
}

export default App;
