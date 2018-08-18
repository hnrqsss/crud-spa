import React, { Component } from 'react'

class Category extends Component {
    render() {
        const { match } = this.props
        return(
            <p>Categoria {(match.params.catId)}</p>
        )
    }
}

export default Category