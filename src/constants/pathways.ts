export type StudyLevel = "highSchool" | "bachelor" | "master";
export type EnglishLevel = "A1-A2" | "B1-B2" | "C1-C2";
export type TargetCareer = "IT" | "Health" | "Engineering" | "Trades";

export interface PathwayStep {
    id: string;
    title: { en: string; tr: string };
    duration: { en: string; tr: string };
    type: "language" | "vet" | "higherEd" | "professional";
    visa: string;
    description: { en: string; tr: string };
}

export const generatePathway = (
    studyLevel: StudyLevel,
    englishLevel: EnglishLevel,
    targetCareer: TargetCareer
): PathwayStep[] => {
    const steps: PathwayStep[] = [];

    // 1. Language Step
    if (englishLevel === "A1-A2") {
        steps.push({
            id: "lang-a1",
            title: { en: "Intensive General English", tr: "Yoğun Genel İngilizce" },
            duration: { en: "6-9 Months", tr: "6-9 Ay" },
            type: "language",
            visa: "Subclass 500 (ELICOS)",
            description: {
                en: "Build foundational English skills to transition to academic study.",
                tr: "Akademik eğitime geçiş için temel İngilizce becerilerinizi geliştirin."
            }
        });
    } else if (englishLevel === "B1-B2") {
        steps.push({
            id: "lang-b1",
            title: { en: "EAP / IELTS Preparation", tr: "Akademik İngilizce / IELTS Hazırlık" },
            duration: { en: "10-20 Weeks", tr: "10-20 Hafta" },
            type: "language",
            visa: "Subclass 500",
            description: {
                en: "Prepare for academic requirements to directly enter your program.",
                tr: "Programa doğrudan giriş için akademik İngilizce gereksinimlerine hazırlanın."
            }
        });
    }
    // C1-C2 skips language school usually

    // 2. VET/TAFE Step (Highly dependent on career and starting level)
    if (targetCareer === "Trades") {
        steps.push({
            id: "vet-trade",
            title: { en: "Certificate III & IV + Diploma", tr: "Sertifika III & IV + Diploma" },
            duration: { en: "1.5 - 2 Years", tr: "1.5 - 2 Yıl" },
            type: "vet",
            visa: "Subclass 500 (VET)",
            description: {
                en: "Hands-on training in Commercial Cookery, Automotive, or Carpentry highly demanded in Australia.",
                tr: "Avustralya'da yüksek talep gören Aşçılık, Otomotiv veya Marangozluk gibi alanlarda uygulamalı eğitim."
            }
        });

        // Trades usually lead to Job Ready Program / 485
        steps.push({
            id: "psw-trade",
            title: { en: "Graduate Work Stream / Job Ready Program", tr: "Mezun Çalışma İzni / İş Hazırlık Programı" },
            duration: { en: "1.5 - 2 Years", tr: "1.5 - 2 Yıl" },
            type: "professional",
            visa: "Subclass 485",
            description: {
                en: "Gain full-time work experience in your nominated trade to build your career pathway.",
                tr: "Kariyer yolunuzu inşa etmek için seçtiğiniz meslekte tam zamanlı iş deneyimi kazanın."
            }
        });

        return steps; // Trades end here typically for initial study roadmap
    }

    if (studyLevel === "highSchool") {
        if (targetCareer === "IT" || targetCareer === "Engineering") {
            steps.push({
                id: "vet-diploma",
                title: { en: "Diploma / Advanced Diploma", tr: "Diploma / İleri Diploma" },
                duration: { en: "1 - 1.5 Years", tr: "1 - 1.5 Yıl" },
                type: "vet",
                visa: "Subclass 500",
                description: {
                    en: "A practical stepping stone that provides up to 1 year of credit towards a Bachelor's degree.",
                    tr: "Lisans derecesine 1 yıla kadar kredi sağlayan pratik bir basamak."
                }
            });
        }
    }

    // 3. Higher Education Step
    if (studyLevel === "highSchool") {
        steps.push({
            id: "uni-bachelor",
            title: { en: "Bachelor's Degree", tr: "Lisans Eğitimi (Bachelor)" },
            duration: { en: "2 - 3 Years (after Diploma credit)", tr: "2 - 3 Yıl (Diploma kredisinden sonra)" },
            type: "higherEd",
            visa: "Subclass 500 (Higher Ed)",
            description: {
                en: `Complete your foundational degree in ${targetCareer} to enter the Australian professional workforce.`,
                tr: `Avustralya profesyonel iş gücüne katılmak için ${targetCareer} alanındaki lisans derecenizi tamamlayın.`
            }
        });
    } else {
        steps.push({
            id: "uni-master",
            title: { en: "Master's Degree", tr: "Yüksek Lisans (Master)" },
            duration: { en: "1.5 - 2 Years", tr: "1.5 - 2 Yıl" },
            type: "higherEd",
            visa: "Subclass 500 (Higher Ed)",
            description: {
                en: `Advanced specialization in ${targetCareer}, often opening doors to longer post-study work rights.`,
                tr: `${targetCareer} alanında ileri uzmanlık, genellikle daha uzun mezuniyet sonrası çalışma haklarının kapısını açar.`
            }
        });
    }

    // 4. Post-Study Work
    steps.push({
        id: "psw-higher",
        title: { en: "Post-Study Work Rights", tr: "Mezuniyet Sonrası Çalışma İzni" },
        duration: { en: "2 - 5 Years (Depending on Location)", tr: "2 - 5 Yıl (Bölgeye Göre)" },
        type: "professional",
        visa: "Subclass 485",
        description: {
            en: "Work full-time anywhere in Australia to gain crucial local experience.",
            tr: "Önemli bir yerel deneyim kazanmak için Avustralya'nın herhangi bir yerinde tam zamanlı çalışın."
        }
    });

    return steps;
};
