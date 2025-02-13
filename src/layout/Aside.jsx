import React from 'react'
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Sidebar />
			<main className="layout-main">{children}</main>
		</div>
	)
}
export default Layout
