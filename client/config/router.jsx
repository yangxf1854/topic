import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

import TopicList from '../views/topic-list/index.jsx'; // 列表
import TopicDetail from '../views/topic-detail/index.jsx'; // 详情
import TestApi from '../views/text/api.test.jsx'; // api测试

const routes = () => {
  return [
    <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />,
    <Route path="/index" component={TopicList} key="index" />,
    <Route path="/detail" component={TopicDetail} key="detail" />,
    <Route path="/test" component={TestApi} key="test" />,
  ];
};
export default routes;
