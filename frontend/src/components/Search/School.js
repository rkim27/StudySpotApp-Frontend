import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

export default function School(props) {
	const id = props.match.params.sid;
	const [rooms, setrooms] = useState([]);
	const [libraries, setlibraries] = useState([]);
	const [buildings, setbuildings] = useState([]);
	const [fLibraries, setfLibraries] = useState([]);
	const [fRooms, setfRooms] = useState([]);
	useEffect(() => {
		//onload get school info once
		axios
			.all([
				axios.get(`http://localhost:3002/school/rooms/${id}`),
				axios.get(`http://localhost:3002/school/libraries/${id}`),
				axios.get(`http://localhost:3002/school/buildings/${id}`),
			])
			.then((res) => {
				setrooms(res[0].data);
				setlibraries(res[1].data);
				setfRooms(res[0].data);
				setfLibraries(res[1].data);
				setbuildings(res[2].data);
			})
			.catch((err) => {
				if (err.response.status === 500) {
					alert('500 Error Please Reload');
				}
			});
	}, [id]);
	const filter = (e) => {
		//filter rooms and buildings based on building id, if no id then show all
		const id = Number(e.target.getAttribute('buildid'));
		if (isNaN(id)) {
			setfLibraries(libraries);
			setfRooms(rooms);
		} else {
			setfLibraries(
				libraries.filter((library) => {
					return library.buildId === id;
				})
			);
			setfRooms(
				rooms.filter((room) => {
					return room.buildId === id;
				})
			);
		}
	};
	const hover = (e) => {
		e.target.style.color = '#CEB888';
	};
	const noHover = (e) => {
		e.target.style.color = 'black';
	};
	//display rooms and libraries, have a drop down menu to filter based on buildings
	return (
		<div className="container">
			<Link
				to={`/edit/${id}`}
				type="button"
				style={{
					color: 'black',
					fontSize: '14px',
					textDecoration: 'underline',
				}}
				onMouseOver={hover}
				onMouseOut={noHover}
			>
				Edit School
			</Link>
			<br />

			<DropdownButton
				title="Filter By Building"
				variant="secondary"
				id="myDropdown"
				style={{ display: 'inline-block' }}
			>
				{buildings.map((building) => {
					return (
						<Dropdown.Item
							id="dropDownItem"
							key={building.id}
							onClick={filter}
							buildid={building.id}
						>
							{building.name}
						</Dropdown.Item>
					);
				})}
				<Dropdown.Item id="dropDownItem" onClick={filter} buildid="None">
					None
				</Dropdown.Item>
			</DropdownButton>

			<div className="row">
				<div className="column">
					<h2 style={{ textDecoration: 'underline' }}>Rooms</h2>
					{fRooms.map((room) => {
						return (
							<div key={room.id}>
								<Link
									to={`/school/${id}/room/${room.id}`}
									onMouseOver={hover}
									onMouseOut={noHover}
									style={{ color: 'black', textDecoration: 'none' }}
								>
									{room.name}
								</Link>
							</div>
						);
					})}
				</div>
				<div className="column">
					<h2 style={{ textDecoration: 'underline' }}>Libraries</h2>
					{fLibraries.map((library) => {
						return (
							<div key={library.id}>
								<Link
									to={`/school/${id}/library/${library.id}`}
									onMouseOver={hover}
									onMouseOut={noHover}
									style={{ color: 'black', textDecoration: 'none' }}
								>
									{library.name}
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
