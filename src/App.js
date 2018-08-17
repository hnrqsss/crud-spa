import React, { Component } from 'react'


class App extends Component {
  render() {
    return (
      <div>
          <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
              
              <div className='navbar-header'>
                <a href='/' className='navbar-brand'>Products</a>
              </div>
              <div className='collapse navbar-collapse'>
                <ul className='nav navbar-nav'>
                  
                  <li className='nav-item'>
                    <a className='nav-link' href='/'>Home</a>
                  </li>

                  <li className='nav-item'>
                    <a className='nav-link' href='/'>Products</a>
                  </li>

                  <li className='nav-item'>
                    <a className='nav-link' href='/'>About</a>
                  </li>

                </ul>
              </div>
            </div>
          </nav>

          <div className='container'>
            <h1>Manager products</h1>
          </div>

      </div>
    )
  }
}

export default App
