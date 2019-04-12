import React, { Component } from 'react';
import "antd/dist/antd.css";
import "./App.css";
import RouterView from './router/RouterView';


class App extends Component {
  render() {
    return (
      <div className="App">
        <RouterView></RouterView>
      </div>
    );
  }
}

export default App;
