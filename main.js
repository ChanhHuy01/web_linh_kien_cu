// ========================
// DATA
// ========================
const products = [
  {
    id: 1, name: 'Intel Core i7-10700K', cat: 'CPU',
    price: 3200000, oldPrice: 4500000, img: '🔲', badge: 'hot',
    condClass: 'great', condPct: 95,
    specs: ['8 nhân 16 luồng', '3.8GHz - 5.1GHz', 'Socket LGA1200'],
    seller: 'TechStore VN', rating: '★★★★★',
    desc: 'CPU hiệu năng cao, phù hợp cho làm việc, lập trình, gaming. Còn hoạt động ổn định.',
    condition_detail: '95% - Như mới', warranty: '6 tháng', origin: 'Intel - Mỹ', used: '3 tháng'
  },
  {
    id: 2, name: 'Kingston 16GB DDR4 3200MHz', cat: 'RAM',
    price: 780000, oldPrice: 1100000, img: '🧩', badge: 'sale',
    condClass: 'good', condPct: 85,
    specs: ['16GB DDR4', '3200MHz', 'CL16'],
    seller: 'RAM Shop HN', rating: '★★★★☆',
    desc: 'RAM tốc độ cao, tương thích rộng với nhiều mainboard. Kiểm tra đã pass memtest86.',
    condition_detail: '85% - Còn tốt', warranty: '3 tháng', origin: 'Kingston - Đài Loan', used: '8 tháng'
  },
  {
    id: 3, name: 'RTX 3060 Ti 8GB GDDR6', cat: 'GPU',
    price: 7500000, oldPrice: 11000000, img: '🖥️', badge: 'hot',
    condClass: 'great', condPct: 90,
    specs: ['8GB GDDR6', 'HDMI 2.1', 'PCIe 4.0'],
    seller: 'GPU Zone', rating: '★★★★★',
    desc: 'Card đồ họa gaming mạnh mẽ, phù hợp 1440p gaming. Không đào coin, còn bảo hành hãng.',
    condition_detail: '90% - Rất tốt', warranty: '5 tháng', origin: 'NVIDIA - Mỹ', used: '5 tháng'
  },
  {
    id: 4, name: 'ASUS ROG STRIX B550-F', cat: 'Mainboard',
    price: 2800000, oldPrice: 3900000, img: '🔌', badge: 'new',
    condClass: 'good', condPct: 88,
    specs: ['Socket AM4', 'DDR4 x4', 'PCIe 4.0'],
    seller: 'MainboardVN', rating: '★★★★☆',
    desc: 'Mainboard cao cấp dòng ROG, hỗ trợ Ryzen 5000 series. Đầy đủ phụ kiện kèm theo.',
    condition_detail: '88% - Còn tốt', warranty: '4 tháng', origin: 'ASUS - Đài Loan', used: '6 tháng'
  },
  {
    id: 5, name: 'Samsung 970 EVO 1TB NVMe', cat: 'SSD',
    price: 1200000, oldPrice: 1800000, img: '💾', badge: 'sale',
    condClass: 'good', condPct: 80,
    specs: ['1TB NVMe', 'M.2 PCIe 3.0', '3500MB/s'],
    seller: 'StoragePro', rating: '★★★★☆',
    desc: 'SSD nhanh, ổn định cho hệ điều hành và lưu trữ. Đã kiểm tra health 80%.',
    condition_detail: '80% - Dùng được', warranty: '2 tháng', origin: 'Samsung - Hàn Quốc', used: '14 tháng'
  },
  {
    id: 6, name: 'Corsair RM750x 750W', cat: 'Nguồn',
    price: 1500000, oldPrice: 2200000, img: '⚡', badge: 'new',
    condClass: 'great', condPct: 95,
    specs: ['750W 80+ Gold', 'Full Modular', 'ATX 12V'],
    seller: 'PowerVN', rating: '★★★★★',
    desc: 'Nguồn đạt chuẩn 80+ Gold, full modular. Còn bảo hành Corsair 3 năm.',
    condition_detail: '95% - Như mới', warranty: '6 tháng', origin: 'Corsair - Mỹ', used: '2 tháng'
  },
  {
    id: 7, name: 'AMD Ryzen 7 5800X', cat: 'CPU',
    price: 4200000, oldPrice: 6500000, img: '🔲', badge: 'hot',
    condClass: 'great', condPct: 92,
    specs: ['8 nhân 16 luồng', '3.8GHz - 4.7GHz', 'Socket AM4'],
    seller: 'AMD Center', rating: '★★★★★',
    desc: 'CPU AMD mạnh mẽ cho cả gaming lẫn đa nhiệm. Hiệu năng vượt trội tầm giá.',
    condition_detail: '92% - Như mới', warranty: '5 tháng', origin: 'AMD - Mỹ', used: '4 tháng'
  },
  {
    id: 8, name: 'Crucial 32GB DDR4 3600MHz', cat: 'RAM',
    price: 1400000, oldPrice: 2100000, img: '🧩', badge: 'sale',
    condClass: 'fair', condPct: 75,
    specs: ['32GB DDR4', '3600MHz', 'CL18'],
    seller: 'MemoryShop', rating: '★★★☆☆',
    desc: 'Bộ RAM 32GB cho workstation, render, lập trình. Tình trạng còn sử dụng tốt.',
    condition_detail: '75% - Bình thường', warranty: '2 tháng', origin: 'Crucial - Mỹ', used: '18 tháng'
  }
];

