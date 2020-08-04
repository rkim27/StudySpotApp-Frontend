import React, { useState } from 'react';
import InsertBuilding from './InsertBuilding';
import PropTypes from 'prop-types';
import '../../App.css';
import Delete from './functions/Delete';

export default function AddBuilding(props) {
	const [key, setkey] = useState(0); //key/id for each building input form
	const [buildings, setbuildings] = useState([]); //holds all references to each building form
	const add = () => {
		//inc number of building forms
		setbuildings([
			...buildings,
			<InsertBuilding
				schoolId={props.schoolId}
				key={key}
				del={del}
				delId={key}
			></InsertBuilding>,
		]);
		setkey((num) => num + 1); //inc key after each use
	};
	const del = (key, update, id) => {
		//filter out form that matches id to be deleted
		/*there may be concerns with performance if buildings array gets huge
		and have to loop through every element to filter but I don't expect someone to submit a form with a million buildings*/
		if (update) {
			Delete(id, 'buildings');
		}
		setbuildings((prev) => {
			return prev.filter((form) => form.props.delId !== key);
		});
	};

	//console.log(buildings);
	return (
		<div className="container">
			<input
				type="button"
				onClick={() => add(buildings)}
				className={props.hide}
				value="Add Building"
				style={{ fontSize: '15px' }}
			></input>
			{buildings}
		</div>
	);
}

AddBuilding.propTypes = {
	hide: PropTypes.string.isRequired,
	schoolId: PropTypes.number,
};
