import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
	const underline = (e) => {
		e.target.style.textDecoration = 'underline';
	};
	const noUnderline = (e) => {
		e.target.style.textDecoration = 'none';
	};
	return (
		<header style={headerStyle}>
			<h1>StudySpotApp</h1>
			<Link
				to="/"
				style={linkStyle}
				onMouseOver={underline}
				onMouseOut={noUnderline}
			>
				Home
			</Link>{' '}
			|{' '}
			<Link
				to="/insert"
				style={linkStyle}
				onMouseOver={underline}
				onMouseOut={noUnderline}
			>
				Add School
			</Link>
		</header>
	);
}

const headerStyle = {
	background: '#333',
	color: '#fff',
	textAlign: 'center',
	padding: '10px',
};

const linkStyle = {
	color: '#fff',
	textDecoration: 'none',
};
