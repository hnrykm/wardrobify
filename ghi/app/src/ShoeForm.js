import React, {useState, useEffect } from "react";

function NewShoeForm(props) {


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};
        data.picture_url = pictureUrl;
        data.model_name = modelName;
        data.manufacturer = manufacturer;
        data.color = color;
        data.bin = bin;

        console.log(data)

        const shoesUrl = "http://localhost:8080/api/shoes/";
        const fetchConfig = {
            method:"post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch (shoesUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            console.log(newShoe);
            setPictureUrl('');
            setModelName('');
            setManufacturer('');
            setColor('');
            setBin('')
        };
    }

    const[pictureUrl,setPictureUrl] = useState('');
    const handlePictureChange = (event) => {
        const value = event.target.value
        setPictureUrl(value);
    }

    const[modelName,setModelName] = useState('');
    const handleModelNameChange = (event) => {
        const value = event.target.value
        setModelName(value);
    }

    const[manufacturer,setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value);
    }

    const[color,setColor] = useState('');
    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value);
    }

    const[bin,setBin] = useState('');
    const handleBinChange = (event) => {
        const value = event.target.value
        setBin(value);
    }

    const[bins, setBins] = useState([]);
    const fetchData = async () => {
        const binUrl = "http://localhost:8100/api/bins/"
        const response = await fetch(binUrl)

        if (response.ok) {
            const data = await response.json()
            setBins(data.bins)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new shoe</h1>
            <form onSubmit={handleSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">
                <input
                onChange={handleModelNameChange}
                value={modelName}
                placeholder="Model Name"
                type="text"
                required
                name="model_name"
                id="model_name"
                className="form-control"
                />
                <label htmlFor="model_name">Model Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={handleManufacturerChange}
                placeholder="Manufacturer"
                value={manufacturer}
                type="text"
                required
                name="manufacturer"
                id="manufacturer"
                className="form-control"
                />
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="mb-3">
                <input
                onChange={handleColorChange}
                placeholder="Color"
                value={color}
                type="text"
                required
                id="color"
                name="color"
                className="form-control"
                />
              </div>
             <div className="mb-3">
                <select
                onChange={handleBinChange}
                required
                id="bin"
                name="bin"
                className="form-select">
                  <option value="">Choose a Bin</option>
                  {bins.map(bin => {
                        return (
                        <option key={bin.id} value={bin.id}>
                            {bin.closet_name} - Number:{bin.bin_number} / Size:{bin.bin_size}
                        </option>
                        );
                    })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                onChange={handlePictureChange}
                value={pictureUrl}
                placeholder="Picture URL"
                required
                type="url"
                name="picture_url"
                id="picture_url"
                className="form-control"
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>

             <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

    )
}

export default NewShoeForm
