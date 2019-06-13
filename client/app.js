/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App.jsx';
// eslint-disable-next-line import/no-extraneous-dependencies
// ReactDOM.render(<App />, document.getElementById('root'))

const root = document.getElementById('root')

const render = (Component) => {
  ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <AppContainer>
      <Component />
    </AppContainer>,
    root,
  )
}
render(App);
if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App.jsx').default
    // ReactDOM.render(<NextApp />, document.getElementById('root'))
    render(NextApp)
  })
}
