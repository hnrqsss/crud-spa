import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'

import ProductsHome from './ProductsHome'
import Category from './Category'

export default class Products extends Component {
    
    constructor(props) {
        super(props)

        this.handleNewCategory = this.handleNewCategory.bind(this)
        this.renderCategory    = this.renderCategory.bind(this)
    }

    //when component is render
    componentDidMount() {
        this.props.loadCategories()
    }

    renderCategory(category) {
        return (
                <tr key={category.id} >
                    <td>
                        <Link to={`/products/category/${category.id}`} >{category.category} </Link>
                    </td>
                    <td>
                        <button className='btn btn-success btn-sm'>
                            <i className="fas fa-edit"></i>
                        </button>
                    </td>
                    <td>
                        <button 
                            className='btn btn-danger btn-sm' 
                            onClick={() => this.props.removeCategory(category)}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>    
            )
    }
    
    handleNewCategory(event) {
        if (event.keyCode === 13) {
            this.props.addCategory(this.refs.category.value)    
            this.refs.category.value = ''
        }
    }

    render() {
        const { match,categories } = this.props
        
        return(
            <div className='row'>
                
                <div className='col-md-2'>
                    <h3>Categories</h3>
                    <table>
                        <tbody>
                            {categories.map(cat => this.renderCategory(cat))}
                        </tbody>
                    </table>
        
                    <div className='breadcrumb'>
                        <input 
                            type='text'
                            ref='category'
                            placeholder='New category' 
                            onKeyUp={this.handleNewCategory}
                            className='form-control'
                            />
                    </div>


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