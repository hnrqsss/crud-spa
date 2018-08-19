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

    renderCategory(category) {
        return <li key={category.id}><Link to={`/products/category/${category.id}`} >{category.category}</Link></li>
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
                    <ul>
                        {categories.map(cat => this.renderCategory(cat))}
                    </ul>

                    <div className='well'>
                        <input 
                            type='text' 
                            ref='category' 
                            placeholder='New category' 
                            onKeyUp={this.handleNewCategory}
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