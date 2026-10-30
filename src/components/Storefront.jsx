import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowRight, Bell, Check, CircleUserRound, Heart, Menu, Plus, Search, ShoppingBag, Star } from 'lucide-react'
import { money, useStore } from '../store/store'

export function Header() {
	const { cart, favorites, notifications, user } = useStore()
	const [search, setSearch] = useState('')
	const [mobileOpen, setMobileOpen] = useState(false)
	const navigate = useNavigate()
	const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
	const submitSearch = (event) => { event.preventDefault(); navigate(`/products?q=${encodeURIComponent(search)}`); setMobileOpen(false) }

	return <>
		<div className="announcement"><span>დემო მაღაზია · რეალური გადახდა ან მიტანა არ სრულდება</span><ArrowRight size={13} /></div>
		<header className="site-header">
			<button className="icon-button mobile-menu" aria-label="მენიუ" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={21} /></button>
			<Link to="/" className="brand"><span className="brand-mark">ნ</span><span>ნივთი<span className="brand-dot">.</span></span></Link>
			<nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`}>
				<NavLink to="/products">ყველა პროდუქტი</NavLink><NavLink to="/category/სახლი">სახლი</NavLink><NavLink to="/category/ტექნიკა">ტექნიკა</NavLink><NavLink to="/category/სამზარეულო">სამზარეულო</NavLink><NavLink to="/category/აქსესუარები">აქსესუარები</NavLink>
			</nav>
			<form className="search-box" onSubmit={submitSearch}><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="რას ეძებთ?" aria-label="პროდუქტის ძიება" /><kbd>↵</kbd></form>
			<div className="header-actions">
				<Link to="/notifications" className="icon-button notify-button" aria-label="შეტყობინებები" title="შეტყობინებები"><Bell size={20} />{notifications > 0 && <i />}</Link>
				<Link to="/favorites" className="icon-button" aria-label="რჩეულები" title="რჩეულები"><Heart size={20} />{favorites.length > 0 && <span className="action-count">{favorites.length}</span>}</Link>
				<Link to={user ? '/profile' : '/login'} className="icon-button" aria-label="პროფილი" title="პროფილი"><CircleUserRound size={20} /></Link>
				<Link to="/cart" className="cart-link"><ShoppingBag size={19} /><span>კალათა</span>{cartCount > 0 && <b>{cartCount}</b>}</Link>
			</div>
		</header>
	</>
}

export function Footer() {
	return <footer className="site-footer"><div className="footer-top"><Link to="/" className="brand"><span className="brand-mark">ნ</span><span>ნივთი<span className="brand-dot">.</span></span></Link><p>კარგი ნივთები. გააზრებული არჩევანი.</p><div className="footer-links"><Link to="/orders">შეკვეთები</Link><Link to="/admin">მაღაზიის მართვა</Link><a href="mailto:hello@nივთი.ge">დაგვიკავშირდით</a></div></div><div className="footer-bottom"><span>© 2026 ნივთი. ყველა უფლება დაცულია.</span><span>თბილისი, საქართველო · GEL ₾</span></div></footer>
}

export function ProductCard({ product }) {
	const { favorites, toggleFavorite, addToCart } = useStore()
	const [added, setAdded] = useState(false)
	return <article className="product-card">
		<div className="product-image-wrap"><Link to={`/product/${product.id}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy" /></Link>{product.badge && <span className="product-badge">{product.badge}</span>}<button className={`favorite-button ${favorites.includes(product.id) ? 'active' : ''}`} onClick={() => toggleFavorite(product.id)} aria-label="რჩეულებში დამატება"><Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => { addToCart(product.id); setAdded(true); window.setTimeout(() => setAdded(false), 1400) }} aria-label="კალათაში დამატება">{added ? <Check size={17} /> : <Plus size={18} />}<span>{added ? 'დამატებულია' : 'კალათაში'}</span></button></div>
		<div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={13} fill="currentColor" /> {product.rating}</span></div><Link to={`/product/${product.id}`} className="product-name">{product.name}</Link><div className="product-price">{money(product.price)}{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
	</article>
}

export function ProductGrid({ items }) {
	if (!items.length) return <div className="empty-state"><span className="empty-icon"><Search /></span><h3>პროდუქტი ვერ მოიძებნა</h3><p>სცადეთ სხვა საძიებო სიტყვა ან ფილტრი.</p><Link className="button button-dark" to="/products">ყველა პროდუქტის ნახვა</Link></div>
	return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}