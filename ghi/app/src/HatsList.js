import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
        <div className="row">
			<div className="offset-1 col-10">
				<div className="shadow p-3 m-4">
					<div className="row gap-5 m-3">
						<Link to="new" className="btn btn-primary btn-sm px-4 gap-1 col">
							Add a new hat
						</Link>
						<Link to="new" className="btn btn-primary btn-sm px-4 gap-1 col">
							Edit an existing hat
						</Link>
						<Link to="new" className="btn btn-primary btn-sm px-4 gap-1 col">
							Delete a hat
						</Link>
					</div>
					<br/>
		<table className="table table-hover text-center">
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
                            <td>{hat.location.closet_name} - {hat.location.section_number}/{hat.location.shelf_number}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
        </div>
        </div>
        </div>
	);
}

export default HatsList;