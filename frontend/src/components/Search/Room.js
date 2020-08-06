import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

export default function Room(props) {
	const id = props.match.params.id;
	const [info, setinfo] = useState({});
	useEffect(() => {
		axios
			.get(`http://localhost:3002/search/room/${id}`)
			.then((res) => setinfo(res.data[0]));
	}, [id]);
	const update = (e) => {
		e.preventDefault();
		axios
			.post(
				`http://localhost:3002/search/updateroom/${id}`,
				{ avail: info.avail },
				{
					headers: { 'content-Type': 'application/json' },
				}
			)
			.then((res) => {
				if (res.status === 200) {
					const avail = info.avail === 1 ? 0 : 1;
					setinfo({ ...info, avail: avail });
				}
			});
	};
	const color = info.avail === 1 ? 'green' : 'red';
	const text = info.avail === 1 ? 'Available' : 'Occupied';
	return (
		<div className="container">
			<h1>Placeholder</h1>
			<div className="column" style={{ width: '55%' }}>
				<h2 style={{ textDecoration: 'underline', marginBottom: '1px' }}>
					{info.name}
				</h2>
				<div style={{ fontSize: '13px' }}>
					<div>Floor: {info.floor}</div>
					<div>Room Number: {info.number}</div>
					<div style={{ color: color, fontSize: '24px' }}>{text}</div>
				</div>
				<input
					type="button"
					value="Change availability"
					style={{ marginBottom: '10px' }}
					onClick={update}
				/>
			</div>
		</div>
	);
}
