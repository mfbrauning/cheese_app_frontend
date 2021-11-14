import { useEffect, useState } from "react"
import {useParams, useNavigate } from "react-router-dom"


function Show(props){
    const params = useParams()
    const navigate = useNavigate()
    const id = params.id
    const cheese = props.cheese 
    const [editForm, setEditForm] = useState({})
    useEffect(() => {
        if(props.cheese){
            const singlecheese = cheese.find((c) => c._id === id)
            setEditForm(singlecheese)
        }
    }, [props.cheese])
 
    if (props.cheese){
        const singlecheese = cheese.find((c) => c._id === id) 
        console.log(singlecheese)

        const handleChange = (event) => {
            const newState = {...editForm}
            newState[event.target.name] = event.target.value 
            setEditForm(newState)
        }

        const handleSubmit = (event) => {
            event.preventDefault()
            props.updateCheese(editForm, singlecheese._id)
            navigate("/")
        }

        const removeCheese = () => {
            props.deleteCheese(singlecheese._id)
            navigate("/")
        }

        const form = (
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={editForm.name}
                name="name"
                placeholder="name"
                onChange={handleChange}
                />
                <input
                type="text"
                value={editForm.countryOfOrigin}
                name="countryOfOrigin"
                placeholder="country of origin"
                onChange={handleChange}
                />
                <input
                type="text"
                value={editForm.image}
                name="image"
                placeholder="image url"
                onChange={handleChange}
                />
                <input type="submit" value="update cheese"/>
            </form>
        )

        return <div className="singlecheese">
        <h1>{singlecheese.name}</h1>
        <h2>{singlecheese.countryOfOrigin}</h2>
        <img src={singlecheese.image} alt={singlecheese.name}/>
        {form}
        <button onClick={removeCheese}>Delete Cheese</button>
    </div>
    } else {
    return <h1>no cheese</h1>
    }
  
}

export default Show