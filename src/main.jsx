import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createHashHistory from 'history/createHashHistory';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import RsCalendar from './components/RsCalendar/RsCalendar';
import Event from './components/Event/Event';
import './slds.scss';
import '../node_modules/@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import reducer from './reducers';

import './assets/event_60.png';

const history = createHashHistory();
const store = createStore(reducer, {}, composeWithDevTools(
  applyMiddleware(thunk, routerMiddleware(history)),
));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={RsCalendar} />
        <Route path="/events/:id" component={Event} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('rs-calendar'),
);
