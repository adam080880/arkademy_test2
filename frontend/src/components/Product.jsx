import React from 'react'
import $ from 'jquery/dist/jquery'
import Swal from 'sweetalert2'

import ProductModel from '../models/ProductModel'
import CashierModel from '../models/CashierModel'
import CategoryModel from '../models/CategoryModel'

import binIcon from '../img/bin.png'
import editIcon from '../img/edit.png'

export default class Product extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            dataCashier: [],
            dataCategory: [],
            name: "",
            price: "",
            category_id: "",
            cashier_id: "",
            id: false
        }   

        this.fetchToApi = this.fetchToApi.bind(this)
        this.renderTable = this.renderTable.bind(this)                
        this.renderCashier = this.renderCashier.bind(this)
        this.renderCategory = this.renderCategory.bind(this)
        this.renderModal = this.renderModal.bind(this)
        this.renderDelete = this.renderDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }        

    componentDidMount() {
        this.fetchToApi()


        $('#btnModal').click((e) => {
            this.setState({
                category_id: "",
                cashier_id: "",
                name: "",
                price: ""
            })
        })
    }

    handleChange(e) {        
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()        

        let productModel = new ProductModel()
        if(!this.state.id) {
            productModel.post({
                category_id: this.state.category_id,
                cashier_id: this.state.cashier_id,
                name: this.state.name,
                price: this.state.price,
            }).then((res) => {
                Swal.fire(
                    'Success',
                    'Success Input',
                    'success'
                )
                this.fetchToApi()
                $('.modal').modal('hide')
            }).catch((rej) => {
                let errors = rej.response                
                Swal.fire(
                    'Failed',
                    'Error Input ' + errors.status + ` (${errors.statusText})`,
                    'error'
                )
                $('.modal').modal('hide')
            })
        } else {
            productModel.put({
                id: this.state.id,
                category_id: this.state.category_id,
                cashier_id: this.state.cashier_id,
                name: this.state.name,
                price: this.state.price,
            }).then((res) => {
                Swal.fire(
                    'Success',
                    'Success Update',
                    'success'
                )
                this.fetchToApi()
                $('.modal').modal('hide')
            }).catch((rej) => {
                let errors = rej.response                
                Swal.fire(
                    'Failed',
                    'Error Update ' + errors.status + ` (${errors.statusText})`,
                    'error'
                )
                $('.modal').modal('hide')
            })
        }
        this.setState({
            id: "",
            category_id: "",
            cashier_id: "",
            name: "",
            price: ""
        })        
    }

    fetchToApi() {
        let productModel = new ProductModel()
        productModel.get().then((res) => {                                
            this.setState({
                data: res.data
            })
        })

        let cashierModel = new CashierModel()
        cashierModel.get().then((res) => {            
            this.setState({
                dataCashier: res.data
            })
        })

        let categoryModel = new CategoryModel()
        categoryModel.get().then((res) => {            
            this.setState({
                dataCategory: res.data
            })
        })
    }

    renderTable(val, index) {
        return (
            <tr key={index} style={{height:"65px"}} className="border-0 text-center">
                <td className="border-0" style={{ verticalAlign:"middle" }}>{index+1}</td>
                <td className="border-0" style={{ verticalAlign:"middle" }} >{val.cashier.name}</td>
                <td className="border-0" style={{ verticalAlign:"middle" }} >{val.name}</td>
                <td className="border-0" style={{ verticalAlign:"middle" }} >{val.category.name}</td>
                <td className="border-0" style={{ verticalAlign:"middle" }} >RP. {val.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
                <td className="border-0" style={{ verticalAlign:"middle" }} ><span onClick={this.renderDelete} style={{cursor:"pointer"}}><img dataid={val.id} src={binIcon} alt="" height="20"/></span> <span onClick={this.renderModal} className="ml-1" style={{cursor:"pointer"}}><img dataid={val.id} src={editIcon} height="20" alt=""/></span></td>
            </tr>
        )
    }

    renderDelete(e) {
        let productModel = new ProductModel()
        productModel.delete({
            id: e.target.getAttribute('dataid')
        }).then((res) => {
            Swal.fire(
                'Success',
                'Success Delete',
                'success'
            )
            this.fetchToApi()
        }).catch((rej) => {                        
            Swal.fire(
                'Failed',
                'Error Delete',
                'error'
            )
        })
    }

    renderModal(e) {        
        let productModel = new ProductModel()
        productModel.find(e.target.getAttribute('dataid')).then((res) => {
            let data = res.data
            this.setState({
                name: data.name,
                price: data.price,
                category_id: data.category_id,
                cashier_id: data.cashier_id,
                id: data.id
            })
            $('#labelModal').html('Edit Product')
            $('.modal').modal('show')
        })
    }

    renderCashier(val, index) {        
        return (
            <option key={index} value={val.id}>{val.name}</option>
        )
    }

    renderCategory(val, index) {        
        return (
            <option key={index} value={val.id}>{val.name}</option>
        )
    }

    render() {
        return (
            <div className="card rounded-pills border-0 shadow-sm pb-0">
                <table className="border-0 table">
                    <thead className="thead text-white" style={{ backgroundColor: "#FADC9C" }}>									
                        <tr style={{textAlign:"center"}}>
                            <th>No</th>
                            <th>Cashier</th>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>									
                    </thead>

                    <tbody>		
                        { this.state.data.map(this.renderTable) }     
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<form onSubmit={this.handleSubmit}>
								<div className="modal-header">
									<h5 className="modal-title" id="labelModal">Modal title</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="cashier_id">Cashier</label>
                                        <select name="cashier_id" id="cashier_id" value={this.state.cashier_id} onChange={this.handleChange} className="form-control border-0 border-bottom pb-0">
                                            <option value="">Select a Cashier</option>
                                            { this.state.dataCashier.map(this.renderCashier) }
                                        </select>
                                        <hr className="mt-2"/>
									</div>
                                    <div className="form-group">
										<label htmlFor="category_id">Category</label>
                                        <select name="category_id" id="category_id" value={this.state.category_id} onChange={this.handleChange} className="form-control border-0 border-bottom pb-0">
                                            <option value="">Select a Category</option>
                                            { this.state.dataCategory.map(this.renderCategory) }
                                        </select>
                                        <hr className="mt-2"/>
									</div>
                                    <div className="form-group">
										<label htmlFor="name">Name</label>
                                        <input type="text" name="name" id="name" className="form-control border-0" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>
                                        <hr className="mt-2"/>
									</div>
                                    <div className="form-group">
										<label htmlFor="price">Price</label>
                                        <input type="text" name="price" id="price" className="form-control border-0" placeholder="Price" onChange={this.handleChange} value={this.state.price}/>
                                        <hr className="mt-2"/>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
									<button type="submit" style={{ backgroundColor: "#FADC9C" }} className="btn">Save changes</button>
								</div>
							</form>
						</div>
					</div>
				</div>
            </div>
        )
    }
}