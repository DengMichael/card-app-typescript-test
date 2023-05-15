import { NavLink } from 'react-router-dom'
import DarkModeButton from './DarkModeButton'

export default function NavBar() {
  return (
    <nav className="flex justify-center gap-5">
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white
      dark:text-black" to={'/'}>All Entries</NavLink>
      <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white
      dark:text-black" to={'/create'}>New Entry</NavLink>
      <DarkModeButton inheritedClassNames="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white dark:text-black" />
    </nav >
  )
}