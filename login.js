
const SUPABASE_URL = 'https://frvjsvbyhvmohfagxxgb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZydmpzdmJ5aHZtb2hmYWd4eGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NDQ3NzEsImV4cCI6MjA5MDUyMDc3MX0.dpCfLm7zk8KmabL6q7lV9BtZ-9oTQmkZPQMZsG7Q2T0';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


function switchTab(tab) {
  const indicator   = document.getElementById('tabIndicator');
  const tabLogin    = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');

  if (tab === 'login') {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    indicator.style.left = '0%';
    showForm('formLogin');
  } else {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    indicator.style.left = '50%';
    showForm('formRegister');
  }
}

function showForm(id) {
  ['formLogin', 'formRegister', 'formForgot', 'formSuccess'].forEach(f => {
    const el = document.getElementById(f);
    if (el.id === id) {
      el.classList.remove('hidden');
      el.style.animation = 'none';
      el.offsetHeight;
      el.style.animation = '';
    } else {
      el.classList.add('hidden');
    }
  });
}

function showForgot() { showForm('formForgot'); }
function showLogin()  { switchTab('login'); showForm('formLogin'); }

// ========================
// ACCOUNT TYPE SELECTOR
// ========================
document.querySelectorAll('.type-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.type-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    card.querySelector('input[type="radio"]').checked = true;
  });
});

// ========================
// TOGGLE PASSWORD
// ========================
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon  = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// ========================
// PASSWORD STRENGTH
// ========================
function updateStrength() {
  const val   = document.getElementById('rgPassword').value;
  const fill  = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  let score = 0;
  if (val.length >= 8)          score++;
  if (/[A-Z]/.test(val))        score++;
  if (/[0-9]/.test(val))        score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const levels = [
    { pct:'0%',   color:'transparent', text:'',             style:'' },
    { pct:'25%',  color:'#ef4444',     text:'Rất yếu',      style:'color:#ef4444' },
    { pct:'50%',  color:'#f59e0b',     text:'Yếu',          style:'color:#f59e0b' },
    { pct:'75%',  color:'#00d4ff',     text:'Trung bình',   style:'color:#00d4ff' },
    { pct:'100%', color:'#10b981',     text:'Mạnh 💪',      style:'color:#10b981' },
  ];
  const level = val.length === 0 ? levels[0] : levels[score];
  fill.style.width      = level.pct;
  fill.style.background = level.color;
  label.textContent     = level.text;
  label.setAttribute('style', level.style);
}

// ========================
// LIVE EMAIL CHECK
// ========================
let emailCheckTimer = null;
function checkEmailLive() {
  clearTimeout(emailCheckTimer);
  const status = document.getElementById('emailStatus');
  const val = document.getElementById('rgEmail').value.trim();
  if (!val) { status.textContent = ''; return; }
  status.textContent = '⏳';
  status.className   = 'input-status';

  emailCheckTimer = setTimeout(async () => {
    if (!isValidEmail(val)) { status.textContent = ''; return; }
    // Kiểm tra email đã tồn tại trong DB chưa
    const { data } = await db.from('users').select('id').eq('email', val).maybeSingle();
    if (data) {
      status.innerHTML = '<i class="fas fa-times-circle"></i>';
      status.className = 'input-status fail';
      setError('rg-email-group', 'Email này đã được sử dụng');
    } else {
      status.innerHTML = '<i class="fas fa-check-circle"></i>';
      status.className = 'input-status ok';
      clearError('rg-email-group');
    }
  }, 600);
}

// ========================
// CONFIRM PASSWORD CHECK
// ========================
function checkConfirm() {
  const pass    = document.getElementById('rgPassword').value;
  const confirm = document.getElementById('rgConfirm').value;
  const status  = document.getElementById('confirmStatus');
  if (!confirm) { status.textContent = ''; return; }
  if (pass === confirm) {
    status.innerHTML = '<i class="fas fa-check-circle"></i>';
    status.className = 'input-status ok';
    clearError('rg-confirm-group');
  } else {
    status.innerHTML = '<i class="fas fa-times-circle"></i>';
    status.className = 'input-status fail';
  }
}

// ========================
// VALIDATION HELPERS
// ========================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^(0|\+84)[3-9]\d{8}$/.test(phone.replace(/\s/g, ''));
}
function setError(groupId, msg) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.classList.add('has-error');
  const errEl = group.querySelector('.field-error') ||
                document.getElementById(groupId.replace('-group', '-error'));
  if (errEl) errEl.textContent = msg;
}
function clearError(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.classList.remove('has-error');
  const errEl = group.querySelector('.field-error') ||
                document.getElementById(groupId.replace('-group', '-error'));
  if (errEl) errEl.textContent = '';
}

