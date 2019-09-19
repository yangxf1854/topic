import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import { AppState } from '../../store/store.js';

// 列表
@inject('appState') // 要注入组件内部的东西
@observer // 加上这个store里面的东西一更新，这边组件里面的数据也会更新
class TopicList extends React.Component {
  componentDidMount() {
    console.log(this.props.appState, 'props');
  }
  // 改变输入的名字
  changeName = (events) => {
    const name = events.target.value;
    this.props.appState.changeName(name);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeName} />
        {this.props.appState.msy}
      </div>
    );
  }
}

export default TopicList;

TopicList.propsTypes = {
  appState: PropTypes.instanceOf(AppState).isRequire,
};