// ========================
// GIỎ HÀNG — dùng localStorage để lưu
// ========================
let cart = JSON.parse(localStorage.getItem('itc_cart') || '[]');
// cart = [{ id, name, img, price, qty }, ...]

function saveCart() {
  localStorage.setItem('itc_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function updateCartBadge() {
  const count = getCartCount();
  document.getElementById('cartBadge').textContent = count;
}

// Thêm vào giỏ theo id sản phẩm
function addToCartById(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(x => x.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: p.id, name: p.name, img: p.img, price: p.price, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`✅ Đã thêm "${p.name.substring(0,22)}..." vào giỏ!`);
}

// Gọi từ card sản phẩm (truyền tên — giữ tương thích cũ)
function addToCart(name) {
  const p = products.find(x => x.name === name);
  if (p) addToCartById(p.id);
}

// Xóa 1 sản phẩm khỏi giỏ
function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

// Thay đổi số lượng
function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

// ========================
// CART DRAWER — panel trượt từ phải
// ========================
function injectCartDrawer() {
  if (document.getElementById('cartDrawer')) return;

  const style = document.createElement('style');
  style.id = 'cartDrawerStyle';
  style.textContent = `
    #cartBackdrop {
      position: fixed; inset: 0; z-index: 3000;
      background: rgba(0,0,0,0.45);
      backdrop-filter: blur(3px);
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s;
    }
    #cartBackdrop.open { opacity: 1; pointer-events: all; }

    #cartDrawer {
      position: fixed; top: 0; right: 0; z-index: 3001;
      width: 420px; max-width: 100vw; height: 100vh;
      background: #fff;
      box-shadow: -8px 0 40px rgba(0,0,0,0.15);
      display: flex; flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
      font-family: 'Be Vietnam Pro', sans-serif;
    }
    #cartDrawer.open { transform: translateX(0); }

    /* Header drawer */
    .cd-head {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.1rem 1.4rem;
      border-bottom: 2px solid #e5e7eb;
      flex-shrink: 0;
    }
    .cd-head h3 { font-size: 1rem; font-weight: 800; color: #111827; margin: 0; }
    .cd-head-close {
      background: none; border: none; cursor: pointer;
      font-size: 1.1rem; color: #6b7280;
      width: 32px; height: 32px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .cd-head-close:hover { background: #fee2e2; color: #ef4444; }

    /* Tabs: giỏ hàng / checkout */
    .cd-tabs {
      display: flex;
      border-bottom: 2px solid #e5e7eb;
      flex-shrink: 0;
    }
    .cd-tab {
      flex: 1; padding: 0.7rem;
      background: none; border: none; cursor: pointer;
      font-family: inherit; font-size: 0.85rem; font-weight: 600;
      color: #6b7280; transition: all 0.2s;
      border-bottom: 2px solid transparent; margin-bottom: -2px;
    }
    .cd-tab.active { color: #22c55e; border-bottom-color: #22c55e; }

    /* Body */
    .cd-body { flex: 1; overflow-y: auto; padding: 1rem 1.2rem; }

    /* Empty state */
    .cd-empty {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; height: 100%; gap: 0.8rem;
      color: #9ca3af; text-align: center;
    }
    .cd-empty i { font-size: 3rem; opacity: 0.4; }
    .cd-empty p { font-size: 0.88rem; }

    /* Cart item */
    .cd-item {
      display: flex; gap: 0.9rem; align-items: flex-start;
      padding: 0.9rem 0;
      border-bottom: 1px solid #f3f4f6;
    }
    .cd-item:last-child { border-bottom: none; }
    .cd-item-img {
      width: 52px; height: 52px; border-radius: 10px;
      background: #f9fafb; border: 1px solid #e5e7eb;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.8rem; flex-shrink: 0;
    }
    .cd-item-info { flex: 1; min-width: 0; }
    .cd-item-name {
      font-size: 0.85rem; font-weight: 700; color: #111827;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      margin-bottom: 0.25rem;
    }
    .cd-item-price { font-size: 0.88rem; font-weight: 800; color: #f97316; }
    .cd-item-qty {
      display: flex; align-items: center; gap: 0.5rem; margin-top: 0.4rem;
    }
    .cd-qty-btn {
      width: 26px; height: 26px; border-radius: 6px;
      background: #f3f4f6; border: 1px solid #e5e7eb;
      cursor: pointer; font-size: 0.9rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s; color: #374151;
    }
    .cd-qty-btn:hover { background: #22c55e; color: white; border-color: #22c55e; }
    .cd-qty-num { font-size: 0.85rem; font-weight: 700; min-width: 20px; text-align: center; }
    .cd-item-del {
      background: none; border: none; cursor: pointer;
      color: #d1d5db; font-size: 1rem;
      transition: color 0.2s; flex-shrink: 0; padding: 0.2rem;
    }
    .cd-item-del:hover { color: #ef4444; }

    /* Footer drawer */
    .cd-foot {
      padding: 1rem 1.2rem;
      border-top: 2px solid #e5e7eb;
      flex-shrink: 0;
      background: #f9fafb;
    }
    .cd-total-row {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 0.9rem;
    }
    .cd-total-label { font-size: 0.85rem; color: #6b7280; font-weight: 600; }
    .cd-total-price { font-size: 1.15rem; font-weight: 900; color: #f97316; }
    .cd-checkout-btn {
      width: 100%; padding: 0.85rem;
      background: #22c55e; border: none; border-radius: 10px;
      color: white; font-family: inherit;
      font-size: 0.95rem; font-weight: 700; cursor: pointer;
      transition: all 0.2s; display: flex; align-items: center;
      justify-content: center; gap: 0.5rem;
    }
    .cd-checkout-btn:hover { background: #16a34a; transform: translateY(-1px); }
    .cd-clear-btn {
      width: 100%; padding: 0.55rem;
      background: none; border: 1px solid #e5e7eb; border-radius: 8px;
      color: #9ca3af; font-family: inherit; font-size: 0.8rem;
      font-weight: 600; cursor: pointer; margin-top: 0.5rem;
      transition: all 0.2s;
    }
    .cd-clear-btn:hover { border-color: #ef4444; color: #ef4444; }

    /* ── CHECKOUT FORM ── */
    #checkoutPanel { display: none; }
    #checkoutPanel.active { display: block; }
    #cartPanel.hidden { display: none; }

    .co-section-title {
      font-size: 0.78rem; font-weight: 700; color: #6b7280;
      text-transform: uppercase; letter-spacing: 0.05em;
      margin: 1rem 0 0.5rem;
    }
    .co-field {
      display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 0.75rem;
    }
    .co-field label { font-size: 0.78rem; font-weight: 600; color: #374151; }
    .co-field label span { color: #ef4444; }
    .co-field input,
    .co-field select,
    .co-field textarea {
      padding: 0.65rem 0.9rem;
      border: 1.5px solid #e5e7eb; border-radius: 8px;
      font-family: inherit; font-size: 0.88rem; color: #111827;
      outline: none; transition: border-color 0.2s;
      background: #fff;
    }
    .co-field input:focus,
    .co-field select:focus,
    .co-field textarea:focus { border-color: #22c55e; }
    .co-field textarea { resize: vertical; min-height: 70px; }

    .co-order-summary {
      background: #f0fdf4; border: 1px solid #bbf7d0;
      border-radius: 10px; padding: 0.8rem 1rem; margin-bottom: 1rem;
    }
    .co-order-summary p { font-size: 0.8rem; color: #374151; margin: 0.2rem 0; }
    .co-order-summary .co-sum-total {
      font-size: 1rem; font-weight: 800; color: #16a34a; margin-top: 0.5rem;
    }

    .co-submit-btn {
      width: 100%; padding: 0.9rem;
      background: #f97316; border: none; border-radius: 10px;
      color: white; font-family: inherit;
      font-size: 0.95rem; font-weight: 700; cursor: pointer;
      transition: all 0.2s; display: flex; align-items: center;
      justify-content: center; gap: 0.5rem; margin-top: 0.5rem;
    }
    .co-submit-btn:hover { background: #ea6c0a; transform: translateY(-1px); }
    .co-back-btn {
      width: 100%; padding: 0.55rem;
      background: none; border: 1px solid #e5e7eb; border-radius: 8px;
      color: #6b7280; font-family: inherit; font-size: 0.82rem;
      font-weight: 600; cursor: pointer; margin-top: 0.5rem;
      transition: all 0.2s;
    }
    .co-back-btn:hover { border-color: #22c55e; color: #22c55e; }

    /* Success */
    .co-success {
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; height: 100%; gap: 1rem;
      text-align: center; padding: 2rem;
    }
    .co-success-icon {
      width: 72px; height: 72px; border-radius: 50%;
      background: #dcfce7; border: 2px solid #22c55e;
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; color: #16a34a;
      animation: popIn 0.4s ease;
    }
    @keyframes popIn {
      0%   { transform: scale(0); opacity: 0; }
      70%  { transform: scale(1.15); }
      100% { transform: scale(1); opacity: 1; }
    }
    .co-success h3 { font-size: 1.2rem; font-weight: 800; color: #111827; }
    .co-success p  { font-size: 0.85rem; color: #6b7280; line-height: 1.7; }
    .co-success-info {
      background: #f0fdf4; border: 1px solid #bbf7d0;
      border-radius: 10px; padding: 0.9rem 1.2rem;
      width: 100%; text-align: left;
    }
    .co-success-info p { font-size: 0.82rem; color: #374151; margin: 0.2rem 0; }
    .co-success-info strong { color: #16a34a; }
  `;
  document.head.appendChild(style);

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'cartBackdrop';
  backdrop.onclick = closeCart;
  document.body.appendChild(backdrop);

  // Drawer HTML
  const drawer = document.createElement('div');
  drawer.id = 'cartDrawer';
  drawer.innerHTML = `
    <div class="cd-head">
      <h3>🛒 Giỏ hàng</h3>
      <button class="cd-head-close" onclick="closeCart()">✕</button>
    </div>
    <div class="cd-tabs">
      <button class="cd-tab active" id="tabCart"    onclick="switchTab('cart')">🛒 Giỏ hàng</button>
      <button class="cd-tab"        id="tabCheckout" onclick="switchTab('checkout')">📋 Đặt hàng</button>
    </div>

    <!-- PANEL GIỎ HÀNG -->
    <div id="cartPanel" style="display:flex; flex-direction:column; flex:1; overflow:hidden;">
      <div class="cd-body" id="cartItems"></div>
      <div class="cd-foot" id="cartFoot">
        <div class="cd-total-row">
          <span class="cd-total-label">Tổng cộng:</span>
          <span class="cd-total-price" id="cartTotalPrice">0₫</span>
        </div>
        <button class="cd-checkout-btn" onclick="switchTab('checkout')">
          <i class="fas fa-bolt"></i> Tiến hành đặt hàng
        </button>
        <button class="cd-clear-btn" onclick="clearCart()">🗑️ Xóa toàn bộ giỏ hàng</button>
      </div>
    </div>

    <!-- PANEL CHECKOUT -->
    <div id="checkoutPanel" style="display:none; flex-direction:column; flex:1; overflow:hidden;">
      <div class="cd-body" id="checkoutBody">
        <div id="checkoutForm">
          <div class="co-section-title">📦 Thông tin nhận hàng</div>

          <div class="co-field">
            <label>Họ và tên <span>*</span></label>
            <input type="text" id="coName" placeholder="Nguyễn Văn A">
          </div>
          <div class="co-field">
            <label>Số điện thoại <span>*</span></label>
            <input type="tel" id="coPhone" placeholder="0912 345 678">
          </div>
          <div class="co-field">
            <label>Địa chỉ nhận hàng <span>*</span></label>
            <input type="text" id="coAddress" placeholder="Số nhà, đường, phường/xã">
          </div>
          <div class="co-field">
            <label>Tỉnh / Thành phố</label>
            <select id="coCity">
              <option value="">-- Chọn tỉnh thành --</option>
              <option>Hà Nội</option><option>TP. Hồ Chí Minh</option>
              <option>Đà Nẵng</option><option>Cần Thơ</option>
              <option>Hải Phòng</option><option>Bình Dương</option>
              <option>Đồng Nai</option><option>Quảng Nam</option>
              <option>Nghệ An</option><option>Thanh Hóa</option>
              <option>Khác</option>
            </select>
          </div>
          <div class="co-field">
            <label>Ghi chú</label>
            <textarea id="coNote" placeholder="Ghi chú thêm cho đơn hàng (nếu có)..."></textarea>
          </div>

          <div class="co-section-title">💳 Thanh toán</div>
          <div class="co-field">
            <label>Phương thức</label>
            <select id="coPayment">
              <option value="cod">💵 Thanh toán khi nhận hàng (COD)</option>
              <option value="bank">🏦 Chuyển khoản ngân hàng</option>
              <option value="momo">📱 Ví MoMo</option>
            </select>
          </div>

          <div class="co-section-title">🧾 Đơn hàng</div>
          <div class="co-order-summary" id="coSummary"></div>

          <button class="co-submit-btn" onclick="submitOrder()">
            <i class="fas fa-paper-plane"></i> Xác nhận đặt hàng
          </button>
          <button class="co-back-btn" onclick="switchTab('cart')">← Quay lại giỏ hàng</button>
        </div>

        <!-- SUCCESS STATE -->
        <div class="co-success" id="coSuccess" style="display:none;">
          <div class="co-success-icon">✅</div>
          <h3>Đặt hàng thành công!</h3>
          <p>Chúng tôi đã nhận đơn hàng của bạn và sẽ liên hệ xác nhận trong vòng <strong>30 phút</strong>.</p>
          <div class="co-success-info" id="coSuccessInfo"></div>
          <button class="co-checkout-btn" style="margin-top:1rem; background:#22c55e; width:100%; padding:0.8rem; border:none; border-radius:10px; color:white; font-family:inherit; font-size:0.9rem; font-weight:700; cursor:pointer;" onclick="closeCart()">
            Đóng
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(drawer);
}

// Render danh sách sản phẩm trong giỏ
function renderCartDrawer() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotalPrice');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cd-empty">
        <i class="fas fa-shopping-cart"></i>
        <p>Giỏ hàng trống<br><small>Hãy thêm sản phẩm vào giỏ!</small></p>
      </div>`;
    if (totalEl) totalEl.textContent = '0₫';
    return;
  }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cd-item">
      <div class="cd-item-img">${item.img}</div>
      <div class="cd-item-info">
        <div class="cd-item-name">${item.name}</div>
        <div class="cd-item-price">${(item.price).toLocaleString('vi-VN')}₫</div>
        <div class="cd-item-qty">
          <button class="cd-qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="cd-qty-num">${item.qty}</span>
          <button class="cd-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <span style="font-size:0.75rem; color:#9ca3af; margin-left:0.3rem;">
            = ${(item.price * item.qty).toLocaleString('vi-VN')}₫
          </span>
        </div>
      </div>
      <button class="cd-item-del" onclick="removeFromCart(${item.id})" title="Xóa">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = getCartTotal().toLocaleString('vi-VN') + '₫';

  // Cập nhật order summary trong checkout
  renderOrderSummary();
}

