import React, { useState, useEffect } from 'react';

function createSuccess() {
	return `<div class="alert alert-success" role="alert">New hat successfully added!</div>`;
}

function HatForm() {
	const [locations, setLocations] = useState([]);
	const [formData, setFormData] = useState({
		fabric: '',
		styleName: '',
		color: '',
		pictureURL: '',
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

	const handleFormDataChange = async (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const data = {};
		data.fabric = formData.fabric;
		data.style_name = formData.styleName;
		data.color = formData.color;
		data.picture_url = formData.pictureURL;
		data.location = formData.location;

		const hatsUrl = 'http://localhost:8090/api/hats/';
		const fetchConfig = {
			method: 'post',
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
		fetchData();
	}, []);

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add a new hat</h1>
					<form id="create-hat-form" onSubmit={handleSubmit}>
						<div className="form-floating mb-3">
							<input
								placeholder="Fabric"
								required
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
								placeholder="Style Name"
								required
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
								placeholder="Color"
								required
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
								placeholder="Picture URL"
								required
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
								<option>Select the closet</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.closet_name}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<select
								required
								id="location"
								name="location"
								className="form-select"
								onChange={handleFormDataChange}
							>
								<option>Select the section</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.section_number}
										</option>
									);
								})}
							</select>
						</div>
						<div className="mb-3">
							<select
								required
								id="location"
								name="location"
								className="form-select"
								onChange={handleFormDataChange}
							>
								<option>Select the shelf number</option>
								{locations.map((location) => {
									return (
										<option key={location.id} value={location.id}>
											{location.shelf_number}
										</option>
									);
								})}
							</select>
						</div>
						<div id="submitted"></div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default HatForm;
