import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// HashRouter, BrowserRouter, MemoryRouter
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import ScrollToTop from './components/layout/ScrollToTop';
import 'bootswatch/dist/minty/bootstrap.min.css';
import './styles/app.scss';

import store from './redux/store';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <Router basename='/tasty-recipes'> */}
    <Router>
      {/* <Router> */}
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
