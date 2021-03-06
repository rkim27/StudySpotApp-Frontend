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
			if (btnVal !== 'Update') {
				setplaceBtn('form'); //reveal button to add room or library
				setbtnVal('Update'); //set button to display 'Update'
			}
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
				<div>
					<span title="Building Name">
						<input
							type="text"
							placeholder="Building Name"
							className="form buildingtext"
							onChange={(e) => setname(e.target.value)}
						></input>
					</span>
					<input
						type="submit"
						value={btnVal}
						className="form buildingbutton"
						name="submitBuilding"
					></input>
					<input
						type="button"
						value="Delete"
						className="form buildingbutton"
						onClick={() =>
							props.del(props.delId, btnVal === 'Update' ? true : false, id)
						}
					></input>
				</div>
			</form>
			<AddPlace hide={placeBtn} buildId={id} schoolId={schoolId}></AddPlace>
		</div>
	);
}

InsertBuilding.propTypes = {
	schoolId: PropTypes.number,
	del: PropTypes.func.isRequired,
	delId: PropTypes.number.isRequired,
};
