import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

export default function InsertBuilding(props) {
	return (
		<form>
			<input
				type="text"
				placeholder="Building Name"
				className={props.hideBuilding}
				style={{ width: '250px' }}
			></input>
			<input
				type="submit"
				value="Submit"
				className={props.hideBuilding}
				name="submitBuilding"
			></input>
		</form>
	);
}

InsertBuilding.propTypes = {
	hideBuilding: PropTypes.string.isRequired,
};
