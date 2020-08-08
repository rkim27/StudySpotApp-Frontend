import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import Submit from './functions/Submit';

export default function InsertRoom(props) {
	const [name, setname] = useState('');
	const [btnVal, setbtnVal] = useState('Submit');
	const [id, setid] = useState(null);
	const [floorNum, setfloorNum] = useState('');
	const [roomNum, setroomNum] = useState('');

	const submitName = (e) => {
		//boilerplate to get things working, turn this into a function too
		e.preventDefault();
		if (name !== '' && floorNum !== '' && roomNum !== '') {
			const update = btnVal === 'Update' ? true : false;
			const bId = btnVal === 'Update' ? null : props.buildId; //don't need buildsId for updates
			const sId = btnVal === 'Update' ? null : props.schoolId;
			if (btnVal !== 'Update') {
				setbtnVal('Update'); //set button to display 'Update'
			}
			Submit(
				'http://localhost:3002/insert/building/room',
				{
					id: id,
					room: name,
					floor: floorNum,
					num: roomNum,
					buildId: bId,
					update: update,
					schoolId: sId,
				},
				setid
			);
		} else {
			alert('Please fill out all forms for this room');
		}
	};
	return (
		<div className="container">
			<form onSubmit={submitName}>
				<div>
					<span title="Room Name">
						<input
							type="text"
							placeholder="Room Name"
							className="form roomtext"
							onChange={(e) => setname(e.target.value)}
						></input>
					</span>
					<br></br>
					<span title="Floor">
						<input
							type="text"
							placeholder="Floor"
							className="form roomfloor"
							onChange={(e) => setfloorNum(e.target.value)}
						></input>
					</span>
					<span title="Room Number">
						<input
							type="text"
							placeholder="Number"
							className="form roomnumber"
							onChange={(e) => setroomNum(e.target.value)}
						></input>
					</span>
					<input
						type="submit"
						value={btnVal}
						className="form roombutton"
					></input>
					<input
						type="button"
						value="Delete"
						className="form roombutton"
						onClick={() =>
							props.del(
								props.delId,
								false,
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

InsertRoom.propTypes = {
	buildId: PropTypes.number,
	del: PropTypes.func.isRequired,
	delId: PropTypes.number.isRequired,
	schoolId: PropTypes.number,
};
