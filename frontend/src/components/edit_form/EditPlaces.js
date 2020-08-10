import React from 'react';
import PropTypes from 'prop-types';
import '../../App.css';

export default function EditPlaces(props) {
	//displays all rooms or libraries for a building once they are loaded
	const buildId = props.buildId;
	const changePlace = (e, index, attribute) => {
		//change an attribute of a room/library
		const value = e.target.value;
		const newplace = { ...props.places };
		newplace[buildId][index][attribute] = value;
		props.setPlaces(newplace);
	};
	return (
		<div className="container">
			{buildId in props.places ? (
				<h5 style={{ marginBottom: '0px', textDecoration: 'underline' }}>
					{props.type}
				</h5>
			) : null}
			{/*If building's rooms/libraries have been loaded, map them into update forms*/}
			{buildId in props.places
				? props.places[buildId].map((place, index) => {
						return (
							<form
								key={index}
								onSubmit={(e) =>
									//submit parameters differ for rooms and libraries
									props.submitName(
										e,
										props.type === 'Rooms'
											? 'http://localhost:3002/insert/building/room'
											: 'http://localhost:3002/insert/building/library',
										props.type === 'Rooms'
											? {
													id: place.id,
													room: place.name,
													floor: place.floor,
													num: place.num,
													buildId: null,
													update: true,
													schoolId: null,
											  }
											: {
													id: place.id,
													library: place.name,
													floor: place.floor,
													buildId: null,
													update: true,
													schoolId: null,
											  }
									)
								}
							>
								<input
									type="text"
									placeholder={place.name}
									className="form placetext"
									onChange={(e) => changePlace(e, index, 'name')}
								></input>
								<br />
								{/*Different forms for rooms and libraries*/}
								{props.type === 'Rooms' ? (
									<div>
										<span title="Floor">
											<input
												type="text"
												placeholder={place.floor}
												className="form roomfloor"
												style={{ marginTop: '0px' }}
												onChange={(e) => changePlace(e, index, 'floor')}
											></input>
										</span>
										<span title="Room Number">
											<input
												type="text"
												placeholder={place.num}
												className="form roomnumber"
												style={{ marginTop: '0px' }}
												onChange={(e) => changePlace(e, index, 'num')}
											></input>
										</span>
									</div>
								) : (
									<span title="Floor">
										<input
											type="text"
											placeholder={place.floor}
											className="form libraryfloor"
											onChange={(e) => changePlace(e, index, 'floor')}
										></input>
									</span>
								)}
								<input
									type="submit"
									value="Submit Change"
									className="form roombutton"
								></input>
								<input
									type="button"
									value="Delete"
									className="form librarybutton"
								></input>
								<hr style={{ borderTop: 'dotted 1px', marginBottom: '-2px' }} />
							</form>
						);
				  })
				: null}
		</div>
	);
}

EditPlaces.propTypes = {
	places: PropTypes.object,
	buildId: PropTypes.number,
	type: PropTypes.string,
	submitName: PropTypes.func,
	setPlaces: PropTypes.func,
};