import { useEffect, useState } from "react"

export const EmployeeList = () =>{
    const [employees, setEmployees] = useState([""])

    useEffect(() => {
        fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
          .then((res) => res.json())
          .then((data) => {
            setEmployees(data)
          })
        },
          [])

    return <div className="employeeList">
        <h1>Our Staff:</h1>
        {
            employees.map(employee => 
            <div key={`${employee.id}`} className="employee">
            <h3>{employee?.user?.name}</h3>
            <div>Location:{employee?.location?.address}</div>
            <br></br>
            </div>)
        }
    </div>
}