// Dark Mode Functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference, if any, on initial load
    const currentTheme = localStorage.getItem('theme');
    
    // If the current theme in localStorage is 'dark' or the user's system preference is dark and no theme is set
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Listen for toggle button click
    darkModeToggle.addEventListener('click', function() {
        // Toggle dark mode class on body
        document.body.classList.toggle('dark-mode');
        
        // Toggle between moon and sun icon
        const isDarkMode = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save user preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.body.classList.remove('dark-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
    });
}

// Offer details in both languages
const offerDetails = {
    ar: {
        1: {
            title: 'عروض شركات',
            description: `
                <p>• بنوفر أسطول من العربيات الدبابة داخل القاهرة والجيزة لتوفير احتياجات شركتك</p>
                <p>• بنوفر رحلات أمانه من القاهرة لأي محافظة على مستوى الجمهورية</p>
                <p>• رحلاتنا أمانه ومواعيدنا ثابته بالحجز المسبق</p>
                <p>• يمكن أسعارنا متكونش الأرخص في السوق، لكن بنضفلك مقابلها</p>
                <p>• عربيات جاهزة دائماً (مفيش حاجة اسمها معندناش دلوقتي)</p>
                <p>• الالتزام بالمواعيد بدقة (بنتعامل كأن كل أوردر ليك شحنة حساسة)</p>
                <p>• يعني إحنا مش بنقدم مجرد نقل، إحنا بنقدم حلول موثوقة للتوصيل</p>
                <p>• اسأل عن خصومات وعروض الشركات المميزة</p>
            `,
            image: 'عروض شركات.jpg'
        },
        2: {
            title: 'عروض اسكندريه',
            description: `
                <p>• عروض نقل رحلات خاصة من القاهرة إلى الإسكندرية بعربيات دبابة 2500 فقط لا غير</p>
                <p>• الامتيازات</p>
                <p>• إمكانية تحميل العربة بالكامل</p>
                <p>• إمكانية تحديد ميعاد النقلة</p>
                <p>• إمكانية ركوب عدد 2 ركاب أو أكثر</p>
                <p>• رحلة واحدة فقط (ذهاب أو عودة)</p>
                <p>• عروض الشحن لرحلات الإسكندرية</p>
                <p>• النظام الأول: الشحن السريع (بداية من 1900 إلى 1500)</p>
                <p>• النظام الثاني: الشحن (بداية من 1500 إلى 1000)</p>
                <p>• نظام الشحن بالقطعة (من 500 إلى 1200)</p>
            `,
            image: 'صور00.jpg'
        },
        3: {
            title: 'عروض خط الصعيد من بني سويف ل سوهاج',
            description: `
                <p>• عروض نقل رحلات خاصه من القاهره الي بني سويف 3000</p>
                <p>• عروض نقل رحلات خاصه من القاهره الي المنيا 3500</p>
                <p>• عروض نقل رحلات خاصه من القاهره الي اسيوط 4500</p>
                <p>• عروض نقل رحلات خاصه من القاهره الي سوهاج 5000</p>
                <p>• عروض الشحن لخط الصعيد بتوصل لنصف تكلفة النقله الخاصه</p>
            `,
            image: 'خط الصعيد.jpg'
        },
        4: {
            title: 'عروض العالمين و الساحل الشمالي',
            description: `
                <p>• عروض نقل رحلات خاصه من القاهره الي الساحل الشمالي بعربيات دبابة 3500 فقط لا غير</p>
                <p>• الامتيازات</p>
                <p>• إمكانية تحميل العربة بالكامل</p>
                <p>• إمكانية تحديد ميعاد النقلة</p>
                <p>• إمكانية ركوب عدد 2 ركاب أو أكثر</p>
                <p>• رحلة واحدة فقط (ذهاب أو عودة)</p>
                <p>• عروض الشحن لرحلات الساحل الشمالي</p>
                <p>• النظام الأول: الشحن السريع (بداية من 2500 إلى 2000)</p>
                <p>• النظام الثاني: الشحن (بداية من 1800 إلى 1000)</p>
                <p>• نظام الشحن بالقطعة (من 800 إلى 1200)</p>
            `,
            image: 'العالمين.jpg'
        },
        5: {
            title: 'جامبو جميع المحافظات',
            description: `
                <p>• جامبو جميع المحافظات لنقل البضائع لأي محافظة في مصر بأمان وسرعة.</p>
                <p>• بنوفر لك عمالة مدربة وفنيين متخصصين في التحميل والتفريغ.</p>
                <p>• خدمات صيانة فورية لأي مشكلة أثناء النقل.</p>
                <p>• فريق دعم فني متكامل لخدمة العملاء على مدار الساعة.</p>
                <p>• سيارات مجهزة لنقل جميع أنواع البضائع لجميع المحافظات.</p>
                <p>• أسعار تنافسية وحلول متكاملة لأي احتياج في النقل أو الخدمات اللوجستية.</p>
                <p>• لو محتاج نقل، عمالة، صيانة أو فنيين... إحنا جاهزين نخدمك في أي وقت وأي مكان.</p>
            `,
            image: 'جامبو 2.jpg'
        },
        6: {
            title: 'جمامبو الجيزة',
            description: `
                <p>• جمامبو الجيزة لنقل البضائع داخل محافظة الجيزة والمناطق المجاورة.</p>
                <p>• التزام بالمواعيد ودقة في التوصيل.</p>
                <p>• أسعار مناسبة للجميع.</p>
                <p>• سيارات حديثة ومجهزة بالكامل.</p>
            `,
            image: 'جمامبو2.jpg'
        },
        7: {
            title: 'جمامبو الدلتا',
            description: `
                <p>• جمامبو الدلتا لنقل البضائع بين محافظات الدلتا بسرعة وأمان.</p>
                <p>• خدمة شحن جزئي وكامل حسب الطلب.</p>
                <p>• أسعار خاصة للشركات والمصانع.</p>
                <p>• دعم فني متواصل.</p>
            `,
            image: 'صور00.jpg'
        },
        8: {
            title: 'جمامبو الصعيد',
            description: `
                <p>• جمامبو الصعيد لنقل البضائع من القاهرة إلى محافظات الصعيد.</p>
                <p>• رحلات يومية وتوصيل سريع.</p>
                <p>• أسعار مخفضة للعقود الشهرية.</p>
                <p>• سيارات مجهزة لنقل البضائع الثقيلة.</p>
            `,
            image: 'جمامبو4.jpg'
        }
    },
    en: {
        1: {
            title: 'Company Offers',
            description: `
                <p>• We provide a fleet of tanker trucks in Cairo and Giza to meet your company's needs</p>
                <p>• We provide reliable trips from Cairo to any governorate across the country</p>
                <p>• Our trips are reliable with fixed schedules upon prior booking</p>
                <p>• Our prices may not be the cheapest in the market, but we ensure you get more than what you pay for</p>
                <p>• Vehicles always available (No such thing as 'not available now')</p>
                <p>• Punctuality guaranteed (We treat every order as a sensitive shipment)</p>
                <p>• We don't just provide transportation, we provide reliable delivery solutions</p>
                <p>• Ask about our exclusive corporate discounts and special offers</p>
            `,
            image: 'عروض شركات.jpg'
        },
        2: {
            title: 'Alexandria Offers',
            description: `
                <p>• Special transportation offers for private trips from Cairo to Alexandria in tanker trucks for only 2500 EGP</p>
                <p>• Privileges</p>
                <p>• Full cart loading capability</p>
                <p>• Ability to schedule the transfer time</p>
                <p>• Ability to accommodate 2 or more passengers</p>
                <p>• One way trip only</p>
                <p>• Shipping offers for North Coast trips</p>
                <p>• First System: Express Shipping (from 1900 to 1500)</p>
                <p>• Second System: Shipping (from 1500 to 1000)</p>
                <p>• Parcel Shipping System (from 500 to 1200)</p>
            `,
            image: 'صور00.jpg'
        },
        3: {
            title: 'Upper Egypt Line',
            description: `
                <p>• Special transportation offers for private trips from Cairo to Beni Suef for only 3000 EGP</p>
                <p>• Special transportation offers for private trips from Cairo to Minya for only 3500 EGP</p>
                <p>• Special transportation offers for private trips from Cairo to Asyut for only 4500 EGP</p>
                <p>• Special transportation offers for private trips from Cairo to Sohag for only 5000 EGP</p>
                <p>• Shipping offers for Upper Egypt routes are half the price of private transportation</p>
            `,
            image: 'خط الصعيد.jpg'
        },
         4: {
            title: 'Alamein & North Coast Offers',
            description: `
                <p>• Special transportation offers for private trips from Cairo to North Coast in tanker trucks for only 3500 EGP</p>
                <p>• Privileges</p>
                <p>• Full cart loading capability</p>
                <p>• Ability to schedule the transfer time</p>
                <p>• Ability to accommodate 2 or more passengers</p>
                <p>• One way trip only</p>
                <p>• Shipping offers for North Coast trips</p>
                <p>• First System: Express Shipping (from 2500 to 2000)</p>
                <p>• Second System: Shipping (from 1800 to 1000)</p>
                <p>• Parcel Shipping System (from 800 to 1200)</p>
            `,
            image: 'العالمين.jpg'
        },
        5: {
            title: 'Jumbo All Governorates',
            description: `
                <p>• Jumbo All Governorates for fast and safe goods transport to any governorate in Egypt.</p>
                <p>• We provide skilled labor and specialized technicians for loading and unloading.</p>
                <p>• On-the-spot maintenance services for any issue during transport.</p>
                <p>• A full technical support team available 24/7 for all customer needs.</p>
                <p>• Vehicles equipped for all types of goods to all governorates.</p>
                <p>• Competitive prices and integrated solutions for all logistics and transport needs.</p>
                <p>• Whether you need transport, labor, maintenance, or technicians... we are ready to serve you anytime, anywhere.</p>
            `,
            image: 'جامبو 2.jpg'
        },
        6: {
            title: 'Jumbo Giza',
            description: `
                <p>• Jumbo Giza for goods transport within Giza and nearby areas.</p>
                <p>• Commitment to timing and delivery accuracy.</p>
                <p>• Affordable prices for everyone.</p>
                <p>• Modern, fully equipped vehicles.</p>
            `,
            image: 'جمامبو2.jpg'
        },
        7: {
            title: 'Jumbo Delta',
            description: `
                <p>• Jumbo Delta for fast and safe transport between Delta governorates.</p>
                <p>• Partial and full shipping available as needed.</p>
                <p>• Special prices for companies and factories.</p>
                <p>• Continuous technical support.</p>
            `,
            image: 'جمامبو3.jpg'
        },
        8: {
            title: 'Jumbo Upper Egypt',
            description: `
                <p>• Jumbo Upper Egypt for goods transport from Cairo to Upper Egypt governorates.</p>
                <p>• Daily trips and fast delivery.</p>
                <p>• Discounted prices for monthly contracts.</p>
                <p>• Vehicles equipped for heavy goods transport.</p>
            `,
            image: 'جمامبو4.jpg'
        }
    }
};

