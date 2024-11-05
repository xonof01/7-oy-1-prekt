import { useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CustomRoutes from './routes'
import LoginRoutes from './routes/LoginRoutes'
import { Context } from './context/Context'
function App() {
	const {token} = useContext(Context)
	if (!token) {
		return <LoginRoutes />
	} else {
		return (
			<div>
				<Header />
				<div className="flex">
					<Sidebar />
					<div className="w-[78%] h-[88.8vh]">
						<CustomRoutes />
					</div>
				</div>
			</div>
		)
	}
}

export default App