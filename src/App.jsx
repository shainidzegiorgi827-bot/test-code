import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Footer, Header } from './components/Storefront'
import { AdminPage, ProductEditor } from './pages/admin'
import { AuthPage, ProfilePage } from './pages/account'
import { HomePage, ProductDetailRoute, ProductsPage } from './pages/catalog'
import { CartPage, CheckoutPage, NotificationsPage, OrderDetailPage, OrdersPage } from './pages/orders'
import { StoreProvider } from './store/StoreContext'
import './App.css'
import './theme.css'

function AppLayout() {
    return <><Header /><Routes><Route path="/" element={<HomePage />} /><Route path="/products" element={<ProductsPage />} /><Route path="/category/:slug" element={<ProductsPage />} /><Route path="/product/:id" element={<ProductDetailRoute />} /><Route path="/favorites" element={<ProductsPage favoritesOnly />} /><Route path="/cart" element={<CartPage />} /><Route path="/checkout" element={<CheckoutPage />} /><Route path="/profile" element={<ProfilePage />} /><Route path="/notifications" element={<NotificationsPage />} /><Route path="/orders" element={<OrdersPage />} /><Route path="/orders/:id" element={<OrderDetailPage />} /><Route path="/login" element={<AuthPage />} /><Route path="/register" element={<AuthPage register />} /><Route path="/admin" element={<AdminPage />} /><Route path="/admin/products/new" element={<ProductEditor />} /><Route path="/admin/products/:id/edit" element={<ProductEditor />} /><Route path="*" element={<div className="not-found"><h1>გვერდი ვერ მოიძებნა</h1><Link to="/" className="button button-dark">მთავარზე დაბრუნება</Link></div>} /></Routes><Footer /></>
}

export default function App() {
    return <StoreProvider><BrowserRouter><AppLayout /></BrowserRouter></StoreProvider>
}

