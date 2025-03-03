import Navbar from '../components/Navbar'
import OceanFooter from '../components/OceanFooter'
import { MdOutlineAddShoppingCart, MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

function Products() {
	return (
		<>
			<Navbar />

			<div className="container pt-lg-13 pb-lg-16 pt-8 pb-15">
				<section className="mb-7 mb-lg-10">
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a className="" href="#">
									首頁
								</a>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Library
							</li>
						</ol>
					</nav>
				</section>
				<section>
					<div className="row row-cols-1 row-cols-lg-3 gy-7">
						<div className="col">
							<div>
								<a href="">
									<img src="https://images.unsplash.com/photo-1586132945790-6f52459555fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHN1cmZib2FyZHxlbnwwfHwwfHx8Mg%3D%3D" className="card-img-top rounded-5 object-fit-cover" style={{ height: 260 }} alt="..." />
								</a>
								<div className="card-body bg-primary-500 ">
									<div className="d-flex pt-3 pb-4">
										<div>
											<p className="card-title pb-1 h7">商品名稱</p>
											<p>
												<small>#類別</small>
											</p>
										</div>
										<h5 className="ms-auto">$88888</h5>
									</div>
									<a href="#" className="btn btn-outline-light w-100">
										<MdOutlineAddShoppingCart size={28} />
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="mt-12 mt-lg-14">
					<nav className="w-100 " aria-label="Page navigation">
						<ul className="pagination pagination-lg justify-content-center">
							<li className="page-item">
								<a className="page-link" href="#" aria-label="Previous">
									<MdArrowBackIosNew />
								</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#">
									1
								</a>
							</li>
							<li className="page-item">
								<a className="page-link" href="#" aria-label="Next">
									<MdArrowForwardIos />
								</a>
							</li>
						</ul>
					</nav>
				</section>
			</div>

			<OceanFooter />
		</>
	)
}

export default Products
