import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import workHoursData from './reducers/reducer'
import './style/app.global.scss';

const store = createStore(workHoursData, applyMiddleware(thunk))

render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./components/Root', () => {
        const NextRoot = require('./components/Root');
        render(
            <AppContainer>
              <NextRoot store={store} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
