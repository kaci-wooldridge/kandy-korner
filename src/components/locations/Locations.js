//display a list of the locations
//display address and square footage

import { useState, useEffect } from 'react'

export const Locations = () => {
	const [locations, setLocations] = useState([]) // returns an array: [stateVariable, setStatefunction] takes one argument: the initial value of the state variable

	// Use Effect watches for state change
	// It takes two arguments, a function and an array
	// The array is which states we want to observe
	// The function is what we want to do when that observed state changes
	useEffect(() => {
		fetch(`http://localhost:8088/locations`)
			.then((res) => res.json())
			.then((locationsArray) => {
				setLocations(locationsArray)
			})
	}, []) // An empty dependency array will watch for the initial render of the component and only run the callback on that  initial run.

	return (
		<div className='locations__container'>
            <h1 className="heading">Locations</h1>

			{locations.map((locationObj) => {
				return (
                    
					<div
						className='location'
						key={locationObj.id}
					>
                        
                        <h2>address:</h2>
						<div className='location-address'>
                            {locationObj.address}
						</div>
                        <h4>square footage:</h4>
						<div className='location-sqft'>
							{locationObj.sqft}sqft
						</div>
                        <br></br>
                        <br></br>
					</div>
				)
			})}
		</div>
	)
}
