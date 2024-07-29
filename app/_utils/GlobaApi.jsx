const { default: axios } = require("axios");

const axiosClient = axios.create({
    baseURL:'https://strapi-ecommerce-store.onrender.com/api'
    // baseURL:'http://localhost:1337/api'
})

const getCategory = () => axiosClient.get('/categories?populate=*').then(res => {
    return res.data.data;
})

const getSlides = () => axiosClient.get('/sliders?populate=*').then(res => {
    return res.data.data;
})

const getProducts = () => axiosClient.get('/products?populate=*').then(res => {
    return res.data.data
}) 

const getProductByCategory = (categoryName) => axiosClient.get(`/products?filters[categories][name][$in]=${categoryName}&populate=*`).then(res =>{
    return res.data.data
})

const register = (username, email, password) => axiosClient.post('/auth/local/register', {username, email, password})

const login = (email, password) => axiosClient.post('/auth/local', {identifier: email, password})

const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
});

const getCartItems = (userId, jwt) => axiosClient.get(`/user-carts?filters[userId]=${userId}&populate[products][populate][0]=image`, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
}).then(res => {
    const data = res.data.data;
    const cartItemsList = data.map(item => ({
        name: item?.attributes?.products?.data[0]?.attributes.name,
        quantity: item?.attributes?.quantity,
        amount: item?.attributes?.amount,
        image: item?.attributes?.products?.data[0]?.attributes?.image?.data[0]?.attributes?.url,
        actualPrice: item?.attributes?.products?.data[0]?.attributes?.sellingPrice? item?.attributes?.products?.data[0]?.attributes?.sellingPrice : item?.attributes?.products?.data[0]?.attributes?.mrp,
        id: item.id,
        product: item?.attributes?.products?.data[0]?.id
    }))


    return cartItemsList
})

const deleteItemFromCart = (id, jwt)=> axiosClient.delete(`/user-carts/${id}`, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
})

const createOrder = (data, jwt) => axiosClient.post('/orders', data, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
});

const getOrders = (userId, jwt) => axiosClient.get(`/orders?filters[userId]=${userId}&populate[orderItemList][populate][product][populate]=image`, {
    headers: {
        Authorization: 'Bearer ' + jwt
    }
}).then(res => {
    const data = res.data.data
    const orderList = data.map(item => ({
        id: item?.id,
        totalAmount: item.attributes.amount,
        orderItemList: item.attributes.orderItemList,
        createdAt: item.attributes.createdAt
    }))
    return orderList;
})

export default {getCategory, getSlides, getProducts, getProductByCategory, register, login, addToCart, getCartItems, deleteItemFromCart, createOrder, getOrders}