import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Minus, Plus, ShoppingBag, Sparkles, Trash2, Truck } from 'lucide-react'
import { createOrderId, deliveryCost, money, useStore } from '../store/store'

export function NotificationsPage() {
    const { notifications, setNotifications } = useStore()
    const items = [
        { title: 'მიტანის საფასური', text: 'დემო კალათაში მიტანა 8 ₾ ღირს; 150 ₾ ან მეტი ღირებულების შეკვეთაზე საფასური ნულდება.', time: 'დღეს · 10:24', icon: Truck, fresh: notifications > 0 },
        { title: 'მოგესალმებით ნივთის მაღაზიაში', text: 'შერჩეული ნივთები უკვე მზადაა შენი ყოველდღიურობისთვის.', time: 'გუშინ · 18:40', icon: Sparkles, fresh: notifications > 1 },
    ]
    return <main className="notifications-page"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><span>შეტყობინებები</span></div><div className="page-heading"><div><span className="eyebrow">სიახლეები და განახლებები</span><h1>შეტყობინებები</h1></div>{notifications > 0 && <button className="button button-outline" onClick={() => setNotifications(0)}>ყველას წაკითხულად მონიშვნა <Check size={15} /></button>}</div><div className="notification-list">{items.map(({ title, text, time, icon: Icon, fresh }) => <article className={`notification-item ${fresh ? 'unread' : ''}`} key={title}><span className="notification-icon"><Icon size={19} /></span><div><h2>{title}{fresh && <i />}</h2><p>{text}</p><small>{time}</small></div><ChevronRight size={16} /></article>)}</div></main>
}

export function CartPage() {
    const { cart, products, updateQuantity } = useStore()
    const items = cart.map((line) => ({ ...line, product: products.find((item) => item.id === line.id) })).filter((line) => line.product)
    const subtotal = items.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
    const shipping = deliveryCost(subtotal)
    return <main className="cart-page">
        <div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><span>კალათა</span></div>
        <div className="page-heading">
            <div><span className="eyebrow">შენი არჩევანი</span><h1>კალათა <span>({items.reduce((sum, line) => sum + line.quantity, 0)})</span></h1></div>
            <Link to="/products" className="text-link">შეძენის გაგრძელება <ArrowRight size={15} /></Link>
        </div>
        {items.length ? <div className="cart-layout">
            <div className="cart-items">{items.map(({ product, quantity }) => <article className="cart-item" key={product.id}>
                <Link to={`/product/${product.id}`} className="cart-item-image"><img src={product.image} alt={product.name} /></Link>
                <div className="cart-item-info">
                    <span className="eyebrow">{product.category}</span>
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                    <span>{money(product.price)}</span>
                    <div className="quantity-control">
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="რაოდენობის შემცირება"><Minus size={14} /></button>
                        <b>{quantity}</b>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="რაოდენობის გაზრდა"><Plus size={14} /></button>
                    </div>
                </div>
                <div className="cart-item-end"><b>{money(product.price * quantity)}</b><button className="icon-button" onClick={() => updateQuantity(product.id, 0)} aria-label="წაშლა"><Trash2 size={17} /></button></div>
            </article>)}</div>
            <aside className="order-summary">
                <h2>შეკვეთის შეჯამება</h2>
                <div><span>პროდუქტები</span><span>{money(subtotal)}</span></div>
                <div><span>მიტანა</span><span>{shipping === 0 ? 'უფასო' : money(shipping)}</span></div>
                <p><Truck size={15} /> {shipping === 0 ? 'შენი შეკვეთა უფასო მიტანისთვის მზადაა' : `კიდევ ${money(150 - subtotal)} და მიტანა უფასოა`}</p>
                <div className="summary-total"><b>ჯამი</b><b>{money(subtotal + shipping)}</b></div>
                <Link to="/checkout" className="button button-dark">შეკვეთის გაფორმება <ArrowRight size={16} /></Link>
                <small><Check size={13} /> დემო შეკვეთაა · რეალური გადახდა არ სრულდება</small>
            </aside>
        </div> : <div className="empty-state cart-empty">
            <span className="empty-icon"><ShoppingBag /></span>
            <h3>კალათა ჯერ ცარიელია</h3>
            <p>იპოვე ისეთი ნივთი, რომელიც შენს ყოველდღიურობას უხდება.</p>
            <Link to="/products" className="button button-dark">კატალოგის ნახვა <ArrowRight size={16} /></Link>
        </div>}</main>
}

