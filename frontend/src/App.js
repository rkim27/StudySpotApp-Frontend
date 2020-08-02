import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import InsertSchool from './components/insert_form/InsertSchool';
import Header from './components/layout/Header';
import Search from './components/Search/Search';
import School from './components/Search/School';

function App() {
	return (
		<Router>
			<div className="App">
				<Header></Header>
				<Route exact path="/">
					<div className="container">
						<h2>Welcome</h2>
						<Search></Search>
					</div>
				</Route>
				<Route path="/school/:id" component={School}></Route>
				{/* Exact path will only match that path pattern alone, not /insert which has a /*/}
				<Route path="/insert">
					{' '}
					{/*Page to insert schools*/}
					<InsertSchool></InsertSchool>
				</Route>
				{/*<Route path="/insert/:id"></Route>  this would render both /insert and /insert/:id, to avoid this one can do exact path or use a switch for nested routes*/}
			</div>
		</Router>
	);
}

export default App;
