import React, { useState } from 'react'

function Cart() {
	const [paymentMethod, setPaymentMethod] = useState('credit')

	// Sample product data
	const products = [
		{ id: 1, name: '衝浪板', description: '高級衝浪板', price: 5000, image: 'https://via.placeholder.com/70x70' },
		{ id: 2, name: '衝浪板', description: '高級衝浪板', price: 10000, image: 'https://via.placeholder.com/70x70' },
		{ id: 3, name: '衝浪板', description: '高級衝浪板', price: 10000, image: 'https://via.placeholder.com/70x70' },
	]

	return (
		<div style={{ backgroundColor: '#1D222C', color: 'white', minHeight: '100vh' }} className="container">
			<div className="container-fluid py-3">
				{/* Breadcrumb */}
				<div className="row mb-3">
					<div className="col">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item">
									<a href="#" className="text-white text-decoration-none ">
										首頁
									</a>
								</li>
								<li className="breadcrumb-item active text-white" aria-current="page">
									購物車付款
								</li>
							</ol>
						</nav>
					</div>
				</div>

				<div className="row">
					{/* Products List */}
					<div className="col-md-8 mb-4">
						{products.map(product => (
							<div key={product.id} className="card mb-3" style={{ backgroundColor: '#252A35', border: 'none' }}>
								<div className="card-body">
									<div className="row align-items-center">
										<div className="col-2">
											<img src={product.image} alt={product.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '5px' }} />
										</div>
										<div className="col-6">
											<h6 className="mb-1">{product.name}</h6>
											<small className="text-secondary">{product.description}</small>
										</div>
										<div className="col-4 text-end">
											<h6>NT$ {product.price.toLocaleString()}</h6>
										</div>
									</div>
								</div>
							</div>
						))}
						{/* Contact Information */}
						<div className="mb-4" style={{ marginTop: '80px' }}>
							<h6 className="mb-5">收貨人資訊</h6>

							<div className="mb-3 d-md-flex justify-content-between ">
								<div className="col-12 col-md-6 me-md-2">
									<label className="form-label small text-white">姓名 *</label>
									<input type="text" className="form-control" defaultValue="john" style={{ backgroundColor: '#1D222C', border: '1px solid #333', color: 'white' }} />
								</div>
								<div className="col-12 col-md-6">
									<label className="form-label small text-white">連絡電話</label>
									<input type="tel" className="form-control" defaultValue="0912 123 456" style={{ backgroundColor: '#1D222C', border: '1px solid #333', color: 'white' }} />
								</div>
							</div>

							<div className="mb-3">
								<label className="form-label small text-white">收貨地址 *</label>
								<input type="text" className="form-control" defaultValue="台北市信義區一號1樓" style={{ backgroundColor: '#1D222C', border: '1px solid #333', color: 'white' }} />
							</div>
						</div>

						{/* Payment Methods */}
						<div style={{ margin: '80px 0px' }}>
							<h6 className="mb-3">付款方式</h6>
							<div className="row g-3">
								<div className="col-6">
									<div
										className="p-2 rounded"
										style={{
											backgroundColor: '#252A35',
											border: paymentMethod === 'cod' ? '1px solid #FFD700' : '1px solid #333',
											cursor: 'pointer',
										}}
										onClick={() => setPaymentMethod('cod')}
									>
										<div className="form-check">
											<input className="form-check-input" type="radio" id="cod" name="paymentMethod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
											<label className="form-check-label" htmlFor="cod">
												貨到付款
											</label>
										</div>
									</div>
								</div>
								<div className="col-6">
									<div
										className="p-2 rounded"
										style={{
											backgroundColor: '#252A35',
											border: paymentMethod === 'credit' ? '1px solid #FFD700' : '1px solid #333',
											cursor: 'pointer',
										}}
										onClick={() => setPaymentMethod('credit')}
									>
										<div className="form-check">
											<input className="form-check-input" type="radio" id="credit" name="paymentMethod" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} />
											<label className="form-check-label" htmlFor="credit">
												信用卡
											</label>
										</div>
									</div>
								</div>
							</div>

							{/* Credit Card Fields - Show only when credit card is selected */}
							{paymentMethod === 'credit' && (
								<div className="mt-4">
									<div className="mb-3">
										<label className="form-label small text-white">信用卡號</label>
										<input type="text" className="form-control" placeholder="0000 0000 0000 0000" style={{ backgroundColor: '#1D222C', border: '1px solid #333', color: 'white' }} />
									</div>
									<div className="row g-3">
										<div className="col-6">
											<label className="form-label small text-white">有效期限</label>
											<input type="text" className="form-control" placeholder="MM/YY" style={{ backgroundColor: '#1D222C', border: '1px solid #333', color: 'white' }} />
										</div>
										<div className="col-6">
											<label className="form-label small text-white">安全碼</label>
											<input type="text" className="form-control" placeholder="CVC" style={{ backgroundColor: '#1D222C', border: '1px solid #333', color: 'white' }} />
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Checkout Summary */}
					<div className="col-md-4">
						<hr className="d-md-none" />
						{/* Shipping Options */}
						<div className="mb-4" style={{ margin: '32px 0px 0px 0px' }}>
							<h6 className="mb-2" style={{ fontSize: '16px' }}>
								折價券
							</h6>
							<select className="form-select mb-4" style={{ backgroundColor: '#1D222C', border: '1px solid #333', color: 'white' }}>
								<option>週年慶優惠</option>
								<option>母親節優惠</option>
								<option>父親節優惠</option>
								<option>新年優惠</option>
							</select>
						</div>

						{/* Order Summary */}
						<div className="mb-4" style={{ marginTop: '80px' }}>
							<div className="d-flex justify-content-between mb-2">
								<span className="text-secondary">金額</span>
								<span>NT$ 25,000</span>
							</div>
							<div className="d-flex justify-content-between mb-2">
								<span className="text-secondary">稅額</span>
								<span>NT$ 100</span>
							</div>
							<div className="d-flex justify-content-between mb-3">
								<span className="text-secondary">運費費用</span>
								<span>NT$ 200</span>
							</div>
							<div className="d-flex justify-content-between mb-3" style={{ marginTop: '40px' }}>
								<h6>總計</h6>
								<h6>NT$ 24,900</h6>
							</div>
							<button className="btn w-100 py-2" style={{ backgroundColor: '#FFD700', color: 'black', fontWeight: 'bold', border: 'none' }}>
								付款
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
