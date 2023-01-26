import { EmployeeNavbar } from './EmployeeNav'
import { NavBar } from './NavBar'

export const NavbarView = () => {
	const localKandyUser = localStorage.getItem('kandy_user')
	const kandyUserObject = JSON.parse(localKandyUser)

	if (kandyUserObject.staff) {
		return <EmployeeNavbar />
	} else {
		return <NavBar />
	}
}
