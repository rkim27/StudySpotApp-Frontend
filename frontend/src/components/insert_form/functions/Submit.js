import axios from 'axios';

/*function for post requests 
	Address is the endoint to backend
	value is json submitted, one value must be update:boolean to indicate if updating
	setId is function to set id state
*/
export default function Submit(address, value, setId) {
	axios
		.post(address, value, {
			headers: { 'content-Type': 'application/json' },
		})
		.then((res) => {
			if (setId !== null) {
				setId(res.data.id); //response is the id of record submitted, set that to current id value
			}
		});
}
