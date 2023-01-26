import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [product, update] = useState({
        name: '',
        price: '',
        typeId: ''
    })

    const [types, setTypes] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8088/types')
          .then((res) => res.json())
          .then((typesData) => {
            setTypes(typesData)
          })
        },
          [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        // TODO: Create the object to be saved to the API
        // "userId": ,
        // "description": "",
        // "emergency": ,
        // "dateCompleted":

        const productToSendToAPI = {
            name: product.name,
            price: product.price,
            typeId: product.typeId
        }

        // TODO: Perform the fetch() to POST the object to the API

        return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json())
            .then(() =>{
                navigate("/products")
            })
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Kandy Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="product name"
                        value={product.name}
                        onChange={
                            (event) =>{
                                const copy = {...product}
                                copy.name = capitalize(event.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Price:</label>
                    <input 
                        required
                        type="number"
                        className="form-control"
                        placeholder="product price"
                        value={product.price}
                        onChange={
                            (event) =>{
                                const copy = {...product}
                                copy.price = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    {types.map((typesObj) => {
                        return(
                        <label htmlFor="type">
                        <input 
                            type="radio"
                            value={typesObj.id}
                            checked={product.typeId === typesObj.id}
                            onChange={
                                (event) =>{
                                    const copy = {...product}
                                    copy.typeId = parseInt(event.target.value)
                                    update(copy)
                                }
                            } />
                            {typesObj.name}
                        </label>
                        )
                    })}

                </div>
            </fieldset>
            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Submit Product
            </button>
        </form>
    )
}