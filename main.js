// غير هذا الرقم إلى رقم هاتفك على الواتساب (مع الرمز الدولي للمغرب 212 بدون صفر وبدون علامة +)
const MY_PHONE_NUMBER = "212600000000"; 

let selectedGender = 'men';  // القسم الافتراضي (عطور رجالية)
let selectedSeason = 'all';  // الفصل الافتراضي (جميع الفصول)
let selectedPerfume = '';
let selectedPrice = '';

// اختيار القسم (رجالية / نسائية)
function setGender(gender, event) {
  selectedGender = gender;
  
  document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  applyFilter();
}

// اختيار الفصل (شتوية / صيفية / ...)
function setSeason(season, event) {
  selectedSeason = season;

  document.querySelectorAll('.season-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  applyFilter();
}

// فلترة المنتجات بناءً على الجنس والفصل معاً
function applyFilter() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const categories = card.getAttribute('data-category'); // مثال: "men winter"
    
    const matchGender = categories.includes(selectedGender);
    const matchSeason = (selectedSeason === 'all') || categories.includes(selectedSeason);

    if (matchGender && matchSeason) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// فتح نافذة إدخال بيانات الزبون
function openModal(name, price) {
  selectedPerfume = name;
  selectedPrice = price;
  document.getElementById('modalPerfumeInfo').innerText = `✨ ${name} — ${price}`;
  document.getElementById('orderModal').style.display = 'flex';
}

// إغلاق النافذة
function closeModal() {
  document.getElementById('orderModal').style.display = 'none';
}

// إرسال تفاصيل الطلب مباشرة إلى الواتساب
function sendOrder(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value;
  const phone = document.getElementById('clientPhone').value;
  const city = document.getElementById('clientCity').value;

  const text = `👑 *طلب جديد من المتجر الملكي* 👑%0A` +
               `-----------------------------------%0A` +
               `✨ *العطر المطلوبة:* ${selectedPerfume}%0A` +
               `💰 *الثمن:* ${selectedPrice}%0A` +
               `-----------------------------------%0A` +
               `👤 *اسم الزبون:* ${name}%0A` +
               `📞 *رقم الهاتف:* ${phone}%0A` +
               `🏙️ *المدينة:* ${city}%0A` +
               `-----------------------------------%0A` +
               `المرجو تأكيد الطلب والشحن وشكراً!`;

  const whatsappURL = `https://wa.me/${MY_PHONE_NUMBER}?text=${text}`;
  window.open(whatsappURL, '_blank');
  closeModal();
}

// تشغيل الفلتر بمجرد تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  applyFilter();
});
