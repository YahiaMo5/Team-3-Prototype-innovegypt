// Global Variables
let currentUser = null;
let currentTab = 'youth';
let userType = null; // 'youth' or 'mentor'

// Default demo data for when not logged in
let defaultUser = {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@example.com",
    assignedMentor: "د. أحمد محمد",
    status: "qualified",
    age: 25,
    qualification: "بكالوريوس هندسة برمجيات",
    specialization: "برمجة",
    level: "متوسط",
    experience: "3 سنوات",
    points: 1250,
    rating: 4.8,
    completedCourses: 12,
    skills: ["JavaScript", "React", "HTML", "CSS", "Node.js", "Git"]
};

// Function to switch between qualified and unqualified demo user
function switchDemoUserStatus() {
    const isCurrentlyQualified = defaultUser.status === 'qualified';
    if (isCurrentlyQualified) {
        // Switch to unqualified user
        defaultUser = {
            id: 3,
            name: "محمد خالد",
            email: "mohamed@example.com",
            assignedMentor: "محمد علي",
            status: "unqualified",
            age: 20,
            qualification: "ثانوية عامة",
            specialization: "برمجة",
            level: "مبتدئ",
            experience: "لا توجد",
            points: 150,
            rating: 3.5,
            completedCourses: 2,
            skills: ["HTML", "CSS"],
            needsImprovement: ["JavaScript", "المشاريع العملية", "حل المشاكل"]
        };
    } else {
        // Switch to qualified user
        defaultUser = {
            id: 1,
            name: "أحمد محمد",
            email: "ahmed@example.com",
            assignedMentor: "د. أحمد محمد",
            status: "qualified",
            age: 25,
            qualification: "بكالوريوس هندسة برمجيات",
            specialization: "برمجة",
            level: "متوسط",
            experience: "3 سنوات",
            points: 1250,
            rating: 4.8,
            completedCourses: 12,
            skills: ["JavaScript", "React", "HTML", "CSS", "Node.js", "Git"]
        };
    }
}

// Function to switch demo user and refresh display
function switchDemoUser() {
    switchDemoUserStatus();
    
    // Clear current user if set from demo
    if (currentUser && !userType) {
        currentUser = null;
    }
    
    // Clear chat messages to load new ones
    STORAGE.setJSON('chat_youth', []);
    
    // Update display
    updateUserName();
    updateDashboardForDemoUser();
    
    // Refresh chat if on mentors page
    const currentPage = document.querySelector('.page.active');
    if (currentPage && currentPage.id === 'mentors-page') {
        setTimeout(() => {
            loadMentorsData();
            setTimeout(() => {
                loadPersistedChat('youth');
            }, 100);
        }, 100);
    }
    
    // Show notification
    const statusText = defaultUser.status === 'qualified' ? 'مؤهل' : 'غير مؤهل';
    alert(`تم التبديل إلى: ${defaultUser.name} (${statusText})`);
}

