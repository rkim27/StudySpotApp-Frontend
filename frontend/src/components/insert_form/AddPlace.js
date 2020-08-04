import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import InsertRoom from './InsertRoom';
import InsertLibrary from './InsertLibrary';
import Delete from './functions/Delete';

export default function AddPlace(props) {
	//hold all references to libraries and rooms for one building
	const [libraries, setlibraries] = useState([]);
	const [rooms, setrooms] = useState([]);
	const [key, setkey] = useState(0);
	const add = (lib) => {
		if (lib) {
			setlibraries([
				...libraries,
				<InsertLibrary
					buildId={props.buildId}
					key={key}
					delId={key}
					del={del}
					schoolId={props.schoolId}
				></InsertLibrary>,
			]);
		} else {
			setrooms([
				...rooms,
				<InsertRoom
					buildId={props.buildId}
					key={key}
					delId={key}
					del={del}
					schoolId={props.schoolId}
				></InsertRoom>,
			]);
		}
		setkey((num) => num + 1);
	};

	const del = (key, lib, update, id) => {
		if (lib) {
			if (update) {
				Delete(id, 'libraries');
			}
			setlibraries((prev) => {
				return prev.filter((form) => form.props.delId !== key);
			});
		} else {
			if (update) {
				Delete(id, 'rooms');
			}
			setrooms((prev) => {
				return prev.filter((form) => form.props.delId !== key);
			});
		}
	};

	return (
		<div className="container">
			<input
				type="button"
				onClick={() => add(true)}
				className={props.hide}
				value="Library"
				style={{ fontSize: '14px' }}
			></input>
			<input
				type="button"
				onClick={() => add(false)}
				className={props.hide}
				value="Room"
				style={{ fontSize: '14px' }}
			></input>
			{libraries}
			{rooms}
		</div>
	);
}

AddPlace.propTypes = {
	hide: PropTypes.string.isRequired,
	buildId: PropTypes.number,
	schoolId: PropTypes.number,
};
