import { useState } from "react"
import { Link } from "react-router-dom"



function Index(props){
    const [newForm, setNewForm] = useState({
        name: "",
        countryOfOrigin: "",
        image: ""
    })

    const handleChange = (event) => {
        setNewForm({...newForm, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.createCheese(newForm);
        setNewForm({
            name:"",
            countryOfOrigin: "",
            image: ""
        })
    }



    const loaded = () => {
        return props.cheese.map((singlecheese) => (
            <div key={singlecheese._id} className="singlecheese">
                <Link to={`/cheese/${singlecheese._id}`}>
                    <h1>{singlecheese.name}</h1>
                </Link>
                <img src={singlecheese.image} alt={singlecheese.name} />
                <h3>{singlecheese.countryOfOrigin}</h3>
            </div>
        ))
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }


    return (
        <section>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={newForm.countryOfOrigin}
            name="countryOfOrigin"
            placeholder="country of origin"
            onChange={handleChange}
          />
          <input
            type="text"
            value={newForm.image}
            name="image"
            placeholder="image url"
            onChange={handleChange}
          />
          <input type="submit" value="Add Cheese" />
        </form>
        {props.cheese ? loaded() : loading()}
      </section>
    )
}

export default Index