// ========================
// LOADING STATE
// ========================
function setLoading(formId, loading) {
  const form      = document.getElementById(formId);
  const btnText   = form.querySelector('.btn-text');
  const btnLoader = form.querySelector('.btn-loader');
  const btnSubmit = form.querySelector('.btn-submit');
  btnText.style.display   = loading ? 'none' : 'flex';
  btnLoader.style.display = loading ? 'flex' : 'none';
  btnSubmit.disabled      = loading;
}

// ========================
// LOGIN HANDLER – Supabase
// ========================
async function handleLogin() {
  let valid = true;
  const email = document.getElementById('lgEmail').value.trim();
  const pass  = document.getElementById('lgPassword').value;

  if (!email) {
    setError('lg-email-group', 'Vui lòng nhập email'); valid = false;
  } else if (!isValidEmail(email)) {
    setError('lg-email-group', 'Email không hợp lệ'); valid = false;
  }
  if (!pass) {
    setError('lg-pass-group', 'Vui lòng nhập mật khẩu'); valid = false;
  } else if (pass.length < 6) {
    setError('lg-pass-group', 'Mật khẩu ít nhất 6 ký tự'); valid = false;
  }
  if (!valid) return;

  setLoading('formLogin', true);

  // Tìm user trong DB theo email + password (hash so sánh đơn giản)
  // Lưu ý: đây là xác thực đơn giản không dùng Supabase Auth
  // Password được lưu dạng hash md5 hoặc so sánh trực tiếp tuỳ cách bạn đăng ký
  const { data: user, error } = await db
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', pass)
    .maybeSingle();

  setLoading('formLogin', false);

  if (error || !user) {
    setError('lg-email-group', 'Email hoặc mật khẩu không đúng');
    setError('lg-pass-group', 'Email hoặc mật khẩu không đúng');
    showToast('❌ Email hoặc mật khẩu không đúng', 'error');
    return;
  }

  // Lưu session
  const remember = document.getElementById('lgRemember').checked;
  const storage  = remember ? localStorage : sessionStorage;
  storage.setItem('currentUser', JSON.stringify({
    id:    user.id,
    name:  user.name,
    email: user.email,
    phone: user.phone,
    role:  user.role || 'user'
  }));

  showToast(`✅ Chào mừng trở lại, ${user.name}!`, 'ok');
  showSuccess('Đăng nhập thành công!', `Chào mừng trở lại, ${user.name}! Đang chuyển hướng...`);
}

// ========================
// REGISTER HANDLER – Supabase
// ========================
async function handleRegister() {
  let valid = true;
  const firstName = document.getElementById('rgFirstName').value.trim();
  const lastName  = document.getElementById('rgLastName').value.trim();
  const email     = document.getElementById('rgEmail').value.trim();
  const phone     = document.getElementById('rgPhone').value.trim();
  const pass      = document.getElementById('rgPassword').value;
  const confirm   = document.getElementById('rgConfirm').value;
  const terms     = document.getElementById('rgTerms').checked;
  const role      = document.querySelector('input[name="accountType"]:checked')?.value || 'buyer';

  if (!firstName) { setError('rg-fname-group', 'Nhập họ của bạn'); valid = false; }
  if (!lastName)  { setError('rg-lname-group', 'Nhập tên của bạn'); valid = false; }
  if (!email) {
    setError('rg-email-group', 'Vui lòng nhập email'); valid = false;
  } else if (!isValidEmail(email)) {
    setError('rg-email-group', 'Email không hợp lệ'); valid = false;
  }
  if (!phone) {
    setError('rg-phone-group', 'Vui lòng nhập số điện thoại'); valid = false;
  } else if (!isValidPhone(phone)) {
    setError('rg-phone-group', 'Số điện thoại không hợp lệ'); valid = false;
  }
  if (!pass) {
    setError('rg-pass-group', 'Vui lòng nhập mật khẩu'); valid = false;
  } else if (pass.length < 8) {
    setError('rg-pass-group', 'Mật khẩu ít nhất 8 ký tự'); valid = false;
  }
  if (!confirm) {
    setError('rg-confirm-group', 'Vui lòng xác nhận mật khẩu'); valid = false;
  } else if (pass !== confirm) {
    setError('rg-confirm-group', 'Mật khẩu xác nhận không khớp'); valid = false;
  }
  if (!terms) {
    setError('rg-terms-group', 'Bạn cần đồng ý với điều khoản sử dụng'); valid = false;
    document.getElementById('rg-terms-error').textContent = 'Bạn cần đồng ý với điều khoản sử dụng';
  }
  if (!valid) return;

  setLoading('formRegister', true);

  // Kiểm tra email đã tồn tại chưa
  const { data: existing } = await db
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existing) {
    setLoading('formRegister', false);
    setError('rg-email-group', 'Email này đã được sử dụng');
    return;
  }

  // Lưu user vào DB
  const { data: newUser, error } = await db
    .from('users')
    .insert([{
      name:     `${firstName} ${lastName}`,
      email,
      phone:    phone.replace(/\s/g, ''),
      password: pass,   // ⚠️ Thực tế nên hash password, đây là demo đơn giản
      role
    }])
    .select()
    .single();

  setLoading('formRegister', false);

  if (error) {
    showToast('❌ Lỗi đăng ký: ' + error.message, 'error');
    return;
  }

  showToast('🎉 Đăng ký thành công! Hãy đăng nhập để tiếp tục.', 'ok');
  setTimeout(() => {
    switchTab('login');
    document.getElementById('lgEmail').value = email;
    const hint = document.getElementById('registerSuccessHint');
    if (hint) hint.style.display = 'flex';
    document.getElementById('lgPassword').focus();
  }, 1400);
}

