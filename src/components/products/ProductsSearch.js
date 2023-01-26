import './products.css'

export const ProductsSearch = ({ setterFunction }) =>{
    return(
        <div>
            <input 
                onChange={(changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }}
                type="text" placeholder="Search" className ="searchbar"/>
        </div>
    )
}