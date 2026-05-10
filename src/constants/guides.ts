export interface GuideContent {
    slug: string;
    category: "visa" | "living" | "accommodation" | "career";
    date: string;
    image: string;
    readTime: string;
    translations: {
        en: {
            title: string;
            excerpt: string;
            content: string;
            categoryLabel: string;
        };
        tr: {
            title: string;
            excerpt: string;
            content: string;
            categoryLabel: string;
        };
    };
}

export const GUIDES: GuideContent[] = [
    {
        slug: "visa-guide",
        category: "visa",
        date: "2024-03-15",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000",
        readTime: "8 min",
        translations: {
            en: {
                title: "Complete Australian Student Visa (Subclass 500) Guide & GS Requirement",
                excerpt: "Everything you need to know about the Genuine Student (GS) requirement, financial capacity proof, and stepping through the Australian student visa application process.",
                categoryLabel: "Visa & Legal",
                content: `
<h2>Understanding the Student Visa (Subclass 500)</h2>
<p>Securing an Australian Student Visa requires meticulous preparation. With the recent shift from the GTE (Genuine Temporary Entrant) to the <strong>Genuine Student (GS)</strong> requirement, the Department of Home Affairs is focused on ensuring your primary intention for traveling to Australia is to obtain a quality education that will benefit your future career.</p>

<h3>The Genuine Student (GS) Requirement</h3>
<p>The GS assessment involves a series of targeted questions within your visa application. You must provide comprehensive details about your current circumstances, ties to your home country, and the specific value the Australian course adds to your professional trajectory. It's no longer just a statement; it's an evidence-based assessment.</p>

<h3>Financial Capacity</h3>
<p>Proving you have enough money to cover your travel, course fees, and living costs is critical. The current minimum living cost requirement is frequently updated, so checking the exact figure on the official government website is essential. You can prove this through bank statements, evidence of a loan, or a scholarship.</p>

<h3>Required Documents</h3>
<ul>
    <li><strong>CoE (Confirmation of Enrolment):</strong> Issued by your education provider after you accept their offer and pay your deposit.</li>
    <li><strong>OSHC (Overseas Student Health Cover):</strong> Mandatory health insurance for the duration of your visa.</li>
    <li><strong>English Proficiency:</strong> Valid IELTS, PTE, or TOEFL scores matching the visa requirements.</li>
    <li><strong>Biometrics and Health Exams:</strong> Depending on your country of passport.</li>
</ul>

<p><em>* Disclaimer: The information provided here is for educational purposes. For personalized, professional migration advice, please consult a registered MARA agent.</em></p>
                `
            },
            tr: {
                title: "Avustralya Öğrenci Vizesi (Subclass 500) ve GS Kriteri Rehberi",
                excerpt: "Genuine Student (GS) şartı, finansal yeterlilik kanıtı ve Avustralya öğrenci vizesi başvuru sürecinin tüm adımları hakkında bilmeniz gereken her şey.",
                categoryLabel: "Vize ve Yasal",
                content: `
<h2>Öğrenci Vizesini (Subclass 500) Anlamak</h2>
<p>Avustralya Öğrenci Vizesi almak titiz bir hazırlık gerektirir. GTE'den (Gerçek Geçici Giriş) <strong>Genuine Student (GS) - Gerçek Öğrenci</strong> şartına geçişle birlikte, İçişleri Bakanlığı artık Avustralya'ya seyahat etme niyetinizin tamamen gelecekteki kariyerinize fayda sağlayacak kaliteli bir eğitim almak olduğundan emin olmak istemektedir.</p>

<h3>Gerçek Öğrenci (GS) Şartı</h3>
<p>GS değerlendirmesi, vize başvurunuz içindeki doğrudan hedefe yönelik soruları içerir. Mevcut durumunuz, kendi ülkenizdeki bağlarınız ve Avustralya'daki kursun profesyonel hayatınıza katacağı özel değer hakkında kapsamlı ayrıntılar sağlamalısınız. Artık sadece bir niyet mektubu değil, kanıta dayalı bir değerlendirmedir.</p>

<h3>Finansal Kapasite</h3>
<p>Seyahatinizi, kurs ücretlerinizi ve yaşam masraflarınızı karşılayacak kadar paranız olduğunu kanıtlamak kritik önem taşır. Güncel asgari yaşam maliyeti gereksinimi sık sık güncellenmektedir. Bu durumu banka dökümleri, kredi kanıtı veya burs belgeleri ile kanıtlayabilirsiniz.</p>

<h3>Gerekli Belgeler</h3>
<ul>
    <li><strong>CoE (Kabul Belgesi):</strong> Teklifi kabul edip depozitoyu ödedikten sonra okul tarafından verilir.</li>
    <li><strong>OSHC (Yurtdışı Öğrenci Sağlık Sigortası):</strong> Vizeniz süresince zorunlu sağlık sigortası.</li>
    <li><strong>İngilizce Yeterlilik:</strong> Vize şartlarına uygun geçerli IELTS, PTE puanları.</li>
    <li><strong>Biyometri ve Sağlık Taraması:</strong> Pasaport ülkenize bağlı olarak istenebilir.</li>
</ul>

<p><em>* Yasal Uyarı: Burada verilen bilgiler eğitim amaçlıdır. Kişiselleştirilmiş göçmenlik tavsiyesi için lütfen yetkili bir MARA ajansına danışın.</em></p>
                `
            }
        }
    },
    {
        slug: "cost-of-living-brisbane",
        category: "living",
        date: "2024-03-10",
        image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=2000",
        readTime: "5 min",
        translations: {
            en: {
                title: "Cost of Living for Students in Brisbane (2024 Edition)",
                excerpt: "A realistic breakdown of rent, transport, groceries, and entertainment costs for international students living in Brisbane, specifically around the Albion and city areas.",
                categoryLabel: "Living Costs",
                content: `
<h2>Why Choose Brisbane?</h2>
<p>Brisbane strikes the perfect balance between a vibrant city life and affordability compared to Sydney or Melbourne. Its subtropical climate and growing infrastructure make it a top choice for international students. But how much does it actually cost to live here?</p>

<h3>Accommodation Estimates</h3>
<p>Rent will be your biggest expense. In suburbs like <strong>Albion</strong> or <strong>Fortitude Valley</strong>, you are close to the CBD without the premium city price tag.</p>
<ul>
    <li><strong>Sharehouse:</strong> $200 - $350 per week (bills usually included)</li>
    <li><strong>Purpose-Built Student Accomm (PBSA):</strong> $350 - $550 per week</li>
    <li><strong>Homestay:</strong> $300 - $400 per week (including meals)</li>
</ul>

<h3>Groceries & Dining</h3>
<p>Cooking at home is highly recommended. Supermarkets like Woolworths, Coles, and Aldi offer competitive prices. Budget around $100 to $150 per week for groceries. Eating out at a casual restaurant or grabbing a quick lunch will cost between $15 and $25.</p>

<h3>Transport & Translink</h3>
<p>Brisbane's public transport network (buses, trains, and ferries) is excellent. As an international university or TAFE student, you are eligible for a <strong>50% tertiary concession fare</strong> on your Translink go card. Expect to spend around $20 to $40 per week depending on your travel zones.</p>

<h3>Working While Studying</h3>
<p>Remember, your student visa allows you to work up to 48 hours per fortnight. Australia's high minimum wage provides a fantastic opportunity to offset these living costs while gaining valuable local work experience.</p>
                `
            },
            tr: {
                title: "Brisbane'de Öğrenci Yaşam Maliyetleri (2024 Formatı)",
                excerpt: "Brisbane'de, özellikle Albion ve şehir merkezi çevresinde yaşayan uluslararası öğrenciler için kira, ulaşım, market ve eğlence masraflarının gerçekçi bir dökümü.",
                categoryLabel: "Yaşam Maliyeti",
                content: `
<h2>Neden Brisbane?</h2>
<p>Brisbane, Sydney veya Melbourne ile karşılaştırıldığında canlı bir şehir hayatı ve uygun fiyatlılık arasında mükemmel bir denge kurar. Yarı tropikal iklimi, uluslararası öğrenciler için onu en iyi seçeneklerden biri yapıyor. Peki burada yaşamanın maliyeti gerçekten ne kadar?</p>

<h3>Konaklama Tahminleri</h3>
<p>Kira en büyük gideriniz olacaktır. Merkezimize ve okula yakın olan <strong>Albion</strong> gibi semtlerde kiralar daha mantıklıdır.</p>
<ul>
    <li><strong>Paylaşımlı Ev (Sharehouse):</strong> Haftalık $200 - $350 (Genelde faturalar dahil)</li>
    <li><strong>Öğrenci Yurtları (PBSA):</strong> Haftalık $350 - $550</li>
    <li><strong>Aile Yanı (Homestay):</strong> Haftalık $300 - $400 (Yemekler dahil)</li>
</ul>

<h3>Market & Yeme-İçme</h3>
<p>Evde yemek pişirmek şiddetle tavsiye edilir. Woolworths, Coles ve Aldi gibi süpermarketler rekabetçi fiyatlar sunar. Market alışverişi için haftada yaklaşık $100 ila $150 bütçe ayırın. Dışarıda yemek yemek ortalama $15 ile $25 arasında tutacaktır.</p>

<h3>Ulaşım (Translink)</h3>
<p>Brisbane'in toplu taşıma ağı (otobüsler, trenler ve feribotlar) mükemmeldir. Uluslararası bir üniversite veya TAFE öğrencisi olarak, Translink go kartınızda <strong>%50 öğrenci indiriminden</strong> yararlanabilirsiniz. İşe ve okula gidiş gelişinize göre haftalık $20 ile $40 arası bütçe ayırabilirsiniz.</p>

<h3>Okurken Çalışmak</h3>
<p>Unutmayın, öğrenci vizeniz size iki haftada bir 48 saate kadar çalışma izni verir. Avustralya'nın yüksek asgari ücreti, değerli yerel iş deneyimi kazanırken bu yaşam masraflarını dengelemek için harika bir fırsat sunar.</p>
                `
            }
        }
    },
    {
        slug: "accommodation-types",
        category: "accommodation",
        date: "2024-03-05",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000",
        readTime: "6 min",
        translations: {
            en: {
                title: "Homestay, Sharehouse, or Dorm: Choosing Your Aussie Home",
                excerpt: "An in-depth comparison of the different types of student accommodation available in Australia to help you make the right choice before landing.",
                categoryLabel: "Accommodation",
                content: `
<h2>Landing in Consistency</h2>
<p>Where you live drastically impacts your Australian experience. Your choice depends on your budget, whether you want an immersive English environment, or if you prefer independence.</p>

<h3>1. Homestay: The Cultural Immersion</h3>
<p>Living with a local Australian family is arguably the best way to accelerate your English learning and understand the local culture. Homestays usually include a private bedroom and 2-3 meals a day. It offers a soft landing, meaning you don't have to worry about buying furniture, cooking every night, or paying utility bills.</p>

<h3>2. Student Residences & Dorms (PBSA)</h3>
<p>Purpose-Built Student Accommodation (like Scape or Student One) are apartment complexes designed solely for students. They offer incredible amenities like gyms, study rooms, cinema spaces, and a built-in community. They are usually located right in the city center. While highly convenient and secure, they are often the most expensive option.</p>

<h3>3. Sharehouses: The Independent Path</h3>
<p>Renting a room in a house shared with other students or young professionals is the most common route for international students after their first few months. It's the most budget-friendly option and teaches you immense independence. You will be responsible for cooking, cleaning your spaces, and paying a share of the internet and electricity bills.</p>

<p><em>EduBrisbane Tip: Pre-book a Homestay or a short-term student residence for your first 4 weeks. Once you are physically here and familiar with the city, you can safely inspect sharehouses in person.</em></p>
                `
            },
            tr: {
                title: "Homestay, Paylaşımlı Ev veya Yurt: Avustralya'da Konaklama Seçimi",
                excerpt: "İnmeden önce doğru seçimi yapmanıza yardımcı olacak, Avustralya'da mevcut farklı öğrenci konaklama türlerinin derinlemesine bir karşılaştırması.",
                categoryLabel: "Konaklama",
                content: `
<h2>Doğru Yere İniş Yapmak</h2>
<p>Nerede yaşadığınız, Avustralya deneyiminizi büyük ölçüde etkiler. Seçiminiz bütçenize, ne kadar İngilizce pratik yapmak istediğinize ve ne kadar bağımsızlık aradığınıza bağlıdır.</p>

<h3>1. Aile Yanı Konaklama (Homestay)</h3>
<p>Yerel bir Avustralyalı aileyle yaşamak, İngilizce öğrenmenizi hızlandırmak ve kültürü anlamak için tartışmasız en iyi yoldur. Homestay genellikle özel bir yatak odası ve günde 2-3 öğün yemek içerir. Yumuşak bir geçiş sağlar, yani ilk haftalarınızda mobilya almak veya fatura ödemekle uğraşmazsınız.</p>

<h3>2. Öğrenci Yurtları (PBSA)</h3>
<p>Özel Öğrenci Yurtları (Scape veya Student One gibi), sadece öğrenciler için tasarlanmış apartman kompleksleridir. Spor salonları, çalışma odaları ve harika bir sosyalleşme ortamı sunarlar. Genellikle şehrin tam merkezinde bulunurlar. Çok güvenli ve pratik olmalarına rağmen en pahalı seçenektir.</p>

<h3>3. Paylaşımlı Ev (Sharehouse)</h3>
<p>Diğer öğrenciler veya çalışan gençlerle paylaşılan bir evde oda kiralamak, uluslararası öğrencilerin ilk birkaç aydan sonra tercih ettiği en yaygın yoldur. En bütçe dostu seçenektir. Kendi yemeklerinizi yapacak ve faturaların bir kısmını ödeyeceksiniz (Elektrik/İnternet gibi).</p>

<p><em>EduBrisbane Tavsiyesi: İlk 4 haftanız için bir Homestay veya öğrenci yurdu ayırtın. Fiziksel olarak buraya geldikten ve şehri tanıdıktan sonra, paylaşımlı evlere bizzat giderek daha güvenli kiralama yapabilirsiniz.</em></p>
                `
            }
        }
    },
    {
        slug: "post-study-work-visas",
        category: "career",
        date: "2024-02-28",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000",
        readTime: "7 min",
        translations: {
            en: {
                title: "Navigating Post-Study Work Visa (Subclass 485) Options",
                excerpt: "Graduate from an Australian institution? Here is what you need to know about the Temporary Graduate Visa to gain local work experience.",
                categoryLabel: "Career Pathways",
                content: `
<h2>Life After Graduation</h2>
<p>Graduating from an Australian university or TAFE is a massive achievement. The next logical step for many international students is to gain highly valued Australian work experience through the Temporary Graduate visa (subclass 485).</p>

<h3>The Two Main Streams</h3>
<p>The 485 visa currently has different streams, with the most common being:</p>
<ol>
    <li><strong>Post-Higher Education Work Stream:</strong> For international students who have recently graduated with an eligible degree (Bachelor, Master, or PhD) from an Australian university.</li>
    <li><strong>Post-Vocational Education Work Stream:</strong> For international students who graduate with a certificate or diploma that relates to an occupation on the Medium and Long-term Strategic Skills List (MLTSSL).</li>
</ol>

<h3>Key Requirements & Changes</h3>
<p>It's crucial to stay updated as government policies evolve. Recent adjustments have impacted the age limits and the English language score required to apply for a 485 visa. You must generally apply within 6 months of holding your student visa and completing your course.</p>

<h3>Start Planning Early</h3>
<p>Securing a 485 visa requires you to fulfill the 'Australian Study Requirement' (usually two academic years of study). Therefore, mapping out your education pathway from day one with a trusted agency like EduBrisbane ensures you study eligible courses that align with your long-term career goals.</p>
                `
            },
            tr: {
                title: "Mezuniyet Sonrası Çalışma Vizesi (Subclass 485) Seçenekleri",
                excerpt: "Avustralya'da bir okuldan mezun oldunuz mu? Yerel iş deneyimi kazanmak için Geçici Mezun Vizesi hakkında bilmeniz gerekenler.",
                categoryLabel: "Kariyer Yolları",
                content: `
<h2>Mezuniyetten Sonraki Hayat</h2>
<p>Avustralya'da bir üniversiteden veya TAFE'den mezun olmak büyük bir başarıdır. Çoğu uluslararası öğrenci için bir sonraki mantıklı adım, Geçici Mezun Vizesi (Subclass 485) aracılığıyla oldukça değerli bir 'Avustralya iş deneyimi' kazanmaktır.</p>

<h3>İki Ana Alt Kategori</h3>
<p>485 vizesinin en yaygın olanları şunlardır:</p>
<ol>
    <li><strong>Yükseköğrenim Sonrası Çalışma Vizesi:</strong> Yakın zamanda bir Avustralya üniversitesinden geçerli bir lisans, yüksek lisans veya doktora derecesi ile mezun olan uluslararası öğrenciler içindir.</li>
    <li><strong>Mesleki Eğitim (VET) Sonrası Çalışma Vizesi:</strong> Orta ve Uzun Vadeli Stratejik Beceriler Listesi'ndeki (MLTSSL) bir meslekle doğrudan ilgili bir sertifika veya diploma (TAFE) ile mezun olan öğrenciler içindir.</li>
</ol>

<h3>Önemli Gereksinimler & Değişiklikler</h3>
<p>Hükümet politikaları hızla geliştiği için güncel kalmak çok önemlidir. Son yapılan değişiklikler, 485 vizesine başvurmak için gereken yaş sınırlarını ve İngilizce dil puanını etkiledi. Genellikle kursunuzu tamamladıktan ve öğrenci vizeniz bittikten sonraki ilk 6 ay içinde başvurmalısınız.</p>

<h3>Erken Planlamanın Önemi</h3>
<p>485 vizesine hak kazanmak için 'Avustralya Eğitim Süresi Şartı'nı (genellikle iki akademik yıllık eğitim) yerine getirmeniz gerekir. Bu nedenle, ilk günden itibaren EduBrisbane gibi güvenilir bir ajansla eğitim yolunuzu belirlemek, uygun kursları ve hedeflerinizi doğru şekilde eşleştirmenizi sağlar.</p>
                `
            }
        }
    }
];
