import React, { Fragment } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Index from './pages/Index';
import Chat from './pages/Chat';
import Match from './pages/Match';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import './bootstrap.min.css';
import './app.css';

axios.defaults.headers.common = {
	Authorization: `Bearer ${localStorage.getItem('token')}`,
};

function App() {
	const isLogged = localStorage.getItem('token');
	console.log(isLogged);

	return (
		<Fragment>
			<Router>
				<Switch>
					<Route exact path='/'>
						{isLogged !== null ? <Index /> : <Redirect from='/' to='/login' />}
					</Route>
					<Route exact path='/match'>
						{isLogged !== null ? <Match /> : <Redirect from='/' to='/login' />}
					</Route>
					<Route exact path='/profile' component={Profile}>
						{isLogged !== null ? (
							<Profile />
						) : (
							<Redirect from='/' to='/login' />
						)}
					</Route>
					<Route exact path='/chat/:id' component={Chat}>
						{isLogged !== null ? <Chat /> : <Redirect from='/' to='/login' />}
					</Route>
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup}></Route>
					<Route path='*' component={PageNotFound} />
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
