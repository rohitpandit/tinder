import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Index from './pages/Index';
import Chat from './pages/Chat';
import Match from './pages/Match';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import './bootstrap.min.css';
import './app.css';

function App() {
	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path='/' component={Index} />
					<Route exact path='/match' component={Match} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/chat/:id' component={Chat} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route path='*' component={PageNotFound} />
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
