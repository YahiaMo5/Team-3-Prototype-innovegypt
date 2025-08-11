// Global Variables
let currentUser = null;
let currentTab = 'youth';
let userType = null; // 'youth' or 'mentor'

const STORAGE = {
    get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
    set(key, val) { try { sessionStorage.setItem(key, val); } catch {} },
    getJSON(key) { try { return JSON.parse(sessionStorage.getItem(key)) || null; } catch { return null; } },
    setJSON(key, obj) { try { sessionStorage.setItem(key, JSON.stringify(obj)); } catch {} }
};

const STORAGE_KEYS = {
    youthOverrides: 'youth_overrides',
    mentorSuggestions: 'mentor_suggestions'
};

function loadPersistedState() {
    try {
        const overridesJson = STORAGE.get(STORAGE_KEYS.youthOverrides);
        if (overridesJson) {
            const overrides = JSON.parse(overridesJson);
            if (Array.isArray(overrides)) {
                for (const override of overrides) {
                    const youth = mockYouth.find(y => y.id === override.id);
                    if (!youth) continue;
                    if (override.status) youth.status = override.status;
                    if (override.assignedMentor) youth.assignedMentor = override.assignedMentor;
                    if (typeof override.mentorId === 'number') youth.mentorId = override.mentorId;
                    if (override.lastContact) youth.lastContact = override.lastContact;
                    if (override.selectedCompany) youth.selectedCompany = override.selectedCompany;
                    if (override.applicationSubmittedAt) youth.applicationSubmittedAt = override.applicationSubmittedAt;
                }
            }
        }
    } catch (e) {
        console.warn('Failed to load persisted youth overrides:', e);
    }
}

function saveYouthOverrides() {
    const overrides = mockYouth.map(y => ({
        id: y.id,
        status: y.status,
        assignedMentor: y.assignedMentor,
        mentorId: y.mentorId,
        lastContact: y.lastContact,
        selectedCompany: y.selectedCompany || null,
        applicationSubmittedAt: y.applicationSubmittedAt || null
    }));
    STORAGE.set(STORAGE_KEYS.youthOverrides, JSON.stringify(overrides));
}

function getSuggestionsForStudent(studentId) {
    try {
        const json = STORAGE.get(STORAGE_KEYS.mentorSuggestions);
        const all = json ? JSON.parse(json) : [];
        return all.filter(s => s.studentId === studentId);
    } catch {
        return [];
    }
}

function addSuggestionForStudent(suggestion) {
    const list = (() => { try { return STORAGE.getJSON(STORAGE_KEYS.mentorSuggestions) || []; } catch { return []; } })();
    list.push(suggestion);
    STORAGE.setJSON(STORAGE_KEYS.mentorSuggestions, list);
}

// Mock Data
const mockMentors = [
    {
        id: 1,
        name: "د. أحمد محمد",
        specialization: "برمجة",
        level: "متقدم",
        rating: 4.8,
        students: 45,
        experience: "8 سنوات",
        description: "مطور برمجيات محترف مع خبرة في تطوير تطبيقات الويب والموبايل",
        tags: ["JavaScript", "React", "Node.js", "Python"],
        age: 35,
        qualification: "دكتوراه في علوم الحاسوب",
        expertise: "تطوير تطبيقات الويب والموبايل، الذكاء الاصطناعي",
        type: "qualified",
        courses: [
            { id: 1, title: "مقدمة في تطوير الويب", platform: "YouTube", url: "https://youtube.com/watch?v=example1", duration: "8 أسابيع", level: "مبتدئ", price: "مجاني" },
            { id: 2, title: "React.js المتقدم", platform: "YouTube", url: "https://youtube.com/watch?v=example2", duration: "6 أسابيع", level: "متقدم", price: "مجاني" }
        ]
    }
];

const mockYouth = [
    {
        id: 1,
        name: "أحمد محمد",
        age: 25,
        qualification: "بكالوريوس هندسة برمجيات",
        specialization: "برمجة",
        level: "متوسط",
        experience: "3 سنوات",
        status: "qualified", // مؤهل للتوظيف/التدريب
        assignedMentor: "د. أحمد محمد",
        mentorId: 1,
        points: 1250,
        rating: 4.8,
        completedCourses: 12,
        skills: ["JavaScript", "React", "HTML", "CSS", "Node.js", "Git"],
        lastContact: "2024-01-15",
        recommendedCourses: ["React.js المتقدم", "Node.js المتقدم"],
        jobOpportunities: ["شركة برمجيات محلية", "استوديو تطوير ويب", "شركة تقنية ناشئة"],
        needsImprovement: null,
        // معلومات إضافية للشباب المؤهلين
        education: "جامعة القاهرة",
        graduationYear: "2022",
        currentJob: "مطور ويب في شركة محلية",
        salary: "حسب الشركة (5000-12000 جنيه)",
        goals: "العمل في شركة عالمية كبيرة",
        strengths: ["حل المشاكل", "العمل الجماعي", "التعلم السريع"],
        weaknesses: ["التحدث باللغة الإنجليزية", "إدارة المشاريع الكبيرة"],
        achievements: ["إكمال 12 كورس", "تطوير 5 مشاريع", "الحصول على شهادات معتمدة"]
    },
    {
        id: 2,
        name: "سارة أحمد",
        age: 23,
        qualification: "بكالوريوس تصميم جرافيك",
        specialization: "تصميم",
        level: "متوسط",
        experience: "2 سنوات",
        status: "qualified", // مؤهلة للتوظيف/التدريب
        assignedMentor: "د. أحمد محمد",
        mentorId: 1,
        points: 980,
        rating: 4.6,
        completedCourses: 8,
        skills: ["Photoshop", "Illustrator", "Figma", "UI/UX"],
        lastContact: "2024-01-14",
        recommendedCourses: ["تصميم واجهات المستخدم", "تصميم تجربة المستخدم"],
        jobOpportunities: ["استوديو تصميم محلي", "شركة إعلانات", "مؤسسة إعلامية"],
        needsImprovement: null,
        // معلومات إضافية للشباب المؤهلين
        education: "أكاديمية الفنون",
        graduationYear: "2023",
        currentJob: "مصممة في استوديو محلي",
        salary: "حسب الشركة (4000-10000 جنيه)",
        goals: "إنشاء استوديو تصميم خاص",
        strengths: ["الإبداع", "التفاصيل", "التواصل مع العملاء"],
        weaknesses: ["إدارة الوقت", "التسويق الذاتي"],
        achievements: ["إكمال 8 كورسات", "تصميم 15 مشروع", "فوز بمسابقة تصميم"]
    },
    {
        id: 3,
        name: "محمد علي",
        age: 20,
        qualification: "ثانوية عامة",
        specialization: "برمجة",
        level: "مبتدئ",
        experience: "لا توجد",
        status: "unqualified", // غير مؤهل - يحتاج تطوير
        assignedMentor: "د. أحمد محمد",
        mentorId: 1,
        points: 150,
        rating: 3.5,
        completedCourses: 2,
        skills: ["HTML", "CSS"],
        lastContact: "2024-01-10",
        recommendedCourses: ["أساسيات البرمجة للمبتدئين", "HTML و CSS من الصفر"],
        jobOpportunities: null,
        needsImprovement: [
            "مهارات البرمجة الأساسية",
            "المنطق البرمجي",
            "حل المشاكل",
            "أساسيات قواعد البيانات",
            "مهارات التعلم الذاتي",
            "اللغة الإنجليزية التقنية"
        ],
        // معلومات إضافية للشباب غير المؤهلين
        education: "مدرسة ثانوية عامة",
        graduationYear: "2023",
        currentJob: "طالب",
        salary: "0 جنيه",
        goals: "تعلم البرمجة والعمل كمطور",
        strengths: ["الرغبة في التعلم", "التحليل المنطقي"],
        weaknesses: ["قلة الخبرة", "عدم المعرفة بالتقنيات الحديثة", "ضعف اللغة الإنجليزية"],
        challenges: ["عدم وجود خلفية تقنية", "صعوبة فهم المفاهيم المعقدة", "عدم القدرة على حل المشاكل البرمجية"]
    },
    {
        id: 4,
        name: "فاطمة حسن",
        age: 22,
        qualification: "دبلوم تجاري",
        specialization: "تصميم",
        level: "مبتدئ",
        experience: "لا توجد",
        status: "unqualified", // غير مؤهلة - تحتاج تطوير
        assignedMentor: "فاطمة حسن",
        mentorId: 4,
        points: 80,
        rating: 3.2,
        completedCourses: 1,
        skills: ["رسم أساسي"],
        lastContact: "2024-01-12",
        recommendedCourses: ["أساسيات التصميم الجرافيكي", "تعلم Photoshop"],
        jobOpportunities: null,
        needsImprovement: [
            "أساسيات التصميم",
            "استخدام أدوات التصميم",
            "الإبداع البصري",
            "مبادئ الألوان والخطوط",
            "التصميم الرقمي",
            "مهارات التسويق والعلامات التجارية"
        ],
        // معلومات إضافية للشباب غير المؤهلين
        education: "معهد تجاري",
        graduationYear: "2022",
        currentJob: "موظفة في شركة تجارية",
        salary: "3000 جنيه",
        goals: "العمل في مجال التصميم الجرافيكي",
        strengths: ["الرغبة في التغيير", "الإبداع الفني"],
        weaknesses: ["قلة الخبرة في التصميم الرقمي", "عدم المعرفة بأدوات التصميم", "ضعف المهارات التقنية"],
        challenges: ["عدم وجود خلفية فنية", "صعوبة استخدام البرامج التقنية", "عدم فهم مبادئ التصميم"]
    }
];

