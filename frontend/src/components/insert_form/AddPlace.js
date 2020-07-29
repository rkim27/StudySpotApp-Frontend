import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import InsertRoom from './InsertRoom';
import InsertLibrary from './InsertLibrary';

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
				></InsertRoom>,
			]);
		}
		setkey((num) => num + 1);
	};

	const del = (id, lib) => {
		if (lib) {
			setlibraries((prev) => {
				return prev.filter((form) => form.props.delId !== id);
			});
		} else {
			setrooms((prev) => {
				return prev.filter((form) => form.props.delId !== id);
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
			></input>
			<input
				type="button"
				onClick={() => add(false)}
				className={props.hide}
				value="Room"
			></input>
			{libraries}
			{rooms}
		</div>
	);
}

AddPlace.propTypes = {
	hide: PropTypes.string.isRequired,
	buildId: PropTypes.number,
};
