import { Route, Routes, Outlet } from 'react-router-dom'
import { Authorized } from './views/Authorized'
import { Login } from './auth/Login'
import { Register } from './auth/Register'
import { Locations } from './locations/Locations'
import './KandyKorner.css'
import { ProductForm } from './products/ProductsForm'
import { ProductsContainer } from './products/ProductsContainer'
import { EmployeeForm } from './employees/EmployeeForm'
import { EmployeeList } from './employees/EmployeeList'
import { NavBar } from './nav/NavBar'
import { NavbarView } from './nav/NavbarView'
import { CustomerList } from './customers/CustomerList'
import { CustomerDetails } from './customers/CustomerDetails'


export const KandyKorner = () => {



	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />

			<Route
				path='/'
				element={
					<Authorized>
						<>
							<NavbarView />
							<Outlet />
						</>
					</Authorized>
				}
			>
				<Route
					path='/'
					element={
						<>
							<h1>Kandy Korner</h1>
							<div>"Eat more Kandy"</div>
							<Outlet />
						</>
					}

				>

				</Route>
				<Route path='locations' element={<Locations />} />
				<Route path='products' element={<ProductsContainer />} />
				<Route path='products/create' element={<ProductForm/>} />
				<Route path='employeeForm' element={<EmployeeForm />} />
				<Route path='employeeList' element={<EmployeeList/>} />
				<Route path='customers' element={<CustomerList/>} />
				<Route path="customers/:customerId" element={ <CustomerDetails />} />
			</Route>
		</Routes>
	)
}
