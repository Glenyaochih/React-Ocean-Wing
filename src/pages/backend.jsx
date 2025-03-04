import React, { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import Layout from '../layout/Aside'
import '../style/backend.css'
import { Link } from 'react-router-dom'
import logo from '/images/backendIcon.png'

const Pagination = ({ page, totalPages, onPageChange }) => {
	const pageRange = () => {
		const range = []
		const maxDisplayPages = 3
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
		<div className="pagination-container mt-10 mt-md-0">
			{/* Previous and First buttons */}
			<button className="btn btn-outline-primary-300 mx-1" onClick={() => onPageChange(1)} disabled={page === 1}>
				|&lt;
			</button>
			<button className="btn btn-outline-primary-300 mx-1" onClick={() => onPageChange(page - 1)} disabled={page === 1}>
				&lt;
			</button>

			{/* Page numbers */}
			{pageRange().map(p => (
				<button key={p} className={`btn ${page === p ? 'btn-primary-300' : 'btn-outline-primary-300'} mx-1`} onClick={() => onPageChange(p)}>
					{p}
				</button>
			))}

			{/* Next and Last buttons */}
			<button className="btn btn-outline-primary-300 mx-1" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
				&gt;
			</button>
			<button className="btn btn-outline-primary-300 mx-1" onClick={() => onPageChange(totalPages)} disabled={page === totalPages}>
				&gt;|
			</button>
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
				className="form-select w-auto bg-primary-400"
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

const ConfirmDialog = ({ show, message, onConfirm, onCancel }) => {
	if (!show) return null

	return (
		<div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog modal-dialog-centered ">
				<div className="modal-content bg-primary-400">
					<div className="modal-header">
						<h5 className="modal-title text-white">確認操作</h5>
						<button type="button" className="btn-close" onClick={onCancel}></button>
					</div>
					<div className="modal-body">
						<p className="text-white fs-6">{message}</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onCancel}>
							取消
						</button>
						<button type="button" className="btn btn-danger" onClick={onConfirm}>
							確認
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const ProductTable = ({ selectedProductIds, onProductSelect, handleDeleteClick }) => {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(5)
	const [totalPages, setTotalPages] = useState(1)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [editingProductId, setEditingProductId] = useState(null)
	const [formData, setFormData] = useState({})
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const API_HOST = import.meta.env.VITE_BACKEND_HOST
	const isFirstRender = useRef(true)

	// 獲取商品列表
	const fetchProducts = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			const res = await axios.get(`${API_HOST}/api/products`, {
				params: { page, limit },
			})
			const data = res.data
			const validProducts = data.data.filter(product => product.id)

			setProducts(validProducts)
			setTotalPages(data.totalPages || 1)
		} catch (error) {
			setError('獲取商品列表失敗')
			console.error('Error fetching products:', error)
		} finally {
			setLoading(false)
		}
	}, [page, limit, API_HOST])

	// 監聽頁碼和限制變化
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		fetchProducts()
	}, [page, limit, fetchProducts])

	// 處理每頁顯示數量變化
	const handleLimitChange = e => {
		setLimit(Number(e.target.value))
		setPage(1)
	}

	// 處理編輯點擊
	const handleEditClick = product => {
		setEditingProductId(product.id)
		setFormData(product)
	}

	// 處理輸入變化
	const handleInputChange = e => {
		const { name, value } = e.target
		let processedValue = value

		// 特殊字段處理
		if (name === 'status' || name === 'hasDiscount') {
			processedValue = value === 'true'
		} else if (name === 'price' || name === 'quantity') {
			processedValue = Number(value)
		}

		setFormData(prev => ({
			...prev,
			[name]: processedValue,
		}))
	}

	// 處理保存點擊
	const handleSaveClick = async () => {
		try {
			await axios.put(`${API_HOST}/api/products/${formData.id}`, formData)
			setProducts(products.map(p => (p.id === formData.id ? formData : p)))
			setEditingProductId(null)
			await fetchProducts()
		} catch (error) {
			console.error('Error saving product:', error)
			alert('保存失敗，請稍後重試')
		}
	}

	// 處理複選框變化
	const handleCheckboxChange = productId => {
		onProductSelect(productId)
	}

	// 處理批量刪除
	const handleBatchDelete = () => {
		if (selectedProductIds.length === 0) {
			alert('請選擇要刪除的商品')
			return
		}
		setShowConfirmDelete(true)
	}

	// 刪除確認
	const confirmDelete = async () => {
		try {
			await handleDeleteClick(selectedProductIds)
			setShowConfirmDelete(false)
			await fetchProducts()
		} catch (error) {
			console.error('Error deleting products:', error)
			alert('刪除失敗，請稍後重試')
		}
	}

	const inputStyle = {
		backgroundColor: '#161B26',
		color: 'white',
		border: '1px solid rgba(255, 255, 255, 0.3)',
		borderRadius: '4px',
		padding: '4px 8px',
		width: '100%',
	}

	const selectStyle = {
		...inputStyle,
		appearance: 'auto',
	}

	// 渲染可編輯字段
	const renderEditableField = (product, fieldName, type = 'text') => {
		if (editingProductId === product.id) {
			if (fieldName === 'status') {
				return (
					<select style={selectStyle} name={fieldName} value={formData[fieldName]} onChange={handleInputChange}>
						<option value={true}>啟用</option>
						<option value={false}>停用</option>
					</select>
				)
			}
			if (fieldName === 'hasDiscount') {
				return (
					<select style={selectStyle} name={fieldName} value={formData[fieldName]} onChange={handleInputChange}>
						<option value={true}>是</option>
						<option value={false}>否</option>
					</select>
				)
			}
			return <input type={type} style={inputStyle} name={fieldName} value={formData[fieldName]} onChange={handleInputChange} />
		}

		if (fieldName === 'status') {
			return product[fieldName] ? '啟用' : '停用'
		}
		if (fieldName === 'hasDiscount') {
			return product[fieldName] ? '是' : '否'
		}
		return product[fieldName]
	}

	return (
		<div className="table-wrapper">
			<div className="table-container table-responsive ">
				{error && <div className="text-center text-danger">{error}</div>}

				<table className="table rounded-table table-hover">
					<thead>
						<tr>
							<th style={{ minWidth: '80px', width: '80px' }}></th>
							<th style={{ minWidth: '120px', width: '120px' }}>商品編號</th>
							<th style={{ minWidth: '180px', width: '200px' }}>商品名稱</th>
							<th style={{ minWidth: '180px', width: '180px' }}>類型</th>
							<th style={{ minWidth: '80px', width: '80px' }}>等級</th>
							<th style={{ minWidth: '120px', width: '120px' }}>價格</th>
							<th style={{ minWidth: '120px', width: '120px' }}>數量</th>
							<th style={{ minWidth: '120px', width: '120px' }}>狀態</th>
							<th style={{ minWidth: '120px', width: '120px' }}>折扣券</th>
							<th style={{ minWidth: '80px', width: '80px' }}>圖片</th>
							<th style={{ minWidth: '250px', width: '100px' }}>描述</th>
							<th style={{ minWidth: '80px', width: '80px' }}>操作</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td>
									<input type="checkbox" className="form-check-input me-2" checked={selectedProductIds.includes(product.id)} onChange={() => handleCheckboxChange(product.id)} />
								</td>
								<td>{renderEditableField(product, 'productId')}</td>
								<td>{renderEditableField(product, 'name')}</td>
								<td>{renderEditableField(product, 'type')}</td>
								<td>{renderEditableField(product, 'grade')}</td>
								<td>{renderEditableField(product, 'price', 'number')}</td>
								<td>{renderEditableField(product, 'quantity', 'number')}</td>
								<td>{renderEditableField(product, 'status')}</td>
								<td>{renderEditableField(product, 'hasDiscount')}</td>
								<td>
									<img src={product.imageUrl || 'https://fakeimg.pl/88/'} className="img-fluid rounded" alt="product" width="80" height="120" />
								</td>
								<td>{renderEditableField(product, 'description')}</td>
								<td>{editingProductId === product.id ? <i className="bi bi-save" onClick={handleSaveClick} style={{ cursor: 'pointer' }}></i> : <i className="bi bi-pencil" onClick={() => handleEditClick(product)} style={{ cursor: 'pointer' }}></i>}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="table-controls d-flex flex-column flex-md-row justify-content-between mt-2 ">
				<LimitSelector limit={limit} onLimitChange={handleLimitChange} />
				<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
			</div>

			<ConfirmDialog show={showConfirmDelete} message={`確定要刪除選中的 ${selectedProductIds.length} 個商品嗎？`} onConfirm={confirmDelete} onCancel={() => setShowConfirmDelete(false)} />
		</div>
	)
}