const mockCourses = [
    {
        id: 1,
        title: "مقدمة في تطوير الويب",
        instructor: "د. أحمد محمد",
        specialization: "برمجة",
        level: "مبتدئ",
        duration: "8 أسابيع",
        rating: 4.7,
        students: 120,
        description: "تعلم أساسيات تطوير الويب من الصفر حتى الاحتراف",
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example1"
    },
    {
        id: 2,
        title: "تصميم واجهات المستخدم",
        instructor: "سارة أحمد",
        specialization: "تصميم",
        level: "متوسط",
        duration: "6 أسابيع",
        rating: 4.5,
        students: 85,
        description: "تعلم تصميم واجهات المستخدم الحديثة والتفاعلية",
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example3"
    },
    {
        id: 3,
        title: "React.js المتقدم",
        instructor: "د. أحمد محمد",
        specialization: "برمجة",
        level: "متقدم",
        duration: "10 أسابيع",
        rating: 4.8,
        students: 95,
        description: "تعلم React.js المتقدم وتطوير تطبيقات معقدة",
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example2"
    },
    {
        id: 4,
        title: "أساسيات البرمجة للمبتدئين",
        instructor: "محمد علي",
        specialization: "برمجة",
        level: "مبتدئ",
        duration: "10 أسابيع",
        rating: 4.3,
        students: 75,
        description: "تعلم أساسيات البرمجة من الصفر للمبتدئين",
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example4"
    },
    {
        id: 5,
        title: "HTML و CSS من الصفر",
        instructor: "محمد علي",
        specialization: "برمجة",
        level: "مبتدئ",
        duration: "6 أسابيع",
        rating: 4.4,
        students: 60,
        description: "تعلم HTML و CSS من البداية",
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example5"
    },
    {
        id: 6,
        title: "أساسيات التصميم الجرافيكي",
        instructor: "فاطمة حسن",
        specialization: "تصميم",
        level: "مبتدئ",
        duration: "8 أسابيع",
        rating: 4.2,
        students: 45,
        description: "تعلم أساسيات التصميم الجرافيكي للمبتدئين",
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example6"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPersistedState();
    setupEventListeners();
    hideAllPagesExceptLogin();
});

function setupEventListeners() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
}

function hideAllPagesExceptLogin() {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id !== 'login-page') {
            page.style.display = 'none';
        }
    });
}

