import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import AddPlace from './AddPlace';

export default function InsertBuilding(props) {
	const [name, setname] = useState('');
	const [placeBtn, setplaceBtn] = useState('hidden');
	const [btnVal, setbtnVal] = useState('Submit');
	const updateBuildingName = (e) => {
		setname(e.target.value); //update state as user types in school name
	};
	const submit = (e) => {
		e.preventDefault();
		setplaceBtn('form');
		setbtnVal('Update');
	};
	return (
		<div className="container">
			<h4>{name}</h4>
			<form onSubmit={submit}>
				<input
					type="text"
					placeholder="Building Name"
					className="form"
					onChange={updateBuildingName}
					style={{ width: '350px', height: '31px' }}
				></input>
				<input
					type="submit"
					value={btnVal}
					className="form"
					name="submitBuilding"
					style={{ height: '31px' }}
				></input>
			</form>
			<AddPlace hide={placeBtn}></AddPlace>
		</div>
	);
}
