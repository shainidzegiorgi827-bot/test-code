import { createContext, useContext } from 'react'

export const productCategories = ['სახლი', 'ტექნიკა', 'სამზარეულო', 'აქსესუარები', 'განათება', 'სამუშაო სივრცე']

export const seedProducts = [
	{ id: 'p1', name: 'მინიმალისტური მაგიდის სანათი', category: 'სახლი', price: 189, oldPrice: 229, rating: 4.9, reviews: 42, badge: 'ბესტსელერი', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', description: 'თბილი განათება და სუფთა ფორმა, რომელიც ნებისმიერ კუთხეს სიმყუდროვეს მატებს.' },
	{ id: 'p2', name: 'კერამიკული ყავის ნაკრები', category: 'სამზარეულო', price: 96, rating: 4.8, reviews: 28, badge: 'ხელნაკეთი', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85', description: 'ხელით დამზადებული კერამიკის ორი ფინჯანი ყოველდღიური რიტუალისთვის.' },
	{ id: 'p3', name: 'სკანდინავიური სავარძელი', category: 'სახლი', price: 790, oldPrice: 890, rating: 4.9, reviews: 16, badge: '−11%', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=85', description: 'გამძლე მუხის ხე, რბილი ქსოვილი და ფორმა, რომელიც წლების შემდეგაც აქტუალური იქნება.' },
	{ id: 'p4', name: 'ყურსასმენები Studio One', category: 'ტექნიკა', price: 249, rating: 4.7, reviews: 61, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', description: 'სუფთა ხმა, კომფორტული მორგება და 30 საათამდე მუშაობა ერთი დამუხტვით.' },
	{ id: 'p5', name: 'ქსოვილის სანათი, დიდი', category: 'სახლი', price: 320, rating: 4.8, reviews: 19, badge: '', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=85', description: 'ბუნებრივი ქსოვილის აბაჟური რბილ და თანაბარ შუქს ქმნის.' },
	{ id: 'p6', name: 'მზის სათვალე „ხაზი“', category: 'აქსესუარები', price: 145, oldPrice: 175, rating: 4.6, reviews: 33, badge: '−17%', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85', description: 'მსუბუქი ჩარჩო და UV400 დაცვა მზიანი დღეებისთვის.' },
	{ id: 'p7', name: 'ხის საუზმის დაფა', category: 'სამზარეულო', price: 74, rating: 4.9, reviews: 25, badge: 'ხელნაკეთი', image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85', description: 'მდგრადი აკაციის ხისგან დამზადებული მრავალფუნქციური დაფა.' },
	{ id: 'p8', name: 'პორტატული დინამიკი', category: 'ტექნიკა', price: 179, rating: 4.7, reviews: 37, badge: '', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85', description: 'კომპაქტური წყალგამძლე დინამიკი 12 საათიანი ელემენტით.' },
	{ id: 'p9', name: 'ბამბის თეთრეულის ნაკრები', category: 'სახლი', price: 235, oldPrice: 275, rating: 4.9, reviews: 31, badge: '−15%', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85', description: 'რბილი, სუნთქვადი ბამბის თეთრეული მშვიდი ძილისა და მარტივი მოვლისთვის.' },
	{ id: 'p10', name: 'ხელნაკეთი კერამიკული ვაზა', category: 'სახლი', price: 112, rating: 4.8, reviews: 14, badge: 'ხელნაკეთი', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85', description: 'ადგილობრივი კერამიკის სახელოსნოში შექმნილი ვაზა, რომელიც ყვავილებთან ერთადაც და ცალკეც ლამაზად გამოიყურება.' },
	{ id: 'p11', name: 'მექანიკური კლავიატურა', category: 'ტექნიკა', price: 289, rating: 4.7, reviews: 22, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=85', description: 'კომპაქტური უკაბელო კლავიატურა მშვიდი მექანიკური ღილაკებითა და USB-C დამუხტვით.' },
	{ id: 'p12', name: 'მინის წყლის ბოთლი', category: 'სამზარეულო', price: 48, rating: 4.6, reviews: 18, badge: '', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85', description: 'გამძლე ბოროსილიკატური მინა და დამცავი სილიკონის გარსი ყოველდღიური გამოყენებისთვის.' },
	{ id: 'p13', name: 'ტყავის ყოველდღიური ჩანთა', category: 'აქსესუარები', price: 345, oldPrice: 390, rating: 4.9, reviews: 27, badge: '−12%', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85', description: 'რბილი ნატურალური ტყავის ჩანთა მოსახერხებელი შიდა ჯიბითა და რეგულირებადი სახელურით.' },
	{ id: 'p14', name: 'თუჯის ტაფა, 26 სმ', category: 'სამზარეულო', price: 158, rating: 4.8, reviews: 36, badge: 'ბესტსელერი', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85', description: 'თანაბარი გაცხელება და გამძლე საფარი ყოველდღიური კერძებისთვის; თავსებადია ყველა ტიპის ქურასთან.' },
	{ id: 'p15', name: 'შალის მოსასხამი', category: 'სახლი', price: 129, rating: 4.7, reviews: 12, badge: '', image: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=900&q=85', description: 'რბილი, თბილი მოსასხამი ბუნებრივი ტექსტურით, რომელიც დივანთან საღამოსთვის იდეალურია.' },
	{ id: 'p16', name: 'ფაიფურის ჩაის ნაკრები', category: 'სამზარეულო', price: 185, rating: 4.9, reviews: 20, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=85', description: 'ჩაიდანი და ორი ფინჯანი თხელი ფაიფურისგან — დილის ჩაისა და სტუმრებისთვის.' },
	{ id: 'p17', name: 'თაღოვანი იატაკის სანათი', category: 'განათება', price: 465, rating: 4.9, reviews: 11, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', description: 'მოხრილი ლითონის კონსტრუქცია და რბილი, თბილი შუქი კითხვისა და დასვენებისთვის.' },
	{ id: 'p18', name: 'მინის პორტატული სანათი', category: 'განათება', price: 139, rating: 4.8, reviews: 8, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', description: 'დამუხტვადი პატარა სანათი მსუბუქი მინის კორპუსით — შეგიძლია ოთახიდან ოთახში გადაიტანო.' },
	{ id: 'p19', name: 'მუხის სამუშაო მაგიდა', category: 'სამუშაო სივრცე', price: 549, rating: 4.8, reviews: 9, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85', description: 'კომპაქტური სამუშაო მაგიდა ბუნებრივი მუხის ზედაპირითა და მოწესრიგებული კაბელების არხით.' },
	{ id: 'p20', name: 'მეტალის მაგიდის ორგანიზატორი', category: 'სამუშაო სივრცე', price: 68, rating: 4.7, reviews: 15, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85', description: 'საკანცელარიო ნივთების, დამტენებისა და პატარა აქსესუარების მოწესრიგებული ადგილი.' },
	{ id: 'p21', name: 'უკაბელო დამტენი სადგამი', category: 'ტექნიკა', price: 89, rating: 4.6, reviews: 13, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85', description: 'ტელეფონის მოსახერხებელი სადგამი სწრაფი უსადენო დამუხტვით და USB-C კავშირით.' },
	{ id: 'p22', name: 'ნაქსოვი სათავსო კალათა', category: 'სახლი', price: 78, rating: 4.8, reviews: 17, badge: 'ხელნაკეთი', image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85', description: 'ხელით მოქსოვილი მრავალფუნქციური კალათა პლედების, ჟურნალებისა და ყოველდღიური ნივთებისთვის.' },
	{ id: 'p23', name: 'სერვირების კერამიკული თეფშები', category: 'სამზარეულო', price: 124, rating: 4.9, reviews: 21, badge: 'ხელნაკეთი', image: 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?auto=format&fit=crop&w=900&q=85', description: 'ორი ხელნაკეთი თეფში ბუნებრივი მინანქრით — ყოველდღიური სუფრისთვის და სტუმრებისთვის.' },
	{ id: 'p24', name: 'ბარათების ტყავის საფულე', category: 'აქსესუარები', price: 98, rating: 4.7, reviews: 19, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85', description: 'თხელი ნატურალური ტყავის საფულე ბარათების რამდენიმე განყოფილებითა და ჯიბით.' },
	{ id: 'p25', name: 'თეთრეულის სუფრის გადასაფარებელი', category: 'სახლი', price: 115, rating: 4.8, reviews: 10, badge: '', image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85', description: 'ბუნებრივი სელის ტექსტურა, რომელიც ყოველდღიურ სუფრას მშვიდ და მოწესრიგებულ იერს აძლევს.' },
	{ id: 'p26', name: 'ალუმინის ლეპტოპის სადგამი', category: 'სამუშაო სივრცე', price: 119, rating: 4.8, reviews: 24, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=85', description: 'მსუბუქი, სიმაღლით აწეული სადგამი, რომელიც სამუშაო მაგიდას ათავისუფლებს და ეკრანის პოზიციას აუმჯობესებს.' },
	{ id: 'p27', name: 'კერამიკული ქოთანი ოთახის მცენარისთვის', category: 'სახლი', price: 86, rating: 4.8, reviews: 12, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85', description: 'მინიმალისტური კერამიკული ქოთანი, რომელიც მცენარესა და ინტერიერს ბუნებრივ აქცენტს მატებს.' },
	{ id: 'p28', name: 'ციფრული ფოტოაპარატი Pocket', category: 'ტექნიკა', price: 429, rating: 4.7, reviews: 18, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85', description: 'კომპაქტური ფოტოაპარატი ყოველდღიური მოგონებების გადასაღებად და მარტივად გასაზიარებლად.' },
	{ id: 'p29', name: 'ქალაქის ზურგჩანთა', category: 'აქსესუარები', price: 198, rating: 4.8, reviews: 23, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85', description: 'მსუბუქი და გამძლე ზურგჩანთა ყოველდღიური ნივთებისა და ლეპტოპის მოსახერხებლად სატარებლად.' },
	{ id: 'p30', name: 'ხის სერვირების ჯამი', category: 'სამზარეულო', price: 92, rating: 4.9, reviews: 16, badge: 'ხელნაკეთი', image: 'https://images.unsplash.com/photo-1576021182211-9ea8dced3690?auto=format&fit=crop&w=900&q=85', description: 'ბუნებრივი ხისგან დამზადებული ჯამი ხილის, სალათისა და სუფრის გასაფორმებლად.' },
	{ id: 'p31', name: 'ყდის ბლოკნოტი ყოველდღიური ჩანაწერებისთვის', category: 'სამუშაო სივრცე', price: 42, rating: 4.8, reviews: 14, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85', description: 'მყარი ყდის ბლოკნოტი იდეების, გეგმებისა და ყოველდღიური ჩანაწერებისთვის.' },
	{ id: 'p32', name: 'კითხვის კუთხის იატაკის სანათი', category: 'განათება', price: 389, rating: 4.9, reviews: 10, badge: 'ახალი', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', description: 'მიმართული თბილი განათება საღამოს კითხვისა და მშვიდი დასვენებისთვის.' },
]

export const seedReviews = [
	{ id: 'r1', productId: 'p1', name: 'ნინო ბ.', rating: 5, date: '12 სექტემბერი, 2026', text: 'ზუსტად ისეთი თბილი შუქი აქვს, როგორსაც ვეძებდი. შეფუთვაც ძალიან ლამაზი იყო.' },
	{ id: 'r2', productId: 'p1', name: 'მარიამ კ.', rating: 5, date: '3 სექტემბერი, 2026', text: 'კარგი ხარისხი და მარტივი აწყობა. უკვე ჩემს საყვარელ კუთხეში დგას.' },
	{ id: 'r3', productId: 'p2', name: 'თამარ ლ.', rating: 5, date: '8 სექტემბერი, 2026', text: 'ფინჯნები ხელში ძალიან სასიამოვნოდ იგრძნობა, ფერიც ზუსტად ემთხვევა ფოტოს.' },
]

export const StoreContext = createContext(null)
export const readStorage = (key, fallback) => {
	try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
export const api = {
	getProducts: async () => {
		const savedProducts = readStorage('nivti-products', null)
		if (!savedProducts) return seedProducts
		const catalogVersion = Number(readStorage('nivti-catalog-version', 0))
		if (catalogVersion < 4) {
			const savedIds = new Set(savedProducts.map((product) => product.id))
			const catalogUpdates = catalogVersion < 3 ? seedProducts : seedProducts.slice(26)
			const updatedProducts = [...savedProducts, ...catalogUpdates.filter((product) => !savedIds.has(product.id))]
			localStorage.setItem('nivti-catalog-version', '4')
			return updatedProducts
		}
		return savedProducts
	},
	saveProducts: (products) => localStorage.setItem('nivti-products', JSON.stringify(products)),
}
export const money = (value) => `${Number(value).toLocaleString('ka-GE')} ₾`
export const deliveryCost = (subtotal) => subtotal >= 150 ? 0 : 8
export const createOrderId = () => `NV-${Date.now().toString().slice(-6)}`
export const createReviewId = () => globalThis.crypto.randomUUID()
export const useStore = () => useContext(StoreContext)