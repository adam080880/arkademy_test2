import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import Icon from './img/download.png'

import $ from 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'
import {
	BrowserRouter as Router,
	Link
} from 'react-router-dom'

import Product from './components/Product'

class App extends React.Component {
	showModal() {
		$('.modal').modal('show')		
		$('#labelModal').html('Add Product')
	}

	render() {
		return (			
			<Router>
				<div className="bg-light" style={{minHeight: "100vh", paddingBottom:"50px"}}>
					<nav className="navbar navbar-expand-md navbar-fixed-top navbar-light shadow-sm bg-white main-nav mb-5">
						<div className="container">
							<Link className="navbar-brand" to="/"><img src={Icon} alt="arkademyIcon" height="40"/></Link>							
							<ul className="nav navbar-nav mx-auto px-5 w-100">
								<form className="form-inline w-100 px-5 mx-auto">
									<input className="form-control border-0 w-100" style={{backgroundColor:"#CECECE"}} placeholder="Search"/>
								</form>
							</ul>
							<ul className="nav navbar-nav">
								<li>
									<button onClick={this.showModal} id="btnModal" className="btn text-white px-5" style={{ backgroundColor: "#FADC9C" }}>ADD</button>
								</li>
							</ul>
						</div>
					</nav>

					<div className="container">
						<Product/>
					</div>					
				</div>							
			</Router>
		)
	}
}

export default App;
