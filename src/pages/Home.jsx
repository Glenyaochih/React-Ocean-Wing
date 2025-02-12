import { Link } from 'react-router-dom'
import React from 'react'

function Home() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/backend">Backend</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Home
