import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';

export default function SchoolHeader(props) {
	const [schoolName, setschoolName] = useState('');
	const [id] = useState(props.match.params.sid);
	useEffect(() => {
		axios
			.get(`http://localhost:3002/search/${id}`)
			.then((res) => setschoolName(res.data))
			.catch((err) => {
				if (err.response.status === 404) {
					setschoolName('404 Not Found');
				} else if (err.response.status === 500) {
					setschoolName('500 Error Please Reload');
				}
			});
	}, [id]);
	return (
		<div className="container">
			<h1 style={{ marginBottom: '1px' }}>{schoolName}</h1>
		</div>
	);
}
