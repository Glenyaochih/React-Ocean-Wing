import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	const [email, setEmail] = useState('test123456@gmail.com')
	const [password, setPassword] = useState('test123456')
	const [error, setError] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const handleLogin = async e => {
		e.preventDefault()

		try {
			const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/auth/sign_in`, {
				email,
				password,
			})

			console.log('Login successful', response.data)
			navigate('/backend')
		} catch (err) {
			setError('登入失敗：' + (err.response?.data?.message || '未知錯誤'))
			console.error('Login error', err)
		}
	}

	return (
		<div className="bg-primary-400 min-vh-100 d-flex align-items-center">
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4">
						<div className="card shadow-lg border-0 rounded-4 overflow-hidden">
							<div className="card-header bg-primary text-white text-center py-4">
								<h2 className="mb-0">歡迎登入</h2>
							</div>
							<div className="card-body p-5">
								<form onSubmit={handleLogin}>
									<div className="mb-4">
										<label htmlFor="email" className="form-label text-muted ">
											電子郵件
										</label>
										<div className="input-group">
											<span className="input-group-text bg-light border-end-0">
												<i className="bi bi-envelope text-black"></i>
											</span>
											<input type="email" className="form-control form-control-lg border-start-0 ps-0 text-black" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="輸入您的電子郵件" required />
										</div>
									</div>
									<div className="mb-4">
										<label htmlFor="password" className="form-label text-muted">
											密碼
										</label>
										<div className="input-group">
											<span className="input-group-text bg-light border-end-0">
												<i className="bi bi-lock text-black"></i>
											</span>
											<input type={showPassword ? 'text' : 'password'} className="form-control form-control-lg border-start-0 ps-0 text-black" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="輸入您的密碼" required />
											<button type="button" className="btn btn-primary-300" onClick={() => setShowPassword(!showPassword)}>
												<i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} text-black`}></i>
											</button>
										</div>
									</div>

									{error && (
										<div className="alert alert-danger mb-4" role="alert">
											{error}
										</div>
									)}

									<div className="d-grid">
										<button type="submit" className="btn btn-primary btn-lg rounded-pill shadow-sm">
											登入
										</button>
									</div>
								</form>

								<div className="text-center mt-4">
									<a href="#" className="text-muted text-decoration-none small">
										忘記密碼？
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home
