import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import AddBuilding from './AddBuilding';
import AddPlace from './AddPlace';

export default function EditSchool(props) {
	const id = props.match.params.id;
	const [rooms, setrooms] = useState([]);
	const [schoolName, setschoolName] = useState('');
	const [libraries, setlibraries] = useState([]);
	const [buildings, setbuildings] = useState([]);

	useEffect(() => {
		//onload get school info once
		axios
			.all([
				axios.get(`http://localhost:3002/search/${id}`),
				axios.get(`http://localhost:3002/search/rooms/${id}`),
				axios.get(`http://localhost:3002/search/libraries/${id}`),
				axios.get(`http://localhost:3002/search/buildings/${id}`),
			])
			.then((res) => {
				setrooms(res[1].data);
				setschoolName(res[0].data);
				setlibraries(res[2].data);
				setbuildings(res[3].data);
			});
	}, [id]);

	const changeSchool = (e) => {
		setschoolName(e.target.value);
	};
	const changeBuilding = (e, index) => {
		const value = e.target.value;
		const newbuild = buildings.slice();
		newbuild[index] = { ...newbuild[index], name: value };
		setbuildings(newbuild);
	};
	return (
		<div className="container">
			<h2 style={{ borderBottom: '1px solid black' }}>Edit School Name</h2>
			<div>
				<h3>{schoolName}</h3>
				<form>
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
						<form>
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
