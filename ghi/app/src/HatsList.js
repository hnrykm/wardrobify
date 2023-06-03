import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function HatsList() {
	const [hatList, setHatList] = useState([]);

	const fetchData = async () => {
		const url = 'http://localhost:8090/api/hats/';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setHatList(data);
		}
	};

	const handleDelete = async (id) => {
		const response = await fetch(`http://localhost:8090/api/hats/${id}/`, {
			method: 'delete',
		});
		if (response.ok) {
			fetchData();
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
						<Link to="new" className="btn btn-primary btn-sm">
							Add a new hat
						</Link>
					</div>
					<br />
					<table className="table table-hover text-center">
						<thead>
							<tr>
								<th>Picture</th>
								<th>Hat Number</th>
								<th>Fabric</th>
								<th>Style</th>
								<th>Color</th>
								<th>Location</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{hatList.hats?.map((hat) => {
								return (
									<tr className="align-middle" key={hat.id} value="">
										<td>
											<img className="hatpic" src={hat.picture_url} />
										</td>
										<td>{hat.id}</td>
										<td>{hat.fabric}</td>
										<td>{hat.style_name}</td>
										<td>{hat.color}</td>
										<td>
											{hat.location.closet_name} - {hat.location.section_number}
											/{hat.location.shelf_number}
										</td>
										<td>
											<div>
												<Link to={'edit/' + hat.id}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-pencil"
														viewBox="0 0 16 16"
													>
														<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
													</svg>
												</Link>&nbsp;&nbsp;
												<Link to="#" onClick={() => handleDelete(hat.id)}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="red"
														className="bi bi-trash"
														viewBox="0 0 16 16"
													>
														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
														<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
													</svg>
												</Link>
											</div>
										</td>
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
