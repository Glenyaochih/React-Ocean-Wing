import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import OceanFooter from '../components/OceanFooter'
import { MdOutlineAddShoppingCart, MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import axios from 'axios'

function Products() {
	const API_HOST = import.meta.env.VITE_BACKEND_HOST
	const [products, setProducts] = useState([])
	const [productSearch, setProductSearch] = useState('')
	

	
	const getProduct = async () => {
		try {
			const res = await axios.get(`${API_HOST}/api/products`)
			setProducts(res.data.data)
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}
	
	useEffect(() => {
		getProduct()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const filterGrade = useMemo(()=>{
		const filter = [...products].filter((product)=>product.grade.match(productSearch))
		return filter
	},[productSearch, products])



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
					<button type="button" className="btn btn-primary-300" value={'A'} onClick={(e) => setProductSearch(e.target.value)}>
						長板
					</button>
					<button type="button" className="btn btn-primary-300" value={'B'} onClick={(e) => setProductSearch(e.target.value)}>
						短板
					</button>
					<button type="button" className="btn btn-primary-300" value={''} onClick={(e) => setProductSearch(e.target.value)}>
						全部商品
					</button>
				</section>
				<section>
					<div className="row row-cols-1 row-cols-lg-3 gy-7">
						{filterGrade.map(product => {
							return (
								<div className="col" key={product.productId}>
									<div>
										<a href="">
											<img src="/public/images/surfTest.png" className="card-img-top rounded-5 object-fit-cover" style={{ height: 260 }} alt="..." />
										</a>
										<div className="card-body bg-primary-500 ">
											<div className="d-flex pt-3 pb-4">
												<div>
													<p className="card-title pb-1 h7">{product.name}</p>
													<p>
														<small>#{product.type}</small>
													</p>
												</div>
												<h5 className="ms-auto">${product.price}</h5>
											</div>
											<a href="#" className="btn btn-outline-light w-100">
												<MdOutlineAddShoppingCart size={28} />
											</a>
										</div>
									</div>
								</div>
							)
						})}
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
