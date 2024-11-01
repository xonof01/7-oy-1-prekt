import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CustomRoutes from './routes'
function App() {
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

export default App