// Navigation
function showPage(pageName) {
    if (!currentUser) {
        alert('يرجى تسجيل الدخول أولاً');
        return;
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    const selectedPage = document.getElementById(pageName + '-page');
    if (selectedPage) {
        selectedPage.classList.add('active');
        selectedPage.style.display = 'block';
        loadPageData(pageName);
    }
}

function loadPageData(pageName) {
    switch(pageName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'mentors':
            loadMentorsData();
            break;
        case 'courses':
            if (userType === 'youth') {
                loadCoursesData();
            } else {
                loadMentorCourses();
            }
            break;
        case 'profile':
            loadProfileData();
            break;
        case 'points':
            if (userType === 'youth') {
                loadPointsData();
            } else {
                loadMentorStats();
            }
            break;
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Login
function switchTab(tab) {
    currentTab = tab;
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.querySelector(`[onclick="switchTab('${tab}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('يرجى إدخال البريد الإلكتروني وكلمة المرور');
        return;
    }

    loginUser(email);
}

function demoLogin() {
    // Show user type selection
    const userType = prompt('اختر نوع المستخدم:\n1 - شباب\n2 - مينتور\n\nاكتب 1 أو 2:');

    if (userType === '1') {
        loginAsYouth();
    } else if (userType === '2') {
        loginAsMentor();
    } else {
        alert('اختيار غير صحيح');
    }
}

function loginAsYouth() {
    // اختيار شاب عشوائي مع تبديل الحالة
    const youthIndex = Math.floor(Math.random() * mockYouth.length);
    currentUser = { ...mockYouth[youthIndex] };
    
    // تبديل تلقائي بين المؤهل وغير المؤهل
    const lastStatus = sessionStorage.getItem('lastYouthStatus');
    if (lastStatus === 'qualified') {
        currentUser.status = 'not_qualified';
        currentUser.currentJob = null;
        currentUser.rating = '3.2';
        sessionStorage.setItem('lastYouthStatus', 'not_qualified');
    } else {
        currentUser.status = 'qualified';
        currentUser.currentJob = 'مطور ويب في شركة تقنية';
        currentUser.rating = '4.8';
        sessionStorage.setItem('lastYouthStatus', 'qualified');
    }
    
    userType = 'youth';
    updateNavigationForYouth();
    showPage('dashboard');
    updateUserName();
    loadYouthDashboard();
}

function loginAsMentor() {
    userType = 'mentor';
    currentUser = {
        id: 1,
        name: 'د. أحمد محمد',
        email: 'mentor@example.com',
        age: 35,
        qualification: 'دكتوراه في علوم الحاسوب',
        specialization: 'برمجة',
        level: 'متقدم',
        experience: '8 سنوات',
        expertise: 'تطوير تطبيقات الويب والموبايل، الذكاء الاصطناعي',
        rating: 4.8,
        students: 45,
        courses: 3,
        totalEarnings: 15000
    };

    showPage('dashboard');
    updateNavigationForMentor();
    updateUserName();
}

function loginUser(email) {
    if (currentTab === 'youth') {
        loginAsYouth();
    } else {
        loginAsMentor();
    }
}

function updateNavigationForYouth() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = `
        <a href="#" class="nav-link" onclick="showPage('dashboard')">الرئيسية</a>
        <a href="#" class="nav-link" onclick="showPage('mentors')">المينتورز</a>
        <a href="#" class="nav-link" onclick="showPage('courses')">الكورسات</a>
        <a href="#" class="nav-link" onclick="showPage('profile')">الملف الشخصي</a>
        <a href="#" class="nav-link" onclick="showPage('points')">النقاط والتقييمات</a>
        <a href="#" class="nav-link" onclick="logout()">تسجيل خروج</a>
    `;
}

function updateNavigationForMentor() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = `
        <a href="#" class="nav-link" onclick="showPage('dashboard')">الرئيسية</a>
        <a href="#" class="nav-link" onclick="showPage('mentors')">إدارة الطلاب</a>
        <a href="#" class="nav-link" onclick="showPage('courses')">كورساتي</a>
        <a href="#" class="nav-link" onclick="showPage('profile')">الملف الشخصي</a>
        <a href="#" class="nav-link" onclick="showPage('points')">الإحصائيات</a>
        <a href="#" class="nav-link" onclick="logout()">تسجيل خروج</a>
    `;
}

function updateUserName() {
    if (!currentUser) return;
    
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
    
    // Update profile page name and email
    const profileName = document.getElementById('profile-name');
    if (profileName) {
        profileName.textContent = currentUser.name;
    }
    
    const profileEmail = document.getElementById('profile-email');
    if (profileEmail) {
        profileEmail.textContent = currentUser.email || 'user@example.com';
    }
}

function logout() {
    currentUser = null;
    userType = null;

    // Clear session-scoped data to avoid mixing between accounts
    try { sessionStorage.clear(); } catch {}

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    const loginPage = document.getElementById('login-page');
    if (loginPage) {
        loginPage.classList.add('active');
        loginPage.style.display = 'block';
    }
    document.getElementById('login-form')?.reset();
    
    // Reset login tabs to default
    currentTab = 'youth';
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    const youthTab = document.querySelector('.tab-btn');
    if (youthTab) youthTab.classList.add('active');

    // Reset navigation to default state
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.innerHTML = `
            <a href="#" class="nav-link" onclick="showPage('dashboard')">الرئيسية</a>
            <a href="#" class="nav-link" onclick="showPage('mentors')">المينتورز</a>
            <a href="#" class="nav-link" onclick="showPage('courses')">الكورسات</a>
            <a href="#" class="nav-link" onclick="showPage('profile')">الملف الشخصي</a>
            <a href="#" class="nav-link" onclick="showPage('points')">النقاط والتقييمات</a>
            <a href="#" class="nav-link" onclick="logout()">تسجيل خروج</a>
        `;
    }

    // Clean all page containers and reset to original state
    cleanAllPageContainers();
    
    // Clean injected sections
    document.getElementById('youth-status-section')?.remove();
    const mentorsChat = document.getElementById('mentors-chat-container');
    if (mentorsChat) mentorsChat.innerHTML = '';
    
    // Reset dashboard to original state
    const dashboardContainer = document.querySelector('#dashboard-page .container');
    if (dashboardContainer) {
        dashboardContainer.innerHTML = `
            <div class="dashboard-header">
                <h1>مرحباً <span id="user-name">أحمد</span> 👋</h1>
                <p>اكتشف المينتورز والكورسات المناسبة لمستواك</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-star"></i>
                    <h3>1250</h3>
                    <p>نقطة</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3>8</h3>
                    <p>مينتورز متابعين</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-book"></i>
                    <h3>12</h3>
                    <p>كورس مكتمل</p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-trophy"></i>
                    <h3>4.8</h3>
                    <p>تقييم</p>
                </div>
            </div>

            <div class="recommendations">
                <h2>الكورسات الموصى بها</h2>
                <div class="courses-grid" id="recommended-courses">
                    <!-- Courses will be loaded here -->
                </div>
            </div>
        `;
    }
}

function cleanAllPageContainers() {
    // Clean mentors page
    const mentorsContainer = document.getElementById('mentors-chat-container');
    if (mentorsContainer) {
        mentorsContainer.innerHTML = `
            <div class="page-header">
                <h1>المينتور</h1>
            </div>
            <!-- Chat UI will be rendered here by script.js for youth/mentor -->
        `;
    }
    
    // Clean courses page
    const coursesContainer = document.getElementById('all-courses');
    if (coursesContainer) {
        coursesContainer.innerHTML = '';
    }
    
    // Clean profile page values to default
    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.textContent = 'أحمد محمد';
    
    const profileEmail = document.getElementById('profile-email');
    if (profileEmail) profileEmail.textContent = 'ahmed@example.com';
}

// Data Loading
function loadDashboardData() {
    if (userType === 'youth') {
        loadYouthDashboard();
    } else {
        loadMentorDashboard();
    }
}

function loadYouthDashboard() {
    loadAssignedMentor();
    loadRecommendedCourses();
    loadYouthStatus();
}

function loadMentorDashboard() {
    const container = document.querySelector('#dashboard-page .container');
    if (!container) return;
    const assignedStudents = mockYouth.filter(y => y.assignedMentor === currentUser.name);
    const qualifiedStudents = assignedStudents.filter(s => s.status === 'qualified');
    const averageRating = assignedStudents.length > 0 ? 
        (assignedStudents.reduce((sum, s) => sum + s.rating, 0) / assignedStudents.length).toFixed(1) : 0;
    
    container.innerHTML = `
        <div class="dashboard-header">
            <h1>مرحباً ${currentUser.name} 👋</h1>
            <p>مرحباً بك في لوحة المينتور</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <h3>${assignedStudents.length}</h3>
                <p>إجمالي الطلاب</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-star"></i>
                <h3>${averageRating}</h3>
                <p>متوسط تقييم الطلاب</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-graduation-cap"></i>
                <h3>${qualifiedStudents.length}</h3>
                <p>طلاب مؤهلين</p>
            </div>
            <div class="stat-card">
                <i class="fas fa-book"></i>
                <h3>${currentUser.courses || 3}</h3>
                <p>كورسات متاحة</p>
            </div>
        </div>

        <div class="status-section-card">
            <h3 class="section-title">الطلاب الذين تتابعهم</h3>
            <div class="students-grid">
                ${assignedStudents.map(s => `
                    <div class="student-card" style="cursor:pointer;" onclick="showPage('mentors'); setTimeout(() => openStudentChat(${s.id}), 100);">
                        <div class="student-header">
                            <div class="student-info">
                                <h4>${s.name}</h4>
                                <span class="student-level">${s.specialization} - ${s.level}</span>
                                <span class="status-badge ${s.status}">${s.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}</span>
                            </div>
                            <div class="student-stats">
                                <span><i class="fas fa-star"></i> ${s.points} نقطة</span>
                                <span><i class="fas fa-book"></i> ${s.completedCourses} كورس</span>
                            </div>
                        </div>
                        <div class="student-skills">${(s.skills||[]).map(k=>`<span class="skill-tag">${k}</span>`).join('')}</div>
                    </div>
                `).join('')}
            </div>
        </div>`;
}

function showSuggestVideoModal(studentId = null) {
    // إنشاء الmodal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'suggest-video-modal';

    const students = mockYouth.filter(youth => youth.assignedMentor === currentUser.name);

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeSuggestVideoModal()">&times;</span>
            <h3>اقتراح فيديو تعليمي</h3>
            <form id="suggest-video-form" onsubmit="submitVideoSuggestion(event)">
                <div class="form-group">
                    <label>اختر الطالب:</label>
                    <select name="studentId" ${studentId ? 'disabled' : ''} required>
                        ${students.map(student => `
                            <option value="${student.id}" ${student.id === studentId ? 'selected' : ''}>
                                ${student.name} - ${student.specialization}
                            </option>
                        `).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label>عنوان الفيديو:</label>
                    <input type="text" name="title" required>
                </div>

                <div class="form-group">
                    <label>رابط YouTube:</label>
                    <input type="url" name="url" required>
                </div>

                <div class="form-group">
                    <label>وصف الفيديو:</label>
                    <textarea name="description" required></textarea>
                </div>

                <div class="form-group">
                    <label>المهارات المستهدفة:</label>
                    <input type="text" name="skills" placeholder="مثال: JavaScript, React">
                </div>

                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">إرسال الاقتراح</button>
                    <button type="button" class="btn btn-secondary" onclick="closeSuggestVideoModal()">إلغاء</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closeSuggestVideoModal() {
    const modal = document.getElementById('suggest-video-modal');
    if (modal) {
        modal.remove();
    }
}

function submitVideoSuggestion(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const rawStudentId = formData.get('studentId');
    const suggestion = {
        studentId: rawStudentId ? parseInt(rawStudentId) : (Array.isArray(mockYouth) ? mockYouth.find(y => y.assignedMentor === (currentUser?.name || ''))?.id : null),
        title: formData.get('title'),
        url: formData.get('url'),
        description: formData.get('description'),
        skills: (formData.get('skills') || '').split(',').map(skill => skill.trim()).filter(Boolean),
        mentorId: currentUser?.id || 0,
        date: new Date().toISOString()
    };

    addSuggestionForStudent(suggestion);
    // Update last contact for the student
    const student = mockYouth.find(y => y.id === suggestion.studentId);
    if (student) {
        student.lastContact = new Date().toISOString().slice(0,10);
        saveYouthOverrides();
    }

    console.log('تم حفظ اقتراح الفيديو:', suggestion);
    alert('تم إرسال اقتراح الفيديو وحفظه!');
    closeSuggestVideoModal();

    // If mentor dashboard is visible, refresh
    if (document.getElementById('mentors-page')?.classList.contains('active') ||
        document.getElementById('dashboard-page')?.classList.contains('active')) {
        if (userType === 'mentor') loadMentorDashboard();
        if (userType === 'youth') loadYouthStatus();
    }
}

function loadSuggestedVideos(students) {
    // محاكاة قائمة الفيديوهات المقترحة
    const suggestions = [
        {
            studentId: 1,
            title: "شرح React Hooks",
            url: "https://youtube.com/watch?v=example1",
            date: "2024-01-15",
            status: "pending"
        },
        {
            studentId: 2,
            title: "أساسيات تصميم UI/UX",
            url: "https://youtube.com/watch?v=example2",
            date: "2024-01-14",
            status: "accepted"
        }
    ];

    return suggestions.map(suggestion => {
        const student = students.find(s => s.id === suggestion.studentId);
        if (!student) return '';

        return `
            <div class="video-suggestion-card ${suggestion.status}">
                <div class="video-info">
                    <h4>${suggestion.title}</h4>
                    <p>مقترح لـ: ${student.name}</p>
                    <span class="suggestion-date">${suggestion.date}</span>
                </div>
                <div class="video-actions">
                    <a href="${suggestion.url}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-youtube"></i>
                        مشاهدة
                    </a>
                    <button onclick="editSuggestion(${suggestion.studentId})" class="btn btn-secondary">
                        <i class="fas fa-edit"></i>
                        تعديل
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ===== Added minimal implementations and stubs to avoid runtime errors =====
(function addMissingImplementations() {
    function renderMentorCard(mentor) {
        return `
            <div class="mentor-card">
                <div class="mentor-header">
                    <div class="mentor-avatar"><i class="fas fa-user-tie"></i></div>
                    <div>
                        <h3>${mentor.name}</h3>
                        <p>${mentor.specialization} - ${mentor.level}</p>
                    </div>
                </div>
                <div class="mentor-meta">
                    <span><i class="fas fa-star"></i> ${mentor.rating}</span>
                    <span><i class="fas fa-users"></i> ${mentor.students}</span>
                </div>
                <div class="mentor-tags">
                    ${(mentor.tags || []).map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    }

    function renderCourseCard(course) {
        return `
            <div class="course-card">
                <div class="course-header">
                    <h3>${course.title}</h3>
                    <span class="level">${course.level}</span>
                </div>
                <p class="course-desc">${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-user"></i> ${course.instructor}</span>
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-star"></i> ${course.rating}</span>
                </div>
                <a class="btn btn-secondary" target="_blank" href="${course.url}">
                    <i class="fab fa-youtube"></i> مشاهدة
                </a>
            </div>
        `;
    }

    // Youth pages
    window.loadAssignedMentor = function loadAssignedMentor() {
        const container = document.getElementById('recommended-mentors');
        if (!container) return;
        const mentors = mockMentors
            .filter(m => !currentUser || !currentUser.specialization || m.specialization === currentUser.specialization)
            .slice(0, 3);
        container.innerHTML = mentors.map(renderMentorCard).join('');
    };

    window.loadRecommendedCourses = function loadRecommendedCourses() {
        const container = document.getElementById('recommended-courses');
        if (!container) return;
        const courses = mockCourses
            .filter(c => !currentUser || !currentUser.specialization || c.specialization === currentUser.specialization)
            .slice(0, 6);
        container.innerHTML = courses.map(renderCourseCard).join('');
    };

    window.loadYouthStatus = function loadYouthStatus() {
        const dashboardPage = document.getElementById('dashboard-page');
        if (!dashboardPage || !currentUser) return;
        const old = dashboardPage.querySelector('#youth-status-section');
        if (old) old.remove();

        const section = document.createElement('div');
        section.id = 'youth-status-section';
        section.className = 'recommendations';

        const isQualified = currentUser.status === 'qualified';
        const getDesignImageUrl = () => isQualified
            ? 'https://raw.githubusercontent.com/YahiaMo5/Team-3-Prototype-innovegypt/main/assent/qualified.png'
            : 'https://raw.githubusercontent.com/YahiaMo5/Team-3-Prototype-innovegypt/main/assent/unqualified.png';

        const jobTitleForSpecialization = (spec) => {
            switch ((spec || '').trim()) {
                case 'برمجة': return 'متدرب/مطور برمجيات';
                case 'تصميم': return 'متدرب/مصمم واجهات مستخدم';
                case 'تسويق': return 'متدرب/مسوّق رقمي';
                case 'أعمال': return 'متدرب/تنمية أعمال';
                default: return 'متدرب';
            }
        };

        if (isQualified) {
            const jobs = currentUser.jobOpportunities || [];
            const selectedCompany = currentUser.selectedCompany || '';
            const appAt = currentUser.applicationSubmittedAt || '';
            const salaryText = currentUser.salary || 'حسب الشركة';

            const chip = (text, cls = 'neutral') => `<span class="chip ${cls}">${text}</span>`;
            const jobTitle = selectedCompany ? jobTitleForSpecialization(currentUser.specialization) : '—';

            section.innerHTML = `
                <div class="status-section-card">
                    <h3 class="section-title">حالتك: مؤهل للتوظيف/ التدريب</h3>

                    <h3 class="section-title">معلومات الاساسية</h3>
                    <div class="chip-list neutral">
                        ${chip(`الاسم: ${currentUser.name}`, 'neutral')}
                        ${chip(`العمر: ${currentUser.age}`, 'neutral')}
                        ${chip(`التخصص: ${currentUser.specialization}`, 'neutral')}
                        ${chip(`المستوى: ${currentUser.level}`, 'neutral')}
                        ${chip(`الخبرة: ${currentUser.experience}`, 'neutral')}
                    </div>

                    <h3 class="section-title">معلومات التوظيف</h3>
                    <div class="chip-list neutral">
                        ${chip(`الوظيفة المرشحة: ${jobTitle}`, 'neutral')}
                        ${chip(`الراتب المعروض: ${selectedCompany ? salaryText : '—'}`, 'neutral')}
                        ${chip(`الهدف: ${currentUser.goals || 'غير محدد'}`, 'neutral')}
                    </div>

                    <div id="jobs-chooser" class="qualified-banner" style="margin-top:8px;">
                        <div class="jobs-choice">
                            <label>تحديد الشركات:</label>
                            ${jobs.length ? `
                            <div class="jobs-list">
                                ${jobs.map((j) => `
                                    <label class="job-option">
                                        <input type="radio" name="job-choice" value="${j}" ${selectedCompany === j ? 'checked' : ''} ${appAt ? 'disabled' : ''}>
                                        <i class="fas fa-building"></i> ${j}
                                    </label>
                                `).join('')}
                            </div>
                            <div class="modal-actions">
                                <button class="btn btn-primary" ${appAt ? 'disabled' : ''} onclick="chooseCompany(${currentUser.id}, document.querySelector('input[name=job-choice]:checked')?.value)">حفظ الاختيار</button>
                                ${selectedCompany ? `<span class="selected-company-info">الشركة المختارة: <strong>${selectedCompany}</strong></span>` : ''}
                            </div>
                            ` : '<p>لا توجد شركات مرشحة حاليًا.</p>'}
                            <div class="application-actions">
                                ${selectedCompany && !appAt ? `<button class="btn btn-secondary" onclick="submitApplication(${currentUser.id})"><i class="fas fa-paper-plane"></i> تقديم الآن</button>` : ''}
                                ${appAt ? `<span class="application-status"><i class="fas fa-check"></i> تم التقديم لـ <strong>${selectedCompany}</strong> بتاريخ ${new Date(appAt).toLocaleDateString('ar-EG')}</span>` : ''}
                            </div>
                        </div>
                    </div>

                    <h3 class="section-title">الانجازات</h3>
                    <div class="chip-list">
                        ${(Array.isArray(currentUser.achievements) && currentUser.achievements.length)
                            ? currentUser.achievements.map(a => chip(a, 'success')).join('')
                            : '<span class="chip neutral">غير متاح</span>'}
                    </div>

                    <h3 class="section-title">المهارات القوية</h3>
                    <div class="chip-list">
                        ${(Array.isArray(currentUser.strengths) && currentUser.strengths.length)
                            ? currentUser.strengths.map(s => chip(s, 'sky')).join('')
                            : '<span class="chip neutral">غير متاح</span>'}
                    </div>

                    <h3 class="section-title">مجالات التحسين</h3>
                    <div class="chip-list">
                        ${(Array.isArray(currentUser.needsImprovement) && currentUser.needsImprovement.length)
                            ? currentUser.needsImprovement.map(n => chip(n, 'gray')).join('')
                            : '<span class="chip neutral">غير متاح</span>'}
                    </div>

                    <div class="actions-row" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
                        <button class="btn btn-primary" onclick="openCommunityInfo()">انضمام للمجتمع</button>
                        <button class="btn btn-secondary" onclick="requestMentorChange()">طلب تغيير المنتور</button>
                        <button class="btn btn-secondary" onclick="document.getElementById('jobs-chooser')?.scrollIntoView({behavior:'smooth', block:'center'})">تحديد الشركات</button>
                    </div>
                </div>
            `;
        } else {
            // Unqualified detailed layout (single card with sections)
            const suggestions = getSuggestionsForStudent(currentUser.id || -1);
            const chip = (text, cls = 'neutral') => `<span class="chip ${cls}">${text}</span>`;

            section.innerHTML = `
                <div class="status-section-card">
                    <h3 class="section-title">حالتك: غير مؤهل ويحتاج لتطوير</h3>

                    <h3 class="section-title">معلومات الاساسية</h3>
                    <div class="chip-list neutral">
                        ${chip(`الاسم: ${currentUser.name}`, 'neutral')}
                        ${chip(`العمر: ${currentUser.age}`, 'neutral')}
                        ${chip(`المؤهل: ${currentUser.qualification || currentUser.education || 'غير متاح'}`, 'neutral')}
                        ${chip(`التخصص: ${currentUser.specialization}`, 'neutral')}
                        ${chip(`المستوى: ${currentUser.level}`, 'neutral')}
                        ${chip(`الخبرة: ${currentUser.experience}`, 'neutral')}
                    </div>

                    <h3 class="section-title">معلومات التطوير</h3>
                    <div class="chip-list neutral">
                        ${chip(`الوظيفة الحالية: ${currentUser.currentJob || 'لا توجد'}`, 'neutral')}
                        ${chip(`الهدف: ${currentUser.goals || 'غير محدد'}`, 'neutral')}
                    </div>

                    <h3 class="section-title">التحديات</h3>
                    <div class="chip-list danger">
                        ${Array.isArray(currentUser.challenges) && currentUser.challenges.length
                            ? currentUser.challenges.map(c => chip(c, 'danger')).join('')
                            : '<span class="chip neutral">غير متاح</span>'}
                    </div>

                    <h3 class="section-title">المهارات القوية</h3>
                    <div class="chip-list sky">
                        ${Array.isArray(currentUser.strengths) && currentUser.strengths.length
                            ? currentUser.strengths.map(s => chip(s, 'sky')).join('')
                            : '<span class="chip neutral">غير متاح</span>'}
                    </div>

                    <h3 class="section-title">مجالات التحسين</h3>
                    <div class="chip-list gray">
                        ${Array.isArray(currentUser.needsImprovement) && currentUser.needsImprovement.length
                            ? currentUser.needsImprovement.map(n => chip(n, 'gray')).join('')
                            : '<span class="chip neutral">غير متاح</span>'}
                    </div>

                    <h3 class="section-title">المينتور المتابع</h3>
                    <div class="chip-list neutral">
                        ${chip(`الاسم: ${mockMentors[0].name}`, 'neutral')}
                        ${chip(`الخبرات: ${mockMentors[0].experience}`, 'neutral')}
                        ${chip(`التخصص: ${mockMentors[0].specialization}`, 'neutral')}
                    </div>

                    <h3 class="section-title">اقتراحات المينتور</h3>
                    ${suggestions.length ? `
                        <div class="videos-grid">
                            ${suggestions.map(s => `
                                <div class="video-suggestion-card">
                                    <div class="video-info">
                                        <h4>${s.title}</h4>
                                        <a href="${s.url}" target="_blank" class="btn btn-secondary"><i class="fab fa-youtube"></i> مشاهدة</a>
                                        <span class="suggestion-date">${new Date(s.date).toLocaleDateString('ar-EG')}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>` : '<span class="chip neutral">لا توجد اقتراحات بعد.</span>'}

                    <div class="actions-row" style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
                        <button class="btn btn-primary" onclick="openCommunityInfo()">انضمام للمجتمع</button>
                        <button class="btn btn-secondary" onclick="openLearningPath()">مسار التعلم</button>
                        <button class="btn btn-secondary" onclick="openMentorCourses()">كورسات المنتور</button>
                        <button class="btn btn-secondary" onclick="requestMentorChange()">طلب تغيير المنتور</button>
                    </div>
                </div>
            `;
        }

        const container = dashboardPage.querySelector('.container');
        if (!container) return;
        const firstRecommendations = container.querySelector('.recommendations');
        if (firstRecommendations) {
            container.insertBefore(section, firstRecommendations);
        } else {
            container.appendChild(section);
        }
    };

    // Mentors listing page (youth view)
    window.loadMentorsData = function loadMentorsData() {
        if (userType === 'youth') {
            // للشباب: عرض الشات مع المنتور المعين
            renderYouthMentorChat();
        } else {
            // للمنتورين: عرض قائمة الطلاب
            renderMentorStudentsCards();
        }
    };

    // Courses listing page (youth view)
    window.loadCoursesData = function loadCoursesData() {
        const container = document.getElementById('all-courses');
        if (!container) return;
        const spec = document.getElementById('course-specialization-filter')?.value || '';
        const lvl = document.getElementById('course-level-filter')?.value || '';
        const list = mockCourses.filter(c => (!spec || c.specialization === spec) && (!lvl || c.level === lvl));
        container.innerHTML = list.map(renderCourseCard).join('');
    };

    // Profile page
    window.loadProfileData = function loadProfileData() {
        if (!currentUser) return;
        const nameEl = document.getElementById('profile-name');
        const emailEl = document.getElementById('profile-email');
        if (nameEl) nameEl.textContent = currentUser.name || nameEl.textContent;
        if (emailEl) emailEl.textContent = currentUser.email || emailEl.textContent;
        const skillsEl = document.getElementById('user-skills');
        if (skillsEl && Array.isArray(currentUser.skills)) {
            skillsEl.innerHTML = currentUser.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
        }
        // status badge and selected company info
        const header = document.querySelector('#profile-page .profile-header');
        if (header) {
            let badge = header.querySelector('#profile-status');
            if (!badge) {
                badge = document.createElement('div');
                badge.id = 'profile-status';
                badge.style.marginInlineStart = 'auto';
                header.appendChild(badge);
            }
            const isQualified = currentUser.status === 'qualified';
            const selectedCompany = currentUser.selectedCompany || null;
            const appAt = currentUser.applicationSubmittedAt ? new Date(currentUser.applicationSubmittedAt).toLocaleDateString('ar-EG') : null;
            badge.innerHTML = `
                <span class="status-badge ${isQualified ? 'qualified' : 'unqualified'}">
                    ${isQualified ? 'مؤهل' : 'تحت التطوير'}
                </span>
                ${isQualified && selectedCompany ? `<span class="selected-company"><i class="fas fa-briefcase"></i> الشركة المختارة: ${selectedCompany}</span>` : ''}
                ${isQualified && appAt ? `<span class="application-status"><i class="fas fa-paper-plane"></i> تم التقديم بتاريخ: ${appAt}</span>` : ''}
            `;
        }
    };

    // Points page (youth view)
    window.loadPointsData = function loadPointsData() {
        const historyEl = document.getElementById('points-history');
        if (!historyEl) return;
        const mockHistory = [
            { date: '2024-01-15', action: 'إكمال كورس', points: +100 },
            { date: '2024-01-14', action: 'تقييم مينتور', points: +50 },
            { date: '2024-01-13', action: 'متابعة يومية', points: +10 }
        ];
        historyEl.innerHTML = mockHistory.map(h => `
            <div class="point-item">
                <span>${h.date}</span>
                <span>${h.action}</span>
                <span>${h.points > 0 ? '+' : ''}${h.points}</span>
            </div>
        `).join('');
    };

    // Mentor view pages
    window.loadMentorCourses = function loadMentorCourses() {
        // Show same mock courses for prototype
        const container = document.getElementById('all-courses');
        if (!container) return;
        container.innerHTML = mockCourses.slice(0, 6).map(renderCourseCard).join('');
    };

    window.loadMentorStats = function loadMentorStats() {
        console.debug('loadMentorStats: stub');
    };

    // Actions and utilities stubs
    window.openStudentChat = function openStudentChat(studentId) {
        const youth = mockYouth.find(y => y.id === studentId);
        if (youth) {
            youth.lastContact = new Date().toISOString().slice(0,10);
            saveYouthOverrides();
        }
        
        // إخفاء قسم الطلاب
        const studentsContainer = document.getElementById('mentors-students-container');
        if (studentsContainer) studentsContainer.style.display = 'none';
        
        // إظهار الشات مع الطالب
        const chatContainer = document.getElementById('mentors-chat-container');
        if (!chatContainer) return;
        
        chatContainer.style.display = 'block';
        chatContainer.innerHTML = `
            <div class="page-header">
                <h1>الشات مع: ${youth ? youth.name : 'الطالب'}</h1>
                <button class="btn btn-secondary" onclick="backToStudentsList()">
                    <i class="fas fa-arrow-right"></i> العودة لقائمة الطلاب
                </button>
            </div>
            <div class="chat-container">
                <div class="chat-header">
                    <div class="avatar"><i class="fas fa-user-graduate"></i></div>
                    <div class="user-info">
                        <h3>${youth ? youth.name : 'الطالب'}</h3>
                        <p>${youth ? youth.specialization + ' - ' + youth.level : ''}</p>
                        <span class="student-status ${youth ? youth.status : 'unqualified'}">
                            ${youth && youth.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}
                        </span>
                    </div>
                    <div class="status">متصل الآن</div>
                </div>
                <div class="chat-messages" id="chat-messages-${studentId}"></div>
                <div class="chat-input">
                    <input type="text" id="message-input-${studentId}" placeholder="اكتب رسالتك هنا..." onkeypress="if(event.key==='Enter'){sendChatMessage(${studentId})}">
                    <button onclick="sendChatMessage(${studentId})"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>`;
        
        loadPersistedChat(studentId);
    };
    
    // العودة لقائمة الطلاب
    window.backToStudentsList = function backToStudentsList() {
        renderMentorStudentsCards();
    };
    
    // طلب تعيين مينتور
    window.requestMentorAssignment = function requestMentorAssignment() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h3>طلب تعيين مينتور</h3>
                <p>سيتم مراجعة طلبك وتعين مينتور مناسب لك في أقرب وقت ممكن.</p>
                <div class="form-group">
                    <label>التخصص المفضل:</label>
                    <select id="preferred-specialization">
                        <option value="برمجة">برمجة</option>
                        <option value="تصميم">تصميم</option>
                        <option value="تسويق">تسويق</option>
                        <option value="أعمال">أعمال</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>ملاحظات إضافية:</label>
                    <textarea id="mentor-notes" placeholder="اكتب أي متطلبات خاصة أو ملاحظات..."></textarea>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="submitMentorRequest()">إرسال الطلب</button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">إلغاء</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    };
    
    // إرسال طلب تعيين مينتور
    window.submitMentorRequest = function submitMentorRequest() {
        const specialization = document.getElementById('preferred-specialization').value;
        const notes = document.getElementById('mentor-notes').value;
        
        // حفظ الطلب
        const request = {
            userId: currentUser.id,
            userName: currentUser.name,
            specialization: specialization,
            notes: notes,
            date: new Date().toISOString(),
            status: 'pending'
        };
        
        // حفظ في التخزين
        const requests = STORAGE.getJSON('mentor_requests') || [];
        requests.push(request);
        STORAGE.setJSON('mentor_requests', requests);
        
        alert('تم إرسال طلب تعيين المينتور بنجاح! سيتم التواصل معك قريباً.');
        
        // إغلاق النافذة
        document.querySelector('.modal').remove();
    };
    window.viewStudentProgress = function viewStudentProgress(studentId) {
        alert('عرض التقدم للطالب #' + studentId);
    };
    window.editSuggestion = function editSuggestion(studentId) {
        alert('تعديل اقتراح فيديو للطالب #' + studentId);
    };
    window.generateReport = function generateReport() {
        alert('تم توليد تقرير مبدئي (Prototype)');
    };

    // Simple info modals for actions
    window.openCommunityInfo = function openCommunityInfo() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h3>مجتمع المنصة</h3>
                <p>انضم إلى مجتمعنا للتواصل والدعم.</p>
                <a href="https://t.me/your_community_link" target="_blank" class="btn btn-primary"><i class="fab fa-telegram"></i> الذهاب للتلجرام</a>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    };

    window.openLearningPath = function openLearningPath() {
        const spec = (currentUser && currentUser.specialization) || '';
        const stepsProg = ['أساسيات البرمجة', 'HTML/CSS', 'JavaScript', 'مشروع بسيط', 'Git/GitHub'];
        const stepsDesign = ['أساسيات التصميم', 'مبادئ الألوان والخطوط', 'أدوات Figma/Photoshop', 'نماذج UI', 'بورتفوليو'];
        const steps = spec === 'تصميم' ? stepsDesign : stepsProg;
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h3>مسار التعلم - ${spec || 'عام'}</h3>
                <ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    };

    window.openMentorCourses = function openMentorCourses() {
        const mentor = mockMentors.find(m => m.name === (currentUser?.assignedMentor || ''));
        const list = mentor?.courses || [];
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                <h3>كورسات المينتور</h3>
                ${list.length ? list.map(c => `<div class="course-card"><h4>${c.title}</h4><a class="btn btn-secondary" target="_blank" href="${c.url}"><i class="fab fa-youtube"></i> مشاهدة</a></div>`).join('') : '<p>لا توجد كورسات متاحة.</p>'}
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'block';
    };

    window.requestMentorChange = function requestMentorChange() {
        alert('تم إرسال طلب تغيير المينتور. سيتم مراجعته من إدارة المنصة.');
    };

    // Admin Panel: assign mentor and set status
    window.openAdminPanel = function openAdminPanel() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'admin-panel-modal';

        const youthRows = mockYouth.map(y => `
            <tr data-id="${y.id}">
                <td>${y.name}</td>
                <td>${y.specialization}</td>
                <td>
                    <select class="status-select">
                        <option value="qualified" ${y.status === 'qualified' ? 'selected' : ''}>Qualified</option>
                        <option value="unqualified" ${y.status === 'unqualified' ? 'selected' : ''}>Unqualified</option>
                    </select>
                </td>
                <td>
                    <select class="mentor-select">
                        ${mockMentors.map(m => `<option value="${m.id}" ${y.mentorId === m.id || y.assignedMentor === m.name ? 'selected' : ''}>${m.name}</option>`).join('')}
                    </select>
                </td>
            </tr>
        `).join('');

        modal.innerHTML = `
            <div class="modal-content large">
                <span class="close" onclick="document.getElementById('admin-panel-modal').remove()">&times;</span>
                <h3>لوحة إدارة التعيينات والحالة</h3>
                <div class="admin-table-wrapper">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>الشاب</th>
                                <th>التخصص</th>
                                <th>الحالة</th>
                                <th>المينتور المعين</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${youthRows}
                        </tbody>
                    </table>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" id="admin-save-btn">حفظ</button>
                    <button class="btn btn-secondary" onclick="document.getElementById('admin-panel-modal').remove()">إلغاء</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';

        modal.querySelector('#admin-save-btn').addEventListener('click', () => {
            const rows = [...modal.querySelectorAll('tbody tr')];
            rows.forEach(row => {
                const id = parseInt(row.getAttribute('data-id'));
                const status = row.querySelector('.status-select').value;
                const mentorId = parseInt(row.querySelector('.mentor-select').value);
                const youth = mockYouth.find(y => y.id === id);
                const mentor = mockMentors.find(m => m.id === mentorId);
                if (youth && mentor) {
                    youth.status = status;
                    youth.mentorId = mentorId;
                    youth.assignedMentor = mentor.name;
                }
            });
            saveYouthOverrides();
            alert('تم حفظ التغييرات');
            modal.remove();
            // Refresh current page
            const active = document.querySelector('.page.active');
            if (active?.id === 'dashboard-page') loadDashboardData();
            if (active?.id === 'mentors-page') loadPageData('mentors');
        });
    };

    // Allow qualified youth to choose preferred company
    window.chooseCompany = function chooseCompany(studentId, company) {
        if (!company) { alert('اختر شركة أولاً'); return; }
        const youth = mockYouth.find(y => y.id === studentId);
        if (!youth) { alert('لم يتم العثور على الشاب'); return; }
        if (youth.applicationSubmittedAt) { alert('تم التقديم بالفعل، لا يمكن تغيير الاختيار الآن'); return; }
        youth.selectedCompany = company;
        saveYouthOverrides();
        alert('تم حفظ اختيار الشركة: ' + company);
        // Update views if needed
        if (userType === 'youth' && currentUser && currentUser.id === youth.id) {
            currentUser.selectedCompany = company;
            loadYouthStatus();
            loadProfileData();
        }
    };

    window.submitApplication = function submitApplication(studentId) {
        const youth = mockYouth.find(y => y.id === studentId);
        if (!youth) { alert('لم يتم العثور على الشاب'); return; }
        if (!youth.selectedCompany) { alert('اختر شركة أولاً قبل التقديم'); return; }
        if (youth.applicationSubmittedAt) { alert('تم التقديم مسبقًا'); return; }
        youth.applicationSubmittedAt = new Date().toISOString();
        saveYouthOverrides();
        alert('تم إرسال طلب التقديم إلى: ' + youth.selectedCompany);
        if (userType === 'youth' && currentUser && currentUser.id === youth.id) {
            currentUser.applicationSubmittedAt = youth.applicationSubmittedAt;
            loadYouthStatus();
            loadProfileData();
        }
    };
})();
// ===== End added stubs =====

// Ensure global function bindings exist for unqualified calls
function loadAssignedMentor() { if (window.loadAssignedMentor) return window.loadAssignedMentor.apply(this, arguments); }
function loadRecommendedCourses() { if (window.loadRecommendedCourses) return window.loadRecommendedCourses.apply(this, arguments); }
function loadYouthStatus() { if (window.loadYouthStatus) return window.loadYouthStatus.apply(this, arguments); }
function loadMentorsData() { if (window.loadMentorsData) return window.loadMentorsData.apply(this, arguments); }
function loadCoursesData() { if (window.loadCoursesData) return window.loadCoursesData.apply(this, arguments); }
function loadProfileData() { if (window.loadProfileData) return window.loadProfileData.apply(this, arguments); }
function loadPointsData() { if (window.loadPointsData) return window.loadPointsData.apply(this, arguments); }
function loadMentorCourses() { if (window.loadMentorCourses) return window.loadMentorCourses.apply(this, arguments); }
function loadMentorStats() { if (window.loadMentorStats) return window.loadMentorStats.apply(this, arguments); }
function openStudentChat() { if (window.openStudentChat) return window.openStudentChat.apply(this, arguments); }
function viewStudentProgress() { if (window.viewStudentProgress) return window.viewStudentProgress.apply(this, arguments); }
function editSuggestion() { if (window.editSuggestion) return window.editSuggestion.apply(this, arguments); }
function generateReport() { if (window.generateReport) return window.generateReport.apply(this, arguments); }

// Mentors page chat rendering
function renderYouthMentorChat() {
    // إخفاء قسم المنتورين للمنتورين
    const mentorView = document.getElementById('mentors-students-container');
    if (mentorView) mentorView.style.display = 'none';
    
    // إظهار قسم الشات للشباب
    const container = document.getElementById('mentors-chat-container');
    if (!container) return;
    container.style.display = 'block';
    
    // Find the mentor assigned to current user - الشباب لهم مينتور واحد فقط
    const assignedMentor = mockMentors.find(m => m.id === currentUser.mentorId);
    
    if (!assignedMentor) {
        container.innerHTML = `
            <div class="page-header">
                <h1>المينتور</h1>
            </div>
            <div class="no-mentor-message">
                <i class="fas fa-user-tie" style="font-size: 4rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3>لا يوجد مينتور معين لك حالياً</h3>
                <p>سيتم تعيين مينتور مناسب لك قريباً</p>
                <button class="btn btn-primary" onclick="requestMentorAssignment()">طلب تعيين مينتور</button>
            </div>`;
        return;
    }
    
    container.innerHTML = `
        <div class="page-header">
            <h1>المينتور: ${assignedMentor.name}</h1>
        </div>
        <div class="chat-container">
            <div class="chat-header">
                <div class="avatar"><i class="fas fa-user-tie"></i></div>
                <div class="user-info">
                    <h3>${assignedMentor.name}</h3>
                    <p>${assignedMentor.specialization} - ${assignedMentor.experience}</p>
                    <span class="mentor-rating"><i class="fas fa-star"></i> ${assignedMentor.rating}</span>
                </div>
                <div class="status">متصل الآن</div>
            </div>
            <div class="chat-messages" id="chat-messages-youth"></div>
            <div class="chat-input">
                <input type="text" id="message-input-youth" placeholder="اكتب رسالتك هنا..." onkeypress="if(event.key==='Enter'){sendChatMessage('youth')}">
                <button onclick="sendChatMessage('youth')"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <div class="mentor-info-card">
            <h3>معلومات المينتور</h3>
            <div class="mentor-details">
                <p><strong>التخصص:</strong> ${assignedMentor.specialization}</p>
                <p><strong>المستوى:</strong> ${assignedMentor.level}</p>
                <p><strong>الخبرة:</strong> ${assignedMentor.experience}</p>
                <p><strong>عدد الطلاب:</strong> ${assignedMentor.students}</p>
                <p><strong>التقييم:</strong> ${assignedMentor.rating}/5</p>
            </div>
            <div class="mentor-skills">
                <h4>المهارات:</h4>
                <div class="skills-tags">
                    ${(assignedMentor.tags || []).map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>`;
    loadPersistedChat('youth');
}



function sendChatMessage(target) {
    const isYouthMode = target === 'youth';
    const inputId = isYouthMode ? 'message-input-youth' : `message-input-${target}`;
    const msgId = isYouthMode ? 'chat-messages-youth' : `chat-messages-${target}`;
    const input = document.getElementById(inputId);
    const messages = document.getElementById(msgId);
    
    if (!input || !messages || !input.value.trim()) return;
    
    const messageText = input.value.trim();
    const currentTime = new Date().toLocaleTimeString('ar-EG');
    
    // إنشاء رسالة المستخدم
    const userMessage = { 
        from: userType, 
        text: messageText, 
        time: currentTime,
        timestamp: new Date().toISOString()
    };
    
    // عرض رسالة المستخدم
    messages.insertAdjacentHTML('beforeend', `
        <div class="message ${userType}">
            <div class="content">${messageText}</div>
            <span class="time">${currentTime}</span>
        </div>
    `);
    
    // حفظ الرسالة
    persistChatMessage(target, userMessage);
    
    // مسح حقل الإدخال
    input.value = '';
    
    // التمرير للأسفل
    messages.scrollTop = messages.scrollHeight;
    
    // محاكاة رد المينتور (إذا كان المستخدم شاب)
    if (isYouthMode && userType === 'youth') {
        // إظهار مؤشر الكتابة
        showTypingIndicator(target);
        
        setTimeout(() => {
            hideTypingIndicator(target);
            simulateMentorResponse(target);
        }, 1000 + Math.random() * 2000); // رد بعد 1-3 ثواني
    }
}

function persistChatMessage(target, message) {
    const key = `chat_${target}`;
    const list = (() => { try { return STORAGE.getJSON(key) || []; } catch { return []; } })();
    list.push(message);
    STORAGE.setJSON(key, list);
}

// إظهار مؤشر الكتابة
function showTypingIndicator(target) {
    const msgId = target === 'youth' ? 'chat-messages-youth' : `chat-messages-${target}`;
    const messages = document.getElementById(msgId);
    if (!messages) return;
    
    // إزالة مؤشر الكتابة السابق إذا كان موجوداً
    const existingIndicator = messages.querySelector('.typing-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // إضافة مؤشر الكتابة
    messages.insertAdjacentHTML('beforeend', `
        <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `);
    
    // التمرير للأسفل
    messages.scrollTop = messages.scrollHeight;
}

// إخفاء مؤشر الكتابة
function hideTypingIndicator(target) {
    const msgId = target === 'youth' ? 'chat-messages-youth' : `chat-messages-${target}`;
    const messages = document.getElementById(msgId);
    if (!messages) return;
    
    const indicator = messages.querySelector('.typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// محاكاة رد المينتور للشباب
function simulateMentorResponse(target) {
    const msgId = target === 'youth' ? 'chat-messages-youth' : `chat-messages-${target}`;
    const messages = document.getElementById(msgId);
    if (!messages) return;
    
    // رسائل نموذجية للمينتور
    const mentorResponses = [
        "ممتاز! هذا سؤال جيد جداً",
        "أرى أنك تتقدم بشكل رائع",
        "دعني أوضح لك هذا الأمر",
        "هذا مثال ممتاز على ما تعلمته",
        "أعتقد أنك جاهز للخطوة التالية",
        "هذا السؤال يظهر فهمك العميق للموضوع",
        "أحسنت! استمر في التعلم",
        "دعني أقترح عليك بعض المصادر الإضافية",
        "أرى أنك تطور مهاراتك بشكل ممتاز",
        "هذا سؤال متقدم، أعتقد أنك جاهز له"
    ];
    
    // اختيار رد عشوائي
    const randomResponse = mentorResponses[Math.floor(Math.random() * mentorResponses.length)];
    const currentTime = new Date().toLocaleTimeString('ar-EG');
    
    // إنشاء رسالة المينتور
    const mentorMessage = {
        from: 'mentor',
        text: randomResponse,
        time: currentTime,
        timestamp: new Date().toISOString()
    };
    
    // عرض رسالة المينتور
    messages.insertAdjacentHTML('beforeend', `
        <div class="message mentor">
            <div class="content">${randomResponse}</div>
            <span class="time">${currentTime}</span>
        </div>
    `);
    
    // حفظ رسالة المينتور
    persistChatMessage(target, mentorMessage);
    
    // التمرير للأسفل
    messages.scrollTop = messages.scrollHeight;
}

function loadPersistedChat(target) {
    const key = `chat_${target}`;
    const list = (() => { try { return STORAGE.getJSON(key) || []; } catch { return []; } })();
    const msgId = target === 'youth' ? 'chat-messages-youth' : `chat-messages-${target}`;
    const messages = document.getElementById(msgId);
    if (!messages) return;
    
    // مسح الرسائل السابقة
    messages.innerHTML = '';
    
    // عرض الرسائل المحفوظة
    list.forEach(m => {
        const messageClass = m.from === 'youth' ? 'youth' : 'mentor';
        messages.insertAdjacentHTML('beforeend', `
            <div class="message ${messageClass}">
                <div class="content">${m.text}</div>
                <span class="time">${m.time}</span>
            </div>
        `);
    });
    
    // التمرير للأسفل
    messages.scrollTop = messages.scrollHeight;
    
    // إضافة رسالة ترحيب إذا لم تكن هناك رسائل
    if (list.length === 0) {
        setTimeout(() => {
            let welcomeMessage;
            
            if (target === 'youth') {
                // رسالة ترحيب للشباب من المنتور
                welcomeMessage = {
                    from: 'mentor',
                    text: 'مرحباً! أنا مينتورك، كيف يمكنني مساعدتك اليوم؟',
                    time: new Date().toLocaleTimeString('ar-EG'),
                    timestamp: new Date().toISOString()
                };
            } else {
                // رسالة ترحيب للمنتور من الطالب
                const student = mockYouth.find(s => s.id == target);
                if (student) {
                    welcomeMessage = {
                        from: 'youth',
                        text: `مرحباً! أنا ${student.name}، سعيد بلقائك!`,
                        time: new Date().toLocaleTimeString('ar-EG'),
                        timestamp: new Date().toISOString()
                    };
                }
            }
            
            if (welcomeMessage) {
                messages.insertAdjacentHTML('beforeend', `
                    <div class="message ${welcomeMessage.from}">
                        <div class="content">${welcomeMessage.text}</div>
                        <span class="time">${welcomeMessage.time}</span>
                    </div>
                `);
                
                persistChatMessage(target, welcomeMessage);
                messages.scrollTop = messages.scrollHeight;
            }
        }, 500);
    }
}

// Override mentors page loader
function loadMentorsData() {
    if (userType === 'youth') {
        // للشباب: عرض الشات مع المنتور المعين
        renderYouthMentorChat();
    } else {
        // للمنتورين: عرض قائمة الطلاب
        renderMentorStudentsCards();
    }
}

function renderMentorStudentsCards() {
    // إخفاء قسم الشات للشباب
    const youthView = document.getElementById('mentors-chat-container');
    if (youthView) youthView.style.display = 'none';
    
    // إظهار قسم الطلاب للمنتورين
    const container = document.getElementById('mentors-students-container');
    if (!container) return;
    container.style.display = 'block';
    
    const studentsList = document.getElementById('mentors-students-list');
    if (!studentsList) return;
    
    // البحث عن الطلاب المعينين لهذا المنتور
    const students = mockYouth.filter(y => y.mentorId === currentUser.id);
    
    if (students.length === 0) {
        studentsList.innerHTML = `
            <div class="no-students-message">
                <i class="fas fa-users" style="font-size: 4rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3>لا يوجد طلاب معينين لك حالياً</h3>
                <p>سيتم تعيين طلاب لك قريباً</p>
            </div>`;
        return;
    }
    
    studentsList.innerHTML = `
        <div class="students-grid">
            ${students.map(student => `
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-avatar"><i class="fas fa-user-graduate"></i></div>
                        <div class="student-info">
                            <h3>${student.name}</h3>
                            <p>${student.specialization} - ${student.level}</p>
                            <span class="student-status ${student.status}">${student.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}</span>
                        </div>
                    </div>
                    <div class="student-actions">
                        <button class="btn btn-primary" onclick="openStudentChat(${student.id})">
                            <i class="fas fa-comments"></i> فتح الشات
                        </button>
                        <button class="btn btn-secondary" onclick="viewStudentProgress(${student.id})">
                            <i class="fas fa-chart-line"></i> التقدم
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>`;
}

