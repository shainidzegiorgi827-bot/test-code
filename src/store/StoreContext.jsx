import { useEffect, useState } from 'react'
import { api, readStorage, seedProducts, seedReviews, StoreContext } from './store'

export function StoreProvider({ children }) {
	const [products, setProducts] = useState(seedProducts)
	const [cart, setCart] = useState(() => readStorage('nivti-cart', []))
	const [favorites, setFavorites] = useState(() => readStorage('nivti-favorites', []))
	const [orders, setOrders] = useState(() => readStorage('nivti-orders', []))
	const [user, setUser] = useState(() => readStorage('nivti-user', null))
	const [notifications, setNotifications] = useState(() => readStorage('nivti-notifications', 2))
	const [reviews, setReviews] = useState(() => readStorage('nivti-reviews', seedReviews))
	const [recentlyViewed, setRecentlyViewed] = useState(() => readStorage('nivti-recently-viewed', []))

	useEffect(() => { api.getProducts().then(setProducts) }, [])
	useEffect(() => { api.saveProducts(products) }, [products])
	useEffect(() => { localStorage.setItem('nivti-cart', JSON.stringify(cart)) }, [cart])
	useEffect(() => { localStorage.setItem('nivti-favorites', JSON.stringify(favorites)) }, [favorites])
	useEffect(() => { localStorage.setItem('nivti-orders', JSON.stringify(orders)) }, [orders])
	useEffect(() => { localStorage.setItem('nivti-user', JSON.stringify(user)) }, [user])
	useEffect(() => { localStorage.setItem('nivti-notifications', JSON.stringify(notifications)) }, [notifications])
	useEffect(() => { localStorage.setItem('nivti-reviews', JSON.stringify(reviews)) }, [reviews])
	useEffect(() => { localStorage.setItem('nivti-recently-viewed', JSON.stringify(recentlyViewed)) }, [recentlyViewed])

	const addToCart = (id, amount = 1) => setCart((items) => {
		const found = items.find((item) => item.id === id)
		return found ? items.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item) : [...items, { id, quantity: amount }]
	})
	const toggleFavorite = (id) => setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id])
	const updateQuantity = (id, quantity) => setCart((items) => quantity < 1 ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, quantity } : item))
	const value = { products, setProducts, cart, setCart, favorites, orders, setOrders, user, setUser, notifications, setNotifications, reviews, setReviews, recentlyViewed, setRecentlyViewed, addToCart, toggleFavorite, updateQuantity }
	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}