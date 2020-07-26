import React, { useState } from 'react';
import '../../App.css';

export default function InsertRoom() {
	const [name, setname] = useState('');
	const [btnVal, setbtnVal] = useState('Submit');
	const updateRoomName = (e) => {
		setname(e.target.value); //update state as user types in school name
	};
	const submit = (e) => {
		e.preventDefault();
		setbtnVal('Update');
	};
	return (
		<div className="container">
			<form onSubmit={submit}>
				<input
					type="text"
					placeholder="Room Name"
					className="form"
					onChange={updateRoomName}
					style={{ width: '280px', height: '28px' }}
				></input>
				<input
					type="submit"
					value={btnVal}
					className="form"
					style={{ height: '28px' }}
				></input>
			</form>
		</div>
	);
}
