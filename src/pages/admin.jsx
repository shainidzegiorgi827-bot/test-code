import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Plus, Star, Trash2 } from 'lucide-react'
import { money, productCategories, useStore } from '../store/store'

export function AdminPage() {
    const { products, setProducts, orders } = useStore()
    const revenue = orders.reduce((sum, order) => sum + order.total, 0)
    const deleteProduct = (id) => { if (window.confirm('ნამდვილად წავშალოთ ეს პროდუქტი?')) setProducts((items) => items.filter((item) => item.id !== id)) }
    return <main className="admin-page"><div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><span>ადმინ პანელი</span></div><div className="admin-header"><div><span className="eyebrow">მაღაზიის მართვა</span><h1>კარგი დილა, ადმინისტრატორო.</h1><p>აქედან მართავ ნივთებს, შეკვეთებს და გაყიდვებს.</p></div><Link className="button button-dark" to="/admin/products/new"><Plus size={17} /> პროდუქტის დამატება</Link></div><div className="admin-metrics"><div><span>სულ გაყიდვები</span><b>{money(revenue)}</b><small><ArrowUpRight size={13} /> {orders.length} შეკვეთა</small></div><div><span>შეკვეთები</span><b>{orders.length}</b><small>ყველა პერიოდი</small></div><div><span>პროდუქტები</span><b>{products.length}</b><small>აქტიური კატალოგი</small></div><div><span>საშუალო შეფასება</span><b>4.8 <Star size={19} fill="currentColor" /></b><small>კატალოგის შეფასება</small></div></div><section className="admin-panel"><div className="admin-panel-heading"><div><span className="eyebrow">კატალოგი</span><h2>პროდუქტების მართვა</h2></div><Link className="text-link" to="/products">მაღაზიის ნახვა <ArrowUpRight size={15} /></Link></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>პროდუქტი</th><th>კატეგორია</th><th>ფასი</th><th>შეფასება</th><th>მოქმედება</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td><div className="admin-product-cell"><img src={product.image} alt="" /><b>{product.name}</b></div></td><td>{product.category}</td><td>{money(product.price)}</td><td><span className="rating"><Star size={13} fill="currentColor" /> {product.rating}</span></td><td><div className="admin-actions"><Link to={`/admin/products/${product.id}/edit`} className="table-link">რედაქტირება <ArrowUpRight size={14} /></Link><button aria-label="პროდუქტის წაშლა" onClick={() => deleteProduct(product.id)}><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div></section><section className="admin-panel sales-panel"><div className="admin-panel-heading"><div><span className="eyebrow">ბოლო აქტივობა</span><h2>შეკვეთები</h2></div><Link className="text-link" to="/orders">ყველა შეკვეთა <ArrowRight size={15} /></Link></div>{orders.length ? <div className="orders-table-wrap"><table className="orders-table"><thead><tr><th>შეკვეთა</th><th>მყიდველი</th><th>თარიღი</th><th>სტატუსი</th><th>ჯამი</th></tr></thead><tbody>{orders.slice(0, 5).map((order) => <tr key={order.id}><td><Link to={`/orders/${order.id}`}>{order.id}</Link></td><td>{order.name}</td><td>{order.date}</td><td><span className="status-pill">{order.status}</span></td><td>{money(order.total)}</td></tr>)}</tbody></table></div> : <p className="admin-empty">შეკვეთები ჯერ არ არის. პირველი გაყიდვა აქ გამოჩნდება.</p>}</section></main>
}

export function ProductEditor() {
    const { id } = useParams()
    const { products, setProducts } = useStore()
    const navigate = useNavigate()
    const existing = products.find((product) => product.id === id)
    const save = (event) => {
        event.preventDefault()
        const form = new FormData(event.currentTarget)
        const product = { id: existing?.id || `p${Date.now()}`, name: form.get('name'), category: form.get('category'), price: Number(form.get('price')), oldPrice: Number(form.get('oldPrice')) || null, image: form.get('image'), description: form.get('description'), rating: existing?.rating || 5, reviews: existing?.reviews || 0, badge: form.get('badge') }
        setProducts((items) => existing ? items.map((item) => item.id === id ? product : item) : [product, ...items]); navigate('/admin')
    }
    return <main className="editor-page">
        <div className="breadcrumbs"><Link to="/">მთავარი</Link><ChevronRight size={14} /><Link to="/admin">ადმინ პანელი</Link><ChevronRight size={14} /><span>{existing ? 'რედაქტირება' : 'ახალი პროდუქტი'}</span></div>
        <div className="editor-wrap">
            <span className="eyebrow">კატალოგის მართვა</span>
            <h1>{existing ? 'პროდუქტის რედაქტირება' : 'ახალი პროდუქტი'}</h1>
            <p>შეავსე პროდუქტის ინფორმაცია, დანარჩენს მაღაზია მიხედავს.</p>
            <form className="editor-form" onSubmit={save}>
                <label>პროდუქტის სახელი<input name="name" defaultValue={existing?.name} required placeholder="მაგ. კერამიკული ფინჯანი" /></label>
                <div className="form-two">
                    <label>კატეგორია<select name="category" defaultValue={existing?.category || 'სახლი'}>{productCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
                    <label>ნიშანი<input name="badge" defaultValue={existing?.badge} placeholder="მაგ. ახალი" /></label>
                </div>
                <div className="form-two">
                    <label>ფასი (₾)<input name="price" type="number" min="0" step="0.01" defaultValue={existing?.price} required /></label>
                    <label>ძველი ფასი (₾)<input name="oldPrice" type="number" min="0" step="0.01" defaultValue={existing?.oldPrice || ''} /></label>
                </div>
                <label>სურათის ბმული<input name="image" type="url" defaultValue={existing?.image} required placeholder="https://..." /></label>
                <label>აღწერა<textarea name="description" rows="4" defaultValue={existing?.description} required placeholder="მოკლედ აღწერე პროდუქტი..." /></label>
                <div className="editor-actions"><Link to="/admin" className="button button-outline">გაუქმება</Link><button type="submit" className="button button-dark"><Check size={16} /> შენახვა</button></div>
            </form>
        </div>
    </main>
}
