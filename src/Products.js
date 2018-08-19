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

        this.handleNewCategory = this.handleNewCategory.bind(this)
        this.loadCategories    = this.loadCategories.bind(this)
        this.removeCategory    = this.removeCategory.bind(this)
    }

    //when component is render
    componentDidMount() {
        this.loadCategories()
    }

    loadCategories() {
        axios
            .get('http://localhost:3001/categories')
                .then(res => {
                    this.setState({categories: res.data})
                })
                .catch(err => console.log('Error: '+err))
    }

    removeCategory(category) {
        axios
            .delete('http://localhost:3001/categories/'+category.id)
                .then(() => this.loadCategories())
                .catch(err => console.log(err))
        
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
                            onClick={() => this.removeCategory(category)}
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>    
            )
    }
    
    handleNewCategory(event) {
        if (event.keyCode === 13) {
            const category = this.refs.category.value
            axios
                .post('http://localhost:3001/categories',{category})
                    .then(res => {
                        this.refs.category.value = ''
                        this.loadCategories()
                    })
                    .catch(error => console.log(error))
        }
    }

    render() {
        const { match } = this.props
        const { categories } = this.state
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