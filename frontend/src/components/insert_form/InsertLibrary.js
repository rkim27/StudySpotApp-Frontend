import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import Submit from './functions/Submit';

export default function InsertLibrary(props) {
	const [name, setname] = useState('');
	const [id, setid] = useState(null);
	const [floorNum, setfloorNum] = useState('');
	const [btnVal, setbtnVal] = useState('Submit');
	const submitName = (e) => {
		//boilerplate to get things working, turn this into a function too
		e.preventDefault();
		if (name !== '' && floorNum !== '') {
			const update = btnVal === 'Update' ? true : false;
			const bId = btnVal === 'Update' ? null : props.buildId; //don't need buildsId for updates
			const sId = btnVal === 'Update' ? null : props.schoolId;
			if (btnVal !== 'Update') {
				setbtnVal('Update'); //set button to display 'Update'
			}
			Submit(
				'http://localhost:3002/insert/building/library',
				{
					id: id,
					library: name,
					floor: floorNum,
					buildId: bId,
					update: update,
					schoolId: sId,
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
				<div>
					<span title="Library Name">
						<input
							type="text"
							placeholder="Library Name"
							className="form placetext"
							onChange={(e) => setname(e.target.value)}
						></input>
					</span>
					<br></br>
					<span title="Floor">
						<input
							type="text"
							placeholder="Floor"
							className="form libraryfloor"
							onChange={(e) => setfloorNum(e.target.value)}
						></input>
					</span>
					<input
						type="submit"
						value={btnVal}
						className="form librarybutton"
					></input>
					<input
						type="button"
						value="Delete"
						className="form librarybutton"
						onClick={() =>
							props.del(
								props.delId,
								true,
								btnVal === 'Update' ? true : false,
								id
							)
						}
					></input>
				</div>
			</form>
		</div>
	);
}

InsertLibrary.propTypes = {
	buildId: PropTypes.number,
	del: PropTypes.func.isRequired,
	delId: PropTypes.number.isRequired,
	schoolId: PropTypes.number,
};
