import React, { Fragment, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import history from './uitls/history';
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

function App() {
	const [isLogged, setIsLogged] = useState(localStorage.getItem('token'));

	axios.defaults.headers.common = {
		// Authorization: `Bearer ${localStorage.getItem('token')}`,
		Authorization: `Bearer ${isLogged}`,
	};

	return (
		<Fragment>
			<Router history={history}>
				<Switch>
					<Route exact path='/'>
						{isLogged !== null ? (
							<Index setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/' to='/login' />
						)}
					</Route>
					<Route exact path='/match'>
						{isLogged !== null ? (
							<Match setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/' to='/login' />
						)}
					</Route>
					<Route exact path='/profile'>
						{isLogged !== null ? (
							<Profile setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/' to='/login' />
						)}
					</Route>
					<Route exact path='/chat/:id'>
						{isLogged !== null ? (
							<Chat setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/' to='/login' />
						)}
					</Route>
					<Route exact path='/login'>
						{isLogged === null ? (
							<Login setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/login' to='/' />
						)}
					</Route>
					<Route exact path='/signup'>
						{isLogged === null ? (
							<Signup setIsLogged={setIsLogged} />
						) : (
							<Redirect from='/login' to='/' />
						)}
					</Route>
					<Route path='*'>
						<PageNotFound setIsLogged={setIsLogged} />
					</Route>
				</Switch>
			</Router>
		</Fragment>
	);
}

export default App;
