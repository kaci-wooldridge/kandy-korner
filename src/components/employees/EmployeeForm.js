import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const[user, updateUser] = useState({
        name: '',
        email: '',
        isStaff: ''
    })

    const [employee, updateEmployee] = useState({
        userId: '',
        locationId: '',
        startDate: '',
        payRate: '',
    })

    const [locations, setLocations] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()


    useEffect(() => {
    fetch(`http://localhost:8088/locations`)
        .then((res) => res.json())
        .then((data) => {
        setLocations(data)
        })
    },
    [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

        const formToSendToUserAPI = {
            name: user.name,
            email: user.email,
            isStaff: true
        }

        const formToSendToEmployeeAPI = {
            userId:"",
            locationId: employee.locationId,
            startDate: employee.startDate,
            payRate: employee.payRate
        }

        // TODO: Perform the fetch() to POST the object to the API

        return fetch('http://localhost:8088/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formToSendToUserAPI)
        })
            .then(res => res.json())
            .then((data) =>{
                const newId = data.id
                formToSendToEmployeeAPI.userId = newId
            })
            .then(() =>{
                fetch('http://localhost:8088/employees', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formToSendToEmployeeAPI)
                })
            })
            .then(() =>{
                navigate("/employeeList")
            })
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">Application</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="full name"
                        value={user.name}
                        onChange={
                            (event) =>{
                                const copy = {...user}
                                copy.name = capitalize(event.target.value)
                                updateUser(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Email: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="email"
                        value={user.email}
                        onChange={
                            (event) =>{
                                const copy = {...user}
                                copy.email = (event.target.value)
                                updateUser(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <fieldset>
            <div className="form-group">
                <div>Location: </div>
                {locations.map((locationObj) => {
                    return (
                    <div key={locationObj.id} className="radio">
                        <label>
                        <input
                            type="radio"
                            value={locationObj.id}
                            checked={employee.locationId === locationObj.id}
                            onChange={(event) => {
                            const copy = { ...employee }
                            copy.locationId = parseInt(event.target.value)
                            updateEmployee(copy)
                            }}
                        />
                        {locationObj.address}
                        </label>
                    </div>
                    )
                })}
            </div>
            </fieldset>

            <fieldset>
            <div className="form-group">
                <label htmlFor="startDate">Start Date: </label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="month/day"
                        value={employee.startDate}
                        onChange={
                            (event) =>{
                                const copy = {...employee}
                                copy.startDate = (event.target.value)
                                updateEmployee(copy)
                            }
                        } 
                    />
            </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Desired Pay Rate: </label>
                    <input
                        required
                        type="number"
                        className="form-control"
                        placeholder="per hour"
                        value={employee.payRate}
                        onChange={
                            (event) =>{
                                const copy = {...employee}
                                copy.payRate = (event.target.value)
                                updateEmployee(copy)
                            }
                        }
                    />
                </div>
            </fieldset>

            <button onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}