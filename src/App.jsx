import { Routes, Route } from 'react-router-dom'
import Backend from './pages/backend'
import Home from './pages/Home'
import Products from './pages/Products'
import SurfKnowledge from './pages/SurfKnowledge'


export default function App() {
	return (
		<div className="bg-primary-500">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/backend" element={<Backend />} />
				<Route path='/products'element={<Products/>} />
				<Route path='/surfKnowledge'element={<SurfKnowledge/>} />
			</Routes>
		</div>
	)
}
