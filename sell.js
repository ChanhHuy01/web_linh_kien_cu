// ========================
// STATE
// ========================
let currentStep = 1;
let selectedEmoji = '📦';
let uploadedImages = [];

const marketPrices = {
  CPU:      { low: 1500000,  high: 8000000  },
  RAM:      { low: 300000,   high: 2500000  },
  GPU:      { low: 2000000,  high: 15000000 },
  Mainboard:{ low: 800000,   high: 5000000  },
  SSD:      { low: 200000,   high: 3000000  },
  Nguồn:    { low: 300000,   high: 3000000  },
  Case:     { low: 300000,   high: 2000000  },
  'Tản nhiệt':{ low:150000,  high: 1500000  },
};

const emojiMap = {
  CPU: ['🔲','⚙️','💻','🖥️'],
  RAM: ['🧩','💡','🔧'],
  GPU: ['🖥️','🎮','📺'],
  Mainboard: ['🔌','🖱️','⌨️'],
  SSD: ['💾','📀','🗄️'],
  Nguồn: ['⚡','🔋','💡'],
  Case: ['🗃️','📦','🖥️'],
  'Tản nhiệt': ['❄️','🌬️','💨'],
  default: ['📦','🔧','💻','⚙️','🖥️','🎮','📀','⚡']
};

// ========================
// STEP NAVIGATION
// ========================
function goStep(target) {
  if (target > currentStep && !validateStep(currentStep)) return;

  // Mark done
  if (target > currentStep) {
    for (let i = currentStep; i < target; i++) {
      document.getElementById(`step-ind-${i}`)?.classList.add('done');
      document.getElementById(`step-ind-${i}`)?.classList.remove('active');
      document.getElementById(`line-${i}`)?.classList.add('done');
    }
  } else {
    // Going back
    for (let i = target; i <= currentStep; i++) {
      document.getElementById(`step-ind-${i}`)?.classList.remove('done');
      document.getElementById(`line-${i}`)?.classList.remove('done', 'active');
    }
  }

  document.getElementById(`sellStep${currentStep}`).classList.add('hidden');
  currentStep = target;
  document.getElementById(`sellStep${currentStep}`).classList.remove('hidden');

  document.getElementById(`step-ind-${currentStep}`)?.classList.add('active');
  document.getElementById(`step-ind-${currentStep}`)?.classList.remove('done');
  if (currentStep > 1) document.getElementById(`line-${currentStep-1}`)?.classList.add('active');

  // Update progress bar
  const pct = (currentStep / 4) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  const labels = ['','Bước 1/4 — Thông tin sản phẩm','Bước 2/4 — Hình ảnh','Bước 3/4 — Giá & Bảo hành','Bước 4/4 — Xác nhận'];
  document.getElementById('progressLabel').textContent = labels[Math.min(currentStep,4)] || '';

  // If step 4, populate summary
  if (currentStep === 4) populateSummary();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================
// VALIDATION
// ========================
function validateStep(step) {
  let ok = true;

  if (step === 1) {
    const title = document.getElementById('f-title').value.trim();
    const cat   = document.getElementById('f-cat').value;
    const brand = document.getElementById('f-brand').value;
    const cond  = document.querySelector('input[name="condition"]:checked');
    const desc  = document.getElementById('f-desc').value.trim();

    if (!title || title.length < 5) { setSFError('g-title','Tên sản phẩm ít nhất 5 ký tự'); ok = false; }
    if (!cat)   { setSFError('g-cat',  'Vui lòng chọn danh mục'); ok = false; }
    if (!brand) { setSFError('g-brand','Vui lòng chọn thương hiệu'); ok = false; }
    if (!cond)  { setSFError('g-cond', 'Vui lòng chọn tình trạng sản phẩm'); ok = false; }
    if (!desc || desc.length < 20) { setSFError('g-desc','Mô tả ít nhất 20 ký tự'); ok = false; }
  }

  if (step === 3) {
    const price   = parseInt(document.getElementById('f-price').value);
    const warranty= document.getElementById('f-warranty').value;
    const city    = document.getElementById('f-city').value;
    const phone   = document.getElementById('f-phone').value.trim();

    if (!price || price < 1000) { setSFError('g-price','Vui lòng nhập giá hợp lệ (tối thiểu 1.000₫)'); ok = false; }
    if (!warranty) { setSFError('g-warranty','Vui lòng chọn thông tin bảo hành'); ok = false; }
    if (!city)     { setSFError('g-city','Vui lòng chọn tỉnh/thành phố'); ok = false; }
    if (!phone || !/^(0|\+84)[3-9]\d{8}$/.test(phone.replace(/\s/g,''))) {
      setSFError('g-phone','Số điện thoại không hợp lệ (VD: 0901 234 567)'); ok = false;
    }
  }

  return ok;
}

function setSFError(groupId, msg) {
  const g = document.getElementById(groupId);
  if (!g) return;
  g.classList.add('has-error');
  const e = g.querySelector('.sf-error') || document.getElementById('e-' + groupId.replace('g-',''));
  if (e) e.textContent = msg;
}
function clearSFError(groupId) {
  const g = document.getElementById(groupId);
  if (!g) return;
  g.classList.remove('has-error');
  const e = g.querySelector('.sf-error');
  if (e) e.textContent = '';
}

// ========================
// STEP 1 HELPERS
// ========================
function selectCond(radio) {
  document.querySelectorAll('.cond-card').forEach(c => c.classList.remove('selected'));
  radio.closest('.cond-card').classList.add('selected');
  clearSFError('g-cond');
  updatePreview();
}

function updateCharCount() {
  const val = document.getElementById('f-desc').value;
  document.getElementById('charCount').textContent = `${val.length} / 1000`;
}

function changeQty(delta) {
  const input = document.getElementById('f-qty');
  const val = parseInt(input.value) + delta;
  if (val >= 1 && val <= 99) input.value = val;
}

// ========================
// STEP 2: EMOJI PICKER
// ========================
function renderEmojiGrid() {
  const cat   = document.getElementById('f-cat').value;
  const emojis = emojiMap[cat] || emojiMap.default;
  const grid   = document.getElementById('emojiGrid');
  grid.innerHTML = emojis.map(e => `
    <div class="emoji-opt ${e === selectedEmoji ? 'selected' : ''}" onclick="pickEmoji('${e}')">${e}</div>
  `).join('');
}

function pickEmoji(e) {
  selectedEmoji = e;
  renderEmojiGrid();
  updatePreview();
  renderImageThumbs();
}

function handleFileSelect(event) {
  const files = Array.from(event.target.files);
  addImageFiles(files);
}
function handleDrop(event) {
  event.preventDefault();
  document.getElementById('uploadArea').classList.remove('dragging');
  const files = Array.from(event.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  addImageFiles(files);
}
function addImageFiles(files) {
  files.slice(0, 5 - uploadedImages.length).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      uploadedImages.push({ type: 'file', src: e.target.result });
      renderImageThumbs();
    };
    reader.readAsDataURL(file);
  });
}
function renderImageThumbs() {
  const grid = document.getElementById('imagePreviewGrid');
  let html = '';
  uploadedImages.forEach((img, i) => {
    html += `<div class="preview-thumb">
      <img src="${img.src}" alt="">
      <button class="remove-img" onclick="removeImg(${i})"><i class="fas fa-times"></i></button>
    </div>`;
  });
  // Always show the emoji as first thumb if no images
  if (!uploadedImages.length) {
    html = `<div class="preview-thumb"><span style="font-size:2.5rem;">${selectedEmoji}</span></div>`;
  }
  grid.innerHTML = html;
}
function removeImg(i) {
  uploadedImages.splice(i, 1);
  renderImageThumbs();
}

