import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LangContext } from './context/Context.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<LangContext>
			<App />
		</LangContext>
	</BrowserRouter>
)