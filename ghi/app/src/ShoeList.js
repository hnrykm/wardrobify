import React, {useState, useEffect} from "react";
import "./index.css";
import {Link} from "react-router-dom";


function ShoeList(){
    const [shoeList, setShoeList] = useState([])
    const fetchData = async () => {
        const url = "http://localhost:8080/api/shoes/"
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setShoeList(data)
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch (`http://localhost:8080/api/shoes/${id}`,{
            method: 'delete',
        });

        if(response.ok) {
            fetchData()
        }
    };

    useEffect(() => {
        fetchData()
    }, [])



return(
    <div className="row">
        <div>
            <div>
                <div>
                    <Link to="new" className="btn btn_primary btn-sm">
                        <button type="button" className="btn btn-dark">Add a new shoe</button>
                    </Link>
                </div>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Picture</th>
                <th>Model Name</th>
                <th>Manufacturer</th>
                <th>Color</th>
                <th>Bin - Number/Size</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {shoeList.shoes?.map((shoe) => {
                return(
                    <tr key={shoe.id} value="">
                        <td><img className="shoepic" src={shoe.picture_url} alt=""/></td>
                        <td>{shoe.model_name}</td>
                        <td>{shoe.manufacturer}</td>
                        <td>{shoe.color}</td>
                        <td>{shoe.bin.closet_name} - {shoe.bin.bin_number}/{shoe.bin.bin_size}</td>

                        <td>
                            <div>
                                <Link to="#" onClick={() => handleDelete(shoe.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5
                                        0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                </svg>
                                </Link>
                            </div>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    </div>
    </div>
    </div>

    );
}

export default ShoeList;