const MobileHeader = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<div className="d-lg-none">
			{/* Fixed Header */}
			<div className="bg-primary-400" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
				<div className="d-flex align-items-center p-3">
					<button className="btn text-white me-3" onClick={toggleMenu}>
						<i className="bi bi-list fs-4"></i>
					</button>
					<img src={logo} alt="Ocean Wings" height="30" />
					<button className="btn text-white ms-auto">
						<i className="bi bi-search fs-5"></i>
					</button>
				</div>
			</div>

			{/* Dropdown Menu */}
			<div
				className="bg-primary-400 overflow-hidden d-flex flex-column"
				style={{
					position: 'fixed',
					top: '80px',
					left: 0,
					right: 0,
					height: isMenuOpen ? 'calc(100vh - 80px)' : '0',
					transition: 'height 0.3s ease-in-out',
					zIndex: 999,
				}}
			>
				<div className="d-flex flex-column text-white flex-grow-1">
					{/* Navigation Links */}
					<nav className="mt-10 ms-10">
						<ul className=" list-unstyled">
							<li className="mb-3">
								<Link to="/" className="nav-link text-white fs-6 mb-9">
									首頁
								</Link>
							</li>
							<li className="mb-3">
								<Link to="/backend" className="nav-link text-white fs-6 mb-9">
									顧客管理
								</Link>
							</li>
							<li className="mb-3">
								<Link to="/backend" className="nav-link text-white fs-6 mb-9">
									商品管理
								</Link>
							</li>
							<li className="mb-3">
								<Link to="/backend" className="nav-link text-white fs-6 mb-9">
									商品上架
								</Link>
							</li>
							<li className="mb-3">
								<Link to="/backend" className="nav-link text-white fs-6 mb-9">
									心得牆
								</Link>
							</li>
						</ul>
					</nav>

					{/* Login Button (Fixed at Bottom) */}
					<div className="p-3 mt-auto">
						<button className="btn btn-outline-light w-100">會員登入</button>
					</div>
				</div>
			</div>
		</div>
	)
}

