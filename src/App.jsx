import { Routes, Route } from 'react-router-dom'
import Cart from './pages/cart'
import Backend from './pages/backend'
import Home from './pages/Home'
import './assets/scss/all.scss'

export default function App() {
	return (
		<div className="bg-primary-500">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/backend" element={<Backend />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</div>
	)
}
