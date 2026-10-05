// الرقم الخاص بك بدون رمز + وبدون مسافات
const MY_PHONE_NUMBER = "212698734327"; 

let selectedGender = 'men';      
let selectedSeason = 'all';      
let selectedOccasion = 'all';    
let selectedPerfume = '';
let selectedPrice = '';

// التحكم في القائمة الجانبية (Sidebar)
window.toggleSidebar = function() {
  const drawer = document.getElementById('sidebarDrawer');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (drawer && overlay) {
    const isActive = drawer.classList.contains('active');
    if (isActive) {
      window.closeSidebar();
    } else {
      drawer.classList.add('active');
      overlay.style.display = 'block';
      setTimeout(() => overlay.classList.add('active'), 10);
    }
  }
};

window.closeSidebar = function() {
  const drawer = document.getElementById('sidebarDrawer');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (drawer) drawer.classList.remove('active');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 300);
  }
};

// التصفية عبر التصنيفات من الجانب
window.filterByOccasion = function(occasion) {
  selectedOccasion = occasion;

  const titleMap = {
    'all': 'جميع العطور الملكية',
    'everyday': 'عطور الاستعمال اليومي (EVERY DAY)',
    'sexy': 'العطور الجذابة (SEXY)',
    'gym': 'عطور الرياضة والانتعاش (GYM)',
    'parties': 'عطور الحفلات والسهرات (PARTIES)',
    'special': 'عطور المناسبات الخاصة (SPECIAL OCCASION)'
  };

  const activeTitle = document.getElementById('activeCategoryTitle');
  if (activeTitle) {
    activeTitle.innerText = titleMap[occasion] || 'تشكيلة العطور الملكية';
  }

  window.closeSidebar();
  window.applyFilter();
};

// تصفية الجنس
window.setGender = function(gender, event) {
  selectedGender = gender;
  document.querySelectorAll('.gender-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  window.applyFilter();
};

// تصفية الفصل
window.setSeason = function(season, event) {
  selectedSeason = season;
  document.querySelectorAll('.season-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  window.applyFilter();
};

// تطبيق التصفية
window.applyFilter = function() {
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    const genders = card.getAttribute('data-gender') || '';
    const seasons = card.getAttribute('data-season') || '';
    const occasion = card.getAttribute('data-occasion') || '';

    const matchGender = genders.includes(selectedGender);
    const matchSeason = (selectedSeason === 'all') || seasons.includes(selectedSeason);
    const matchOccasion = (selectedOccasion === 'all') || (occasion === selectedOccasion);

    if (matchGender && matchSeason && matchOccasion) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
};

// فتح وإغلاق نافذة الطلب
window.openModal = function(name, price) {
  selectedPerfume = name;
  selectedPrice = price;
  const info = document.getElementById('modalPerfumeInfo');
  if (info) {
    info.innerText = `✨ ${name} — ${price}`;
  }
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.style.display = 'flex';
  }
};

window.closeModal = function() {
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.style.display = 'none';
  }
};

// إرسال الطلب عبر الواتساب
window.sendOrder = function(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('clientName').value;
  const phone = document.getElementById('clientPhone').value;
  const city = document.getElementById('clientCity').value;

  // صياغة نص الرسالة
  const textMessage = `👑 *طلب جديد من المتجر الملكي* 👑\n` +
                      `-----------------------------------\n` +
                      `✨ *العطر المطلوب:* ${selectedPerfume}\n` +
                      `💰 *الثمن:* ${selectedPrice}\n` +
                      `-----------------------------------\n` +
                      `👤 *اسم الزبون:* ${name}\n` +
                      `📞 *رقم الهاتف:* ${phone}\n` +
                      `🏙️ *المدينة:* ${city}\n` +
                      `-----------------------------------\n` +
                      `المرجو تأكيد الطلب والشحن وشكراً!`;

  // تشفير النص لضمان توافقه مع الروابط والعربية
  const encodedText = encodeURIComponent(textMessage);

  // رابط الواتساب الصحيح المباشر
  const whatsappUrl = `https://wa.me/${MY_PHONE_NUMBER}?text=${encodedText}`;

  window.open(whatsappUrl, '_blank');
  window.closeModal();
};

document.addEventListener('DOMContentLoaded', () => {
  window.applyFilter();
});
