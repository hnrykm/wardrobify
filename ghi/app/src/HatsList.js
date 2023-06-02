import React, { useState, useEffect } from 'react'
import './index.css';

function HatsList() {
    const [hatList, setHatList] = useState([])

    const fetchData = async () => {
		const url = 'http://localhost:8090/api/hats/';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setHatList(data);
		}
	};

    useEffect(() => {
		fetchData();
	}, []);
    
    return (
		<table className="table table-striped table-hover">
			<thead>
				<tr>
                    <th>Picture</th>
                    <th>Hat Number</th>
					<th>Fabric</th>
                    <th>Style</th>
                    <th>Color</th>
                    <th>Location</th>  
				</tr>
			</thead>
			<tbody>
				{hatList.hats?.map((hat) => {
					return (
						<tr key={hat.id} value="" >
							<td><img className="hatpic" src={hat.picture_url} /></td>
							<td>{hat.id}</td>
                            <td>{hat.fabric}</td>
                            <td>{hat.style_name}</td>
                            <td>{hat.color}</td>
                            <td>{hat.location.id}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default HatsList;