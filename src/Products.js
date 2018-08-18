import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'

import ProductsHome from './ProductsHome'
import Category from './Category'

export default class Products extends Component {
    render() {
        const { match } = this.props
        return(
            <div className='row'>
                
                <div className='col-md-2'>
                    
                    <h3>Categories</h3>
                    <Link to='/products/category/1'>Category 1</Link>
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