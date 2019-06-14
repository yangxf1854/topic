import React from 'react';
import {
  Link
} from 'react-router-dom';
import Routes from '../config/router'; // 路由配置

class App extends React.Component {
  componentDidMount() {
    // dosomething
  }

  render() {
    return [
      <div>
        <Link to="/">首页</Link>
        <br />
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes />
    ];
  }
}

export default App;
