// Global Variables
let currentUser = null;
let currentTab = 'youth';
let userType = null; // 'youth' or 'mentor'

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
        type: "qualified", // للشباب المؤهلين
        courses: [
            {
                id: 1,
                title: "مقدمة في تطوير الويب",
                platform: "YouTube",
                url: "https://youtube.com/watch?v=example1",
                duration: "8 أسابيع",
                level: "مبتدئ",
                price: "مجاني"
            },
            {
                id: 2,
                title: "React.js المتقدم",
                platform: "YouTube",
                url: "https://youtube.com/watch?v=example2",
                duration: "6 أسابيع",
                level: "متقدم",
                price: "مجاني"
            }
        ]
    },
    {
        id: 2,
        name: "سارة أحمد",
        specialization: "تصميم",
        level: "متوسط",
        rating: 4.6,
        students: 32,
        experience: "5 سنوات",
        description: "مصممة جرافيك محترفة متخصصة في تصميم واجهات المستخدم",
        tags: ["UI/UX", "Figma", "Adobe XD", "Photoshop"],
        age: 28,
        qualification: "ماجستير في التصميم الرقمي",
        expertise: "تصميم واجهات المستخدم، تصميم الجرافيك",
        type: "qualified", // للشباب المؤهلين
        courses: [
            {
                id: 3,
                title: "تصميم واجهات المستخدم",
                platform: "YouTube",
                url: "https://youtube.com/watch?v=example3",
                duration: "6 أسابيع",
                level: "متوسط",
                price: "مجاني"
            }
        ]
    },
    {
        id: 3,
        name: "محمد علي",
        specialization: "برمجة",
        level: "متوسط",
        rating: 4.5,
        students: 28,
        experience: "4 سنوات",
        description: "مطور برمجيات متخصص في تعليم المبتدئين وتطوير مهاراتهم",
        tags: ["HTML", "CSS", "JavaScript", "Python"],
        age: 30,
        qualification: "بكالوريوس هندسة برمجيات",
        expertise: "تعليم البرمجة للمبتدئين، تطوير تطبيقات بسيطة",
        type: "unqualified", // للشباب غير المؤهلين
        courses: [
            {
                id: 4,
                title: "أساسيات البرمجة للمبتدئين",
                platform: "YouTube",
                url: "https://youtube.com/watch?v=example4",
                duration: "10 أسابيع",
                level: "مبتدئ",
                price: "مجاني"
            },
            {
                id: 5,
                title: "HTML و CSS من الصفر",
                platform: "YouTube",
                url: "https://youtube.com/watch?v=example5",
                duration: "6 أسابيع",
                level: "مبتدئ",
                price: "مجاني"
            }
        ]
    },
    {
        id: 4,
        name: "فاطمة حسن",
        specialization: "تصميم",
        level: "مبتدئ",
        rating: 4.3,
        students: 20,
        experience: "3 سنوات",
        description: "مصممة متخصصة في تعليم أساسيات التصميم للمبتدئين",
        tags: ["Photoshop", "Illustrator", "تصميم أساسي"],
        age: 26,
        qualification: "بكالوريوس فنون تطبيقية",
        expertise: "تعليم أساسيات التصميم، تصميم الجرافيك للمبتدئين",
        type: "unqualified", // للشباب غير المؤهلين
        courses: [
            {
                id: 6,
                title: "أساسيات التصميم الجرافيكي",
                platform: "YouTube",
                url: "https://youtube.com/watch?v=example6",
                duration: "8 أسابيع",
                level: "مبتدئ",
                price: "مجاني"
            }
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
        assignedMentor: "سارة أحمد",
        mentorId: 2,
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
        assignedMentor: "محمد علي",
        mentorId: 3,
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
            if (userType === 'youth') {
                loadMentorsData();
            } else {
                loadMentorDashboard();
            }
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
    userType = 'youth';
    
    // اختيار عشوائي لشاب من البيانات
    const randomYouth = mockYouth[Math.floor(Math.random() * mockYouth.length)];
    currentUser = {
        ...randomYouth,
        email: 'youth@example.com'
    };
    
    showPage('dashboard');
    updateNavigationForYouth();
    updateUserName();
}

function loginAsMentor() {
    userType = 'mentor';
    currentUser = {
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
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    userType = null;
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    document.getElementById('login-page').classList.add('active');
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-form').reset();
    
    // Reset navigation
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
    const container = document.querySelector('.container');
    if (!container) return;
    
    // البحث عن الشباب المخصصين لهذا المينتور
    const assignedStudents = mockYouth.filter(youth => youth.assignedMentor === currentUser.name);
    
    container.innerHTML = `
        <div class="dashboard-header">
            <h1>مرحباً ${currentUser.name} 👋</h1>
            <p>الشباب تحت إشرافك</p>
        </div>

        <div class="mentor-dashboard-grid">
            <div class="mentor-stats">
                <h3>إحصائيات سريعة</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>${assignedStudents.length}</h3>
                        <p>طالب</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-check"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'qualified').length}</h3>
                        <p>مؤهل</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-clock"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'unqualified').length}</h3>
                        <p>تحت التطوير</p>
                    </div>
                </div>
            </div>

            <div class="mentor-actions-section">
                <button class="btn btn-primary" onclick="showSuggestVideoModal()">
                    <i class="fas fa-video"></i>
                    اقتراح فيديو تعليمي
                </button>
                <button class="btn btn-secondary" onclick="generateReport()">
                    <i class="fas fa-file-alt"></i>
                    تقرير
                </button>
            </div>

            <div class="assigned-students-section">
                <h3>الشباب تحت إشرافك</h3>
                <div class="students-grid">
                    ${assignedStudents.map(student => `
                        <div class="student-card ${student.status}">
                            <div class="student-header">
                                <div class="student-info">
                                    <h4>${student.name}</h4>
                                    <span class="student-level">${student.specialization} - ${student.level}</span>
                                    <span class="status-badge ${student.status}">
                                        ${student.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}
                                    </span>
                                </div>
                                <div class="student-stats">
                                    <span><i class="fas fa-star"></i> ${student.points} نقطة</span>
                                    <span><i class="fas fa-book"></i> ${student.completedCourses} كورس</span>
                                </div>
                            </div>
                            <div class="student-skills">
                                ${student.skills.map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            <div class="student-actions">
                                <button onclick="openStudentChat(${student.id})" class="btn btn-primary">
                                    <i class="fas fa-comments"></i> محادثة
                                </button>
                                <button onclick="showSuggestVideoModal(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-video"></i> اقتراح فيديو
                                </button>
                                <button onclick="viewStudentProgress(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-chart-line"></i> التقدم
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="suggested-videos-section">
                <h3>الفيديوهات المقترحة</h3>
                <div class="videos-grid">
                    ${loadSuggestedVideos(assignedStudents)}
                </div>
            </div>
        </div>
    `;
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
    
    const suggestion = {
        studentId: parseInt(formData.get('studentId')),
        title: formData.get('title'),
        url: formData.get('url'),
        description: formData.get('description'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        mentorId: currentUser.id,
        date: new Date().toISOString()
    };
    
    // في التطبيق الحقيقي، سيتم حفظ الاقتراح في قاعدة البيانات
    console.log('تم إرسال اقتراح الفيديو:', suggestion);
    alert('تم إرسال اقتراح الفيديو بنجاح!');
    closeSuggestVideoModal();
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
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
            if (userType === 'youth') {
                loadMentorsData();
            } else {
                loadMentorDashboard();
            }
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
    userType = 'youth';
    
    // اختيار عشوائي لشاب من البيانات
    const randomYouth = mockYouth[Math.floor(Math.random() * mockYouth.length)];
    currentUser = {
        ...randomYouth,
        email: 'youth@example.com'
    };
    
    showPage('dashboard');
    updateNavigationForYouth();
    updateUserName();
}

function loginAsMentor() {
    userType = 'mentor';
    currentUser = {
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
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    userType = null;
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    document.getElementById('login-page').classList.add('active');
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-form').reset();
    
    // Reset navigation
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
    const container = document.querySelector('.container');
    if (!container) return;
    
    // البحث عن الشباب المخصصين لهذا المينتور
    const assignedStudents = mockYouth.filter(youth => youth.assignedMentor === currentUser.name);
    
    container.innerHTML = `
        <div class="dashboard-header">
            <h1>مرحباً ${currentUser.name} 👋</h1>
            <p>الشباب تحت إشرافك</p>
        </div>

        <div class="mentor-dashboard-grid">
            <div class="mentor-stats">
                <h3>إحصائيات سريعة</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>${assignedStudents.length}</h3>
                        <p>طالب</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-check"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'qualified').length}</h3>
                        <p>مؤهل</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-clock"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'unqualified').length}</h3>
                        <p>تحت التطوير</p>
                    </div>
                </div>
            </div>

            <div class="mentor-actions-section">
                <button class="btn btn-primary" onclick="showSuggestVideoModal()">
                    <i class="fas fa-video"></i>
                    اقتراح فيديو تعليمي
                </button>
                <button class="btn btn-secondary" onclick="generateReport()">
                    <i class="fas fa-file-alt"></i>
                    تقرير
                </button>
            </div>

            <div class="assigned-students-section">
                <h3>الشباب تحت إشرافك</h3>
                <div class="students-grid">
                    ${assignedStudents.map(student => `
                        <div class="student-card ${student.status}">
                            <div class="student-header">
                                <div class="student-info">
                                    <h4>${student.name}</h4>
                                    <span class="student-level">${student.specialization} - ${student.level}</span>
                                    <span class="status-badge ${student.status}">
                                        ${student.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}
                                    </span>
                                </div>
                                <div class="student-stats">
                                    <span><i class="fas fa-star"></i> ${student.points} نقطة</span>
                                    <span><i class="fas fa-book"></i> ${student.completedCourses} كورس</span>
                                </div>
                            </div>
                            <div class="student-skills">
                                ${student.skills.map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            <div class="student-actions">
                                <button onclick="openStudentChat(${student.id})" class="btn btn-primary">
                                    <i class="fas fa-comments"></i> محادثة
                                </button>
                                <button onclick="showSuggestVideoModal(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-video"></i> اقتراح فيديو
                                </button>
                                <button onclick="viewStudentProgress(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-chart-line"></i> التقدم
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="suggested-videos-section">
                <h3>الفيديوهات المقترحة</h3>
                <div class="videos-grid">
                    ${loadSuggestedVideos(assignedStudents)}
                </div>
            </div>
        </div>
    `;
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
    
    const suggestion = {
        studentId: parseInt(formData.get('studentId')),
        title: formData.get('title'),
        url: formData.get('url'),
        description: formData.get('description'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        mentorId: currentUser.id,
        date: new Date().toISOString()
    };
    
    // في التطبيق الحقيقي، سيتم حفظ الاقتراح في قاعدة البيانات
    console.log('تم إرسال اقتراح الفيديو:', suggestion);
    alert('تم إرسال اقتراح الفيديو بنجاح!');
    closeSuggestVideoModal();
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
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
            if (userType === 'youth') {
                loadMentorsData();
            } else {
                loadMentorDashboard();
            }
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
    userType = 'youth';
    
    // اختيار عشوائي لشاب من البيانات
    const randomYouth = mockYouth[Math.floor(Math.random() * mockYouth.length)];
    currentUser = {
        ...randomYouth,
        email: 'youth@example.com'
    };
    
    showPage('dashboard');
    updateNavigationForYouth();
    updateUserName();
}

function loginAsMentor() {
    userType = 'mentor';
    currentUser = {
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
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    userType = null;
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    document.getElementById('login-page').classList.add('active');
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-form').reset();
    
    // Reset navigation
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
    const container = document.querySelector('.container');
    if (!container) return;
    
    // البحث عن الشباب المخصصين لهذا المينتور
    const assignedStudents = mockYouth.filter(youth => youth.assignedMentor === currentUser.name);
    
    container.innerHTML = `
        <div class="dashboard-header">
            <h1>مرحباً ${currentUser.name} 👋</h1>
            <p>الشباب تحت إشرافك</p>
        </div>

        <div class="mentor-dashboard-grid">
            <div class="mentor-stats">
                <h3>إحصائيات سريعة</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>${assignedStudents.length}</h3>
                        <p>طالب</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-check"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'qualified').length}</h3>
                        <p>مؤهل</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-clock"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'unqualified').length}</h3>
                        <p>تحت التطوير</p>
                    </div>
                </div>
            </div>

            <div class="mentor-actions-section">
                <button class="btn btn-primary" onclick="showSuggestVideoModal()">
                    <i class="fas fa-video"></i>
                    اقتراح فيديو تعليمي
                </button>
                <button class="btn btn-secondary" onclick="generateReport()">
                    <i class="fas fa-file-alt"></i>
                    تقرير
                </button>
            </div>

            <div class="assigned-students-section">
                <h3>الشباب تحت إشرافك</h3>
                <div class="students-grid">
                    ${assignedStudents.map(student => `
                        <div class="student-card ${student.status}">
                            <div class="student-header">
                                <div class="student-info">
                                    <h4>${student.name}</h4>
                                    <span class="student-level">${student.specialization} - ${student.level}</span>
                                    <span class="status-badge ${student.status}">
                                        ${student.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}
                                    </span>
                                </div>
                                <div class="student-stats">
                                    <span><i class="fas fa-star"></i> ${student.points} نقطة</span>
                                    <span><i class="fas fa-book"></i> ${student.completedCourses} كورس</span>
                                </div>
                            </div>
                            <div class="student-skills">
                                ${student.skills.map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            <div class="student-actions">
                                <button onclick="openStudentChat(${student.id})" class="btn btn-primary">
                                    <i class="fas fa-comments"></i> محادثة
                                </button>
                                <button onclick="showSuggestVideoModal(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-video"></i> اقتراح فيديو
                                </button>
                                <button onclick="viewStudentProgress(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-chart-line"></i> التقدم
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="suggested-videos-section">
                <h3>الفيديوهات المقترحة</h3>
                <div class="videos-grid">
                    ${loadSuggestedVideos(assignedStudents)}
                </div>
            </div>
        </div>
    `;
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
    
    const suggestion = {
        studentId: parseInt(formData.get('studentId')),
        title: formData.get('title'),
        url: formData.get('url'),
        description: formData.get('description'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        mentorId: currentUser.id,
        date: new Date().toISOString()
    };
    
    // في التطبيق الحقيقي، سيتم حفظ الاقتراح في قاعدة البيانات
    console.log('تم إرسال اقتراح الفيديو:', suggestion);
    alert('تم إرسال اقتراح الفيديو بنجاح!');
    closeSuggestVideoModal();
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
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
            if (userType === 'youth') {
                loadMentorsData();
            } else {
                loadMentorDashboard();
            }
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
    userType = 'youth';
    
    // اختيار عشوائي لشاب من البيانات
    const randomYouth = mockYouth[Math.floor(Math.random() * mockYouth.length)];
    currentUser = {
        ...randomYouth,
        email: 'youth@example.com'
    };
    
    showPage('dashboard');
    updateNavigationForYouth();
    updateUserName();
}

function loginAsMentor() {
    userType = 'mentor';
    currentUser = {
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
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    userType = null;
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    document.getElementById('login-page').classList.add('active');
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-form').reset();
    
    // Reset navigation
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
    const container = document.querySelector('.container');
    if (!container) return;
    
    // البحث عن الشباب المخصصين لهذا المينتور
    const assignedStudents = mockYouth.filter(youth => youth.assignedMentor === currentUser.name);
    
    container.innerHTML = `
        <div class="dashboard-header">
            <h1>مرحباً ${currentUser.name} 👋</h1>
            <p>الشباب تحت إشرافك</p>
        </div>

        <div class="mentor-dashboard-grid">
            <div class="mentor-stats">
                <h3>إحصائيات سريعة</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>${assignedStudents.length}</h3>
                        <p>طالب</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-check"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'qualified').length}</h3>
                        <p>مؤهل</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-clock"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'unqualified').length}</h3>
                        <p>تحت التطوير</p>
                    </div>
                </div>
            </div>

            <div class="mentor-actions-section">
                <button class="btn btn-primary" onclick="showSuggestVideoModal()">
                    <i class="fas fa-video"></i>
                    اقتراح فيديو تعليمي
                </button>
                <button class="btn btn-secondary" onclick="generateReport()">
                    <i class="fas fa-file-alt"></i>
                    تقرير
                </button>
            </div>

            <div class="assigned-students-section">
                <h3>الشباب تحت إشرافك</h3>
                <div class="students-grid">
                    ${assignedStudents.map(student => `
                        <div class="student-card ${student.status}">
                            <div class="student-header">
                                <div class="student-info">
                                    <h4>${student.name}</h4>
                                    <span class="student-level">${student.specialization} - ${student.level}</span>
                                    <span class="status-badge ${student.status}">
                                        ${student.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}
                                    </span>
                                </div>
                                <div class="student-stats">
                                    <span><i class="fas fa-star"></i> ${student.points} نقطة</span>
                                    <span><i class="fas fa-book"></i> ${student.completedCourses} كورس</span>
                                </div>
                            </div>
                            <div class="student-skills">
                                ${student.skills.map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            <div class="student-actions">
                                <button onclick="openStudentChat(${student.id})" class="btn btn-primary">
                                    <i class="fas fa-comments"></i> محادثة
                                </button>
                                <button onclick="showSuggestVideoModal(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-video"></i> اقتراح فيديو
                                </button>
                                <button onclick="viewStudentProgress(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-chart-line"></i> التقدم
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="suggested-videos-section">
                <h3>الفيديوهات المقترحة</h3>
                <div class="videos-grid">
                    ${loadSuggestedVideos(assignedStudents)}
                </div>
            </div>
        </div>
    `;
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
    
    const suggestion = {
        studentId: parseInt(formData.get('studentId')),
        title: formData.get('title'),
        url: formData.get('url'),
        description: formData.get('description'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        mentorId: currentUser.id,
        date: new Date().toISOString()
    };
    
    // في التطبيق الحقيقي، سيتم حفظ الاقتراح في قاعدة البيانات
    console.log('تم إرسال اقتراح الفيديو:', suggestion);
    alert('تم إرسال اقتراح الفيديو بنجاح!');
    closeSuggestVideoModal();
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
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
            if (userType === 'youth') {
                loadMentorsData();
            } else {
                loadMentorDashboard();
            }
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
    userType = 'youth';
    
    // اختيار عشوائي لشاب من البيانات
    const randomYouth = mockYouth[Math.floor(Math.random() * mockYouth.length)];
    currentUser = {
        ...randomYouth,
        email: 'youth@example.com'
    };
    
    showPage('dashboard');
    updateNavigationForYouth();
    updateUserName();
}

function loginAsMentor() {
    userType = 'mentor';
    currentUser = {
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
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    userType = null;
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    document.getElementById('login-page').classList.add('active');
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-form').reset();
    
    // Reset navigation
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
    const container = document.querySelector('.container');
    if (!container) return;
    
    // البحث عن الشباب المخصصين لهذا المينتور
    const assignedStudents = mockYouth.filter(youth => youth.assignedMentor === currentUser.name);
    
    container.innerHTML = `
        <div class="dashboard-header">
            <h1>مرحباً ${currentUser.name} 👋</h1>
            <p>الشباب تحت إشرافك</p>
        </div>

        <div class="mentor-dashboard-grid">
            <div class="mentor-stats">
                <h3>إحصائيات سريعة</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>${assignedStudents.length}</h3>
                        <p>طالب</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-check"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'qualified').length}</h3>
                        <p>مؤهل</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-clock"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'unqualified').length}</h3>
                        <p>تحت التطوير</p>
                    </div>
                </div>
            </div>

            <div class="mentor-actions-section">
                <button class="btn btn-primary" onclick="showSuggestVideoModal()">
                    <i class="fas fa-video"></i>
                    اقتراح فيديو تعليمي
                </button>
                <button class="btn btn-secondary" onclick="generateReport()">
                    <i class="fas fa-file-alt"></i>
                    تقرير
                </button>
            </div>

            <div class="assigned-students-section">
                <h3>الشباب تحت إشرافك</h3>
                <div class="students-grid">
                    ${assignedStudents.map(student => `
                        <div class="student-card ${student.status}">
                            <div class="student-header">
                                <div class="student-info">
                                    <h4>${student.name}</h4>
                                    <span class="student-level">${student.specialization} - ${student.level}</span>
                                    <span class="status-badge ${student.status}">
                                        ${student.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}
                                    </span>
                                </div>
                                <div class="student-stats">
                                    <span><i class="fas fa-star"></i> ${student.points} نقطة</span>
                                    <span><i class="fas fa-book"></i> ${student.completedCourses} كورس</span>
                                </div>
                            </div>
                            <div class="student-skills">
                                ${student.skills.map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            <div class="student-actions">
                                <button onclick="openStudentChat(${student.id})" class="btn btn-primary">
                                    <i class="fas fa-comments"></i> محادثة
                                </button>
                                <button onclick="showSuggestVideoModal(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-video"></i> اقتراح فيديو
                                </button>
                                <button onclick="viewStudentProgress(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-chart-line"></i> التقدم
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="suggested-videos-section">
                <h3>الفيديوهات المقترحة</h3>
                <div class="videos-grid">
                    ${loadSuggestedVideos(assignedStudents)}
                </div>
            </div>
        </div>
    `;
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
    
    const suggestion = {
        studentId: parseInt(formData.get('studentId')),
        title: formData.get('title'),
        url: formData.get('url'),
        description: formData.get('description'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        mentorId: currentUser.id,
        date: new Date().toISOString()
    };
    
    // في التطبيق الحقيقي، سيتم حفظ الاقتراح في قاعدة البيانات
    console.log('تم إرسال اقتراح الفيديو:', suggestion);
    alert('تم إرسال اقتراح الفيديو بنجاح!');
    closeSuggestVideoModal();
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

// Initialize
document.addEventListener('DOMContentLoaded', function() {
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
            if (userType === 'youth') {
                loadMentorsData();
            } else {
                loadMentorDashboard();
            }
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
    userType = 'youth';
    
    // اختيار عشوائي لشاب من البيانات
    const randomYouth = mockYouth[Math.floor(Math.random() * mockYouth.length)];
    currentUser = {
        ...randomYouth,
        email: 'youth@example.com'
    };
    
    showPage('dashboard');
    updateNavigationForYouth();
    updateUserName();
}

function loginAsMentor() {
    userType = 'mentor';
    currentUser = {
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
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    userType = null;
    
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    document.getElementById('login-page').classList.add('active');
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('login-form').reset();
    
    // Reset navigation
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
    const container = document.querySelector('.container');
    if (!container) return;
    
    // البحث عن الشباب المخصصين لهذا المينتور
    const assignedStudents = mockYouth.filter(youth => youth.assignedMentor === currentUser.name);
    
    container.innerHTML = `
        <div class="dashboard-header">
            <h1>مرحباً ${currentUser.name} 👋</h1>
            <p>الشباب تحت إشرافك</p>
        </div>

        <div class="mentor-dashboard-grid">
            <div class="mentor-stats">
                <h3>إحصائيات سريعة</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>${assignedStudents.length}</h3>
                        <p>طالب</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-check"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'qualified').length}</h3>
                        <p>مؤهل</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-user-clock"></i>
                        <h3>${assignedStudents.filter(s => s.status === 'unqualified').length}</h3>
                        <p>تحت التطوير</p>
                    </div>
                </div>
            </div>

            <div class="mentor-actions-section">
                <button class="btn btn-primary" onclick="showSuggestVideoModal()">
                    <i class="fas fa-video"></i>
                    اقتراح فيديو تعليمي
                </button>
                <button class="btn btn-secondary" onclick="generateReport()">
                    <i class="fas fa-file-alt"></i>
                    تقرير
                </button>
            </div>

            <div class="assigned-students-section">
                <h3>الشباب تحت إشرافك</h3>
                <div class="students-grid">
                    ${assignedStudents.map(student => `
                        <div class="student-card ${student.status}">
                            <div class="student-header">
                                <div class="student-info">
                                    <h4>${student.name}</h4>
                                    <span class="student-level">${student.specialization} - ${student.level}</span>
                                    <span class="status-badge ${student.status}">
                                        ${student.status === 'qualified' ? 'مؤهل' : 'تحت التطوير'}
                                    </span>
                                </div>
                                <div class="student-stats">
                                    <span><i class="fas fa-star"></i> ${student.points} نقطة</span>
                                    <span><i class="fas fa-book"></i> ${student.completedCourses} كورس</span>
                                </div>
                            </div>
                            <div class="student-skills">
                                ${student.skills.map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                            </div>
                            <div class="student-actions">
                                <button onclick="openStudentChat(${student.id})" class="btn btn-primary">
                                    <i class="fas fa-comments"></i> محادثة
                                </button>
                                <button onclick="showSuggestVideoModal(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-video"></i> اقتراح فيديو
                                </button>
                                <button onclick="viewStudentProgress(${student.id})" class="btn btn-secondary">
                                    <i class="fas fa-chart-line"></i> التقدم
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="suggested-videos-section">
                <h3>الفيديوهات المقترحة</h3>
                <div class="videos-grid">
                    ${loadSuggestedVideos(assignedStudents)}
                </div>
            </div>
        </div>
    `;
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
    
    const suggestion = {
        studentId: parseInt(formData.get('studentId')),
        title: formData.get('title'),
        url: formData.get('url'),
        description: formData.get('description'),
        skills: formData.get('skills').split(',').map(skill => skill.trim()),
        mentorId: currentUser.id,
        date: new Date().toISOString()
    };
    
    // في التطبيق الحقيقي، سيتم حفظ الاقتراح في قاعدة البيانات
    console.log('تم إرسال اقتراح الفيديو:', suggestion);
    alert('تم إرسال اقتراح الفيديو بنجاح!');
    closeSuggestVideoModal();
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

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('mentor-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('messageInput');
    const messagesArea = document.getElementById('messagesArea');
    
    if (input.value.trim()) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        messageDiv.textContent = input.value;
        messagesArea.appendChild(messageDiv);
        
        input.value = '';
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
}

// Course suggestion functionality
function suggestCourse() {
    const studentSelect = document.getElementById('studentSelect');
    // Add your course suggestion logic here
    alert('تم إرسال اقتراح الكورس بنجاح');
}

// Load mentor's students
function loadMentorStudents() {
    const studentSelect = document.getElementById('studentSelect');
    // Add your code to load students here
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadMentorStudents();
});

// Chat updates
function createChatInterface(user, messages = []) {
    return `
        <div class="chat-container">
            <div class="chat-header">
                <div class="avatar">
                    <i class="fas fa-${user.type === 'mentor' ? 'user-tie' : 'user-graduate'}"></i>
                </div>
                <div class="user-info">
                    <h3>${user.name}</h3>
                    <p>${user.specialization} - ${user.level}</p>
                </div>
                <div class="status">متصل الآن</div>
            </div>
            
            <div class="chat-messages" id="chat-messages-${user.id}">
                ${messages.map(msg => createChatMessage(msg)).join('')}
            </div>
            
            <div class="chat-input">
                <input type="text" 
                       id="message-input-${user.id}" 
                       placeholder="اكتب رسالتك هنا..."
                       onkeypress="handleMessageKeyPress(event, ${user.id})"
                />
                <button onclick="sendMessage(user.id)">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            
            ${createChatActions(user)}
        </div>
    `;
}

function createChatMessage(message) {
    return `
        <div class="message ${message.type}">
            <div class="content">${message.text}</div>
            <span class="time">${message.time}</span>
        </div>
    `;
}

function createChatActions(user) {
    const actions = user.type === 'mentor' ? 
        getMentorActions(user) : 
        getYouthActions(user);

    return `
        <div class="chat-actions">
            ${actions.map(action => `
                <button class="btn ${action.primary ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="${action.onClick}">
                    <i class="fas fa-${action.icon}"></i>
                    ${action.text}
                </button>
            `).join('')}
        </div>
    `;
}

function handleMessageKeyPress(event, userId) {
    if (event.key === 'Enter') {
        sendMessage(userId);
    }
}

function sendMessage(userId) {
    const input = document.getElementById(`message-input-${userId}`);
    const messagesContainer = document.getElementById(`chat-messages-${userId}`);
    
    if (!input || !messagesContainer || !input.value.trim()) return;

    const message = {
        type: userType,
        text: input.value,
        time: new Date().toLocaleTimeString('ar-EG')
    };

    messagesContainer.insertAdjacentHTML('beforeend', createChatMessage(message));
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    input.value = '';
}
