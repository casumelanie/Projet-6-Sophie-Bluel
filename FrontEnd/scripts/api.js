// URL API
const URL_WORKS = 'http://localhost:5678/api/works'
const URL_CATEGORIES = 'http://localhost:5678/api/categories'
export const URL_LOGIN = 'http://localhost:5678/api/users/login'

// METHODE GET API
const get = url => fetch(url).then(response => response.json())

// METHODE GET API PAR ULR
export const getWorks = () => get(URL_WORKS)
export const getCategories = () => get(URL_CATEGORIES)
