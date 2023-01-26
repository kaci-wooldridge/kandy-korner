import { Link } from "react-router-dom"

export const Customer = ({ id, name}) =>{
    return <section className="customer">
        <div>
            <h3><Link to={`/customers/${id}`}>{name}</Link></h3>
        </div>
    </section>
}