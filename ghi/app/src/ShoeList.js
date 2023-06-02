import React, {useState, useEffect} from "react"
import "./index.css"


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

    useEffect(() => {
        fetchData()
    }, [])



return(
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Picture</th>
                <th>Model Name</th>
                <th>Manufacturer</th>
                <th>Color</th>
                <th>Bin</th>
            </tr>
        </thead>
        <tbody>
            {shoeList.shoes?.map(shoe => {
                return(
                    <tr key={shoe.id} value="">
                        <td><img className="shoepic" src={shoe.picture_url} alt=""/></td>
                        <td>{shoe.model_name}</td>
                        <td>{shoe.manufacturer}</td>
                        <td>{shoe.color}</td>
                        <td>{shoe.bin.id}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
    );
}

export default ShoeList;
