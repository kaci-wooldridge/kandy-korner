import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './products.css'


export const Products = ({ searchTermState }) => {
	const [products, setProducts] = useState([])
    // const [highCostProducts, setHighCostProducts] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [lowToHigh, setLowToHigh] = useState([])
    const [sortLowToHigh, setSortLowToHigh] = useState(false)


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const navigate = useNavigate()

	useEffect(() => {
		fetch(`http://localhost:8088/products?_sort=name&_order=asc&_expand=type`)
			.then((res) => res.json())
			.then((productsArray) => {
				setProducts(productsArray)
                setFilteredProducts(productsArray)
			})
	}, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

    useEffect(() => {
        fetch(`http://localhost:8088/products?_sort=price&_order=asc&_expand=type`)
        .then((res) => res.json())
        .then((lowToHighArray) => {
            setLowToHigh(lowToHighArray)
        })
    }, [])

    useEffect(() => {
        if(sortLowToHigh){
            setFilteredProducts(lowToHigh)
        }
        else{
            setFilteredProducts(products)
        }
    },
    [sortLowToHigh])

    useEffect(
        () => {
            const searchedProducts = products.filter(p => 
                p.name.toLowerCase().includes(searchTermState.toLowerCase()))
            setFilteredProducts(searchedProducts)
        },
        [searchTermState]
    )

    // useEffect(() => {
    //     if(highCostProducts){
    //         const expensiveProducts = products.filter(product => product.price > 2)
    //         setFilteredProducts(expensiveProducts)
    //     } 
    //     else{
    //         setFilteredProducts(products)
    //     }
    // }, 
    // [highCostProducts]
    // )



	return (<>
		<div className='products__container'>
            <div className='buttons__container'>

                <button className="button" onClick={() => setSortLowToHigh(!sortLowToHigh)}>sort: price low-high</button>

                {
                    kandyUserObject.staff
                    ?
                    <button className="button" onClick={() => navigate("/products/create")}>create product</button>
                    :
                    ""
                }
            </div>
			{filteredProducts.map((productObj) => {
				return (  
					<div
						className='product'
						key={`${productObj.id}`}
					>
						<div className='product-name'>
                            {productObj.name}
						</div>
                        <div className='product-price'>
                            ${productObj.price}
						</div>
                        <div className='product-type'>
                            {productObj.type.name}
                        </div>
                        <br></br>
                        <br></br>
					</div>
				)
			})}
		</div>
    </>
	)
}







