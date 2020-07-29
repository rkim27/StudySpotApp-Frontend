import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import Submit from './functions/Submit';

export default function InsertLibrary(props) {
	const [name, setname] = useState('');
	const [id, setid] = useState(null);
	const [floorNum, setfloorNum] = useState('');
	const [btnVal, setbtnVal] = useState('Submit');
	const buildId = props.buildId;
	const submitName = (e) => {
		//boilerplate to get things working, turn this into a function too
		e.preventDefault();
		if (name !== '' && floorNum !== '') {
			const update = btnVal === 'Update' ? true : false;
			const bId = btnVal === 'Update' ? null : buildId; //don't need buildsId for updates
			setbtnVal('Update'); //set button to display 'Update'
			Submit(
				'http://localhost:3002/insert/building/library',
				{
					id: id,
					library: name,
					floor: floorNum,
					buildId: bId,
					update: update,
				},
				setid
			);
		} else {
			alert('Please fill out all forms for this library');
		}
	};

	return (
		<div className="container">
			<form onSubmit={submitName}>
				<input
					type="text"
					placeholder="Library Name"
					className="form"
					onChange={(e) => setname(e.target.value)}
					style={{ width: '280px', height: '28px' }}
				></input>
				<br></br>
				<input
					type="text"
					placeholder="Floor"
					className="form"
					onChange={(e) => setfloorNum(e.target.value)}
					style={{ width: '50px', height: '28px' }}
				></input>
				<input
					type="submit"
					value={btnVal}
					className="form"
					style={{ height: '28px' }}
				></input>
				<input
					type="button"
					value="Delete"
					className="form"
					style={{ height: '28px' }}
					onClick={() =>
						props.del(props.delId, true, btnVal === 'Update' ? true : false, id)
					}
				></input>
			</form>
		</div>
	);
}

InsertLibrary.propTypes = {
	buildId: PropTypes.number,
	del: PropTypes.func.isRequired,
	delId: PropTypes.number.isRequired,
};
