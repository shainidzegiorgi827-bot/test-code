import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, Heart, Minus, Plus, ShoppingBag, SlidersHorizontal, Sparkles, Star, Truck, X } from 'lucide-react'
import { ProductGrid } from '../components/Storefront'
import { createReviewId, money, productCategories, useStore } from '../store/store'

export function HomePage() {
    const { products, recentlyViewed } = useStore()
    const [subscribed, setSubscribed] = useState(false)
    const recentlyViewedProducts = recentlyViewed.map((id) => products.find((product) => product.id === id)).filter(Boolean)
    const newArrivals = products.filter((product) => product.badge === 'ახალი').slice(-8).reverse()
    const categories = [
        { name: 'სახლი', sub: 'სიმყუდროვე ყველა კუთხეში', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=950&q=85', color: 'category-sage' },
        { name: 'ტექნიკა', sub: 'ჭკვიანი ყოველდღიურობა', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=950&q=85', color: 'category-peach' },
        { name: 'სამზარეულო', sub: 'პატარა რიტუალები', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=950&q=85', color: 'category-blue' },
        { name: 'აქსესუარები', sub: 'შენი ყოველდღიური ამბავი', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=950&q=85', color: 'category-yellow' },
        { name: 'განათება', sub: 'სინათლე, რომელიც ცვლის სივრცეს', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=950&q=85', color: 'category-peach' },
        { name: 'სამუშაო სივრცე', sub: 'ყოველდღიური იდეებისთვის', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=950&q=85', color: 'category-blue' },
    ]
    return <main>
        <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={14} /> შერჩეული ნივთები ყოველდღიურობისთვის</span><h1>სახლი იწყება<br />პატარა <em>ამბებით.</em></h1><p>დაათვალიერე კატალოგი, შეადარე ფასები და შეინახე რჩეულები. ამ დემო მაღაზიაში შეკვეთის გაფორმებაც შეგიძლია.</p><div className="hero-buttons"><Link className="button button-dark" to="/products">პროდუქტების ნახვა <ArrowRight size={16} /></Link><a className="button button-outline" href="#how-it-works">როგორ მუშაობს? <ArrowRight size={16} /></a></div></div><div className="hero-visual"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90" alt="ნათელი, მყუდრო ინტერიერი თანამედროვე ავეჯით" /><div className="hero-sticker"><span>შენი სივრცე,</span><b>შენი ამბავი.</b><ArrowUpRight size={16} /></div><div className="hero-number">01 <span>/ 04</span></div></div><div className="hero-side-label">გააზრებული არჩევანი · თბილისი</div></section>
        <section className="trust-strip"><div><Truck size={19} /><span><b>მიტანა: 8 ₾</b> · 150 ₾-დან უფასო</span></div><div><Check size={19} /><span><b>თბილისი</b> მიტანის ამჟამინდელი ზონა</span></div><div><Heart size={19} /><span><b>რჩეულები</b> მოგვიანებით სანახავად</span></div><div><Star size={19} /><span><b>შეფასებები</b> პროდუქტის გვერდებზე</span></div></section>
        <section className="section how-it-works" id="how-it-works"><div className="section-heading"><div><span className="eyebrow">მოკლე გზამკვლევი</span><h2>როგორ გამოიყენო მაღაზია</h2></div><p>ეს დემო ვერსიაა: შეგიძლია შექმნა სატესტო შეკვეთა, მაგრამ რეალური გადახდა ან მიტანა არ სრულდება.</p></div><div className="steps-grid"><article><span>01</span><h3>იპოვე ნივთი</h3><p>დაათვალიერე კატეგორიები ან გამოიყენე ძიება. პროდუქტის გვერდზე ნახავ ფასს, აღწერასა და შეფასებებს.</p></article><article><span>02</span><h3>შეავსე კალათა</h3><p>დაამატე სასურველი ნივთები, შეცვალე რაოდენობა ან შეინახე რჩეულებში მოგვიანებით სანახავად.</p></article><article><span>03</span><h3>გააფორმე სატესტო შეკვეთა</h3><p>შეავსე საკონტაქტო და მისამართის ველები. შექმნილი შეკვეთა გამოჩნდება „შეკვეთების“ გვერდზე.</p></article></div><p className="delivery-explainer"><Truck size={16} /> კალათის ჯამი 150 ₾ ან მეტია? დემო შეჯამებაში მიტანა უფასოა; ნაკლებ ჯამზე ემატება 8 ₾.</p><Link className="button button-dark guide-cta" to="/products">კატალოგის ნახვა <ArrowRight size={16} /></Link></section>
        <section className="section categories-section"><div className="section-heading"><div><span className="eyebrow">იპოვე შენი მიმართულება</span><h2>შეარჩიე კატეგორია</h2></div><Link className="text-link" to="/products">ყველას ნახვა <ArrowRight size={15} /></Link></div><div className="category-grid">{categories.map((category, index) => <Link key={category.name} to={`/category/${category.name}`} className={`category-card ${category.color}`}><img src={category.image} alt="" loading="lazy" /><div className="category-caption"><span className="category-index">0{index + 1}</span><h3>{category.name}</h3><p>{category.sub}</p><span className="category-count">{products.filter((product) => product.category === category.name).length} ნივთი</span><span className="circle-arrow"><ArrowUpRight size={17} /></span></div></Link>)}</div></section>
        {newArrivals.length > 0 && <section className="section arrivals-section"><div className="section-heading"><div><span className="eyebrow">ახლახან შერჩეული</span><h2>ახალი დამატებები</h2></div><Link className="text-link" to="/products">კატალოგის ნახვა <ArrowRight size={15} /></Link></div><ProductGrid items={newArrivals} /></section>}
        <section className="section featured-section"><div className="section-heading"><div><span className="eyebrow">ამ კვირის არჩევანი</span><h2>ახლა ყველას უნდა</h2></div><Link className="text-link" to="/products">ყველა პროდუქტი <ArrowRight size={15} /></Link></div><ProductGrid items={products.slice(0, 8)} /></section>
        {recentlyViewedProducts.length > 0 && <section className="section recently-viewed-section"><div className="section-heading"><div><span className="eyebrow">შენი დათვალიერების ისტორია</span><h2>შენ მიერ ნანახი ნივთები</h2></div><Link className="text-link" to="/products">კატალოგში დაბრუნება <ArrowRight size={15} /></Link></div><ProductGrid items={recentlyViewedProducts} /></section>}
        <section className="section faq-section"><div className="section-heading"><div><span className="eyebrow">სწრაფი პასუხები</span><h2>ხშირად დასმული კითხვები</h2></div><Link className="text-link" to="/products">კატალოგის ნახვა <ArrowRight size={15} /></Link></div><div className="faq-list"><details><summary>რა ღირს მიტანა?<ChevronDown size={17} /></summary><p>დემო კალათაში მიტანა 8 ₾ ღირს. თუ შეკვეთის ჯამი 150 ₾ ან მეტია, მიტანა უფასოა.</p></details><details><summary>სად ხდება მიტანა?<ChevronDown size={17} /></summary><p>შეკვეთის ფორმაში ამჟამად მხოლოდ თბილისის მისამართის მითითებაა შესაძლებელი.</p></details><details><summary>რეალური შეკვეთა და გადახდა სრულდება?<ChevronDown size={17} /></summary><p>არა. ეს დემო მაღაზიაა: შეკვეთის გაფორმება მხოლოდ სატესტო ჩანაწერს ქმნის და თანხა არ ჩამოგეჭრება.</p></details><details><summary>როგორ შევინახო ნივთი მოგვიანებით სანახავად?<ChevronDown size={17} /></summary><p>დააჭირე პროდუქტის ფოტოზე არსებულ გულის ღილაკს. შენახული ნივთები „რჩეულების“ გვერდზე გამოჩნდება.</p></details></div></section>
        <section className="newsletter"><span className="eyebrow">წერილები, რომლებსაც ელოდები</span><h2>ცოტა შთაგონება<br />შენს ელფოსტაზე.</h2><form onSubmit={(event) => { event.preventDefault(); event.currentTarget.reset(); setSubscribed(true) }}><input type="email" placeholder="ელფოსტის მისამართი" aria-label="ელფოსტა" required disabled={subscribed} /><button aria-label="გამოწერა" disabled={subscribed}>{subscribed ? <Check size={19} /> : <ArrowRight size={19} />}</button></form><small role="status">{subscribed ? 'მადლობა გამოწერისთვის! მალე მოგწერთ.' : 'ახალი კოლექციები, პატარა ამბები და განსაკუთრებული შეთავაზებები.'}</small></section>
    </main>
}

export function ProductsPage({ favoritesOnly = false }) {
    const { products, favorites } = useStore()
    const [searchParams, setSearchParams] = useSearchParams()
    const { slug } = useParams()
    const query = searchParams.get('q') || ''
    const navigate = useNavigate()
    const category = slug || 'ყველა'
    const [sort, setSort] = useState('featured')
    const maxPrice = searchParams.get('maxPrice') || 'all'
    const priceLimit = maxPrice === 'all' ? Infinity : Number(maxPrice)
    const filtered = products.filter((item) => (!favoritesOnly || favorites.includes(item.id)) && (category === 'ყველა' || item.category === category) && (`${item.name} ${item.category}`.toLowerCase().includes(query.toLowerCase())) && item.price <= priceLimit)
    const sorted = [...filtered].sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : 0)
    const categories = ['ყველა', ...productCategories]
    return <main className="catalog-page">
        <div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><span>{favoritesOnly ? 'რჩეულები' : slug || 'ყველა პროდუქტი'}</span></div>
        <div className="catalog-title">
            <div><span className="eyebrow">ნივთი · კოლექცია</span><h1>{favoritesOnly ? 'შენი რჩეულები' : slug || 'ყველა პროდუქტი'}</h1><p>{favoritesOnly ? `${sorted.length} შენახული ნივთი` : `${sorted.length} ნივთი, ყურადღებით შერჩეული ყოველდღიურობისთვის`}</p></div>
            <div className="catalog-controls">
                <label className="sort-select"><SlidersHorizontal size={16} /><select value={maxPrice} onChange={(event) => setSearchParams((current) => { const next = new URLSearchParams(current); if (event.target.value === 'all') next.delete('maxPrice'); else next.set('maxPrice', event.target.value); return next })} aria-label="მაქსიმალური ფასი"><option value="all">ყველა ფასი</option><option value="100">100 ₾-მდე</option><option value="200">200 ₾-მდე</option><option value="500">500 ₾-მდე</option></select><ChevronDown size={15} /></label>
                <label className="sort-select"><SlidersHorizontal size={16} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="დალაგება"><option value="featured">რჩეული</option><option value="low">ფასი: დაბლიდან</option><option value="high">ფასი: მაღლიდან</option><option value="rating">შეფასება</option></select><ChevronDown size={15} /></label>
            </div>
        </div>
        {(query || maxPrice !== 'all') && <div className="search-result">{query && <>ძიების შედეგი: <b>„{query}“</b></>}{query && maxPrice !== 'all' && <span> · </span>}{maxPrice !== 'all' && <>ფასი: <b>{maxPrice} ₾-მდე</b></>}<button onClick={() => setSearchParams({})}><X size={14} /> ფილტრების გასუფთავება</button></div>}
        <div className="category-tabs">{categories.map((name) => <button key={name} className={category === name ? 'selected' : ''} onClick={() => navigate(name === 'ყველა' ? '/products' : `/category/${name}`)}>{name}<span>{name === 'ყველა' ? products.length : products.filter((item) => item.category === name).length}</span></button>)}</div>
        <ProductGrid items={sorted} />
    </main>
}

function ProductPage() {
    const { id } = useParams()
    const { products, favorites, toggleFavorite, addToCart, setRecentlyViewed } = useStore()
    const product = products.find((item) => item.id === id)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    useEffect(() => {
        if (!products.some((item) => item.id === id)) return
        setRecentlyViewed((items) => [id, ...items.filter((item) => item !== id)].slice(0, 4))
    }, [id, products, setRecentlyViewed])
    if (!product) return <div className="not-found"><h1>ნივთი ვერ მოიძებნა</h1><Link className="button button-dark" to="/products">კატალოგში დაბრუნება</Link></div>
    return <main className="detail-page"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><Link to="/products">კატალოგი</Link><ChevronRight size={14} /><span>{product.name}</span></div><div className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name} /><span className="detail-image-caption">ნივთი · შერჩეული კოლექცია</span></div><div className="detail-info"><span className="eyebrow">{product.category} · N° {product.id.slice(-2)}</span><h1>{product.name}</h1><div className="detail-rating"><span className="rating"><Star size={15} fill="currentColor" /> {product.rating}</span><a href="#reviews">{product.reviews} შეფასება</a><span className="stock-dot">მარაგშია</span></div><div className="detail-price">{money(product.price)} {product.oldPrice && <del>{money(product.oldPrice)}</del>}</div><p className="detail-description">{product.description}</p><div className="detail-divider" /><div className="quantity-row"><span>რაოდენობა</span><div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="რაოდენობის შემცირება"><Minus size={15} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)} aria-label="რაოდენობის გაზრდა"><Plus size={15} /></button></div></div><button className="button button-dark add-to-cart" onClick={() => { addToCart(product.id, quantity); setAdded(true); window.setTimeout(() => setAdded(false), 1800) }}>{added ? <Check size={17} /> : <ShoppingBag size={17} />}{added ? 'კალათაში დამატებულია' : 'კალათაში დამატება'}<span>{money(product.price * quantity)}</span></button><button className="detail-favorite" onClick={() => toggleFavorite(product.id)}><Heart size={17} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />{favorites.includes(product.id) ? 'რჩეულებიდან ამოღება' : 'რჩეულებში შენახვა'}</button><div className="delivery-note"><Truck size={18} /><span><b>მიტანა თბილისში 1–2 დღეში</b><small>უფასო 150 ₾-ზე მეტი შეკვეთისას</small></span></div><div className="detail-accordion"><details open><summary>აღწერა <ChevronDown size={16} /></summary><p>{product.description} თითოეული ნივთი მოწმდება გაგზავნამდე.</p></details><details><summary>მიტანა და დაბრუნება <ChevronDown size={16} /></summary><p>თბილისში მიტანა 1–2 სამუშაო დღეში. ნივთის დაბრუნება შესაძლებელია 14 დღის განმავლობაში.</p></details></div></div></div><section className="section detail-related" id="reviews"><div className="section-heading"><div><span className="eyebrow">სხვებიც ათვალიერებენ</span><h2>შენთვის შევარჩიეთ</h2></div><span className="rating"><Star size={14} fill="currentColor" /> 4.9 საშუალო შეფასება</span></div><ProductGrid items={products.filter((item) => item.id !== id).slice(0, 4)} /></section></main>
}

function ReviewDeletePanel({ product }) {
    const { reviews, setReviews } = useStore()
    const [reviewId, setReviewId] = useState('')
    const productReviews = reviews.filter((review) => review.productId === product.id)
    const selectedReview = productReviews.find((review) => review.id === reviewId)

    if (!productReviews.length) return null
    return <details className="review-delete-panel">
        <summary>შეფასების წაშლა <ChevronDown size={15} /></summary>
        <div className="review-delete-controls">
            <label htmlFor="review-to-delete">აირჩიე კომენტარი</label>
            <select id="review-to-delete" value={reviewId} onChange={(event) => setReviewId(event.target.value)}>
                <option value="">შეფასების არჩევა</option>
                {productReviews.map((review) => <option key={review.id} value={review.id}>{review.name}: {review.text.slice(0, 60)}</option>)}
            </select>
            <button type="button" className="button button-outline" disabled={!selectedReview} onClick={() => {
                if (!selectedReview || !window.confirm('წავშალო ეს შეფასება?')) return
                setReviews((items) => items.filter((review) => review.id !== selectedReview.id))
                setReviewId('')
            }}>წაშლა</button>
        </div>
    </details>
}

function ReviewsSection({ product }) {
    const { reviews, setReviews, user } = useStore()
    const [rating, setRating] = useState(5)
    const productReviews = reviews.filter((review) => review.productId === product.id)
    const submitReview = (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        setReviews((items) => [{ id: createReviewId(), productId: product.id, name: form.get('name'), rating, date: new Date().toLocaleDateString('ka-GE'), text: form.get('review') }, ...items])
        event.currentTarget.reset()
        setRating(5)
    }
    return <section className="reviews-section" id="reviews"><div className="section-heading"><div><span className="eyebrow">ნივთის გამოცდილება</span><h2>მომხმარებლების შეფასებები</h2></div><span className="rating"><Star size={14} fill="currentColor" /> {product.rating} · {product.reviews + productReviews.length} შეფასება</span></div><div className="reviews-layout"><div className="review-list">{productReviews.length ? productReviews.map((review) => <article className="review-item" key={review.id}><div className="review-heading"><span className="review-avatar">{review.name.slice(0, 1)}</span><span><b>{review.name}</b><small>{review.date}</small></span><span className="review-stars" aria-label={`${review.rating} ვარსკვლავი`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill={index < review.rating ? 'currentColor' : 'none'} />)}</span></div><p>{review.text}</p><span className="verified-label"><Check size={12} /> შეძენა დადასტურებულია</span></article>) : <div className="reviews-empty"><Star size={17} /><span>ჯერ შეფასება არ აქვს. გაუზიარე შენი გამოცდილება.</span></div>}</div><form className="review-form" onSubmit={submitReview}><span className="eyebrow">შენი აზრი მნიშვნელოვანია</span><h3>დაწერე შეფასება</h3><label>შეფასება<div className="rating-picker">{Array.from({ length: 5 }, (_, index) => <button key={index} type="button" aria-label={`${index + 1} ვარსკვლავი`} onClick={() => setRating(index + 1)}><Star size={18} fill={index < rating ? 'currentColor' : 'none'} /></button>)}</div></label><label>სახელი<input name="name" defaultValue={user?.name || ''} required placeholder="სახელი და გვარი" /></label><label>შეფასება<textarea name="review" rows="4" required minLength="8" placeholder="რას մտածեցիր այս ნივთზე?" /></label><button type="submit" className="button button-dark">შეფასების გაგზავნა <ArrowRight size={15} /></button></form></div></section>
}

export function ProductDetailRoute() {
    const { id } = useParams()
    const { products } = useStore()
    const product = products.find((item) => item.id === id)
    return <><ProductPage />{product && <><ReviewsSection product={product} /><ReviewDeletePanel product={product} /></>}</>
}
