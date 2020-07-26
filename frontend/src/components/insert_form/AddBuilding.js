import React, { useState, useEffect } from 'react';
import InsertBuilding from './InsertBuilding';
import PropTypes from 'prop-types';
import '../../App.css';

export default function AddBuilding(props) {
	const [numBuild, setnumBuild] = useState(0); //number of building forms
	//console.log(numBuild);
	const buildings = [];
	const add = () => {
		//inc number of building forms
		setnumBuild((num) => num + 1);
	};
	for (let i = 0; i < numBuild; i++) {
		//render n number of building forms
		buildings.push(<InsertBuilding></InsertBuilding>);
	}
	return (
		<div className="container">
			<input
				type="button"
				onClick={() => add()}
				className={props.hide}
				value="Add Building"
			></input>
			{buildings}
		</div>
	);
}

AddBuilding.propTypes = {
	hide: PropTypes.string.isRequired,
};
