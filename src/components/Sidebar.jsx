import React from 'react'
import '../style/backend.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
	return (
		<aside className="layout-sidebar d-none d-lg-block">
			<div className="d-flex flex-column justify-content-between flex-shrink-0 text-white bg-primary-400 h-100 pt-9 px-7 pb-7">
				<div>
					<a href="/" className="d-flex align-items-center mb-12 text-white text-decoration-none">
						<img className="img-fluid" src="/images/Ocean-Wings-logo-lg.svg" alt="Logo" />
					</a>
					<ul className="nav nav-pills flex-column">
						<li>
							<Link to="/backend" className="nav-link text-white fs-6 mb-9">
								顧客管理
							</Link>
						</li>
						<li>
							<Link to="/backend" className="nav-link text-white fs-6 mb-9">
								商品管理
							</Link>
						</li>
						<li>
							<Link to="/backend" className="nav-link text-white fs-6 mb-9">
								商品上架
							</Link>
						</li>
						<li>
							<Link to="/backend" className="nav-link text-white fs-6 mb-9">
								心得牆
							</Link>
						</li>
					</ul>
				</div>
				<button className="btn btn-primary-400 border py-3">登出</button>
			</div>
		</aside>
	)
}

export default Sidebar
