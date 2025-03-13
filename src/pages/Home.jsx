import { NavLink } from 'react-router-dom'
import OceanFooter from '../components/OceanFooter'

function Home() {
	return (
		<>
			<section>
				<div className="index-video-area">
					<div>
						<div className="position-relative overflow-hidden">
							{/* <!-- <div className="mw-100 mh-100 ratio ratio-16x9">
                <iframe src="https://https://www.youtube.com/watch?v=aYBGV8ssve4&t=535s" title="YouTube video"
                    allowfullscreen></iframe>
            </div> --> */}
							<video className=" index-video" poster="https://videos.pexels.com/video-files/2802271/2802271-hd_1920_1080_30fps.mp4" playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
								<source src=" https://videos.pexels.com/video-files/2802271/2802271-hd_1920_1080_30fps.mp4" type="video/mp4" />
							</video>
							<div className="index-navbar container-fluid px-md-11 px-lg-14 position-absolute top-0 start-0 w-100">
								<div className=" d-flex justify-content-between align-items-center py-4 py-lg-12">
									<a href="#">
										<picture>
											<source media="(max-width: 992px)" srcSet="../public/images/Ocean-Wings-logo-sm.svg" />
											<img src="../public/images/Ocean-Wings-logo-lg.svg" width="100%" alt="article-banner" />
										</picture>
									</a>
									<a className="border-0  d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
										<span className="text-white material-symbols-outlined">menu</span>
									</a>
								</div>
							</div>
							<div className="index-header d-none d-xxl-block  pe-5 py-12 text-nowrap h-100 position-absolute top-0 end-0 bg-primary-400">
								<div className="d-flex align-items-end flex-column mb-3 h-100">
									<div className="p-2">
										<a className="btn" type="button" href="#">
											會員登入
										</a>
										<a className="btn" type="button" href="#">
											<span className="fs-3 material-symbols-outlined">shopping_cart</span>
										</a>
									</div>
									<div className="mt-auto">
										<NavLink className="nav-link" to="/products">
											<button className='btn'>
												長板 <span className="align-text-bottom material-symbols-outlined fs-5 ">arrow_right</span>
											</button>
										</NavLink>
									</div>
									<div>
										<a className="btn" type="button" href="#">
											短板 <span className="align-text-bottom material-symbols-outlined fs-5">arrow_right</span>
										</a>
									</div>
									<div>
										<a className="btn" type="button" href="#">
											配件 <span className="align-text-bottom material-symbols-outlined fs-5">arrow_right</span>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="offcanvas offcanvas-top vh-100 bg-primary-400" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
						<div className="offcanvas-header">
							<a href="#">
								<img src="/assets/images/Ocean-Wings-logo-sm.svg" alt="logo" />
							</a>
							<button type="button" className="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div className="offcanvas-body h-100 d-flex justify-content-center align-items-center">
							<div className="w-100">
								<div>
									<a className="btn d-block mb-3">長板</a>
									<a className="btn d-block mb-3">短板</a>
									<a href="#" className="btn d-block">
										配件
									</a>
								</div>
								<hr className="navbar-hr" />
								<div>
									<a className="btn d-block">購物車</a>
									<a className="btn d-block">會員登入</a>
									<a className="btn d-block">管理者登入</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* entrance */}
			<section className="shopping-entrance">
				<div className=" beginner-entrance pt-15 pt-md-16">
					<div className="container-xxl d-lg-flex align-items-center justify-content-center px-md-11 px-lg-14">
						<h2 className="d-none d-lg-block  text-white">你還無法起乘嗎？ </h2>
						<h6 className="d-lg-none text-white">你還無法起乘嗎？ </h6>
						<div className="d-flex align-items-center">
							<h2 className="d-none d-lg-block text-white">要不要來一張</h2>
							<a href="#" className="btn btn-lg d-none d-lg-block text-primary-200 rounded-0 fs-1">
								快樂板<span className="fs-1 material-symbols-outlined  align-text-middle">arrow_right</span>
							</a>
							<h6 className="d-lg-none text-white">要不要來一張</h6>
							<a href="#" className="btn text-primary-200 rounded-0 d-lg-none">
								快樂板<span className="fs-3 material-symbols-outlined  align-text-bottom">arrow_right</span>
							</a>
						</div>
					</div>
				</div>
				<div className=" d-lg-flex">
					<div className="intermediate-entrance position-relative">
						<div className="container-fluid title-gradient d-flex align-items-end  position-absolute bottom-0 w-100">
							<div className="py-4">
								<a className="p-0 btn btn-sm d-lg-none" href="#">
									中階版
								</a>
								<a className="p-0 btn  btn-lg d-none d-lg-block" href="#">
									中階版
								</a>
							</div>
						</div>
					</div>
					<div className="height-end-entrance position-relative">
						<div className="container-fluid title-gradient d-flex align-items-end  position-absolute bottom-0 w-100">
							<div className="py-4 ">
								<a className="p-0 btn btn-sm d-lg-none" href="#">
									高階版
								</a>
								<a className="p-0 btn btn-lg d-none d-lg-block" href="#">
									高階版
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- user-recommend --> */}
			<section className="user-recommend py-12 py-lg-15">
				<h2 className="recommend-decoration text-center pb-9">心得牆</h2>
				<div className="container mt-lg-13">
					<div className="row">
						<div className="col-lg-6 ">
							<div className="ms-lg-11 mb-lg-11 position-relative">
								<div className="recommend-suer-img rounded-9 "></div>
							</div>
						</div>
						<div className="col-lg-6 mh-100">
							<div className="ms-lg-15 d-flex flex-column h-100">
								<div className="p-lg-5">
									<h6 className="mb-7 d-lg-none mt-11">
										“<span className="text-primary-200">我找到心儀的衝浪板</span>”
									</h6>
									<h4 className="mb-8 mt-5 d-none d-lg-block">
										“<span className="text-primary-200">我找到心儀的衝浪板</span>”
									</h4>
									<p className="fs-6">看到奧運中衝浪選手的英姿，讓我對這項運動產生了濃厚的興趣。偶然發現這個網站，讓我驚喜地找到適合自己的衝浪板和配件，購買過程變得輕鬆無比。網站上提供了許多新手學習指南與注意事項，讓我在進入這項運動前就掌握了必要的知識，避免了許多初學者容易犯的錯誤。 特別值得一提的是，網站推薦的衝浪板和配件不僅品質優良，還是多個知名活動與廠商的首選，讓我對自己的選擇充滿信心。感謝這個網站的全方位支持，讓我的學習衝浪之旅變得如此順利愉快。</p>
									<div className="d-flex justify-content-end w-100">
										<h5 className="text-primary-200 line-before-text  mt-4 mt-lg-8 "> 匿名貓貓</h5>
									</div>
								</div>
								<div className="d-flex justify-content-end mt-auto position-relative">
									<a className="btn btn-lg d-none d-lg-block more-recommend" type="button" href="#">
										更多留言<span className="material-symbols-outlined fs-5 align-text-bottom">arrow_right</span>
									</a>
								</div>
								<div className="d-flex justify-content-end mt-sm-5 d-lg-none ">
									<a className="btn-sm more-recommend position-relative mt-15" type="button" href="#">
										更多留言<span className="material-symbols-outlined fs-5 align-text-bottom">arrow_right</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- user-recommend --> */}
			<section className=" third-party pt-12 pt-lg-15 pb-15 pb-lg-18">
				<div>
					<h5 className="third-party-decoration text-center mb-11 mb-lg-17 d-lg-none">第三方認證</h5>
					<h2 className="third-party-decoration text-center mb-11 mb-lg-17 d-none d-lg-block">第三方認證</h2>
				</div>
				<div className="container">
					<div className="row gy-10">
						<div className="col-lg-2 col-4">
							<div className="card rounded-0">
								<picture>
									<source media="(max-width: 992px)" srcSet="/public/images/third-party-sm/third-party-sm-01.png" />
									<img src="/public/images/third-party-lg/third-party-lg-01.png" width="100%" alt="third-party-img" />
								</picture>
							</div>
						</div>
					</div>
				</div>
			</section>

			<OceanFooter />
		</>
	)
}

export default Home
