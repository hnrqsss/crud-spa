import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

const Api = {
    // categories
    getCategories:           ()         => api.get('categories'),
    getCategoriesById:       (id)       => api.get('categories/'+id),
    deleteCategory:          (id)       => api.delete('categories/'+id),
    addCategory:             (category) => api.post('categories',{category}),
    
    // products
    getProducts:             ()         => api.get('products'),
    getProductsById:         (id)       => api.get('products/'+id),
    getProductsByCategoryId: (id)       => api.get('products?category='+id)
}

export default Api