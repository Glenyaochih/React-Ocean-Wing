import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '../style/backend.scss'

const Sidebar = () => {
	return (
		<aside className="aside col-2 web">
			<div className="d-flex flex-column justify-content-between flex-shrink-0 text-white bg-primary-400 h-100 pt-9 px-7 pb-7">
				<div>
					<a href="/" className="d-flex align-items-center mb-12 text-white text-decoration-none">
						<img className="img-fluid" src="/images/Ocean-Wings-logo-lg.svg" alt="Logo" />
					</a>
					<ul className="nav nav-pills flex-column">
						<li>
							<a href="#" className="nav-link text-white fs-6 mb-9">
								顧客管理
							</a>
						</li>
						<li>
							<a href="#" className="nav-link text-white fs-6 mb-9">
								商品管理
							</a>
						</li>
						<li>
							<a href="#" className="nav-link text-white fs-6 mb-9">
								商品上架
							</a>
						</li>
						<li>
							<a href="#" className="nav-link text-white fs-6 mb-9">
								心得牆
							</a>
						</li>
					</ul>
				</div>
				<button className="btn btn-primary-400 border py-3">登出</button>
			</div>
		</aside>
	)
}
const Pagination = ({ page, totalPages, onPageChange }) => {
	const pageRange = () => {
		const range = []
		const maxDisplayPages = 5
		let start = Math.max(1, page - Math.floor(maxDisplayPages / 2))
		let end = Math.min(totalPages, start + maxDisplayPages - 1)

		if (end - start < maxDisplayPages - 1) {
			start = Math.max(1, end - maxDisplayPages + 1)
		}

		for (let i = start; i <= end; i++) {
			range.push(i)
		}
		return range
	}

	return (
		<div>
			{pageRange().map(p => (
				<button key={p} className={`btn ${page === p ? 'btn-primary-300' : 'btn-outline-primary-300'} mx-1`} onClick={() => onPageChange(p)}>
					{p}
				</button>
			))}
		</div>
	)
}

const LimitSelector = ({ limit, onLimitChange }) => {
	return (
		<div className="d-flex align-items-center">
			<label htmlFor="limit" className="me-2" style={{ color: 'white' }}>
				每頁顯示數量：
			</label>
			<select
				id="limit"
				className="form-select w-auto"
				value={limit}
				onChange={onLimitChange}
				style={{
					backgroundColor: 'transparent',
					color: 'white',
					border: '1px solid white',
				}}
			>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
			</select>
		</div>
	)
}

const ProductTable = () => {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(10)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	const API_HOST = import.meta.env.VITE_BACKEND_HOST
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		const fetchProducts = async () => {
			setLoading(true)
			try {
				const res = await axios.get(`${API_HOST}/api/products`, {
					params: { page, limit },
				})
				const data = res.data
				const validProducts = data.data.filter(product => product.id)

				setProducts(validProducts)
				setTotalPages(data.totalPages || 1)
			} catch (error) {
				console.error('Error fetching products:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [page, limit])

	const handleLimitChange = e => {
		setLimit(e.target.value)
		setPage(1)
	}

	return (
		<div className="table-responsive pt-4">
			{loading && <div className="text-center">載入中...</div>}

			<table className="table productManager rounded-table table-hover">
				<thead>
					<tr>
						<th>
							<input type="checkbox" className="form-check-input me-2" />
						</th>
						<th>商品編號</th>
						<th>商品名稱</th>
						<th>類型</th>
						<th>等級</th>
						<th>價格</th>
						<th>數量</th>
						<th>狀態</th>
						<th>折價券</th>
						<th>圖片</th>
						<th>描述</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr key={product.id} className="tableBorder">
							<td>
								<input type="checkbox" className="form-check-input me-2" />
							</td>
							<td>{product.productId}</td>
							<td>{product.name}</td>
							<td>{product.type}</td>
							<td>{product.grade}</td>
							<td>{product.price}</td>
							<td>{product.quantity}</td>
							<td>{product.status ? '啟用' : '停用'}</td>
							<td>{product.hasDiscount ? '是' : '否'}</td>
							<td>
								<img src={product.imageUrl || 'https://fakeimg.pl/88/'} className="img-fluid rounded" alt="product" width="50" height="50" />
							</td>
							<td>{product.description}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="d-flex justify-content-between mt-4">
				<LimitSelector limit={limit} onLimitChange={handleLimitChange} />
				<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
			</div>
		</div>
	)
}

const App = () => {
	return (
		<div className="backend d-flex ">
			<Sidebar />
			<section className="main col-12 col-lg-10 mt-10 bg-primary-500">
				<div className="banner mb-4">
					<h5 className="fs-5 mt-4 mb-7">商品管理</h5>
					<div className="d-flex justify-content-between align-items-center">
						<select className="form-select bg-primary-400 text-white h-100">
							<option>類別</option>
							<option value="商品編號">商品編號</option>
							<option value="商品名稱">商品名稱</option>
						</select>
						<button className="btn btn-primary-500 text-white border deleteButton px-4">
							<i className="bi bi-trash text-white me-1"></i>刪除
						</button>
					</div>
				</div>
				<ProductTable />
			</section>
		</div>
	)
}

export default App
