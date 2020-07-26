import React, { useState } from 'react';
import '../../App.css';

export default function AddLibrary(props) {
	const [name, setname] = useState('');
	const [btnVal, setbtnVal] = useState('Submit');
	const updateLibraryName = (e) => {
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
					placeholder="Library Name"
					className="form"
					onChange={updateLibraryName}
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
