import { MdOutlineSearch, MdOutlineShoppingCart } from 'react-icons/md'
export default function Navbar() {
	return (
		<>
			<div className="bg-primary-300 d-flex flex-column " style={{ height: 78 }}>
				<div className="mt-2">
					<h5 className="text-center text-dark">
						<span className="text-accent-200">*夏季熱血促銷*</span>滿千免運，現在買板送腳繩 <span className="text-accent-200">*購買兩萬以上的衝浪板，鰭 (FINs) 打八折*</span>
					</h5>
				</div>
				<div className="mt-auto">
					<picture>
						<source media="(max-width: 992px)" srcSet="/public/images/header/wave-decoration-sm.png" />
						<img src="/public/images/header/wave-decoration.png" width="100%" alt="article-banner" />
					</picture>
				</div>
			</div>
			<nav className="navbar navbar-expand-lg ">
				<div className="container-fluid px-lg-14 py-lg-12">
					<a className="navbar-brand" href="#">
						<picture>
							<source media="(max-width: 992px)" srcSet="../public/images/Ocean-Wings-logo-sm.svg" />
							<img src="../public/images/Ocean-Wings-logo-lg.svg" width="100%" alt="article-banner" />
						</picture>
					</a>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
							<li className="nav-item me-10">
								<a className="nav-link active text-white" aria-current="page" href="#">
									<MdOutlineSearch size={32} />
								</a>
							</li>
							<li className="nav-item me-10">
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
									<MdOutlineShoppingCart size={32} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<section className="product-change d-none d-lg-block">
				<ul className="d-flex justify-content-center align-items-center h-100">
					<li>
						<a className="h4 btn btn-lg" href="">
							長板
						</a>
					</li>
					<li>
						<a className="h4 btn btn-lg" href="">
							短板
						</a>
					</li>
					<li>
						<a className="h4 btn btn-lg" href="">
							配件
						</a>
					</li>
				</ul>
			</section>
		</>
	)
}
