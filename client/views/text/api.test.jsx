import React from 'react';
import axios from 'axios';

/* eslint-disable */
export default class TestApi extends React.Component {
  // getTopics
  getTopics = () => {
    axios.get('api/topics').then(((resp) => {
      console.log(resp);
    }));
  }

  // login
  login = () => {
    axios.post('/api/user/login', {
      accessToken: '606137f4-8881-4d6d-a2a2-60585afac79c'
    }).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    });
  }

  // markAll
  markAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true').then((resp) => {
      console.log(resp);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}type="button">topics</button>
        <button onClick={this.login}type="button">login</button>
        <button onClick={this.markAll}type="button">markAll</button>
      </div>
    );
  }
}
/* eslint-enable */
