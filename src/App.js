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
              <Route path='/products' component={Products} />
              <Route exact path='/about' component={About} />
            </div>
          </div>  
      </Router>
    )
  }
}

export default App
