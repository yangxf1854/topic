/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import App from './views/App';

import appState from './store/store';

const root = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <AppContainer>
      <Provider appState={appState}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  );
};
render(App);
if (module.hot) {
  module.hot.accept('./views/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./views/App').default;
    // ReactDOM.render(<NextApp />, document.getElementById('root'))
    render(NextApp);
  });
}
