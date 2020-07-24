import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InsertBuilding from './InsertBuilding';
import '../../App.css';

export default function InsertSchool(props) {
	//parent component of imput form
	const [schoolName, setschoolName] = useState(''); //state for new school will all be managed by this component
	const [buildings, setbuildings] = useState([]);
	const [rooms, setrooms] = useState([]);
	const [libraries, setlibraries] = useState([]);
	const [hideBuilding, sethideBuilding] = useState('hidden'); //originally hide building input form until school is input
	const [btnVal, setbtnVal] = useState('Submit');
	const updateName = (e) => {
		setschoolName(e.target.value); //update state as user types in school name
	};
	const submitName = (e) => {
		e.preventDefault();
		setbtnVal('Update');
		sethideBuilding('form'); //reveal building form once school name submitted
	};
	return (
		<div className="container">
			<form onSubmit={submitName}>
				<input
					type="text"
					placeholder="School Name"
					value={schoolName}
					onChange={updateName}
					className="form"
					style={{ width: '250px' }}
				></input>
				<input
					type="submit"
					value={btnVal}
					className="form"
					name="submitSchool"
				></input>
			</form>
			<InsertBuilding hideBuilding={hideBuilding}></InsertBuilding>
		</div>
	);
}

InsertSchool.propTypes = {};