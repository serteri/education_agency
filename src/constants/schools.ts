export interface School {
    id: string;
    slug?: string;
    name: string;
    image?: string;
    location: string;
    distanceFromOffice?: string | { en: string; tr: string };
    ranking?: string | { en: string; tr: string };
    description?: string | { en: string; tr: string };
    entryRequirements?: string | { en: string; tr: string };
    topPrograms?: string[];
    officialWebsite?: string;
    featuredCourses?: string[];
    expertInsight?: string | { en: string; tr: string };
    price?: number;
    assessmentLevel?: number | string;
    isLocalChoice?: boolean;
    categories?: string[];
    localInsight?: { en: string; tr: string };
}

export const LANGUAGE_SCHOOLS: School[] = [
    {
        id: "ls-1",
        slug: "navitas-english",
        name: "Navitas English",
        location: "Brisbane City, QLD",
        featuredCourses: ["General English", "IELTS Preparation", "Cambridge Preparation"],
        price: 360,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["General English", "Exam Prep", "Evening Classes"],
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000",
        localInsight: {
            en: "An excellent choice for strict academic pathways and direct university entry. Very professional environment.",
            tr: "Sıkı akademik geçiş programları ve doğrudan üniversite girişi için mükemmel bir seçim. Çok profesyonel bir ortam."
        }
    },
    {
        id: "ls-2",
        slug: "browns-english-language-school",
        name: "Browns English Language School",
        location: "Brisbane & Gold Coast, QLD",
        featuredCourses: ["Intensive General English", "English for Academic Purposes", "Barista English"],
        price: 400,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["General English", "Academic", "Barista/Hospitality"],
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2000",
        localInsight: {
            en: "Very popular among Turkish students. Their Barista course is fantastic for finding quick part-time jobs.",
            tr: "Türk öğrenciler arasında çok popüler. Barista kursları hızlıca yarı zamanlı iş bulmak için harika."
        }
    },
    {
        id: "ls-3",
        slug: "ilsc-language-schools",
        name: "ILSC Language Schools",
        location: "Brisbane City, QLD",
        featuredCourses: ["General English", "Business English", "IELTS Mastery"],
        price: 330,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["General English", "Exam Prep", "Evening Classes", "Business"],
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=2000",
        localInsight: {
            en: "Great central location with flexible timetables. The English Only policy is strictly enforced here, enhancing fast learning.",
            tr: "Merkezi konum ve esnek ders saatleri. 'Sadece İngilizce' kuralı sıkı uygulandığı için hızlı öğrenme sağlar."
        }
    },
    {
        id: "ls-4",
        slug: "lexis-english",
        name: "Lexis English",
        location: "Brisbane City, QLD",
        featuredCourses: ["General English", "Cambridge English", "OET Preparation"],
        price: 340,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["General English", "Exam Prep"],
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: "ls-5",
        slug: "shafston-international-college",
        name: "Shafston International College",
        location: "Kangaroo Point, QLD",
        featuredCourses: ["General English", "Cambridge Exam Preparation", "Summer Camp"],
        price: 310,
        assessmentLevel: 2,
        isLocalChoice: true,
        categories: ["General English", "Exam Prep"],
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: "ls-6",
        slug: "kangaroo-inn-language-centre",
        name: "Kangaroo Inn Language Centre",
        location: "Perth, WA",
        featuredCourses: ["General English", "IELTS Preparation", "Conversational English"],
        price: 290,
        assessmentLevel: 2,
        isLocalChoice: false,
        categories: ["General English", "Exam Prep"]
    },
    {
        id: "ls-7",
        slug: "impact-english-college",
        name: "Impact English College",
        location: "Melbourne, VIC & Brisbane, QLD",
        featuredCourses: ["General English", "Extreme English", "Barista/Café English"],
        price: 340,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["General English", "Barista/Hospitality"]
    },
    {
        id: "ls-8",
        slug: "discover-english",
        name: "Discover English",
        location: "Melbourne, VIC",
        featuredCourses: ["General English", "English for Academic Purposes", "Cambridge Preparation"],
        price: 320,
        assessmentLevel: 1,
        isLocalChoice: false,
        categories: ["General English", "Exam Prep", "Academic"]
    },
    {
        id: "ls-9",
        slug: "greenwich-english-college",
        name: "Greenwich English College",
        location: "Sydney, NSW & Melbourne, VIC",
        featuredCourses: ["General English", "Pronunciation in Context", "IELTS Preparation"],
        price: 280,
        assessmentLevel: 2,
        isLocalChoice: false,
        categories: ["General English", "Exam Prep", "Evening Classes"]
    },
    {
        id: "ls-10",
        slug: "langports-english-language-college",
        name: "Langports English Language College",
        location: "Brisbane & Gold Coast, QLD",
        featuredCourses: ["UFO English", "Cambridge Flexi", "IELTS Extension"],
        price: 390,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["General English", "Exam Prep"],
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=2000"
    }
];

