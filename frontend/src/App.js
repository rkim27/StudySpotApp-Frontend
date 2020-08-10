import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import InsertSchool from './components/insert_form/InsertSchool';
import Header from './components/layout/Header';
import Search from './components/Search/Search';
import School from './components/Search/School';
import Room from './components/Search/Room';
import Library from './components/Search/Library';
import EditSchool from './components/edit_form/EditSchool';

function App() {
	return (
		<Router>
			<div className="App">
				<Header></Header>
				{/* Exact path will only match that path pattern alone, not /insert which has a /*/}
				<Route exact path="/">
					<div className="container">
						<h2>Welcome</h2>
						<Search></Search>
					</div>
				</Route>
				<Route path="/school/:id" component={School}></Route>
				<Route path="/room/:id" component={Room}></Route>
				<Route path="/library/:id" component={Library}></Route>
				<Route path="/edit/:id" component={EditSchool}></Route>
				{/*Page to insert schools*/}
				<Route path="/insert" component={InsertSchool}></Route>
				{/*<Route path="/insert/:id"></Route>  this would render both /insert and /insert/:id, to avoid this one can do exact path or use a switch for nested routes*/}
			</div>
		</Router>
	);
}

export default App;
