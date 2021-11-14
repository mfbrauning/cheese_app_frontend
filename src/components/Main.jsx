import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"


function Main(props){
    const [cheese, setCheese] = useState(null);

    const URL = "https://mfb-cheese-app-backend.herokuapp.com/cheese/";

    const getCheese = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setCheese(data)
    }

    const createCheese = async (singlecheese) => {
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(singlecheese)
        })
        getCheese()
    }


    const updateCheese = async (singlecheese, id) => {
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(singlecheese)
        })
        getCheese()
    }

    const deleteCheese = async (id) => {
        await fetch(URL + id, {
            method: "delete"
        })
        getCheese()
    }



    useEffect(() => getCheese(), []);


    return (
    <div className="main">
        <Routes>
            <Route path="/" element={<Index cheese={cheese} createCheese={createCheese}/>}/>
            <Route path="/cheese/:id" element={<Show cheese={cheese} updateCheese={updateCheese} deleteCheese={deleteCheese}/>}/>
        </Routes>
    </div>
    )
}

export default Main