import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

export default function Library(props) {
	const id = props.match.params.id;
	const [info, setinfo] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:3002/search/library/${id}`)
			.then((res) => {
				setinfo(res.data[0]);
			})
			.catch((err) => {
				if (err.response.status === 404) {
					setinfo((prev) => {
						return { ...prev, name: '404 Not Found' };
					});
				} else if (err.response.status === 500) {
					setinfo((prev) => {
						return { ...prev, name: '500 Error Please Reload' };
					});
				}
			});
	}, [id]);
	useEffect(() => {
		axios
			.post(
				`http://localhost:3002/search/updatelibrary/${id}`,
				{ avail: info.numSeats },
				{
					headers: { 'content-Type': 'application/json' },
				}
			)
			.catch((err) => {
				if (err.response.status === 500) {
					alert('500 Error Please Try Again');
				}
			});
	}, [info, id]);
	const updateAvail = (e) => {
		const value = Number(e.target.value);
		setinfo((prev) => {
			return { ...prev, numSeats: value };
		});
	};
	let seats;
	switch (info.numSeats) {
		case 1:
			seats = '0-10';
			break;
		case 2:
			seats = '11-20';
			break;
		case 3:
			seats = '21-30';
			break;
		default:
			seats = '30+';
	}
	return (
		<div className="container">
			<div className="column" style={{ width: '55%' }}>
				<h2 style={{ textDecoration: 'underline', marginBottom: '1px' }}>
					{info.name}
				</h2>

				<div style={{ fontSize: '14px' }}>Floor: {info.floor}</div>
				<div>
					Number of Open Seats: <div>{seats}</div>
				</div>
				<div style={{ borderTop: '1.5px solid #ceb888' }}>
					Number above off?
					<br />
					Change Number of Open Seats
				</div>
				<form>
					<input
						type="radio"
						id="choice1"
						name="avail"
						value="1"
						onChange={updateAvail}
					/>
					<label htmlFor="choice1">0-10 </label>
					<input
						type="radio"
						id="choice2"
						name="avail"
						value="2"
						onChange={updateAvail}
					/>
					<label htmlFor="choice2">11-20 </label>
					<input
						type="radio"
						id="choice3"
						name="avail"
						value="3"
						onChange={updateAvail}
					/>
					<label htmlFor="choice3">21-30 </label>
					<input
						type="radio"
						id="choice4"
						name="avail"
						value="4"
						onChange={updateAvail}
					/>
					<label htmlFor="choice4">30+ </label>
				</form>
			</div>
		</div>
	);
}
