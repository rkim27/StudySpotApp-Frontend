import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import AddBuilding from '../insert_form/AddBuilding';
import AddPlace from '../insert_form/AddPlace';
import Submit from '../insert_form/functions/Submit';
import EditPlaces from './EditPlaces';

export default function EditSchool(props) {
	const id = props.match.params.id;
	const [rooms, setrooms] = useState({});
	const [schoolName, setschoolName] = useState('');
	const [libraries, setlibraries] = useState({});
	const [buildings, setbuildings] = useState([]);

	useEffect(() => {
		//onload get school info once
		axios
			.all([
				axios.get(`http://localhost:3002/search/${id}`),
				axios.get(`http://localhost:3002/search/buildings/${id}`),
			])
			.then((res) => {
				setschoolName(res[0].data);
				setbuildings(res[1].data);
			});
	}, [id]);

	const changeSchool = (e) => {
		setschoolName(e.target.value);
	};
	const changeBuilding = (e, index) => {
		//change building name
		const value = e.target.value;
		const newbuild = buildings.slice();
		newbuild[index]['name'] = value;
		setbuildings(newbuild);
	};

	const submitName = (e, link, value) => {
		//submit new name
		e.preventDefault();
		Submit(link, value, null);
	};

	const getPlaces = (e, library, buildId) => {
		//get either all rooms or libraries for a building
		//only get if they are not already loaded
		e.preventDefault();
		if (library) {
			if (!(buildId in libraries)) {
				axios
					.get(`http://localhost:3002/search/building/libraries/${buildId}`)
					.then((res) => {
						const temp = { ...libraries };
						temp[buildId] = res.data;
						setlibraries(temp);
					});
			}
		} else {
			if (!(buildId in rooms)) {
				axios
					.get(`http://localhost:3002/search/building/rooms/${buildId}`)
					.then((res) => {
						const temp = { ...rooms };
						temp[buildId] = res.data;
						setrooms(temp);
					});
			}
		}
	};
	return (
		<div className="container">
			<h2 style={{ borderBottom: '1px solid black' }}>Edit School Name</h2>
			<div>
				<h3>{schoolName}</h3>
				<form
					onSubmit={(e) =>
						submitName(e, 'http://localhost:3002/insert', {
							id: id,
							school: schoolName,
							update: true,
						})
					}
				>
					<input
						type="text"
						placeholder="Edit School Name"
						className="form schooltext"
						onChange={changeSchool}
					></input>
					<input
						type="submit"
						value="Submit Changes"
						className="form schoolbutton"
					></input>
				</form>
			</div>
			<br />
			<h2 style={{ borderBottom: '1px solid black' }}>Edit buildings</h2>
			{buildings.map((building, index) => {
				return (
					<div key={building.id}>
						<h3>{building.name}</h3>
						<form
							onSubmit={(e) =>
								submitName(e, 'http://localhost:3002/insert/building', {
									id: building.id,
									building: building.name,
									schoolId: id,
									update: true,
								})
							}
						>
							<input
								type="text"
								placeholder="Edit Building Name"
								className="form buildingtext"
								onChange={(e) => {
									changeBuilding(e, index);
								}}
							></input>
							<input
								type="submit"
								value="Submit Changes"
								className="form buildingbutton"
							></input>
						</form>
						<div className="container">
							<input
								type="button"
								value="Edit Rooms"
								className="form buildingbutton"
								onClick={(e) => getPlaces(e, false, building.id)}
							></input>
							<input
								type="button"
								value="Edit Libraries"
								className="form buildingbutton"
								onClick={(e) => getPlaces(e, true, building.id)}
							></input>
						</div>
						<EditPlaces
							places={rooms}
							setPlaces={setrooms}
							buildId={building.id}
							type="Rooms"
							submitName={submitName}
						></EditPlaces>
						<EditPlaces
							places={libraries}
							setPlaces={setlibraries}
							buildId={building.id}
							type="Libraries"
							submitName={submitName}
						></EditPlaces>
						<h6
							style={{
								marginTop: '8px',
								marginBottom: '0px',
								textDecoration: 'underline',
							}}
						>
							Add Room/Library
						</h6>
						<AddPlace
							hide={'form'}
							buildId={Number(building.id)}
							schoolId={Number(id)}
						></AddPlace>
					</div>
				);
			})}
			<br />
			<h2 style={{ borderBottom: '1px solid black' }}>Add buildings</h2>
			<AddBuilding hide={'form'} schoolId={Number(id)}></AddBuilding>
		</div>
	);
}