export const TAFE_COLLEGES: School[] = [
    {
        id: "tc-1",
        slug: "tafe-queensland",
        name: "TAFE Queensland",
        location: "Brisbane & Regional QLD",
        featuredCourses: ["Commercial Cookery", "Nursing", "Information Technology"],
        price: 450,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["Trade Courses", "Health & Community Services", "IT & Business"],
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000",
        localInsight: {
            en: "The state Government's flagship technical college. Huge campuses, excellent facilities, and very high employer recognition.",
            tr: "Eyalet devletinin amiral gemisi teknik okulu. Devasa kampüsler, mükemmel tesisler ve işverenler nezdinde çok yüksek tanınırlık."
        }
    },
    {
        id: "tc-2",
        slug: "tafe-nsw",
        name: "TAFE NSW",
        location: "Sydney & Regional NSW",
        featuredCourses: ["Business Management", "Early Childhood Education", "Hospitality"],
        price: 480,
        assessmentLevel: 1,
        isLocalChoice: false,
        categories: ["Health & Community Services", "IT & Business"]
    },
    {
        id: "tc-3",
        slug: "aviation-australia",
        name: "Aviation Australia",
        location: "Brisbane Airport, QLD",
        featuredCourses: ["Aircraft Maintenance", "Flight Attendant Training", "Aviation Management"],
        price: 600,
        assessmentLevel: 1,
        isLocalChoice: true,
        categories: ["Trade Courses"]
    },
    {
        id: "tc-4",
        slug: "charlton-brown",
        name: "Charlton Brown",
        location: "Brisbane City, QLD",
        featuredCourses: ["Early Childhood Education", "Community Services", "Aged Care"],
        price: 380,
        assessmentLevel: 2,
        isLocalChoice: true,
        categories: ["Health & Community Services"]
    },
    {
        id: "tc-5",
        slug: "spencer-college",
        name: "Spencer College",
        location: "Brisbane City, QLD",
        featuredCourses: ["Business Management", "Hospitality Management", "Leadership"],
        price: 330,
        assessmentLevel: 2,
        isLocalChoice: true,
        categories: ["IT & Business", "Trade Courses"]
    },
    {
        id: "tc-6",
        slug: "imagine-education",
        name: "Imagine Education",
        location: "Brisbane & Gold Coast, QLD",
        featuredCourses: ["Automotive Technology", "Commercial Cookery", "Child Care"],
        price: 350,
        assessmentLevel: 2,
        isLocalChoice: true,
        categories: ["Trade Courses", "Health & Community Services", "IT & Business"]
    },
    {
        id: "tc-7",
        slug: "holmesglen-institute",
        name: "Holmesglen Institute",
        location: "Melbourne, VIC",
        featuredCourses: ["Information Technology", "Building and Construction", "Health Sciences"],
        price: 420,
        assessmentLevel: 1,
        isLocalChoice: false,
        categories: ["IT & Business", "Trade Courses", "Health & Community Services"]
    }
];

