import React from 'react';
import {
  Route,
  Switch,
  IndexRoute,
  Redirect
} from 'react-router-dom';

import TopicList from '../views/topic-list/index'; // 列表
import TopicDetail from '../views/topic-detail/index'; // 详情

export default () => {
  return (
    <Switch>
      <Route path="/" render={() => <Redirect to="/index" />} exact />,
      <Route path="/index" component={TopicList} />,
      <Route path="/detail" component={TopicDetail} />,
    </Switch>
  );
};
