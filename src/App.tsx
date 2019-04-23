import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
import "./App.css";
import RouterView from './router/RouterView';

moment.locale('zh-cn');

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className="App">
          <RouterView></RouterView>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
