import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

export default function Library(props) {
	const id = props.match.params.id;
	const [info, setinfo] = useState({});
	const [seats, setseats] = useState(0);
	useEffect(() => {
		axios.get(`http://localhost:3002/search/library/${id}`).then((res) => {
			setinfo(res.data[0]);
			setseats(res.data[0].numSeats);
		});
	}, [id]);
	const update = (e) => {
		setseats(e.target.value);
	};
	return (
		<div className="container">
			<h1>Placeholder</h1>
			<div className="column" style={{ width: '55%' }}>
				<h2 style={{ textDecoration: 'underline', marginBottom: '1px' }}>
					{info.name}
				</h2>

				<div style={{ fontSize: '14px' }}>Floor: {info.floor}</div>
				<div>
					Number of Open Seats:{' '}
					<div style={{ textDecoration: 'underline' }}>{seats}</div>
				</div>
				<div style={{ borderTop: '1.5px solid #ceb888' }}>
					Change Number of Open Seats
				</div>
				<form>
					<input type="radio" id="choice1" name="avail" />
					<label for="choice1">0-10 </label>
					<input type="radio" id="choice2" name="avail" />
					<label for="choice2">11-20 </label>
					<input type="radio" id="choice3" name="avail" />
					<label for="choice3">21-30 </label>
					<input type="radio" id="choice4" name="avail" />
					<label for="choice4">30+ </label>
				</form>
			</div>
		</div>
	);
}
