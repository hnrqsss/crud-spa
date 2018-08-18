import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import ProductsHome from './ProductsHome'
import Category from './Category'

export default class Products extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    //when component is render
    componentDidMount() {
        axios
            .get('http://localhost:3001/categories')
                .then(res => {
                    this.setState({categories: res.data})
                })
                .catch(err => console.log('Error: '+err))
    }

    renderCategory(category) {
        return <li key={category.id}><Link to={`/products/category/${category.id}`} >{category.category}</Link></li>
    }
    
    render() {
        const { match } = this.props
        const { categories } = this.state
        return(
            <div className='row'>
                
                <div className='col-md-2'>
                    <h3>Categories</h3>
                    <ul>
                        {categories.map(cat => this.renderCategory(cat))}
                    </ul>
                </div>
                
                <div className='col-md-10'>
                    
                    <h3>Products</h3>
                    <Route exact path={match.url} component={ProductsHome} />
                    <Route exact path={match.url+'/category/:catId'} component={Category} />
                </div>
            </div>
        )
    }
}