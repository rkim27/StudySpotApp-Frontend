import React, { useState } from 'react';
import AddBuilding from './AddBuilding';
import '../../App.css';
import Submit from './functions/Submit';

export default function InsertSchool(props) {
	//parent component of imput form
	const [schoolName, setschoolName] = useState(''); //state for new school name
	const [schoolId, setschoolId] = useState(null); //school id in db, originally null, once submitted it is set
	const [hideBuilding, sethideBuilding] = useState('hidden'); //originally hide building input form until school is input
	const [btnVal, setbtnVal] = useState('Submit');
	const submitName = (e) => {
		e.preventDefault();
		if (schoolName !== '') {
			const update = btnVal === 'Update' ? true : false; //updating name if already submitted once
			if (btnVal !== 'Update') {
				setbtnVal('Update'); //display update on button upon submit, tells user they can update entered school name
				sethideBuilding('form'); //reveal building form once school name submitted
			}
			//send id, name, and if updating or inserting new record
			Submit(
				'http://localhost:3002/insert',
				{
					id: schoolId,
					school: schoolName,
					update: update,
				},
				setschoolId
			);
		} else {
			alert('Please enter a school name');
		}
	};
	return (
		<div className="container">
			<form onSubmit={submitName}>
				<h3>{schoolName}</h3>
				<div>
					<span title="School Name">
						<input
							type="text"
							placeholder="School Name"
							value={schoolName}
							onChange={(e) => setschoolName(e.target.value)}
							className="form schooltext"
						></input>
					</span>
					<input
						type="submit"
						value={btnVal}
						className="form schoolbutton"
						name="submitSchool"
					></input>
				</div>
			</form>
			{/*Add building button*/}
			<AddBuilding hide={hideBuilding} schoolId={schoolId}></AddBuilding>
		</div>
	);
}
