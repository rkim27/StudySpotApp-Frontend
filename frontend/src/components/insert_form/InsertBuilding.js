import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import AddPlace from './AddPlace';
import Submit from './functions/Submit';

export default function InsertBuilding(props) {
	const [name, setname] = useState('');
	const [placeBtn, setplaceBtn] = useState('hidden');
	const [btnVal, setbtnVal] = useState('Submit');
	const [id, setid] = useState(null);
	const schoolId = props.schoolId;
	const submitName = (e) => {
		//boilerplate to get things working, turn this into a function too
		e.preventDefault();
		if (name !== '') {
			const update = btnVal === 'Update' ? true : false;
			const sId = btnVal === 'Update' ? null : schoolId; //don't need schoolId for updates
			setplaceBtn('form'); //reveal button to add room or library
			setbtnVal('Update'); //set button to display 'Update'
			Submit(
				`http://localhost:3002/insert/building`,
				{
					id: id,
					building: name,
					schoolId: sId,
					update: update,
				},
				setid
			);
		} else {
			alert('Please enter a building name');
		}
	};
	return (
		<div className="container">
			<h4>{name}</h4>
			<form onSubmit={submitName}>
				<input
					type="text"
					placeholder="Building Name"
					className="form"
					onChange={(e) => setname(e.target.value)}
					style={{ width: '350px', height: '31px' }}
				></input>
				<input
					type="submit"
					value={btnVal}
					className="form"
					name="submitBuilding"
					style={{ height: '31px' }}
				></input>
				<input
					type="button"
					value="Delete"
					className="form"
					style={{ height: '31px' }}
					onClick={() =>
						props.del(props.delId, btnVal === 'Update' ? true : false, id)
					}
				></input>
			</form>
			<AddPlace hide={placeBtn} buildId={id}></AddPlace>
		</div>
	);
}

InsertBuilding.propTypes = {
	schoolId: PropTypes.number,
	del: PropTypes.func.isRequired,
	delId: PropTypes.number.isRequired,
};
