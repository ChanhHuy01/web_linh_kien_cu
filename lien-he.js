/* ================================================
   lien-he.js — TechParts Trang Liên Hệ
   ================================================ */

/* ── CHỌN CHỦ ĐỀ ── */
function selectTopic(el) {
  document.querySelectorAll('.topic-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

/* ── GỬI FORM ── */
function submitForm() {
  const name    = document.getElementById('fullName').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !phone || !email || !message) {
    alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
    return;
  }
  if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
    alert('Email không hợp lệ.');
    return;
  }

  document.getElementById('formContent').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'flex';
}

/* ── RESET FORM ── */
function resetForm() {
  document.getElementById('fullName').value  = '';
  document.getElementById('phone').value     = '';
  document.getElementById('email').value     = '';
  document.getElementById('subject').value   = '';
  document.getElementById('message').value   = '';
  document.getElementById('formSuccess').style.display = 'none';
  document.getElementById('formContent').style.display = 'block';
  // Reset chip về mặc định
  document.querySelectorAll('.topic-chip').forEach((c, i) => {
    c.classList.toggle('active', i === 0);
  });
}

/* ── FAQ ACCORDION ── */
function toggleFaq(el) {
  const item   = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}