// Function to update dashboard for demo user
function updateDashboardForDemoUser() {
    const container = document.getElementById('assigned-mentor-card');
    if (container) {
        const assignedMentor = mockMentors.find(m => m.name === defaultUser.assignedMentor);
        if (assignedMentor) {
            container.innerHTML = `
                <div class="mentor-card assigned-mentor" onclick="showPage('mentors')">
                    <div class="mentor-header">
                        <div class="mentor-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="mentor-info">
                            <h3>${assignedMentor.name}</h3>
                            <p class="mentor-specialization">${assignedMentor.specialization}</p>
                            <p class="mentor-experience">${assignedMentor.experience}</p>
                        </div>
                        <div class="mentor-rating">
                            <i class="fas fa-star"></i>
                            <span>${assignedMentor.rating}</span>
                        </div>
                    </div>
                    <div class="mentor-description">
                        <p>${assignedMentor.description}</p>
                    </div>
                    <div class="mentor-tags">
                        ${assignedMentor.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="mentor-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); showPage('mentors')">
                            <i class="fas fa-comments"></i> بدء محادثة
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    // Update stats based on user status
    const statsCards = document.querySelectorAll('.stat-card h3');
    if (statsCards.length >= 4) {
        statsCards[0].textContent = defaultUser.points || 150; // Points
        statsCards[2].textContent = defaultUser.completedCourses || 2; // Completed courses
        statsCards[3].textContent = defaultUser.rating || 3.5; // Rating
    }
}

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
    STORAGE.setJSON(STORAGE_KEYS.youthOverrides, overrides);
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
    },
    {
        id: 2,
        name: "محمد علي",
        specialization: "برمجة",
        level: "متوسط",
        rating: 4.5,
        students: 25,
        experience: "5 سنوات",
        description: "مدرب برمجة للمبتدئين مع خبرة في تعليم الأساسيات",
        tags: ["HTML", "CSS", "JavaScript", "أساسيات البرمجة"],
        age: 30,
        qualification: "بكالوريوس علوم حاسوب",
        expertise: "تعليم أساسيات البرمجة، تطوير مهارات المبتدئين",
        type: "beginner-friendly",
        courses: [
            { id: 3, title: "أساسيات HTML و CSS", platform: "YouTube", url: "https://youtube.com/watch?v=example3", duration: "4 أسابيع", level: "مبتدئ", price: "مجاني" },
            { id: 4, title: "مقدمة في JavaScript", platform: "YouTube", url: "https://youtube.com/watch?v=example4", duration: "6 أسابيع", level: "مبتدئ", price: "مجاني" }
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
        name: "محمد خالد",
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
            "تعلم JavaScript",
            "بناء مشاريع عملية",
            "تطوير مهارات حل المشاكل",
            "تحسين مهارات التواصل"
        ],
        // معلومات إضافية للشباب غير المؤهلين
        motivationLevel: "عالي",
        learningStyle: "عملي",
        availableTime: "6 ساعات يومياً",
        challenges: ["قلة الخبرة العملية", "ضعف في اللغة الإنجليزية"],
        goals: "الحصول على وظيفة كمطور ويب خلال سنة",
        preferredLearning: "فيديوهات تعليمية ومشاريع عملية"
    },
    {
        id: 4,
        name: "فاطمة محمود",
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
            "تعلم برامج التصميم",
            "فهم أساسيات التصميم",
            "بناء معرض أعمال",
            "تطوير الحس الفني"
        ],
        // معلومات إضافية للشباب غير المؤهلين
        motivationLevel: "متوسط",
        learningStyle: "بصري",
        availableTime: "4 ساعات يومياً",
        challenges: ["عدم معرفة البرامج", "قلة الثقة بالنفس"],
        goals: "العمل كمصممة جرافيك",
        preferredLearning: "تطبيق عملي ومشاريع إبداعية"
    }
];

const mockCourses = [
    {
        id: 1,
        title: "مقدمة في تطوير الويب",
        description: "تعلم أساسيات تطوير المواقع من الصفر",
        instructor: "د. أحمد محمد",
        specialization: "برمجة",
        level: "مبتدئ",
        duration: "8 أسابيع",
        rating: 4.7,
        students: 1250,
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example1"
    },
    {
        id: 2,
        title: "React.js المتقدم",
        description: "تطوير تطبيقات ويب متقدمة باستخدام React",
        instructor: "د. أحمد محمد",
        specialization: "برمجة",
        level: "متقدم",
        duration: "12 أسبوع",
        rating: 4.9,
        students: 890,
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example2"
    },
    {
        id: 3,
        title: "تصميم واجهات المستخدم",
        description: "أساسيات UI/UX وتصميم التطبيقات",
        instructor: "سارة أحمد",
        specialization: "تصميم",
        level: "متوسط",
        duration: "6 أسابيع",
        rating: 4.6,
        students: 670,
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example3"
    },
    {
        id: 4,
        title: "التسويق الرقمي للمبتدئين",
        description: "أساسيات التسويق عبر الإنترنت",
        instructor: "محمد علي",
        specialization: "تسويق",
        level: "مبتدئ",
        duration: "4 أسابيع",
        rating: 4.4,
        students: 450,
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example4"
    },
    {
        id: 5,
        title: "إدارة الأعمال الحديثة",
        description: "مهارات إدارة الأعمال في العصر الرقمي",
        instructor: "فاطمة حسن",
        specialization: "أعمال",
        level: "متوسط",
        duration: "10 أسابيع",
        rating: 4.5,
        students: 320,
        price: "مجاني",
        platform: "YouTube",
        url: "https://youtube.com/watch?v=example5"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadPersistedState();
    setupEventListeners();
    hideAllPagesExceptLogin();
    
    // Add demo welcome message for chat if not exists
    setTimeout(() => {
        const key = 'chat_youth';
        const existingMessages = (() => { try { return STORAGE.getJSON(key) || []; } catch { return []; } })();
        if (existingMessages.length === 0) {
            // Create different demo messages based on user status
            let demoMessages;
            
            if (defaultUser.status === 'qualified') {
                demoMessages = [
                    {
                        from: 'mentor',
                        text: 'مرحباً أحمد! أنا د. أحمد محمد، مينتورك الشخصي. كيف يمكنني مساعدتك اليوم؟',
                        time: '2:30 م',
                        id: Date.now() - 30000
                    },
                    {
                        from: 'youth',
                        text: 'مرحباً دكتور! سعيد بالتعرف عليك. أريد تحسين مهاراتي في البرمجة.',
                        time: '2:32 م',
                        id: Date.now() - 25000
                    },
                    {
                        from: 'mentor',
                        text: 'ممتاز! أنصحك بالبدء بـ JavaScript وتطوير مشاريع عملية. هل لديك خبرة سابقة؟',
                        time: '2:35 م',
                        id: Date.now() - 20000
                    },
                    {
                        from: 'youth',
                        text: 'نعم، لدي خبرة بسيطة لكن أريد تطوير مهاراتي أكثر.',
                        time: '2:37 م',
                        id: Date.now() - 15000
                    },
                    {
                        from: 'mentor',
                        text: 'رائع! سأرسل لك خطة دراسية مناسبة وبعض المشاريع العملية.',
                        time: '2:40 م',
                        id: Date.now() - 10000
                    }
                ];
            } else {
                // Messages for unqualified user
                demoMessages = [
                    {
                        from: 'mentor',
                        text: 'مرحباً محمد! أنا محمد علي، مينتورك الشخصي. سأساعدك لتطوير مهاراتك من البداية.',
                        time: '2:30 م',
                        id: Date.now() - 30000
                    },
                    {
                        from: 'youth',
                        text: 'مرحباً أستاذ محمد! أنا جديد في البرمجة وأريد تعلم الأساسيات.',
                        time: '2:32 م',
                        id: Date.now() - 25000
                    },
                    {
                        from: 'mentor',
                        text: 'ممتاز! سنبدأ بـ HTML و CSS أولاً. هل لديك أي خبرة سابقة؟',
                        time: '2:35 م',
                        id: Date.now() - 20000
                    },
                    {
                        from: 'youth',
                        text: 'تعلمت بعض HTML بس لسه محتاج أتعلم كتير.',
                        time: '2:37 م',
                        id: Date.now() - 15000
                    },
                    {
                        from: 'mentor',
                        text: 'مش مشكلة! هنبدأ من الأساسيات وهطلعك محترف إن شاء الله.',
                        time: '2:40 م',
                        id: Date.now() - 10000
                    }
                ];
            }
            
            STORAGE.setJSON(key, demoMessages);
        }
        
        // Update user name for demo mode
        updateUserName();
    }, 100);
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
        page.classList.remove('active');
        page.style.display = 'none';
    });

    const loginPage = document.getElementById('login-page');
    if (loginPage) {
        loginPage.classList.add('active');
        loginPage.style.display = 'block';
    }
}

// Navigation
function showPage(pageName) {
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
        
        // Update user name in any case
        updateUserName();
        
        // Load demo chat messages for mentors page
        if (pageName === 'mentors') {
            setTimeout(() => {
                // Ensure chat is rendered first
                loadMentorsData();
                
                // Then load persisted messages
                setTimeout(() => {
                    const messagesContainer = document.getElementById('chat-messages-youth');
                    if (messagesContainer) {
                        loadPersistedChat('youth');
                    }
                }, 100);
            }, 100);
        }
    }
}

function loadPageData(pageName) {
    // Set default values for demo mode
    if (!currentUser) {
        currentUser = defaultUser;
        userType = 'youth';
    }
    
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

    // اختيار بالتناوب بين مؤهل/غير مؤهل
    let preferQualifiedNext = true;
    try {
        const raw = STORAGE.get('alt_login_qualified_next');
        if (raw !== null) preferQualifiedNext = raw === 'true';
    } catch {}

    const pool = mockYouth.filter(y => y.status === (preferQualifiedNext ? 'qualified' : 'unqualified'));
    const fallback = mockYouth;
    const source = pool.length ? pool : fallback;
    const picked = source[Math.floor(Math.random() * source.length)];

    currentUser = { ...picked, email: 'youth@example.com' };

    STORAGE.set('alt_login_qualified_next', (!preferQualifiedNext).toString());

    showPage('dashboard');
    updateNavigationForYouth();
    updateUserName();
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
        <a href="#" class="nav-link" onclick="showPage('courses')">الكورسات</a>
        <a href="#" class="nav-link" onclick="showPage('profile')">الملف الشخصي</a>
        <a href="#" class="nav-link" onclick="showPage('points')">الإحصائيات</a>
        <a href="#" class="nav-link" onclick="logout()">تسجيل خروج</a>
    `;
}

function updateUserName() {
    const user = currentUser || defaultUser;
    
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = user.name;
    }
    
    // Update profile page name and email
    const profileName = document.getElementById('profile-name');
    if (profileName) {
        profileName.textContent = user.name;
    }
    
    const profileEmail = document.getElementById('profile-email');
    if (profileEmail) {
        profileEmail.textContent = user.email || 'user@example.com';
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
                    <h3>1</h3>
                    <p>مينتور متابع</p>
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

            <div class="assigned-mentor-section">
                <h2>المينتور المُعيَّن لك</h2>
                <div id="assigned-mentor-card">
                    <!-- Assigned mentor will be loaded here -->
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
                    <div class="student-card" style="cursor:pointer;" onclick="showPage('mentors'); setTimeout(() => openMentorChat(${s.id}), 100);">
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

// Data loading functions wrapped in an IIFE for cleaner global scope
(function() {
    // Youth pages
    window.loadAssignedMentor = function loadAssignedMentor() {
        const container = document.getElementById('assigned-mentor-card');
        if (!container) return;
        
        // Find the assigned mentor for the current user (use default user if not logged in)
        const user = currentUser || defaultUser;
        const assignedMentor = mockMentors.find(m => m.name === user.assignedMentor);
        
        if (assignedMentor) {
            container.innerHTML = `
                <div class="mentor-card assigned-mentor" onclick="showPage('mentors')">
                    <div class="mentor-header">
                        <div class="mentor-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <div class="mentor-info">
                            <h3>${assignedMentor.name}</h3>
                            <p class="mentor-specialization">${assignedMentor.specialization}</p>
                            <p class="mentor-experience">${assignedMentor.experience}</p>
                        </div>
                        <div class="mentor-rating">
                            <i class="fas fa-star"></i>
                            <span>${assignedMentor.rating}</span>
                        </div>
                    </div>
                    <div class="mentor-description">
                        <p>${assignedMentor.description}</p>
                    </div>
                    <div class="mentor-tags">
                        ${assignedMentor.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="mentor-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); showPage('mentors')">
                            <i class="fas fa-comments"></i> بدء محادثة
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="no-mentor-card">
                    <i class="fas fa-user-plus"></i>
                    <h3>لم يتم تعيين مينتور بعد</h3>
                    <p>سيتم تعيين مينتور مناسب لك قريباً</p>
                </div>
            `;
        }
    };

    window.loadRecommendedCourses = function loadRecommendedCourses() {
        const container = document.getElementById('recommended-courses');
        if (!container) return;
        const courses = mockCourses
            .filter(c => !currentUser || !currentUser.specialization || c.specialization === currentUser.specialization)
            .slice(0, 6);
        container.innerHTML = courses.map(renderCourseCard).join('');
    };

    // Mentor pages
    window.loadMentorsData = function loadMentorsData() {
        const container = document.getElementById('all-mentors');
        if (!container) return;
        const spec = document.getElementById('specialization-filter')?.value || '';
        const lvl = document.getElementById('level-filter')?.value || '';
        const list = mockMentors.filter(m => (!spec || m.specialization === spec) && (!lvl || m.level === lvl));
        container.innerHTML = list.map(renderMentorCard).join('');
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
        const skillsContainer = document.getElementById('user-skills');
        if (skillsContainer && currentUser && currentUser.skills) {
            skillsContainer.innerHTML = currentUser.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('');
        }
    };

    // Points page (youth view)
    window.loadPointsData = function loadPointsData() {
        const historyContainer = document.getElementById('points-history');
        if (!historyContainer) return;
        
        const pointsHistory = [
            { action: "إكمال كورس React.js", points: 100, date: "2024-01-15" },
            { action: "تقييم مينتور", points: 50, date: "2024-01-14" },
            { action: "متابعة يومية", points: 10, date: "2024-01-13" },
            { action: "مساعدة زميل", points: 25, date: "2024-01-12" },
            { action: "إكمال كورس HTML/CSS", points: 100, date: "2024-01-10" }
        ];

        historyContainer.innerHTML = pointsHistory.map(entry => `
            <div class="points-entry">
                <div class="points-info">
                    <h4>${entry.action}</h4>
                    <span class="points-date">${entry.date}</span>
                </div>
                <div class="points-value">+${entry.points}</div>
            </div>
        `).join('');
    };

    window.loadYouthStatus = function loadYouthStatus() {
        if (!currentUser) return;
        const existingSection = document.getElementById('youth-status-section');
        if (existingSection) existingSection.remove();
        
        const container = document.querySelector('#dashboard-page .container');
        if (!container) return;
        
        const statusSection = document.createElement('div');
        statusSection.id = 'youth-status-section';
        statusSection.className = 'status-section-card';
        
        if (currentUser.status === 'qualified') {
            statusSection.innerHTML = `
                <h3 class="section-title">🎉 مبروك! أنت مؤهل للتوظيف</h3>
                <div class="qualified-info">
                    <p>تم تقييمك كمؤهل للعمل في مجال ${currentUser.specialization}.</p>
                    <div class="job-opportunities">
                        <h4>فرص العمل المتاحة:</h4>
                        <ul>
                            ${(currentUser.jobOpportunities || []).map(job => `<li>${job}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="chooseCompany()">اختر شركة للتقديم</button>
                        <button class="btn btn-secondary" onclick="viewCertificate()">عرض الشهادة</button>
                    </div>
                </div>
            `;
        } else {
            statusSection.innerHTML = `
                <h3 class="section-title">📚 خطة التطوير الشخصية</h3>
                <div class="development-plan">
                    <p>أنت في مرحلة التطوير. إليك المهارات التي تحتاج لتعلمها:</p>
                    <div class="skills-needed">
                        <h4>المهارات المطلوبة:</h4>
                        <ul>
                            ${(currentUser.needsImprovement || []).map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="progress-metrics">
                        <div class="metric">
                            <span class="label">التقدم العام:</span>
                            <div class="progress-bar">
                                <div class="progress" style="width: ${Math.min(currentUser.points / 1000 * 100, 100)}%"></div>
                            </div>
                            <span class="percentage">${Math.min(Math.round(currentUser.points / 1000 * 100), 100)}%</span>
                        </div>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="viewLearningPlan()">عرض خطة التعلم</button>
                        <button class="btn btn-secondary" onclick="findMentor()">طلب مساعدة المينتور</button>
                    </div>
                </div>
            `;
        }
        
        container.appendChild(statusSection);
    };

    window.loadMentorCourses = function loadMentorCourses() {
        const container = document.getElementById('all-courses');
        if (!container) return;
        
        container.innerHTML = `
            <div class="mentor-courses-section">
                <h3>الكورسات التي تقدمها</h3>
                <div class="courses-grid">
                    ${mockCourses.slice(0, 2).map(course => `
                        <div class="course-card mentor-course">
                            <div class="course-header">
                                <h4>${course.title}</h4>
                                <span class="course-level">${course.level}</span>
                            </div>
                            <p>${course.description}</p>
                            <div class="course-stats">
                                <span><i class="fas fa-users"></i> ${course.students} طالب</span>
                                <span><i class="fas fa-star"></i> ${course.rating}</span>
                            </div>
                            <div class="course-actions">
                                <button class="btn btn-primary" onclick="editCourse(${course.id})">تعديل</button>
                                <button class="btn btn-secondary" onclick="viewStudents(${course.id})">عرض الطلاب</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="btn btn-success" onclick="addNewCourse()">إضافة كورس جديد</button>
            </div>
        `;
    };

    window.loadMentorStats = function loadMentorStats() {
        const container = document.querySelector('#points-page .container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="mentor-stats">
                <div class="stats-header">
                    <h1>إحصائيات الأداء</h1>
                </div>
                
                <div class="stats-cards">
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>45</h3>
                        <p>إجمالي الطلاب</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-star"></i>
                        <h3>4.8</h3>
                        <p>تقييم المينتور</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-graduation-cap"></i>
                        <h3>32</h3>
                        <p>طلاب مؤهلين</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-dollar-sign"></i>
                        <h3>15,000</h3>
                        <p>الأرباح الشهرية</p>
                    </div>
                </div>
                
                <div class="performance-chart">
                    <h3>أداء الطلاب هذا الشهر</h3>
                    <div class="chart-placeholder">
                        <p>رسم بياني لتقدم الطلاب سيتم إضافته لاحقاً</p>
                    </div>
                </div>
            </div>
        `;
    };
})();

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

// Override mentors page loader
function loadMentorsData() {
    // Default to youth view if userType is not set (demo mode)
    const currentUserType = userType || 'youth';
    
    if (currentUserType === 'youth') {
        renderYouthMentorChat();
    } else {
        renderMentorStudentsCards();
    }
}

function renderMentorStudentsCards() {
    const container = document.getElementById('mentors-chat-container');
    if (!container) return;
    const students = mockYouth.filter(y => y.assignedMentor === currentUser.name);
    container.innerHTML = `
        <div class="page-header"><h1>الطلاب الذين تتابعهم</h1></div>
        <div class="students-grid">
            ${students.map(s => `
                <div class="student-card" style="cursor:pointer;" onclick="openMentorChat(${s.id})">
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
        </div>`;
}

// Mentors page chat rendering
function renderYouthMentorChat() {
    const container = document.getElementById('mentors-chat-container');
    if (!container) return;
    
    // Find the mentor assigned to current user (use default user if not logged in)
    const user = currentUser || defaultUser;
    const assignedMentor = mockMentors.find(m => m.name === user.assignedMentor) || mockMentors[0];
    
    container.innerHTML = `
        <div class="page-header"><h1>المينتور</h1></div>
        <div class="chat-container">
            <div class="chat-header">
                <div class="avatar"><i class="fas fa-user-tie"></i></div>
                <div class="user-info">
                    <h3>${assignedMentor.name}</h3>
                    <p>${assignedMentor.specialization} - ${assignedMentor.experience}</p>
                </div>
                <div class="status">متصل الآن</div>
            </div>
            <div class="chat-messages" id="chat-messages-youth"></div>
            <div class="chat-input">
                <input type="text" id="message-input-youth" placeholder="اكتب رسالتك هنا..." onkeypress="if(event.key==='Enter'){sendChatMessage('youth')}">
                <button onclick="sendChatMessage('youth')"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>`;
    loadPersistedChat('youth');
    
    // Add welcome message if chat is empty
    setTimeout(() => {
        const messages = document.getElementById('chat-messages-youth');
        if (messages && messages.children.length === 0) {
            const welcomeMessage = {
                from: 'mentor',
                text: `مرحباً ${user.name}! أنا ${assignedMentor.name}، مينتورك الشخصي. كيف يمكنني مساعدتك اليوم؟`,
                time: new Date().toLocaleTimeString('ar-EG'),
                id: Date.now()
            };
            displayMessage(messages, welcomeMessage);
            persistChatMessage('youth', welcomeMessage);
        }
    }, 500);
}

function openMentorChat(studentId) {
    const container = document.getElementById('mentors-chat-container');
    if (!container) return;
    const s = mockYouth.find(x => x.id === studentId);
    if (!s) return;
    container.innerHTML = `
        <div class="page-header">
            <h1>محادثة: ${s.name}</h1>
            <button class="btn btn-secondary" onclick="loadMentorsData()" style="margin-top: 10px;">رجوع إلى قائمة الطلاب</button>
        </div>
        <div class="chat-container">
            <div class="chat-header">
                <div class="avatar"><i class="fas fa-user-graduate"></i></div>
                <div class="user-info">
                    <h3>${s.name}</h3>
                    <p>${s.specialization} - ${s.level}</p>
                </div>
                <div class="status">متصل الآن</div>
            </div>
            <div class="chat-messages" id="chat-messages-${s.id}"></div>
            <div class="chat-input">
                <input type="text" id="message-input-${s.id}" placeholder="اكتب رسالتك هنا..." onkeypress="if(event.key==='Enter'){sendChatMessage(${s.id})}">
                <button onclick="sendChatMessage(${s.id})"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>`;
    loadPersistedChat(s.id);
    
    // Add welcome message if chat is empty
    setTimeout(() => {
        const messages = document.getElementById(`chat-messages-${s.id}`);
        if (messages && messages.children.length === 0) {
            const welcomeMessage = {
                from: 'youth',
                text: `مرحباً د. ${currentUser.name}! أنا ${s.name}. سعيد بالتواصل معك!`,
                time: new Date().toLocaleTimeString('ar-EG'),
                id: Date.now()
            };
            displayMessage(messages, welcomeMessage);
            persistChatMessage(s.id, welcomeMessage);
        }
    }, 500);
}

function sendChatMessage(target) {
    const isYouthMode = target === 'youth';
    const inputId = isYouthMode ? 'message-input-youth' : `message-input-${target}`;
    const msgId = isYouthMode ? 'chat-messages-youth' : `chat-messages-${target}`;
    const input = document.getElementById(inputId);
    const messages = document.getElementById(msgId);
    if (!input || !messages || !input.value.trim()) return;
    
    const messageText = input.value.trim();
    const message = { 
        from: userType || 'youth', // Default to youth if not logged in
        text: messageText, 
        time: new Date().toLocaleTimeString('ar-EG'),
        id: Date.now()
    };
    
    // Add user message
    displayMessage(messages, message);
    persistChatMessage(target, message);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    // Auto-reply for demonstration (simulate response from other user)
    setTimeout(() => {
        generateAutoReply(target, messageText, messages);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

function displayMessage(messagesContainer, message) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.from}`;
    messageElement.innerHTML = `
        <div class="content">${message.text}</div>
        <span class="time">${message.time}</span>
    `;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAutoReply(target, userMessage, messagesContainer) {
    const isYouthMode = target === 'youth';
    const replyFrom = isYouthMode ? 'mentor' : 'youth';
    
    // Simple auto-reply based on user message content
    let replyText = getAutoReplyText(userMessage, isYouthMode);
    
    const replyMessage = {
        from: replyFrom,
        text: replyText,
        time: new Date().toLocaleTimeString('ar-EG'),
        id: Date.now()
    };
    
    displayMessage(messagesContainer, replyMessage);
    persistChatMessage(target, replyMessage);
}

function getAutoReplyText(userMessage, isYouthMode) {
    const message = userMessage.toLowerCase();
    
    if (isYouthMode) {
        // Auto-replies from mentor to youth
        if (message.includes('مساعدة') || message.includes('سؤال')) {
            return 'بالطبع! أنا هنا لمساعدتك. ما هو السؤال المحدد؟';
        } else if (message.includes('كورس') || message.includes('تعلم')) {
            return 'ممتاز! أنصحك بالبدء بالأساسيات أولاً. هل تريد توصيات لكورسات معينة؟';
        } else if (message.includes('مشروع') || message.includes('عمل')) {
            return 'رائع! المشاريع العملية مهمة جداً. تأكد من تطبيق ما تتعلمه عملياً.';
        } else if (message.includes('شكر') || message.includes('ممتن')) {
            return 'العفو! هذا واجبي. استمر في التعلم وسأكون هنا لدعمك.';
        } else {
            const replies = [
                'فهمت وجهة نظرك. هل يمكنك توضيح أكثر؟',
                'هذا سؤال جيد! دعني أفكر في أفضل طريقة للمساعدة.',
                'أقدر تفاعلك. ما رأيك في أن نبدأ بخطة عملية؟',
                'ممتاز! أنا معك في هذه الرحلة التعليمية.'
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    } else {
        // Auto-replies from youth to mentor
        if (message.includes('كورس') || message.includes('تعلم')) {
            return 'شكراً لك! سأبدأ بالكورس المقترح وأخبرك بالتقدم.';
        } else if (message.includes('مشروع')) {
            return 'فكرة رائعة! سأعمل على هذا المشروع وأرسل لك النتائج.';
        } else if (message.includes('ممتاز') || message.includes('رائع')) {
            return 'شكراً لتشجيعك! هذا يحفزني أكثر للاستمرار.';
        } else {
            const replies = [
                'شكراً لك على المساعدة والتوجيه!',
                'أقدر وقتك ونصائحك القيمة.',
                'سأطبق ما تعلمته وأخبرك بالنتائج.',
                'ممتن لوجودك كمينتور لي!'
            ];
            return replies[Math.floor(Math.random() * replies.length)];
        }
    }
}

function persistChatMessage(target, message) {
    const key = `chat_${target}`;
    const list = (() => { try { return STORAGE.getJSON(key) || []; } catch { return []; } })();
    list.push(message);
    STORAGE.setJSON(key, list);
}

function loadPersistedChat(target) {
    const key = `chat_${target}`;
    const list = (() => { try { return STORAGE.getJSON(key) || []; } catch { return []; } })();
    const msgId = target === 'youth' ? 'chat-messages-youth' : `chat-messages-${target}`;
    const messages = document.getElementById(msgId);
    if (!messages) return;
    
    // Clear existing messages first
    messages.innerHTML = '';
    
    // Load all persisted messages
    list.forEach(message => {
        displayMessage(messages, message);
    });
    
    messages.scrollTop = messages.scrollHeight;
}

// Render functions
function renderMentorCard(mentor) {
    return `
        <div class="mentor-card" onclick="openMentorModal(${mentor.id})">
            <div class="mentor-avatar">
                <i class="fas fa-user-tie"></i>
            </div>
            <div class="mentor-info">
                <h3>${mentor.name}</h3>
                <p class="mentor-title">${mentor.specialization}</p>
                <p class="mentor-experience">${mentor.experience}</p>
            </div>
            <div class="mentor-rating">
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
