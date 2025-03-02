import OceanFooter from '../components/OceanFooter'
import { BsCart3, BsSearch } from 'react-icons/bs'

function Products() {
	return (
		<>
			<nav className="navbar navbar-expand-lg ">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						<img src="/public/images/Ocean-Wings-logo-lg.svg" alt="" />
					</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
							<li className="nav-item">
								<a className="nav-link active text-white" aria-current="page" href="#">
									<BsSearch size={32} />
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link active text-white" aria-current="page" href="#">
									<div className="d-flex align-items-center">
										<div
											className="rounded-circle p-2 bg-white d-flex justify-content-center align-items-center me-3"
											style={{
												width: 40,
												height: 40,
											}}
										>
											<h4 className="text-dark">A</h4>
										</div>
										<h5>Alice</h5>
									</div>
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link active text-white" aria-current="page" href="#">
									<BsCart3 size={32} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<OceanFooter />
		</>
	)
}

export default Products
