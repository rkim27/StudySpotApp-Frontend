import React, { useEffect, useState } from 'react';

export default function School(props) {
	const id = props.match.params.id;
	console.log('Render');
	return <div>{'School Id ' + id}</div>;
}
