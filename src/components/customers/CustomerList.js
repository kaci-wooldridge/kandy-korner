import { useEffect, useState } from "react"
import { Customer } from "./Customer"

export const CustomerList = () =>{
    const [customers, setCustomers] = useState([""])

    useEffect(() =>{
        fetch('http://localhost:8088/customers?_expand=user')
            .then(res => res.json())
            .then ((customerArray) =>{
                setCustomers(customerArray)
            })
    },
    []
    )

    return <article className="customers">
        <h1>Our Customers</h1>
        {
            customers.map(customer => <Customer key={`customer--${customer.id}`} 
            id={customer.id} 
            name={customer?.user?.name} 
            loyaltyNumber={customer.loyaltyNumber}
            email={customer?.user?.email} />)
        }
    </article>
}