// ========================
// FORGOT PASSWORD HANDLER
// ========================
async function handleForgot() {
  const email = document.getElementById('fpEmail').value.trim();
  if (!email) { setError('fp-email-group', 'Vui lòng nhập email'); return; }
  if (!isValidEmail(email)) { setError('fp-email-group', 'Email không hợp lệ'); return; }

  setLoading('formForgot', true);

  // Kiểm tra email có tồn tại không
  const { data } = await db.from('users').select('id').eq('email', email).maybeSingle();

  setLoading('formForgot', false);

  if (!data) {
    setError('fp-email-group', 'Email này chưa được đăng ký');
    return;
  }

  // Thực tế: gửi email reset qua Supabase Auth hoặc service khác
  // Tạm thời thông báo thành công
  showToast(`📧 Đã ghi nhận! Liên hệ admin để đặt lại mật khẩu.`, 'ok');
  setTimeout(() => showLogin(), 2500);
}

// ========================
// SOCIAL LOGIN (demo)
// ========================
function socialLogin(provider) {
  showToast(`🔗 Đang kết nối với ${provider}...`, 'ok');
  setTimeout(() => {
    showToast(`✅ Đăng nhập ${provider} thành công!`, 'ok');
    setTimeout(() => {
      showSuccess(`Đăng nhập bằng ${provider} thành công!`, 'Đang chuyển hướng về trang chủ...');
    }, 1000);
  }, 1500);
}

// ========================
// SUCCESS SCREEN
// ========================
function showSuccess(title, msg) {
  document.getElementById('successTitle').textContent = title;
  document.getElementById('successMsg').textContent   = msg;
  showForm('formSuccess');
  setTimeout(() => {
    document.getElementById('successBar').style.width = '100%';
  }, 100);
  setTimeout(() => {
    // Nếu là admin → chuyển sang admin.html
    const user = JSON.parse(sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser') || '{}');
    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'index.html';
    }
  }, 3000);
}

// ========================
// TOAST NOTIFICATION
// ========================
function showToast(msg, type = 'ok') {
  const toast = document.getElementById('authToast');
  const icon  = document.getElementById('toastIcon');
  const msgEl = document.getElementById('toastMsg');
  msgEl.textContent = msg;
  toast.className   = `auth-toast show ${type === 'error' ? 'error' : ''}`;
  icon.className    = `toast-icon fas ${type === 'error' ? 'fa-times-circle error' : 'fa-check-circle ok'}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========================
// INIT
// ========================
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('tab') === 'register') switchTab('register');

// Kiểm tra đã đăng nhập rồi thì redirect luôn
const savedUser = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
if (savedUser) {
  const u = JSON.parse(savedUser);
  window.location.href = u.role === 'admin' ? 'admin.html' : 'index.html';
}

// ========================
// KEYBOARD: Enter
// ========================
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  if (!document.getElementById('formLogin').classList.contains('hidden'))    handleLogin();
  if (!document.getElementById('formRegister').classList.contains('hidden')) handleRegister();
  if (!document.getElementById('formForgot').classList.contains('hidden'))   handleForgot();
});