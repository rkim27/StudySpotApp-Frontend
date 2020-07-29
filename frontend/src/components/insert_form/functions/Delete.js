import axios from 'axios';

/*function for delete requests 
	Address is the endoint to backend, included in endpoint is the id to delete
*/
export default function Delete(id, table) {
	axios
		.delete(`http://localhost:3002/insert/delete/${id}`, {
			data: { tab: table },
		})
		.catch((err) => {
			console.log(err);
		});
}