export function CheckoutPage() {
    const { cart, products, setCart, setOrders, user, setUser } = useStore()
    const navigate = useNavigate()
    const items = cart.map((line) => ({ ...line, product: products.find((item) => item.id === line.id) })).filter((line) => line.product)
    const subtotal = items.reduce((sum, line) => sum + line.product.price * line.quantity, 0)
    const shipping = deliveryCost(subtotal)
    if (!items.length) return <main className="empty-state checkout-empty"><h2>შეკვეთის გასაფორმებლად კალათა ცარიელია</h2><Link to="/products" className="button button-dark">კატალოგში დაბრუნება</Link></main>
    const placeOrder = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const order = {
            id: createOrderId(),
            date: new Date().toLocaleDateString('ka-GE'),
            status: 'მუშავდება',
            subtotal,
            shipping,
            total: subtotal + shipping,
            items: items.map(({ product, quantity }) => ({
                id: product.id,
                name: product.name,
                category: product.category,
                image: product.image,
                price: product.price,
                quantity,
            })),
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
            address: data.get('address'),
            city: data.get('city'),
            zip: data.get('zip'),
            note: data.get('note'),
            paymentMethod: 'კურიერთან გადახდა',
        }
        setOrders((orders) => [order, ...orders]); setUser({ name: data.get('name'), email: data.get('email') }); setCart([]); navigate(`/orders/${order.id}`)
    }
    return <main className="checkout-page">
        <div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><Link to="/cart">კალათა</Link><ChevronRight size={14} /><span>გაფორმება</span></div>
        <div className="page-heading"><div><span className="eyebrow">ბოლო ნაბიჯი</span><h1>შეკვეთის გაფორმება</h1></div></div>
        <form className="checkout-layout" onSubmit={placeOrder}>
            <div className="checkout-fields">
                <section className="form-section">
                    <div className="form-section-title"><span>01</span><div><h2>საკონტაქტო ინფორმაცია</h2><p>შეკვეთის განახლების შეტყობინებებს აქ გამოგიგზავნით.</p></div></div>
                    <label>სახელი და გვარი<input name="name" defaultValue={user?.name || ''} required placeholder="მაგ. ნინო ბერიძე" /></label>
                    <label>ელფოსტა<input name="email" type="email" defaultValue={user?.email || ''} required placeholder="nino@example.com" /></label>
                    <label>ტელეფონი<input name="phone" type="tel" required placeholder="+995 5XX XX XX XX" /></label>
                </section>
                <section className="form-section">
                    <div className="form-section-title"><span>02</span><div><h2>მიტანის მისამართი</h2><p>ამ ეტაპზე თბილისში მიტანა გვაქვს.</p></div></div>
                    <label>ქუჩა და სახლის ნომერი<input name="address" required placeholder="მაგ. ჭავჭავაძის გამზირი 12" /></label>
                    <div className="form-two"><label>ქალაქი<input name="city" value="თბილისი" readOnly /></label><label>საფოსტო კოდი<input name="zip" placeholder="0108" /></label></div>
                    <label>დამატებითი ინფორმაცია <span className="optional">არასავალდებულო</span><textarea name="note" rows="3" placeholder="სადარბაზო, სართული, მიტანის დრო..." /></label>
                </section>
                <section className="form-section">
                    <div className="form-section-title"><span>03</span><div><h2>გადახდის მეთოდი</h2><p>დემო მაღაზია: გადახდა ხდება მიტანისას.</p></div></div>
                    <label className="payment-option"><input type="radio" name="payment" defaultChecked /><span className="payment-radio" /><span><b>ნაღდი ანგარიშსწორება / ბარათით კურიერთან</b><small>გადახდა კურიერთან ნივთის მიღებისას</small></span><ShoppingBag size={19} /></label>
                </section>
            </div>
            <aside className="order-summary checkout-summary">
                <h2>შენი შეკვეთა</h2>
                {items.map(({ product, quantity }) => <div className="checkout-line" key={product.id}>
                    <span className="checkout-thumb"><img src={product.image} alt="" /><i>{quantity}</i></span>
                    <span>{product.name}</span>
                    <b>{money(product.price * quantity)}</b>
                </div>)}
                <div className="summary-row"><span>პროდუქტები</span><span>{money(subtotal)}</span></div>
                <div className="summary-row"><span>მიტანა</span><span>{shipping === 0 ? 'უფასო' : money(shipping)}</span></div>
                <div className="summary-total"><b>ჯამი</b><b>{money(subtotal + shipping)}</b></div>
                <button className="button button-dark" type="submit">შეკვეთის დადასტურება <ArrowRight size={16} /></button>
                <small><Check size={13} /> სატესტო შეკვეთაა · თანხა არ ჩამოგეჭრება</small>
            </aside>
        </form>
    </main>
}

