import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact';
import axios from 'axios';
import '../../App.css';

export default function Search() {
	const [schools, setschools] = useState([]);
	const [filtered, setfiltered] = useState([]);
	const [search, setsearch] = useState('');
	const filterSchools = (term) => {
		//filter out schools based on term entered into search bar
		setfiltered(
			schools.filter((school) => {
				const name = school.name.toLowerCase();
				const filter = term.toLowerCase();
				return name.includes(filter);
			})
		);
	};
	useEffect(() => {
		//onload get all schools onces, store in schools state
		axios
			.get('http://localhost:3002/school')
			.then((res) => setschools(res.data))
			.catch((err) => {
				if (err.response.status === 500) {
					alert('500 Error Please Reload');
				}
			});
	}, []);

	const hover = (e) => {
		e.target.style.color = '#CEB888';
	};
	const noHover = (e) => {
		e.target.style.color = 'black';
	};
	//display all schools if a search term has been entered, otherwise display filtered results
	const displayList = search === '' ? schools : filtered;
	return (
		<div className="container">
			<div>
				<MDBIcon icon="search" />
				<input
					className="search"
					type="text"
					placeholder="Search for a School"
					aria-label="Search"
					onChange={(e) => {
						setsearch(e.target.value);
						filterSchools(e.target.value);
					}}
				/>
			</div>
			<br />
			{displayList.map((school) => {
				//render all schools in list
				return (
					<div key={school.id}>
						<Link
							to={`/school/${school.id}/school`}
							onMouseOver={hover}
							onMouseOut={noHover}
							style={{ color: 'black', textDecoration: 'none' }}
						>
							{school.name}
						</Link>
						<br></br>
					</div>
				);
			})}
		</div>
	);
}
