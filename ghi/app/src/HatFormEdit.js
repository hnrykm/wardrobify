import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function createSuccess() {
	return `<div class="alert alert-success" role="alert">New hat successfully added!</div>`;
}

function HatFormEdit() {
    const hat_id = useParams();
	const [locations, setLocations] = useState([]);
    const [hatData, setHatData] = useState({
        location: {
            closet_name: '',
            section_name: '',
            shelf_name: '',
        }
    });
	const [formData, setFormData] = useState({
        fabric: '',
        styleName: '',
        color: '',
        pictureUrl: '',
        location: '',
    });

	const fetchData = async () => {
		const url = 'http://localhost:8100/api/locations/';
		const response = await fetch(url);

		if (response.ok) {
			const data = await response.json();
			setLocations(data.locations);
		}
	};

    const fetchHatData = async () => {
        const url = `http://localhost:8090/api/hats/${hat_id.id}`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setHatData(data)
        }
    }

	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleUpdate = async (event) => {
		event.preventDefault();

		const data = {};
        if (formData.fabric == "") {
            data.fabric = formData.fabric;
        }
		if (formData.styleName == "") {
            data.style_name = formData.styleName;
        }
		if (formData.color == "") {
            data.color = formData.color;
        }
		if (formData.pictureUrl == "") {
            data.picture_url = formData.pictureURL;
        }
		if (formData.location == "") {
            data.location = formData.location;
        }
        console.log(data)

		const hatsUrl = `http://localhost:8090/api/hats/${hat_id.id}`;
		const fetchConfig = {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(hatsUrl, fetchConfig);
		if (response.ok) {
			const success = document.getElementById('submitted');
			success.innerHTML = createSuccess();
			setFormData({
				fabric: '',
				styleName: '',
				color: '',
				pictureURL: '',
				location: '',
			});
		}
	};

	useEffect(() => {
        fetchHatData();
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<center><img className="hatpic" src={hatData.picture_url}></img>
                    <h1>Edit Hat #{hat_id.id}</h1></center>
					<form id="create-hat-form" onSubmit={handleUpdate}>
						<div className="form-floating mb-3">
                            <input
                                required
								placeholder={hatData.fabric}
								type="text"
								name="fabric"
								id="fabric"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.fabric}
							/>
							<label htmlFor="name">Fabric</label>
						</div>
						<div className="form-floating mb-3">
							<input
                                required
								placeholder="Style Name"
								type="text"
								name="styleName"
								id="styleName"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.styleName}
							/>
							<label htmlFor="name">Style Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
                                required
								placeholder="Color"
								type="text"
								name="color"
								id="color"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.color}
							/>
							<label htmlFor="name">Color</label>
						</div>
						<div className="form-floating mb-3">
							<input
                                required
								placeholder="Picture URL"
								type="url"
								name="pictureURL"
								id="pictureURL"
								className="form-control"
								onChange={handleFormDataChange}
								value={formData.pictureURL}
							/>
							<label htmlFor="name">Picture URL</label>
						</div>
						<div className="mb-3">
							<select
                                required
								id="location"
								name="location"
								className="form-select"
								onChange={handleFormDataChange}
							>
								<option>Select a location</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.closet_name} - {location.section_number}/{location.shelf_number}
										</option>
									);
								})}
							</select>
						</div>

						<div id="submitted"></div>
						<button className="btn btn-primary">Update</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default HatFormEdit;