// Function to open offer modal
function openOfferModal(offerId) {
    const modal = document.getElementById('offerModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    const currentLang = document.documentElement.lang || 'ar';
    const offer = offerDetails[currentLang][offerId] || offerDetails['ar'][offerId];
    
    if (offer) {
        modalImage.src = offer.image;
        modalImage.alt = offer.title;
        modalTitle.textContent = offer.title;
        modalDescription.innerHTML = offer.description;
        
        // Show modal with animation
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }, 10);

        // إعداد روابط المشاركة
        setTimeout(() => {
            const shareWhatsapp = document.getElementById('shareWhatsapp');
            const shareFacebook = document.getElementById('shareFacebook');
            const shareMessenger = document.getElementById('shareMessenger');
            const shareInstagram = document.getElementById('shareInstagram');
            const pageUrl = window.location.href;
            const title = offer.title;
            const desc = modalDescription.textContent || title;
            // واتساب
            if (shareWhatsapp) {
                shareWhatsapp.onclick = function() {
                    const text = encodeURIComponent(title + " - " + desc + "\n" + pageUrl);
                    window.open('https://wa.me/?text=' + text, '_blank');
                };
            }
            // فيسبوك
            if (shareFacebook) {
                shareFacebook.onclick = function() {
                    const fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl) + '&quote=' + encodeURIComponent(title + " - " + desc);
                    window.open(fbUrl, '_blank');
                };
            }
            // ماسنجر
            if (shareMessenger) {
                shareMessenger.onclick = function() {
                    const msgUrl = 'https://www.facebook.com/dialog/send?app_id=123456789&link=' + encodeURIComponent(pageUrl) + '&redirect_uri=' + encodeURIComponent(pageUrl);
                    window.open(msgUrl, '_blank');
                };
            }
            // إنستجرام (لا يوجد مشاركة مباشرة، ننسخ النص)
            if (shareInstagram) {
                shareInstagram.onclick = function() {
                    const shareText = title + " - " + desc + "\n" + pageUrl;
                    navigator.clipboard.writeText(shareText).then(function() {
                        showNotification('تم نسخ نص العرض! يمكنك لصقه في إنستجرام.');
                    });
                };
            }
        }, 100);

            // عداد تنازلي 25 ساعة يعمل دائماً
            const countdownTimer = document.getElementById('countdownTimer');
            if (countdownTimer) {
                // استخدم مفتاح خاص لكل عرض
                const timerKey = 'offerCountdown_' + offerId;
                let startTime = localStorage.getItem(timerKey);
                if (!startTime) {
                    startTime = Date.now();
                    localStorage.setItem(timerKey, startTime);
                }
                let endTime = parseInt(startTime) + 25 * 60 * 60 * 1000;
                clearInterval(window.offerCountdownInterval);
                function getCountdownText(hours, minutes, seconds, lang, ended) {
                    if (ended) {
                        return lang === 'ar' ? "انتهى العرض!" : "Offer ended!";
                    }
                    if (lang === 'ar') {
                        return `ينتهي العرض خلال: ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;
                    } else {
                        return `Offer ends in: ${hours}h ${minutes}m ${seconds}s`;
                    }
                }
                function updateCountdown() {
                    let now = Date.now();
                    let remaining = Math.max(0, Math.floor((endTime - now) / 1000));
                    let hours = Math.floor(remaining / 3600);
                    let minutes = Math.floor((remaining % 3600) / 60);
                    let seconds = remaining % 60;
                    const lang = document.documentElement.lang || 'ar';
                    countdownTimer.textContent = getCountdownText(hours, minutes, seconds, lang, remaining <= 0);
                    if (remaining <= 0) {
                        clearInterval(window.offerCountdownInterval);
                    }
                }
                updateCountdown();
                window.offerCountdownInterval = setInterval(updateCountdown, 1000);

                // تحديث العد التنازلي عند تغيير اللغة
                if (!window.countdownLangListener) {
                    window.countdownLangListener = true;
                    document.getElementById('langToggle')?.addEventListener('click', function() {
                        setTimeout(updateCountdown, 300);
                    });
                }
            }
    }
}

// حماية الموقع من السرقة
// 1. منع النقر الأيمن
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// 2. منع اختصارات لوحة المفاتيح
const blockedKeys = [
    'F12', 'Ctrl+U', 'Ctrl+Shift+I', 'Ctrl+Shift+J', 'Ctrl+Shift+C',
    'F11', 'Ctrl+S', 'Ctrl+P'
];

const blockedKeyCombos = {
    'u': 'ctrl',
    'i': 'ctrl',
    'j': 'ctrl',
    'c': 'ctrl',
    's': 'ctrl',
    'p': 'ctrl'
};

document.addEventListener('keydown', function(e) {
    // منع F12
    if (e.key === 'F12' || e.key === 'F11') {
        e.preventDefault();
        return false;
    }
    
    // منع اختصارات لوحة المفاتيح
    const key = e.key.toLowerCase();
    if (blockedKeyCombos[key] && e[blockedKeyCombos[key] + 'Key']) {
        e.preventDefault();
        return false;
    }
});

// 3. منع التحديد
function disableSelection(e) {
    return false;
}

document.onselectstart = disableSelection;
document.onmousedown = disableSelection;

// 4. إضافة علامة مائية على الصور
function addWatermark() {
    const images = document.getElementsByTagName('img');
    for (let img of images) {
        img.style.position = 'relative';
        const watermark = document.createElement('div');
        watermark.style.position = 'absolute';
        watermark.style.bottom = '5px';
        watermark.style.right = '5px';
        watermark.style.color = 'rgba(0,0,0,0.3)';
        watermark.style.fontSize = '12px';
        watermark.textContent = '© ' + new Date().getFullYear() + ' YourCompany';
        img.parentNode.style.position = 'relative';
        img.parentNode.insertBefore(watermark, img.nextSibling);
    }
}

// تفعيل العلامة المائية عند تحميل الصفحة
window.addEventListener('load', addWatermark);

// Function to close offer modal
function closeOfferModal() {
    const modal = document.getElementById('offerModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside the content
window.onclick = function(event) {
    const modal = document.getElementById('offerModal');
    if (event.target === modal) {
        closeOfferModal();
    }
};

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('offerModal');
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeOfferModal();
    }
});

// Notification messages in both languages
const messages = {
    ar: [
        "محتار ف العروض صح 😂",
        "اي يابا هنطلع اسكندريه ولا ساحل 😉",
        "مش كل حاجه السعر الامان أهم بس احنا بقي وفرنالك الاتنين 🫡🙆🏼‍♂",
        "متنساش تسال ع كوبونات الخصم بتاعتنا",
        "ريح بالك واختار ال عسكر"
    ],
    en: [
        "Can't decide on the offers, huh? 😂",
        "So, Alexandria or the North Coast? 😉",
        "It's not just about the price, safety matters too - and we've got you covered on both! 🫡🙆🏼‍♂",
        "Don't forget to ask about our discount coupons!",
        "Take it easy and choose what suits you best!"
    ]
};

// Function to show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 5000);
}

// Function to show all messages in sequence
function showAllMessages() {
    let index = 0;
    const currentLang = document.documentElement.lang || 'ar';
    const langMessages = messages[currentLang] || messages['ar'];
    
    // Show first message immediately
    showNotification(langMessages[index]);
    index++;
    
    // Show next messages every 6 seconds (5s display + 1s gap)
    const interval = setInterval(() => {
        if (index < langMessages.length) {
            showNotification(langMessages[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 6000);
}

// Language translations
const translations = {
    en: {
        title: "My Special Offers",
        subtitle: "Discover our exclusive offers and discounts",
        companyOffers: "Company Offers",
        alexandriaOffers: "Alexandria Offers",
        upperEgyptOffers: "Upper Egypt Line",
        diamondOffers: "Diamond Package",
        jumboAll: "Jumbo All Governorates",
        copyright: "All Rights Reserved",
        register: "Register Now"
    },
    ar: {
        title: "عروضي المميزة",
        subtitle: "اكتشف أفضل العروض والخصومات الحصرية",
        companyOffers: "عروض شركات",
        alexandriaOffers: "عروض اسكندريه",
        upperEgyptOffers: "عروض خط الصعيد من بني سويف ل سوهاج",
        diamondOffers: "عروض العالمين و الساحل الشمالي",
        jumboAll: "جامبو جميع المحافظات",
        copyright: "جميع الحقوق محفوظة",
        register: "سجل هنا"
    }
};

// Keep track of notification interval
let notificationInterval = null;

// Function to set language
function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Update language toggle text
    const langCode = document.querySelector('.lang-code');
    if (langCode) {
        langCode.textContent = lang === 'ar' ? 'EN' : 'AR';
    }
    
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Restart notifications with new language
    if (notificationInterval) {
        clearInterval(notificationInterval);
    }
    showAllMessages();
}

// Initialize language
function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'ar';
    setLanguage(savedLang);
    
    // Toggle language on button click
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = document.documentElement.lang;
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    
    // Initialize language
    initLanguage();
    
    // Start showing notifications after 2 seconds
    setTimeout(showAllMessages, 2000);
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Get all offer buttons
    const offerButtons = document.querySelectorAll('.offer-btn');
    let activeButton = null;
    let isAnimating = false;
    const ANIMATION_DURATION = 300; // ms

    // Add click event to each button
    offerButtons.forEach(button => {
        const details = button.querySelector('.offer-details');
        const content = button.querySelector('.offer-content');
        
        // Initialize ARIA attributes
        button.setAttribute('aria-expanded', 'false');
        
        // Add keyboard navigation
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleOffer(this);
            } else if (e.key === 'Escape' && this === activeButton) {
                closeOffer(this);
            }
        });
        
        // Add click handler
        button.addEventListener('click', function(e) {
            // Don't toggle if clicking on a link inside the details
            if (e.target.tagName === 'A') return;
            toggleOffer(this);
        });
        
        // Add hover effect for desktop
        if (window.innerWidth > 768) {
            button.addEventListener('mouseenter', function() {
                if (this !== activeButton) {
                    this.style.transform = 'translateY(-5px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (this !== activeButton) {
                    this.style.transform = '';
                }
            });
        }
    });
    
    // Toggle offer function
    function toggleOffer(button) {
        if (isAnimating) return;
        
        if (button === activeButton) {
            closeOffer(button);
        } else {
            // Close any open offer first
            if (activeButton) {
                closeOffer(activeButton);
            }
            
            // Open the clicked offer
            openOffer(button);
        }
    }
    
    function openOffer(button) {
        isAnimating = true;
        activeButton = button;
        button.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        
        const details = button.querySelector('.offer-details');
        const content = button.querySelector('.offer-content');
        
        // Show details and calculate final height
        details.style.display = 'block';
        const contentHeight = content.scrollHeight;
        const detailsHeight = details.scrollHeight;
        
        // Set initial state
        details.style.height = '0';
        details.style.opacity = '0';
        
        // Animate details in
        requestAnimationFrame(() => {
            details.style.transition = `height ${ANIMATION_DURATION}ms ease-in-out, opacity ${ANIMATION_DURATION}ms ease`;
            details.style.height = `${detailsHeight}px`;
            details.style.opacity = '1';
            
            // Reset after animation
            setTimeout(() => {
                details.style.overflow = 'visible';
                details.style.height = '';
                isAnimating = false;
            }, ANIMATION_DURATION);
        });
        
        // Scroll to show the full card if needed
        const rect = button.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (!isInViewport) {
            button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    function closeOffer(button) {
        if (!button) return;
        
        isAnimating = true;
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        
        const details = button.querySelector('.offer-details');
        
        // Animate details out
        details.style.height = `${details.scrollHeight}px`;
        details.style.overflow = 'hidden';
        
        requestAnimationFrame(() => {
            details.style.transition = `height ${ANIMATION_DURATION}ms ease-in-out, opacity ${ANIMATION_DURATION}ms ease`;
            details.style.height = '0';
            details.style.opacity = '0';
            
            // Reset after animation
            setTimeout(() => {
                details.style.display = 'none';
                details.style.height = '';
                details.style.opacity = '';
                details.style.overflow = '';
                details.style.transition = '';
                isAnimating = false;
            }, ANIMATION_DURATION);
        });
        
        if (button === activeButton) {
            activeButton = null;
        }
    }
    
    // Close offer when clicking outside
    document.addEventListener('click', function(e) {
        if (activeButton && !activeButton.contains(e.target)) {
            closeOffer(activeButton);
        }
    });
    
    // Close offer with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeButton) {
            closeOffer(activeButton);
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (activeButton) {
                const details = activeButton.querySelector('.offer-details');
                if (details) {
                    details.style.height = 'auto';
                    const height = details.scrollHeight;
                    details.style.height = `${height}px`;
                }
            }
        }, 250);
    });

    // Guided Tour setup
    function getTourSteps() {
        return [
            {
                selector: '#langToggle',
                title: 'تغيير اللغة',
                content: 'من هنا تبدّل بين العربية والإنجليزية في أي وقت.'
            },
            {
                selector: '#darkModeToggle',
                title: 'الوضع الليلي',
                content: 'اضغط للتبديل بين الوضع الفاتح والداكن حسب تفضيلك.'
            },
            {
                selector: '.offer-btn[data-offer="1"]',
                title: 'العروض',
                content: 'اضغط على أي عرض لفتح التفاصيل والصور والمشاركة.'
            },
            {
                selector: '.register-btn',
                title: 'التسجيل',
                content: 'زر سريع للتوجه لصفحة التسجيل الخاصة بنا.'
            },
            {
                selector: 'a[aria-label="تواصل واتساب"]',
                title: 'تواصل واتساب',
                content: 'تواصل مع المبرمج عبر الواتساب Ayman'
            },
            {
                selector: '.footer',
                title: 'الفوتر',
                content: 'هنا ستجد بيانات الحقوق وسنة النشر.'
            }
        ];
    }

    function startIntroTour() {
        const steps = getTourSteps();
        if (window.startTour && Array.isArray(steps) && steps.length) {
            startTour(steps, { onFinish: function(){} });
        }
    }

    // Help button to restart the tour anytime
    const tourHelp = document.getElementById('tourHelp');
    if (tourHelp) {
        tourHelp.addEventListener('click', function(){
            localStorage.setItem('hasSeenTourV1', 'true');
            startIntroTour();
        });
    }

    // Auto-run on first visit only
    if (!localStorage.getItem('hasSeenTourV1')) {
        setTimeout(startIntroTour, 1200);
        localStorage.setItem('hasSeenTourV1', 'true');
    }
});