export const UNIVERSITIES: School[] = [
    // Group of Eight (Go8)
    {
        id: "u-1",
        slug: "the-university-of-melbourne",
        name: "The University of Melbourne",
        image: "https://images.unsplash.com/photo-1544006658-89bde68e7073?auto=format&fit=crop&q=80&w=2000",
        location: "Melbourne, VIC",
        ranking: {
            en: "Top 14 Globally (QS Ranking 2024)",
            tr: "Dünya Sıralamasında İlk 14 (QS Ranking 2024)"
        },
        distanceFromOffice: {
            en: "Approx. 2hr 15min flight (Brisbane - Melbourne)",
            tr: "Uçakla yaklaşık 2 saat 15 dakika (Brisbane - Melbourne)"
        },
        entryRequirements: {
            en: "Requires very high academic achievement and IELTS 6.5+ (7.0 for some programs).",
            tr: "Çok yüksek akademik başarı ve IELTS 6.5+ (Bölüme göre 7.0) gerektirir."
        },
        description: {
            en: "The University of Melbourne is Australia's oldest and most prestigious university. As a 'Group of Eight' member, it ranks among the top universities globally with its research-focused education model. Its graduates are highly respected in the global business world.",
            tr: "The University of Melbourne, Avustralya'nın en köklü ve prestijli üniversitesidir. 'Group of Eight' üyesi olan üniversite, araştırma odaklı eğitim modeliyle dünyanın en iyi üniversiteleri arasında en üst sıralarda yer alır. Mezunları global iş dünyasında büyük saygı görür."
        },
        topPrograms: ["Bachelor of Biomedicine", "Bachelor of Commerce", "Juris Doctor (Law)", "Master of Engineering"],
        officialWebsite: "https://www.unimelb.edu.au",
        expertInsight: {
            en: "Measurements for academic excellence point here as the undisputed number one. Its campus, city culture, and educational quality provide students with a unique vision. Entry requirements are tough, but doors open wide after graduation.",
            tr: "Akademik mükemmeliyet arayanlar için tartışmasız bir numara. Kampüsü, şehir kültürü ve eğitim kalitesiyle öğrencilere eşsiz bir vizyon katar. Kabul şartları zorludur ancak mezuniyet sonrası kapılar sonuna kadar açılır."
        },
        localInsight: {
            en: "The prestige associated with a Melbourne Uni degree is unmatched across the Asia-Pacific region.",
            tr: "Melbourne Üniversitesi diplomasının Asya-Pasifik bölgesindeki prestiji ve iş bulma gücü kıyaslanamaz."
        },
        featuredCourses: ["Arts", "Biomedicine", "Commerce", "Law"]
    },
    { id: "u-2", slug: "the-australian-national-university", name: "The Australian National University (ANU)", location: "Canberra, ACT", featuredCourses: ["Politics", "Law", "Science", "International Relations"] },
    { id: "u-3", slug: "the-university-of-sydney", name: "The University of Sydney", location: "Sydney, NSW", featuredCourses: ["Medicine", "Law", "Business", "Engineering"] },
    {
        id: "u-4",
        slug: "the-university-of-queensland",
        name: "The University of Queensland (UQ)",
        image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=2000",
        location: "Brisbane, QLD",
        distanceFromOffice: {
            en: "15 min drive, 25 min via direct bus",
            tr: "Arabayla 15 dakika, direkt otobüs ile 25 dakika"
        },
        ranking: {
            en: "Top 50 Globally (QS Ranking)",
            tr: "Dünya Sıralamasında İlk 50 (QS Ranking)"
        },
        description: {
            en: "The University of Queensland (UQ) is one of Australia's leading research and teaching institutions. Its campus is famous for its iconic sandstone buildings and lakes. A global leader in research and innovation, UQ offers students not only theoretical knowledge but practical experience and a global vision.",
            tr: "The University of Queensland (UQ) is one of Australia's leading research and teaching institutions. Kampüsü ikonik kumtaşı binaları ve gölleriyle ünlüdür. Araştırma ve inovasyonda dünya çapında öncü olan UQ, öğrencilerine sadece teorik bilgi değil, pratik deneyim ve global bir vizyon sunar."
        },
        entryRequirements: {
            en: "IELTS Academic: Overall 6.5 (no band below 6.0). PTE Academic is also accepted.",
            tr: "IELTS Academic: Genel 6.5 (hiçbir bant 6.0 altında olmamalı). Alternatif olarak PTE Academic geçerlidir."
        },
        topPrograms: ["Bachelor of Engineering (Honours)", "Bachelor of Advanced Science (Honours)", "Master of Business Administration", "Doctor of Medicine (MD)"],
        officialWebsite: "https://www.uq.edu.au",
        featuredCourses: ["Engineering", "Health Sciences", "Environmental Science"],
        expertInsight: {
            en: "UQ is the undisputed leader in Australia, especially for Engineering and Health Sciences. You are mesmerized the moment you step onto campus. Scholarship opportunities are quite attractive for international students with high GPAs.",
            tr: "UQ, özellikle Mühendislik ve Sağlık Bilimleri alanında Avustralya'nın tartışılamaz liderlerinden. Kampüse ilk adım attığınız an büyüleniyorsunuz. Burs imkanları yüksek not ortalamasına sahip uluslararası öğrenciler için oldukça caziptir."
        }
    },
    { id: "u-5", slug: "the-university-of-western-australia", name: "The University of Western Australia (UWA)", location: "Perth, WA", featuredCourses: ["Marine Biology", "Mining Engineering", "Medicine"] },
    { id: "u-6", slug: "monash-university", name: "Monash University", location: "Melbourne, VIC", featuredCourses: ["Pharmacy", "Education", "Engineering", "Business"] },
    { id: "u-7", slug: "the-university-of-adelaide", name: "The University of Adelaide", location: "Adelaide, SA", featuredCourses: ["Agriculture", "Engineering", "Computer Science"] },
    { id: "u-8", slug: "unsw-sydney", name: "UNSW Sydney", location: "Sydney, NSW", featuredCourses: ["Engineering", "Finance", "Law", "Computer Science"] },

    // Other Universities
    { id: "u-9", slug: "macquarie-university", name: "Macquarie University", location: "Sydney, NSW", featuredCourses: ["Business", "Psychology", "Linguistics"] },
    { id: "u-10", slug: "university-of-technology-sydney", name: "University of Technology Sydney (UTS)", location: "Sydney, NSW", featuredCourses: ["Nursing", "Design", "Information Technology"] },
    { id: "u-11", slug: "university-of-wollongong", name: "University of Wollongong (UOW)", location: "Wollongong, NSW", featuredCourses: ["Engineering", "Computer Science", "Materials Science"] },
    { id: "u-12", slug: "university-of-newcastle", name: "University of Newcastle", location: "Newcastle, NSW", featuredCourses: ["Medicine", "Architecture", "Engineering"] },
    {
        id: "u-13",
        slug: "queensland-university-of-technology",
        name: "Queensland University of Technology (QUT)",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000",
        location: "Brisbane, QLD",
        distanceFromOffice: {
            en: "Walking distance or 5 mins via free Spring Hill Loop bus",
            tr: "Yürüme mesafesinde veya ücretsiz Spring Hill Loop otobüsüyle 5 dakika"
        },
        ranking: {
            en: "Top 200 Globally (QS Ranking)",
            tr: "Dünya Sıralamasında İlk 200 (QS Ranking)"
        },
        description: {
            en: "QUT is a major Australian university with a global outlook. Living up to its slogan 'University for the Real World', QUT is at the top in post-graduation employment rates with its industry-integrated education model.",
            tr: "QUT is a major Australian university with a global outlook. 'Gerçek Dünya için Üniversite' sloganını tam anlamıyla yaşatan QUT, sektörle iç içe eğitim modeliyle mezuniyet sonrası iş bulma oranlarında zirvededir."
        },
        entryRequirements: {
            en: "IELTS Academic for Bachelors: Overall 6.5. (Conditional offer and pathway programs available).",
            tr: "Lisans için IELTS Academic: Genel 6.5. (Şartlı kabul ve pathway programları mevcuttur)."
        },
        topPrograms: ["Bachelor of Information Technology", "Bachelor of Nursing", "Bachelor of Creative Industries", "Master of Data Analytics"],
        officialWebsite: "https://www.qut.edu.au",
        featuredCourses: ["Creative Industries", "Nursing", "IT"],
        expertInsight: {
            en: "With its magnificent campus in the city center (CBD) and direct industry projects, QUT is one of my favorites. It definitely offers the most innovative environment in Brisbane for students who will study Technology, Media, and Nursing.",
            tr: "Şehir merkezindeki (CBD) muhteşem kampüsü ve doğrudan endüstri projeleriyle QUT benim favorilerimden. Teknoloji, Medya ve Hemşirelik okuyacak öğrenciler için Brisbane'deki en yenilikçi ortamı kesinlikle burası sunuyor."
        }
    },
    { id: "u-14", slug: "griffith-university", name: "Griffith University", location: "Brisbane & Gold Coast, QLD", featuredCourses: ["Criminology", "Hospitality", "Nursing"] },
    { id: "u-15", slug: "deakin-university", name: "Deakin University", location: "Melbourne & Geelong, VIC", featuredCourses: ["Sports Science", "Education", "Nursing"] },
    { id: "u-16", slug: "rmit-university", name: "RMIT University", location: "Melbourne, VIC", featuredCourses: ["Art and Design", "Architecture", "Engineering"] },
    { id: "u-17", slug: "la-trobe-university", name: "La Trobe University", location: "Melbourne, VIC", featuredCourses: ["Health Sciences", "Arts", "Cybersecurity"] },
    { id: "u-18", slug: "swinburne-university-of-technology", name: "Swinburne University of Technology", location: "Melbourne, VIC", featuredCourses: ["Design", "Computer Science", "Engineering"] },
    { id: "u-19", slug: "curtin-university", name: "Curtin University", location: "Perth, WA", featuredCourses: ["Mining Engineering", "Nursing", "Earth Sciences"] },
    { id: "u-20", slug: "university-of-south-australia", name: "University of South Australia (UniSA)", location: "Adelaide, SA", featuredCourses: ["Aviation", "Nursing", "Business"] },

    // Remaining Public & Private Universities
    { id: "u-21", slug: "western-sydney-university", name: "Western Sydney University (WSU)", location: "Sydney, NSW", featuredCourses: ["Nursing", "Education", "Sociology"] },
    { id: "u-22", slug: "university-of-canberra", name: "University of Canberra (UC)", location: "Canberra, ACT", featuredCourses: ["Sports Science", "Information Technology", "Health"] },
    { id: "u-23", slug: "flinders-university", name: "Flinders University", location: "Adelaide, SA", featuredCourses: ["Medicine", "Nursing", "Education"] },
    { id: "u-24", slug: "murdoch-university", name: "Murdoch University", location: "Perth, WA", featuredCourses: ["Veterinary Science", "Criminology", "Environmental Science"] },
    { id: "u-25", slug: "edith-cowan-university", name: "Edith Cowan University (ECU)", location: "Perth, WA", featuredCourses: ["Cybersecurity", "Nursing", "Performing Arts"] },
    { id: "u-26", slug: "james-cook-university", name: "James Cook University (JCU)", location: "Townsville & Cairns, QLD", featuredCourses: ["Marine Biology", "Tropical Medicine", "Environmental Science"] },
    { id: "u-27", slug: "university-of-the-sunshine-coast", name: "University of the Sunshine Coast (UniSC)", location: "Sunshine Coast, QLD", featuredCourses: ["Environmental Science", "Nursing", "Sports Science"] },
    { id: "u-28", slug: "university-of-southern-queensland", name: "University of Southern Queensland (UniSQ)", location: "Toowoomba, QLD", featuredCourses: ["Engineering", "Aviation", "Education"] },
    { id: "u-29", slug: "bond-university", name: "Bond University", location: "Gold Coast, QLD", featuredCourses: ["Law", "Business", "Medicine"] },
    { id: "u-30", slug: "cquniversity", name: "CQUniversity", location: "Rockhampton & National, QLD", featuredCourses: ["Engineering", "IT", "Nursing"] },
    { id: "u-31", slug: "charles-sturt-university", name: "Charles Sturt University (CSU)", location: "Regional NSW", featuredCourses: ["Veterinary Science", "Agriculture", "Information Technology"] },
    { id: "u-32", slug: "southern-cross-university", name: "Southern Cross University (SCU)", location: "Lismore & Gold Coast", featuredCourses: ["Marine Science", "Tourism", "Nursing"] },
    { id: "u-33", slug: "university-of-new-england", name: "University of New England (UNE)", location: "Armidale, NSW", featuredCourses: ["Agriculture", "Law", "Education"] },
    { id: "u-34", slug: "australian-catholic-university", name: "Australian Catholic University (ACU)", location: "Multiple Campuses", featuredCourses: ["Nursing", "Education", "Theology"] },
    { id: "u-35", slug: "victoria-university", name: "Victoria University (VU)", location: "Melbourne, VIC", featuredCourses: ["Sports Science", "Business", "Health Sciences"] },
    { id: "u-36", slug: "federation-university-australia", name: "Federation University Australia", location: "Ballarat, VIC", featuredCourses: ["Education", "Mining Engineering", "Nursing"] },
    { id: "u-37", slug: "charles-darwin-university", name: "Charles Darwin University (CDU)", location: "Darwin, NT", featuredCourses: ["Environmental Science", "Indigenous Studies", "Nursing"] },
    { id: "u-38", slug: "university-of-tasmania", name: "University of Tasmania (UTAS)", location: "Hobart, TAS", featuredCourses: ["Maritime Studies", "Antarctic Science", "Fine Arts"] },
    { id: "u-39", slug: "the-university-of-notre-dame-australia", name: "The University of Notre Dame Australia", location: "Fremantle, WA & Sydney, NSW", featuredCourses: ["Medicine", "Law", "Nursing"] },
    { id: "u-40", slug: "torrens-university-australia", name: "Torrens University Australia", location: "Multiple Campuses", featuredCourses: ["Business", "Design", "Hospitality"] },
    { id: "u-41", slug: "university-of-divinity", name: "University of Divinity", location: "Melbourne, VIC", featuredCourses: ["Theology", "Philosophy", "Counselling"] },
    { id: "u-42", slug: "avondale-university", name: "Avondale University", location: "Cooranbong, NSW", featuredCourses: ["Education", "Nursing", "Theology"] },
    { id: "u-43", slug: "mengesha-university", name: "Mengesha University (Mock/Upcoming)", location: "Brisbane, QLD", featuredCourses: ["Technology", "Science"] }
];