const App = () => {
	const [selectedProductIds, setSelectedProductIds] = useState([])
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const [userName, setUserName] = useState('Alice')
	const API_HOST = import.meta.env.VITE_BACKEND_HOST

	useEffect(() => {
		const storedUser = sessionStorage.getItem('user')
		if (storedUser) {
			setUserName(storedUser)
		}
	}, [])

	const handleProductSelect = productId => {
		setSelectedProductIds(prevSelectedProductIds => {
			if (prevSelectedProductIds.includes(productId)) {
				return prevSelectedProductIds.filter(id => id !== productId)
			} else {
				return [...prevSelectedProductIds, productId]
			}
		})
	}

	const handleDeleteClick = ids => {
		if (!ids || ids.length === 0) {
			alert('請選擇要刪除的商品')
			return
		}
		setShowDeleteConfirm(true)
	}

	const handleDeleteConfirm = async () => {
		try {
			await axios.delete(`${API_HOST}/api/products`, {
				data: { ids: selectedProductIds },
			})
			setSelectedProductIds([])
			alert('刪除成功')
			window.location.reload()
		} catch (error) {
			console.error('Error deleting products:', error)
			alert('刪除失敗：' + (error.response?.data?.message || '未知錯誤'))
		} finally {
			setShowDeleteConfirm(false)
		}
	}

	return (
		<Layout>
			<MobileHeader />
			<section className="content bg-primary-500 mt-13 mt-lg-0">
				<div className="d-none d-lg-block">
					<div className="d-flex justify-content-between align-items-center">
						<i className="bi bi-search text-white fs-5 "></i>
						<div className="d-flex justify-content-center align-items-center">
							<div className="rounded-circle bg-white text-black fs-5 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px' }}>
								{userName ? userName.charAt(0).toUpperCase() : 'A'}
							</div>{' '}
							<div className="text-white fs-6 ms-2">{userName}</div>
						</div>
					</div>
				</div>
				<div className="banner mb-4">
					<h5 className="fs-5 mt-4 mb-4">商品管理</h5>
					<div className="d-flex justify-content-between align-items-center">
						<select className="form-select productOption bg-primary-400 text-white">
							<option>類別</option>
							<option value="商品編號">商品編號</option>
							<option value="商品名稱">商品名稱</option>
						</select>
						<button className="btn btn-primary-500 text-white border px-4 delButton" onClick={() => handleDeleteClick(selectedProductIds)}>
							<i className="bi bi-trash me-1"></i>刪除
						</button>
					</div>
				</div>
				<ProductTable selectedProductIds={selectedProductIds} onProductSelect={handleProductSelect} handleDeleteClick={handleDeleteClick} />
			</section>

			<ConfirmDialog show={showDeleteConfirm} message={`確定要刪除選中的 ${selectedProductIds.length} 個商品嗎？`} onConfirm={handleDeleteConfirm} onCancel={() => setShowDeleteConfirm(false)} />
		</Layout>
	)
}
export default App
