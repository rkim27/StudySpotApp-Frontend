import React, { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import AddBuilding from './AddBuilding';
import '../../App.css';
import axios from 'axios';

export default function InsertSchool(props) {
	//parent component of imput form
	const [schoolName, setschoolName] = useState(''); //state for new school will all be managed by this component
	const [schoolId, setschoolId] = useState(null); //school id in db, originally null, once submitted it is set
	//const [buildings, setbuildings] = useState([]);
	//const [rooms, setrooms] = useState([]);
	//const [libraries, setlibraries] = useState([]);
	const [hideBuilding, sethideBuilding] = useState('hidden'); //originally hide building input form until school is input
	const [btnVal, setbtnVal] = useState('Submit');
	const updateSchoolName = (e) => {
		setschoolName(e.target.value); //update state as user types in school name
	};
	const submitName = (e) => {
		e.preventDefault();
		const update = btnVal === 'Update' ? true : false; //updating name if already submitted once
		setbtnVal('Update'); //display update on button upon submit, tells user they can update entered school name
		sethideBuilding('form'); //reveal building form once school name submitted
		axios
			.post(
				'http://localhost:3002/insert',
				{ id: schoolId, school: schoolName, update: update }, //send id, name, and if updating or inserting new record
				{
					headers: { 'content-Type': 'application/json' },
				}
			)
			.then((res) => {
				setschoolId(res.data.id); //response is the id pf record submitted, set that to current id value
			});
	};
	return (
		<div className="container">
			<form onSubmit={submitName}>
				<h3>{schoolName}</h3>
				<input
					type="text"
					placeholder="Insert School Name"
					value={schoolName}
					onChange={updateSchoolName}
					className="form"
					style={{ width: '400px', height: '35px' }}
				></input>
				<input
					type="submit"
					value={btnVal}
					className="form"
					name="submitSchool"
					style={{ height: '35px' }}
				></input>
			</form>
			{/*Add building button*/}
			<AddBuilding hide={hideBuilding} id={schoolId}></AddBuilding>
		</div>
	);
}

InsertSchool.propTypes = {};