export function OrderDetailPage() {
    const { id } = useParams()
    const { orders, products } = useStore()
    const order = orders.find((item) => item.id === id)
    if (!order) return <main className="not-found"><h1>შეკვეთა ვერ მოიძებნა</h1><Link to="/orders" className="button button-dark">შეკვეთებზე დაბრუნება</Link></main>
    const orderItems = order.items.map((line) => {
        const product = products.find((item) => item.id === line.id)
        return {
            ...line,
            name: line.name || product?.name,
            image: line.image || product?.image,
            price: line.price ?? product?.price,
        }
    }).filter((line) => line.name && Number.isFinite(Number(line.price)))
    return <main className="orders-page">
        <div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><Link to="/orders">შეკვეთები</Link><ChevronRight size={14} /><span>{order.id}</span></div>
        <div className="order-success">
            <span className="success-icon"><Check size={24} /></span>
            <span className="eyebrow">მადლობა, {order.name.split(' ')[0]}!</span>
            <h1>შეკვეთა მიღებულია.</h1>
            <p>შეკვეთის ნომერია <b>{order.id}</b>. დეტალები გამოგიგზავნეთ {order.email}-ზე.</p>
            <div className="order-detail-card">
                <div><span>შეკვეთის ნომერი</span><b>{order.id}</b></div>
                <div><span>თარიღი</span><b>{order.date}</b></div>
                <div><span>სტატუსი</span><b className="status-pill">{order.status}</b></div>
                {order.shipping != null && <div><span>მიტანა</span><b>{order.shipping === 0 ? 'უფასო' : money(order.shipping)}</b></div>}
                <div><span>ჯამი</span><b>{money(order.total)}</b></div>
                {(order.address || order.phone) && <div className="order-delivery-details"><span>მიტანის დეტალები</span><b>{[order.city, order.address].filter(Boolean).join(', ')}</b><small>{[order.phone, order.zip].filter(Boolean).join(' · ')}</small>{order.note && <small>{order.note}</small>}</div>}
                <div className="order-detail-products">
                    {orderItems.map((line) => <div key={line.id}>
                        {line.image && <img src={line.image} alt={line.name} />}
                        <span>{line.name}<small>რაოდენობა: {line.quantity}</small></span>
                        <b>{money(line.price * line.quantity)}</b>
                    </div>)}
                </div>
            </div>
            <Link className="text-link" to="/products">შეძენის გაგრძელება <ArrowRight size={15} /></Link>
        </div>
    </main>
}

export function OrdersPage() {
    const { orders } = useStore()
    return <main className="orders-page"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><span>შეკვეთები</span></div><div className="page-heading"><div><span className="eyebrow">შენი შენაძენები</span><h1>შეკვეთები</h1></div></div>{orders.length ? <div className="orders-table-wrap"><table className="orders-table"><thead><tr><th>შეკვეთა</th><th>თარიღი</th><th>ნივთები</th><th>სტატუსი</th><th>ჯამი</th><th></th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><Link to={`/orders/${order.id}`}>{order.id}</Link></td><td>{order.date}</td><td>{order.items.length} ნივთი</td><td><span className="status-pill">{order.status}</span></td><td>{money(order.total)}</td><td><Link to={`/orders/${order.id}`} className="table-link">დეტალები <ArrowUpRight size={14} /></Link></td></tr>)}</tbody></table></div> : <div className="empty-state"><span className="empty-icon"><ShoppingBag /></span><h3>შეკვეთები ჯერ არ გაქვს</h3><p>შენი პირველი შენაძენის ისტორია აქ გამოჩნდება.</p><Link to="/products" className="button button-dark">პროდუქტების ნახვა</Link></div>}</main>
}
