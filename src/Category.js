import React, { Component } from 'react'
import axios from 'axios'


class Category extends Component {

    constructor(props) {
        super(props) 
        
        this.state = {
            products: [],
            categories: []
        }

        this.loadProducts   = this.loadProducts.bind(this)
        this.loadCategories = this.loadCategories.bind(this)
    }

    componentDidMount() {
        const id = this.props.match.params.catId
        this.loadProducts(id)
        this.loadCategories(id)
    }

    loadProducts(id) {
        axios
            .get('http://localhost:3001/products?category='+id)
                .then(res => {
                    this.setState({
                        products : res.data
                    })
                })
                .catch(err => console.log(err))
    }

    loadCategories(id) {
        axios
            .get('http://localhost:3001/categories/'+id)
                .then(res => {
                    this.setState({
                        categories : res.data
                    })
                })
                .catch(err => console.log(err))
    }

    componentWillReceiveProps(newProps) {
        this.loadProducts(newProps.match.params.catId)
        this.loadCategories(newProps.match.params.catId)
    }

    renderProducts(product) {
        return <li className='breadcrumb' key={product.id}>{product.product}</li>
    }

    render() {
        const { match } = this.props
        const { products, categories } = this.state

        return(
            <div>
                <h2>Category: {categories.category}</h2>
                <ul>
                    {products.map(this.renderProducts)}
                </ul>    
            </div>    
        )
    }
}

export default Category