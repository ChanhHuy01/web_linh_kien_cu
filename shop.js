// ========================
// DỮ LIỆU SẢN PHẨM
// ========================
const allProducts = [
  { id:1,  name:'Intel Core i7-10700K',       cat:'CPU',      brand:'Intel',    price:3200000,  oldPrice:4500000,  img:'🔲', badge:'hot',  condClass:'great', condPct:95, specs:['8 nhân 16 luồng','3.8–5.1GHz','LGA1200'],         seller:'TechStore VN',  rating:5, reviews:24, desc:'CPU Intel hiệu năng cao, phù hợp gaming & lập trình. Đã test benchmark đầy đủ, hoạt động ổn định.', condition_detail:'95% – Như mới',  warranty:6, warrantyLabel:'6 tháng', origin:'Intel – Mỹ',          used:'3 tháng' },
  { id:2,  name:'Kingston 16GB DDR4 3200MHz',  cat:'RAM',      brand:'Kingston', price:780000,   oldPrice:1100000,  img:'🧩', badge:'sale', condClass:'good',  condPct:85, specs:['16GB DDR4','3200MHz','CL16'],                      seller:'RAM Shop HN',    rating:4, reviews:18, desc:'RAM tốc độ cao, tương thích nhiều mainboard. Đã pass memtest86, hoạt động bình thường.',           condition_detail:'85% – Còn tốt',  warranty:3, warrantyLabel:'3 tháng', origin:'Kingston – Đài Loan',used:'8 tháng' },
  { id:3,  name:'RTX 3060 Ti 8GB GDDR6',       cat:'GPU',      brand:'NVIDIA',   price:7500000,  oldPrice:11000000, img:'🖥️', badge:'hot',  condClass:'great', condPct:90, specs:['8GB GDDR6','HDMI 2.1','PCIe 4.0'],                 seller:'GPU Zone',       rating:5, reviews:41, desc:'Card gaming mạnh mẽ, phù hợp 1440p. Không đào coin, còn bảo hành hãng đến tháng 8/2025.',       condition_detail:'90% – Rất tốt',  warranty:5, warrantyLabel:'5 tháng', origin:'NVIDIA – Mỹ',        used:'5 tháng' },
  { id:4,  name:'ASUS ROG STRIX B550-F',        cat:'Mainboard',brand:'ASUS',     price:2800000,  oldPrice:3900000,  img:'🔌', badge:'new',  condClass:'good',  condPct:88, specs:['AM4','DDR4 x4','PCIe 4.0'],                        seller:'MainboardVN',    rating:4, reviews:12, desc:'Mainboard cao cấp ROG, hỗ trợ Ryzen 5000. Đầy đủ phụ kiện, chạy ổn định.',                       condition_detail:'88% – Còn tốt',  warranty:4, warrantyLabel:'4 tháng', origin:'ASUS – Đài Loan',    used:'6 tháng' },
  { id:5,  name:'Samsung 970 EVO 1TB NVMe',     cat:'SSD',      brand:'Samsung',  price:1200000,  oldPrice:1800000,  img:'💾', badge:'sale', condClass:'good',  condPct:80, specs:['1TB NVMe','M.2 PCIe 3.0','3500MB/s'],              seller:'StoragePro',     rating:4, reviews:9,  desc:'SSD nhanh và ổn định. Đã kiểm tra health 80%, phù hợp cho hệ điều hành và lưu trữ.',           condition_detail:'80% – Dùng được',warranty:2, warrantyLabel:'2 tháng', origin:'Samsung – Hàn Quốc', used:'14 tháng'},
  { id:6,  name:'Corsair RM750x 750W 80+ Gold', cat:'Nguồn',    brand:'Corsair',  price:1500000,  oldPrice:2200000,  img:'⚡', badge:'new',  condClass:'great', condPct:95, specs:['750W','80+ Gold','Full Modular'],                   seller:'PowerVN',        rating:5, reviews:33, desc:'Nguồn đạt chuẩn 80+ Gold, full modular, còn bảo hành Corsair 3 năm. Mới gần như 100%.',        condition_detail:'95% – Như mới',  warranty:6, warrantyLabel:'6 tháng', origin:'Corsair – Mỹ',       used:'2 tháng' },
  { id:7,  name:'AMD Ryzen 7 5800X',            cat:'CPU',      brand:'AMD',      price:4200000,  oldPrice:6500000,  img:'🔲', badge:'hot',  condClass:'great', condPct:92, specs:['8 nhân 16 luồng','3.8–4.7GHz','AM4'],             seller:'AMD Center',     rating:5, reviews:57, desc:'CPU AMD mạnh mẽ cho cả gaming lẫn đa nhiệm. Hiệu năng vượt trội tầm giá, chưa OC lần nào.',   condition_detail:'92% – Như mới',  warranty:5, warrantyLabel:'5 tháng', origin:'AMD – Mỹ',           used:'4 tháng' },
  { id:8,  name:'Crucial 32GB DDR4 3600MHz',    cat:'RAM',      brand:'Crucial',  price:1400000,  oldPrice:2100000,  img:'🧩', badge:'sale', condClass:'fair',  condPct:75, specs:['32GB DDR4','3600MHz','CL18'],                      seller:'MemoryShop',     rating:3, reviews:7,  desc:'Bộ RAM 32GB cho workstation, render, lập trình. Tình trạng dùng được, test ổn định 72 giờ.',  condition_detail:'75% – Bình thường',warranty:2,warrantyLabel:'2 tháng', origin:'Crucial – Mỹ',       used:'18 tháng'},
  { id:9,  name:'WD Blue 2TB HDD 7200RPM',      cat:'SSD',      brand:'WD',       price:650000,   oldPrice:950000,   img:'💾', badge:'sale', condClass:'good',  condPct:82, specs:['2TB HDD','7200RPM','SATA III'],                     seller:'StoragePro',     rating:4, reviews:15, desc:'Ổ cứng dung lượng lớn cho lưu trữ phim, game. Health 82%, không bad sector.',                  condition_detail:'82% – Còn tốt',  warranty:2, warrantyLabel:'2 tháng', origin:'WD – Mỹ',            used:'10 tháng'},
  { id:10, name:'Cooler Master Hyper 212',       cat:'Nguồn',    brand:'Cooler Master',price:280000,oldPrice:450000,  img:'❄️', badge:'new',  condClass:'great', condPct:97, specs:['TDP 150W','PWM Fan','Intel/AMD'],                   seller:'CoolerVN',       rating:5, reviews:22, desc:'Tản nhiệt khí hiệu năng cao, tương thích rộng, lắp đặt dễ. Như mới, còn đầy đủ phụ kiện.',  condition_detail:'97% – Như mới',  warranty:3, warrantyLabel:'3 tháng', origin:'Cooler Master – TW', used:'1 tháng' },
  { id:11, name:'MSI MAG B460M Mortar',          cat:'Mainboard',brand:'MSI',      price:1200000,  oldPrice:1800000,  img:'🔌', badge:'sale', condClass:'good',  condPct:83, specs:['LGA1200','DDR4 x4','M.2 x2'],                      seller:'MainboardVN',    rating:4, reviews:8,  desc:'Mainboard mini-ITX compact, hỗ trợ Intel Gen 10/11. Phù hợp build PC nhỏ gọn.',             condition_detail:'83% – Còn tốt',  warranty:3, warrantyLabel:'3 tháng', origin:'MSI – Đài Loan',     used:'9 tháng' },
  { id:12, name:'ASUS TUF RTX 3070 8GB',         cat:'GPU',      brand:'ASUS',     price:9500000,  oldPrice:14000000, img:'🖥️', badge:'hot',  condClass:'great', condPct:91, specs:['8GB GDDR6','PCIe 4.0','3xDP+HDMI'],                seller:'GPU Zone',       rating:5, reviews:38, desc:'Card gaming RTX 3070 TUF, tản nhiệt tốt, không đào coin. Phù hợp 1440p và 4K gaming.',      condition_detail:'91% – Rất tốt',  warranty:6, warrantyLabel:'6 tháng', origin:'ASUS – Đài Loan',    used:'6 tháng' },
];

