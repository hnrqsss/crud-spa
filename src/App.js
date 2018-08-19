import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import About from './About'
import Products from './Products'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: []
    }

    this.loadCategories = this.loadCategories.bind(this)
    this.removeCategory = this.removeCategory.bind(this)
    this.addCategory    = this.addCategory.bind(this)
  }

  loadCategories() {
    this.props.api
        .getCategories()
            .then(res => {
                this.setState({categories: res.data})
            })
            .catch(err => console.log('Error: '+err))
  }

  removeCategory(category) {
        this.props.api
            .deleteCategory(category.id)
                .then(() => this.loadCategories())
                .catch(err => console.log(err))
        
  }

  addCategory(category) {
    this.props.api.addCategory(category)
      .then(() => this.loadCategories())
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <Router>
          <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
              <div className='container'>
                
                <div className='navbar-header'>
                  <Link to='/' className='navbar-brand'>Products</Link>
                </div>
                <div className='collapse navbar-collapse'>
                  <ul className='nav navbar-nav'>
                    
                    <li className='nav-item'>
                      <Link className='nav-link' to='/'>Home</Link>
                    </li>

                    <li className='nav-item'>
                      <Link className='nav-link' to='/products'>Products</Link>
                    </li>

                    <li className='nav-item'>
                      <Link className='nav-link' to='/about'>About</Link>
                    </li>

                  </ul>
                </div>
              </div>
            </nav>

            <div className='container'>
              <Route exact path='/' component={Home} />
              <Route path='/products' render={(props) => {
                  return (<Products 
                            {...props} 
                            loadCategories={this.loadCategories}
                            removeCategory={this.removeCategory} 
                            addCategory={this.addCategory}
                            categories={this.state.categories} 
                            />)
                  }          
                } />
              <Route exact path='/about' component={About} />
            </div>
          </div>  
      </Router>
    )
  }
}

export default App