function renderOrderSummary() {
  const el = document.getElementById('coSummary');
  if (!el) return;
  el.innerHTML = cart.map(i =>
    `<p>${i.img} ${i.name} × ${i.qty} — <strong>${(i.price*i.qty).toLocaleString('vi-VN')}₫</strong></p>`
  ).join('') +
  `<p class="co-sum-total">Tổng: ${getCartTotal().toLocaleString('vi-VN')}₫</p>`;
}

// Mở giỏ hàng
function showCart() {
  injectCartDrawer();
  renderCartDrawer();
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab('cart');
}

// Đóng giỏ hàng
function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartBackdrop')?.classList.remove('open');
  document.body.style.overflow = '';
}

// Chuyển tab
function switchTab(tab) {
  const cartPanel     = document.getElementById('cartPanel');
  const checkoutPanel = document.getElementById('checkoutPanel');
  const tabCart       = document.getElementById('tabCart');
  const tabCheckout   = document.getElementById('tabCheckout');

  if (tab === 'cart') {
    cartPanel.style.display     = 'flex';
    checkoutPanel.style.display = 'none';
    tabCart.classList.add('active');
    tabCheckout.classList.remove('active');
  } else {
    if (cart.length === 0) {
      showToast('⚠️ Giỏ hàng trống, hãy thêm sản phẩm trước!');
      return;
    }
    cartPanel.style.display     = 'none';
    checkoutPanel.style.display = 'flex';
    checkoutPanel.style.flexDirection = 'column';
    checkoutPanel.style.flex    = '1';
    checkoutPanel.style.overflow = 'hidden';
    tabCart.classList.remove('active');
    tabCheckout.classList.add('active');
    renderOrderSummary();
    // Reset về form (ẩn success nếu đang hiện)
    document.getElementById('checkoutForm').style.display = 'block';
    document.getElementById('coSuccess').style.display    = 'none';
  }
}