// ========================
// STEP 3: PRICE
// ========================
function formatPriceInput() {
  const val = parseInt(document.getElementById('f-price').value) || 0;
  document.getElementById('priceFormatted').textContent = val ? fmt(val) : '';
  updateMarketHint();
}
function formatOldPriceInput() {
  const val = parseInt(document.getElementById('f-oldprice').value) || 0;
  document.getElementById('oldPriceFormatted').textContent = val ? fmt(val) : '';
}

function updateMarketHint() {
  const cat   = document.getElementById('f-cat').value;
  const price = parseInt(document.getElementById('f-price').value) || 0;
  const box   = document.getElementById('marketPriceBox');
  if (!cat || !marketPrices[cat]) { box.style.display = 'none'; return; }

  const { low, high } = marketPrices[cat];
  box.style.display = 'block';
  document.getElementById('mpLow').textContent  = fmt(low);
  document.getElementById('mpHigh').textContent = fmt(high);

  const pct = price ? Math.min(100, Math.max(5, ((price - low) / (high - low)) * 100)) : 50;
  document.getElementById('mpFill').style.width  = pct + '%';
  document.getElementById('mpThumb').style.left  = pct + '%';

  let hint = '';
  if (!price) hint = 'Nhập giá để xem gợi ý';
  else if (price < low * 0.7) hint = '💡 Giá khá thấp — sẽ bán rất nhanh!';
  else if (price < low)       hint = '✅ Giá tốt, cạnh tranh cao';
  else if (price <= high)     hint = '👍 Giá hợp lý theo thị trường';
  else hint = '⚠️ Giá cao hơn thị trường — có thể khó bán hơn';
  document.getElementById('mpHint').textContent = hint;
}

function selectShip(radio) {
  document.querySelectorAll('.ship-opt').forEach(s => s.classList.remove('active'));
  radio.closest('.ship-opt').classList.add('active');
}

