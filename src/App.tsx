import React, { Component } from 'react';
import "antd/dist/antd.css";
import "./App.css";
import RouterView from './router/RouterView';


class App extends Component {
  render() {

    // getHotShowing()
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })


    // getTop250()
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })


    // getNew()
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })


    // getDetail("4864908")
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    return (
      <div className="App">
        <RouterView></RouterView>
      </div>
    );
  }
}

export default App;
