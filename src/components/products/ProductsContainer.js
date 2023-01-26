import { useState } from "react"
import { Products } from "./Products"
import { ProductsSearch } from "./ProductsSearch"



export const ProductsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
        <h1 className="heading">Our Products</h1>

        <ProductsSearch setterFunction={setSearchTerms} />

        <Products searchTermState={searchTerms} />
    </>
}