// ========================
// TRẠNG THÁI BỘ LỌC
// ========================
let state = {
  search:    '',
  cat:       'all',
  priceMin:  0,
  priceMax:  15000000,
  conds:     [],
  brands:    [],
  warranty:  0,
  sort:      '',
  view:      'grid',
  page:      1,
  perPage:   9,
};

let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

// ========================
// FILTER & RENDER
// ========================
function getFiltered() {
  return allProducts.filter(p => {
    if (state.cat !== 'all' && p.cat !== state.cat) return false;
    if (p.price < state.priceMin || p.price > state.priceMax) return false;
    if (state.conds.length && !state.conds.includes(p.condClass)) return false;
    if (state.brands.length && !state.brands.includes(p.brand)) return false;
    if (state.warranty && p.warranty < state.warranty) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.cat.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function getSorted(data) {
  const d = [...data];
  if (state.sort === 'price-asc')  return d.sort((a,b) => a.price - b.price);
  if (state.sort === 'price-desc') return d.sort((a,b) => b.price - a.price);
  if (state.sort === 'newest')     return d.reverse();
  if (state.sort === 'condition')  return d.sort((a,b) => b.condPct - a.condPct);
  if (state.sort === 'popular')    return d.sort((a,b) => b.reviews - a.reviews);
  return d;
}

function renderProducts() {
  const filtered = getSorted(getFiltered());
  const total    = filtered.length;
  const totalPages = Math.ceil(total / state.perPage);
  if (state.page > totalPages) state.page = 1;

  const start = (state.page - 1) * state.perPage;
  const paged = filtered.slice(start, start + state.perPage);

  const grid  = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');

  // Result count
  document.getElementById('resultCount').innerHTML =
    `Hiển thị <strong>${paged.length}</strong> / <strong>${total}</strong> sản phẩm`;

  if (!paged.length) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    document.getElementById('pagination').innerHTML = '';
    return;
  }
  empty.style.display = 'none';

  grid.innerHTML = paged.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      <span class="product-badge badge-${p.badge}">
        ${p.badge==='hot'?'🔥 Hot':p.badge==='new'?'✨ Mới':'🏷️ Sale'}
      </span>
      <button class="product-fav" onclick="event.stopPropagation();toggleFav(this,${p.id})">
        <i class="${isFav(p.id)?'fas':'far'} fa-heart"></i>
      </button>
      <div class="product-img">
        <div style="font-size:4.5rem;z-index:1;position:relative;">${p.img}</div>
        <div class="product-img-overlay">
          <button class="quick-view-btn">Xem nhanh</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-specs">
          ${p.specs.slice(0,2).map(s=>`<span class="spec-tag">${s}</span>`).join('')}
        </div>
        <div class="product-condition">
          <div class="condition-bar">
            <div class="condition-fill ${p.condClass}" style="width:${p.condPct}%"></div>
          </div>
          <span class="condition-text">${p.condPct}%</span>
        </div>
        <div class="product-footer">
          <div>
            <div class="product-price">${fmt(p.price)}</div>
            <div class="product-price-old">${fmt(p.oldPrice)}</div>
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation();addToCart(${p.id})">
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <div class="product-seller">
        <div class="seller-avatar">${p.seller[0]}</div>
        <span class="seller-name">${p.seller}</span>
        <span class="seller-rating">${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)}</span>
      </div>
    </div>
  `).join('');

  renderPagination(total, totalPages);
  renderActiveFilters();
}

// ========================
// PAGINATION
// ========================
function renderPagination(total, totalPages) {
  const pg = document.getElementById('pagination');
  if (totalPages <= 1) { pg.innerHTML = ''; return; }

  let html = `
    <button class="page-btn" onclick="goPage(${state.page-1})" ${state.page===1?'disabled':''}>
      <i class="fas fa-chevron-left"></i>
    </button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - state.page) <= 1) {
      html += `<button class="page-btn ${i===state.page?'active':''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - state.page) === 2) {
      html += `<span class="page-dots">…</span>`;
    }
  }

  html += `
    <button class="page-btn" onclick="goPage(${state.page+1})" ${state.page===totalPages?'disabled':''}>
      <i class="fas fa-chevron-right"></i>
    </button>`;
  pg.innerHTML = html;
}

function goPage(p) {
  state.page = p;
  renderProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================
// ACTIVE FILTER TAGS
// ========================
function renderActiveFilters() {
  const wrap = document.getElementById('activeFilters');
  let tags = [];

  if (state.cat !== 'all')
    tags.push({ label: state.cat, remove: () => { state.cat = 'all'; setRadio('all'); renderProducts(); } });
  if (state.search)
    tags.push({ label: `"${state.search}"`, remove: () => { state.search = ''; document.getElementById('searchInput').value = ''; renderProducts(); } });
  if (state.priceMin > 0 || state.priceMax < 15000000)
    tags.push({ label: `${fmt(state.priceMin)} – ${fmt(state.priceMax)}`, remove: () => { state.priceMin=0; state.priceMax=15000000; document.getElementById('rangeMin').value=0; document.getElementById('rangeMax').value=15000000; updatePriceDisplay(); renderProducts(); } });
  state.conds.forEach(c =>
    tags.push({ label: c==='great'?'Như mới':c==='good'?'Còn tốt':'Bình thường', remove: () => { state.conds=state.conds.filter(x=>x!==c); renderProducts(); } })
  );
  state.brands.forEach(b =>
    tags.push({ label: b, remove: () => { state.brands=state.brands.filter(x=>x!==b); renderProducts(); } })
  );

  wrap.innerHTML = tags.map((t,i) => `
    <span class="filter-tag">
      ${t.label}
      <button onclick="removeFT(${i})"><i class="fas fa-times"></i></button>
    </span>`).join('');

  // Store remove callbacks
  wrap._callbacks = tags.map(t => t.remove);
}
function removeFT(i) {
  document.getElementById('activeFilters')._callbacks[i]();
}

// ========================
// FILTER HANDLERS
// ========================
function filterCat(cat) {
  state.cat = cat; state.page = 1;
  setRadio(cat);
  renderProducts();
}
function setRadio(cat) {
  document.querySelectorAll('.filter-radio').forEach(r => r.classList.remove('active'));
  const el = document.getElementById(`cat-${cat}`);
  if (el) el.classList.add('active');
}

function updatePriceRange() {
  let min = parseInt(document.getElementById('rangeMin').value);
  let max = parseInt(document.getElementById('rangeMax').value);
  if (min > max) [min, max] = [max, min];
  state.priceMin = min; state.priceMax = max; state.page = 1;
  updatePriceDisplay();
  renderProducts();
}
function updatePriceDisplay() {
  document.getElementById('priceMin').textContent = fmt(state.priceMin);
  document.getElementById('priceMax').textContent = fmt(state.priceMax);
}
function setPrice(min, max) {
  state.priceMin = min; state.priceMax = max; state.page = 1;
  document.getElementById('rangeMin').value = min;
  document.getElementById('rangeMax').value = max;
  updatePriceDisplay();
  renderProducts();
}

function updateCondFilter() {
  state.conds = [...document.querySelectorAll('.filter-checkbox input[type=checkbox][value]:checked')]
    .map(c => c.value).filter(v => ['great','good','fair'].includes(v));
  state.page = 1; renderProducts();
}
function updateBrandFilter() {
  state.brands = [...document.querySelectorAll('.filter-checkbox input[type=checkbox][value]:checked')]
    .map(c => c.value).filter(v => !['great','good','fair','6','3','1'].includes(v));
  state.page = 1; renderProducts();
}
function updateWarrantyFilter() {
  const checked = [...document.querySelectorAll('input[value="6"],input[value="3"],input[value="1"]')]
    .filter(c => c.checked).map(c => parseInt(c.value));
  state.warranty = checked.length ? Math.max(...checked) : 0;
  state.page = 1; renderProducts();
}

function clearAllFilters() {
  state.cat = 'all'; state.priceMin = 0; state.priceMax = 15000000;
  state.conds = []; state.brands = []; state.warranty = 0; state.search = '';
  state.page = 1;
  document.getElementById('searchInput').value = '';
  document.getElementById('rangeMin').value = 0;
  document.getElementById('rangeMax').value = 15000000;
  updatePriceDisplay();
  setRadio('all');
  document.querySelectorAll('.filter-checkbox input[type=checkbox]').forEach(c => c.checked = false);
  renderProducts();
}

// ========================
// SEARCH
// ========================
function liveSearch() {
  state.search = document.getElementById('searchInput').value.trim();
  state.page = 1;
  renderProducts();
}
function doSearch() { liveSearch(); }

// ========================
// SORT & VIEW
// ========================
function sortProducts(val) { state.sort = val; state.page = 1; renderProducts(); }
function setView(v) {
  state.view = v;
  const grid = document.getElementById('productsGrid');
  grid.classList.toggle('list-view', v === 'list');
  document.getElementById('viewGrid').classList.toggle('active', v === 'grid');
  document.getElementById('viewList').classList.toggle('active', v === 'list');
}

// ========================
// SIDEBAR TOGGLE
// ========================
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (window.innerWidth <= 860) {
    sb.classList.toggle('mobile-open');
  } else {
    sb.classList.toggle('collapsed');
  }
}

function toggleBlock(title) {
  title.classList.toggle('collapsed');
  const body = title.nextElementSibling;
  body.classList.toggle('hidden');
}

// ========================
// MODAL
// ========================
function openModal(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalImg').textContent   = p.img;
  document.getElementById('modalCat').textContent   = p.cat;
  document.getElementById('modalName').textContent  = p.name;
  document.getElementById('modalPrice').textContent = fmt(p.price);
  document.getElementById('modalDesc').textContent  = p.desc;
  document.getElementById('modalRating').textContent = '★'.repeat(p.rating)+'☆'.repeat(5-p.rating);
  document.getElementById('modalReviews').textContent = `(${p.reviews} đánh giá)`;
  document.getElementById('modalSpecs').innerHTML = `
    <div class="modal-spec"><label>Tình trạng</label><span>${p.condition_detail}</span></div>
    <div class="modal-spec"><label>Bảo hành</label><span>${p.warrantyLabel}</span></div>
    <div class="modal-spec"><label>Xuất xứ</label><span>${p.origin}</span></div>
    <div class="modal-spec"><label>Đã dùng</label><span>${p.used}</span></div>
  `;
  document.getElementById('productModal').dataset.id = id;
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if (!e || e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}
function addToCartModal() {
  const id = parseInt(document.getElementById('productModal').dataset.id);
  addToCart(id);
  closeModal();
}
function buyNow() {
  showToast('Đang chuyển đến thanh toán...', true);
  closeModal();
}

// ========================
// CART
// ========================
function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`🛒 Đã thêm "${p.name.substring(0,22)}..." vào giỏ!`);
  renderCartDropdown();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart(); updateCartBadge(); renderCartDropdown();
}

function saveCart() { sessionStorage.setItem('cart', JSON.stringify(cart)); }
function updateCartBadge() {
  const total = cart.reduce((s,c) => s + c.qty, 0);
  document.getElementById('cartBadge').textContent = total;
}

function renderCartDropdown() {
  const wrap   = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    wrap.innerHTML = '<div class="cart-empty"><i class="fas fa-box-open"></i><p>Giỏ hàng trống</p></div>';
    footer.style.display = 'none';
    return;
  }
  wrap.innerHTML = cart.map(c => `
    <div class="cart-item">
      <span class="cart-item-icon">${c.img}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-price">${fmt(c.price)} × ${c.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${c.id})"><i class="fas fa-trash"></i></button>
    </div>`).join('');
  const total = cart.reduce((s,c) => s + c.price * c.qty, 0);
  document.getElementById('cartTotal').textContent = fmt(total);
  footer.style.display = 'block';
}

function showCartDropdown() {
  renderCartDropdown();
  document.getElementById('cartDropdown').classList.toggle('open');
  document.getElementById('cartBackdrop').classList.toggle('show');
}
function closeCartDropdown() {
  document.getElementById('cartDropdown').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('show');
}
function checkout() {
  showToast('💳 Chuyển đến trang thanh toán...');
  closeCartDropdown();
}

// ========================
// FAVOURITES
// ========================
let favs = JSON.parse(sessionStorage.getItem('favs') || '[]');
function isFav(id) { return favs.includes(id); }
function toggleFav(btn, id) {
  if (isFav(id)) {
    favs = favs.filter(f => f !== id);
    btn.querySelector('i').className = 'far fa-heart';
    showToast('💔 Đã bỏ yêu thích');
  } else {
    favs.push(id);
    btn.querySelector('i').className = 'fas fa-heart';
    btn.classList.add('active');
    showToast('❤️ Đã thêm vào yêu thích!');
  }
  sessionStorage.setItem('favs', JSON.stringify(favs));
}

// ========================
// TOAST
// ========================
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastText').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 2800);
}

// ========================
// FORMAT PRICE
// ========================
function fmt(n) { return n.toLocaleString('vi-VN') + '₫'; }

// ========================
// AUTH STATE
// ========================
function checkAuthState() {
  const user = sessionStorage.getItem('currentUser');
  if (!user) return;
  const { name } = JSON.parse(user);
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  document.getElementById('authButtons').style.display = 'none';
  const userMenu = document.getElementById('userMenu');
  userMenu.style.display = 'flex';
  document.getElementById('userName').textContent   = displayName;
  document.getElementById('userAvatar').textContent = displayName.charAt(0).toUpperCase();
}
function logout() {
  sessionStorage.removeItem('currentUser');
  document.getElementById('authButtons').style.display = 'flex';
  document.getElementById('userMenu').style.display = 'none';
  showToast('Đã đăng xuất thành công!');
}

// ========================
// URL PARAMS (từ index.html)
// ========================
function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const cat    = params.get('cat');
  const q      = params.get('q');
  if (cat) { state.cat = cat; setRadio(cat); document.getElementById('breadcrumbCurrent').textContent = `Mua hàng › ${cat}`; }
  if (q)   { state.search = q; document.getElementById('searchInput').value = q; }
}

// ========================
// INIT
// ========================
checkAuthState();
readUrlParams();
updatePriceDisplay();
updateCartBadge();
renderProducts();

// Keyboard shortcut
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeCartDropdown(); }
  if (e.key === 'Enter' && document.activeElement.id === 'searchInput') doSearch();
});