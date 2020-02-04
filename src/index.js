import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App';

const router = (
	<BrowserRouter>
		<Switch>
			<Route exact path="/cars" component={App} />
		</Switch>
	</BrowserRouter>
)

render(
	<Provider store = {store}>
		{router}
	</Provider>,
	document.getElementById('root')
);
