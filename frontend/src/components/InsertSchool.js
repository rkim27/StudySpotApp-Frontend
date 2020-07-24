import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InsertBuilding from './InsertBuilding';

export default function InsertSchool(props) {
	//parent component of imput form
	const [schoolName, setschoolName] = useState(''); //state for new school will all be managed by this component
	const [buildings, setbuildings] = useState([]);
	const [rooms, setrooms] = useState([]);
	const [libraries, setlibraries] = useState([]);
	const [hideBuilding, sethideBuilding] = useState('hidden'); //originally hide building input form until school is input
	const updateName = (e) => {
		setschoolName(e.target.value);
	};
	const submitName = (e) => {
		e.preventDefault();
		sethideBuilding('building');
		console.log(e.target);
	};
	return (
		<React.Fragment>
			<form onSubmit={submitName}>
				<input
					type="text"
					placeholder="School Name"
					value={schoolName}
					onChange={updateName}
					style={{ flex: '1' }}
				></input>
				<input
					type="submit"
					value="Submit"
					style={{ flex: '1' }}
					name="submitSchool"
				></input>
			</form>
			<InsertBuilding hideBuilding={hideBuilding}></InsertBuilding>
		</React.Fragment>
	);
}

InsertSchool.propTypes = {};