// ========================
// STEP 4: SUMMARY & PREVIEW
// ========================
function populateSummary() {
  const title    = document.getElementById('f-title').value.trim() || '—';
  const cat      = document.getElementById('f-cat').value || '—';
  const brand    = document.getElementById('f-brand').value || '—';
  const condEl   = document.querySelector('input[name="condition"]:checked');
  const condMap  = { 'like-new':'Như mới (90–100%)', 'good':'Còn tốt (75–89%)', 'fair':'Bình thường (60–74%)' };
  const cond     = condEl ? condMap[condEl.value] : '—';
  const price    = parseInt(document.getElementById('f-price').value) || 0;
  const oldPrice = parseInt(document.getElementById('f-oldprice').value) || 0;
  const wVal     = document.getElementById('f-warranty').value;
  const warranty = wVal === '0' ? 'Không bảo hành' : wVal ? `${wVal} tháng` : '—';
  const city     = document.getElementById('f-city').value || '—';
  const dist     = document.getElementById('f-district').value.trim();
  const shipEl   = document.querySelector('input[name="shipping"]:checked');
  const shipMap  = { 'both':'Gặp trực tiếp & Ship', 'direct':'Gặp trực tiếp', 'ship':'Ship toàn quốc' };
  const ship     = shipEl ? shipMap[shipEl.value] : '—';

  document.getElementById('cs-title').textContent   = title;
  document.getElementById('cs-cat').textContent     = cat;
  document.getElementById('cs-brand').textContent   = brand;
  document.getElementById('cs-cond').textContent    = cond;
  document.getElementById('cs-price').textContent   = price ? fmt(price) : '—';
  document.getElementById('cs-warranty').textContent= warranty;
  document.getElementById('cs-city').textContent    = dist ? `${city}, ${dist}` : city;
  document.getElementById('cs-ship').textContent    = ship;

  // Preview card
  document.getElementById('pvImg').textContent      = selectedEmoji;
  document.getElementById('pvCat').textContent      = cat;
  document.getElementById('pvName').textContent     = title;
  document.getElementById('pvPrice').textContent    = price ? fmt(price) : '—';
  document.getElementById('pvOldPrice').textContent = oldPrice ? fmt(oldPrice) : '';
  document.getElementById('pvCondBadge').textContent = condEl ? condMap[condEl.value].split(' ')[0] : '—';
  document.getElementById('pvWarranty').textContent = warranty;
}

// Live preview update
function updatePreview() {
  const cat = document.getElementById('f-cat').value;
  if (cat) { renderEmojiGrid(); updateMarketHint(); }
}

// ========================
// SUBMIT
// ========================
function submitListing() {
  if (!document.getElementById('f-terms').checked) {
    setSFError('g-terms', 'Bạn cần đồng ý với điều khoản đăng bán');
    document.getElementById('e-terms').textContent = 'Bạn cần đồng ý với điều khoản đăng bán';
    return;
  }

  const btn      = document.getElementById('btnSubmitSell');
  const btnText  = btn.querySelector('.btn-text');
  const btnLoader= btn.querySelector('.btn-loader');
  btnText.style.display  = 'none';
  btnLoader.style.display= 'flex';
  btn.disabled = true;

  setTimeout(() => {
    const code  = 'TP-' + String(Math.floor(Math.random() * 999999)).padStart(6, '0');
    const title = document.getElementById('f-title').value.trim();
    const price = parseInt(document.getElementById('f-price').value) || 0;

    document.getElementById('listingCode').textContent  = code;
    document.getElementById('listingTitle').textContent = title;
    document.getElementById('listingPrice').textContent = fmt(price);

    // Mark step 4 done, go to step 5
    document.getElementById('step-ind-4').classList.add('done');
    document.getElementById('line-3').classList.add('done');
    document.getElementById('sellStep4').classList.add('hidden');
    document.getElementById('sellStep5').classList.remove('hidden');
    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('progressLabel').textContent = '✅ Đăng tin thành công!';

    showToast(`✅ Đăng tin thành công! Mã: ${code}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1800);
}

// ========================
// TOAST
// ========================
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastText').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 3000);
}

// ========================
// FORMAT
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
  const um = document.getElementById('userMenu');
  um.style.display = 'flex';
  document.getElementById('userName').textContent   = displayName;
  document.getElementById('userAvatar').textContent = displayName.charAt(0).toUpperCase();
}
function logout() {
  sessionStorage.removeItem('currentUser');
  document.getElementById('authButtons').style.display = 'flex';
  document.getElementById('userMenu').style.display    = 'none';
  showToast('Đã đăng xuất');
}

// ========================
// INIT
// ========================
checkAuthState();
renderEmojiGrid();
renderImageThumbs();

// Update emoji grid when category changes
document.getElementById('f-cat').addEventListener('change', () => {
  renderEmojiGrid();
  updateMarketHint();
});