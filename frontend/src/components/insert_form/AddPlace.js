import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../App.css';
import InsertRoom from './InsertRoom';
import InsertLibrary from './InsertLibrary';

export default function AddPlace(props) {
	const [numLib, setnumLib] = useState(0); //number of library forms
	const [numRoom, setnumRoom] = useState(0); //number of room forms
	const libraries = [];
	const rooms = [];
	const add = (lib) => {
		lib ? setnumLib((num) => num + 1) : setnumRoom((num) => num + 1);
	};
	for (let i = 0; i < numLib; i++) {
		libraries.push(<InsertLibrary></InsertLibrary>);
	}
	for (let i = 0; i < numRoom; i++) {
		rooms.push(<InsertRoom></InsertRoom>);
	}
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
};