// Xóa toàn bộ giỏ
function clearCart() {
  if (!cart.length) return;
  if (!confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) return;
  cart = [];
  saveCart();
  updateCartBadge();
  renderCartDrawer();
}

// ========================
// ĐẶT HÀNG
// ========================
function submitOrder() {
  const name    = document.getElementById('coName').value.trim();
  const phone   = document.getElementById('coPhone').value.trim();
  const address = document.getElementById('coAddress').value.trim();
  const city    = document.getElementById('coCity').value;
  const note    = document.getElementById('coNote').value.trim();
  const payment = document.getElementById('coPayment').value;

  // Validate
  if (!name)    { showToast('⚠️ Vui lòng nhập họ tên!');          document.getElementById('coName').focus();    return; }
  if (!phone)   { showToast('⚠️ Vui lòng nhập số điện thoại!');   document.getElementById('coPhone').focus();   return; }
  if (!address) { showToast('⚠️ Vui lòng nhập địa chỉ nhận hàng!'); document.getElementById('coAddress').focus(); return; }

  // Tạo đối tượng đơn hàng
  const order = {
    id:       'DH' + Date.now(),
    time:     new Date().toLocaleString('vi-VN'),
    customer: { name, phone, address: address + (city ? ', ' + city : ''), note },
    payment:  payment === 'cod' ? 'COD' : payment === 'bank' ? 'Chuyển khoản' : 'MoMo',
    items:    cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
    total:    getCartTotal(),
  };

  // Lưu đơn vào localStorage (danh sách đơn hàng)
  const orders = JSON.parse(localStorage.getItem('itc_orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('itc_orders', JSON.stringify(orders));

  // Hiện màn hình thành công
  document.getElementById('checkoutForm').style.display = 'none';
  const successEl = document.getElementById('coSuccess');
  successEl.style.display = 'flex';

  const payLabel = order.payment;
  document.getElementById('coSuccessInfo').innerHTML = `
    <p>🆔 Mã đơn: <strong>${order.id}</strong></p>
    <p>👤 Khách hàng: <strong>${name}</strong></p>
    <p>📞 SĐT: <strong>${phone}</strong></p>
    <p>📍 Địa chỉ: <strong>${order.customer.address}</strong></p>
    <p>💳 Thanh toán: <strong>${payLabel}</strong></p>
    <p>💰 Tổng tiền: <strong style="color:#f97316">${order.total.toLocaleString('vi-VN')}₫</strong></p>
    ${note ? `<p>📝 Ghi chú: ${note}</p>` : ''}
  `;

  // Xóa giỏ sau khi đặt
  cart = [];
  saveCart();
  updateCartBadge();
}

// ========================
// RENDER PRODUCTS
// ========================
function renderProducts(data) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = data.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      <span class="product-badge badge-${p.badge}">
        ${p.badge === 'hot' ? '🔥 Hot' : p.badge === 'new' ? '✨ Mới' : '🏷️ Sale'}
      </span>
      <button class="product-fav" onclick="event.stopPropagation(); toggleFav(this)">
        <i class="far fa-heart"></i>
      </button>
      <div class="product-img">
        <div style="font-size:4.5rem; z-index:1; position:relative;">${p.img}</div>
        <div class="product-img-overlay">
          <button class="quick-view-btn">Xem nhanh</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-specs">
          ${p.specs.slice(0, 2).map(s => `<span class="spec-tag">${s}</span>`).join('')}
        </div>
        <div class="product-condition">
          <div class="condition-bar">
            <div class="condition-fill ${p.condClass}" style="width:${p.condPct}%"></div>
          </div>
          <span class="condition-text">${p.condPct}%</span>
        </div>
        <div class="product-footer">
          <div>
            <div class="product-price">${p.price.toLocaleString('vi-VN')}₫</div>
            <div class="product-price-old">${p.oldPrice.toLocaleString('vi-VN')}₫</div>
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCartById(${p.id})">
            <i class="fas fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <div class="product-seller">
        <div class="seller-avatar">${p.seller[0]}</div>
        <span class="seller-name">${p.seller}</span>
        <span class="seller-rating">${p.rating}</span>
      </div>
    </div>
  `).join('');
}

// ========================
// MODAL
// ========================
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalImg').textContent   = p.img;
  document.getElementById('modalCat').textContent   = p.cat;
  document.getElementById('modalName').textContent  = p.name;
  document.getElementById('modalPrice').textContent = p.price.toLocaleString('vi-VN') + '₫';
  document.getElementById('modalDesc').textContent  = p.desc;
  document.getElementById('modalSpecs').innerHTML = `
    <div class="modal-spec"><label>Tình trạng</label><span>${p.condition_detail}</span></div>
    <div class="modal-spec"><label>Bảo hành</label><span>${p.warranty}</span></div>
    <div class="modal-spec"><label>Xuất xứ</label><span>${p.origin}</span></div>
    <div class="modal-spec"><label>Đã sử dụng</label><span>${p.used}</span></div>
  `;
  document.getElementById('productModal').dataset.id = p.id;
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
  addToCartById(id);
  closeModal();
  setTimeout(showCart, 300);
}

function buyNow() {
  const id = parseInt(document.getElementById('productModal').dataset.id);
  addToCartById(id);
  closeModal();
  setTimeout(() => { showCart(); setTimeout(() => switchTab('checkout'), 200); }, 300);
}

// ========================
// TOAST
// ========================
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastText').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ========================
// FAVOURITE
// ========================
function toggleFav(btn) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.className = btn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
  showToast(btn.classList.contains('active') ? '❤️ Đã thêm vào yêu thích!' : '💔 Đã bỏ yêu thích');
}

// ========================
// FILTER & SORT
// ========================
function setFilter(el, type) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  if (type === 'all') {
    renderProducts(products);
  } else {
    renderProducts(products.filter(p => p.badge === type || type === 'verified'));
  }
}

function filterCategory(cat) {
  event.preventDefault();
  const filtered = products.filter(p => p.cat === cat);
  if (filtered.length) {
    renderProducts(filtered);
    document.getElementById('productCount').textContent = `Hiển thị ${filtered.length} sản phẩm cho "${cat}"`;
  } else {
    renderProducts(products);
  }
  scrollToProducts();
}

function sortProducts(val) {
  let sorted = [...products];
  if (val === 'price-asc')  sorted.sort((a, b) => a.price - b.price);
  if (val === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  if (val === 'newest')     sorted.reverse();
  renderProducts(sorted);
}

// ========================
// SEARCH
// ========================
function handleSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  if (!q) { renderProducts(products); return; }
  const res = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
  );
  renderProducts(res.length ? res : products);
  document.getElementById('productCount').textContent = res.length
    ? `Tìm thấy ${res.length} sản phẩm cho "${q}"`
    : 'Không tìm thấy, hiển thị tất cả';
  scrollToProducts();
}

function scrollToProducts() {
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
}

// ========================
// COUNTDOWN
// ========================
function updateCountdown() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cdHour').textContent = String(h).padStart(2, '0');
  document.getElementById('cdMin').textContent  = String(m).padStart(2, '0');
  document.getElementById('cdSec').textContent  = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ========================
// LOADING BAR
// ========================
const lb = document.getElementById('loadingBar');
lb.style.width = '70%';
setTimeout(() => {
  lb.style.width = '100%';
  setTimeout(() => lb.style.opacity = '0', 300);
}, 400);

// ========================
// EVENT LISTENERS
// ========================
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// ========================
// INIT
// ========================
renderProducts(products);
updateCartBadge();

// ========================
// AUTH STATE (login/logout)
// ========================
function checkAuthState() {
  const user = sessionStorage.getItem('currentUser');
  if (!user) return;

  const { name, email } = JSON.parse(user);
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  document.getElementById('authButtons').style.display = 'none';
  const userMenu = document.getElementById('userMenu');
  userMenu.style.display = 'flex';

  document.getElementById('userName').textContent   = displayName;
  document.getElementById('userAvatar').textContent = displayName.charAt(0).toUpperCase();

  if (!sessionStorage.getItem('noticeSeen')) {
    setTimeout(showNoticePopup, 600);
  }
}

function logout() {
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('noticeSeen');
  document.getElementById('authButtons').style.display = 'flex';
  document.getElementById('userMenu').style.display = 'none';
  showToast('Đã đăng xuất thành công!');
}

checkAuthState();

// ========================
// POPUP THÔNG BÁO
// ========================
function showNoticePopup() {
  const style = document.createElement('style');
  style.id = 'noticeStyle';
  style.textContent = `
    #noticeOverlay {
      position: fixed; inset: 0; z-index: 4000;
      background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem; animation: noticeBgIn 0.3s ease;
    }
    @keyframes noticeBgIn { from{opacity:0} to{opacity:1} }
    #noticeBox {
      background: #ffffff; border-radius: 12px;
      width: 100%; max-width: 500px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.25); overflow: hidden;
      font-family: 'Be Vietnam Pro', sans-serif;
      animation: noticeBoxIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes noticeBoxIn {
      from { opacity:0; transform:translateY(-20px) scale(0.96); }
      to   { opacity:1; transform:translateY(0) scale(1); }
    }
    #noticeHead {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.85rem 1.3rem; border-bottom: 2px solid #e5e7eb;
    }
    #noticeHead h3 { margin:0; font-size:1rem; font-weight:900; letter-spacing:0.05em; color:#ef4444; }
    #noticeHeadClose {
      background:none; border:none; cursor:pointer;
      font-size:1.1rem; color:#9ca3af; transition:color 0.2s; padding:0;
    }
    #noticeHeadClose:hover { color:#ef4444; }
    #noticeBody {
      padding:1.4rem 1.6rem; font-size:0.875rem; color:#374151;
      line-height:1.85; text-align:center;
    }
    #noticeBody p { margin:0.4rem 0; }
    .nb-yellow { background:#fde047; padding:0.1rem 0.35rem; border-radius:4px; font-weight:700; color:#111; }
    .nb-red { color:#ef4444; font-weight:700; }
    .nb-block { display:inline-block; background:#fef9c3; border:1px solid #fde047; border-radius:6px; padding:0.25rem 0.7rem; font-weight:600; margin:0.15rem 0; }
    .nb-left { text-align:left; margin-top:0.6rem !important; }
    .nb-note { font-size:0.76rem; color:#9ca3af; font-style:italic; margin-top:0.65rem !important; }
    #noticeFoot { padding:0.85rem 1.3rem; display:flex; justify-content:flex-end; border-top:1px solid #f3f4f6; }
    #noticeCloseBtn {
      padding:0.5rem 1.8rem; background:#ef4444; border:none; border-radius:8px;
      color:#fff; font-family:inherit; font-size:0.9rem; font-weight:700; cursor:pointer; transition:all 0.2s;
    }
    #noticeCloseBtn:hover { background:#dc2626; transform:translateY(-1px); }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'noticeOverlay';
  overlay.innerHTML = `
    <div id="noticeBox">
      <div id="noticeHead">
        <h3>🔔 THÔNG BÁO</h3>
        <button id="noticeHeadClose" onclick="closeNoticePopup()">✕</button>
      </div>
      <div id="noticeBody">
        <p>
          <span class="nb-yellow">Chào Mừng Bạn Đã Đến Với Shop Mua Bán Linh Kiện Cũ CTY ĐTTH ITC</span><br>
          <span class="nb-yellow">Đây là trang web chuyên cung cấp và trao đổi linh kiện cũ giá ưu đãi đến với khách hàng !</span>
        </p>
        <p class="nb-red">Công ty chuyên nhận giao dịch và tìm kiếm linh kiện phù hợp với yêu cầu của khách hàng.</p>
        <p><span class="nb-block">Công ty đang cố gắng cập nhật các sản phẩm mới.</span></p>
        <p><span class="nb-block">Update Đến Đâu Sẽ Up Lên Đó Để Khách Hàng Có Thể Tham Khảo Sớm Nhất!</span></p>
        <p class="nb-left">
          - Trong thời gian sắp tới, nếu có bất kỳ thắc mắc nào về sản phẩm hoặc cần hỗ trợ, vui lòng liên hệ với
          <strong class="nb-red">ADMIN</strong> để được giải quyết.
        </p>
        <p><span class="nb-block">Website đảm bảo chất lượng sản phẩm và dịch vụ tốt nhất cho khách hàng.</span></p>
      </div>
      <div id="noticeFoot">
        <button id="noticeCloseBtn" onclick="closeNoticePopup()">Đóng</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeNoticePopup(); });
}

function closeNoticePopup() {
  const overlay = document.getElementById('noticeOverlay');
  if (!overlay) return;
  overlay.style.transition = 'opacity 0.2s';
  overlay.style.opacity = '0';
  setTimeout(() => { overlay.remove(); document.getElementById('noticeStyle')?.remove(); }, 220);
  sessionStorage.setItem('noticeSeen', '1');
}