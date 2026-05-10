"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    User,
    Mail,
    Phone,
    BookOpen,
    GraduationCap,
    ChevronRight,
    ChevronLeft,
    CheckCircle,
    Send,
} from "lucide-react";

export function JourneyForm() {
    const t = useTranslations("form");
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "", // Will be split into firstName and lastName
        email: "",
        phone: "",
        englishLevel: "",
        courseType: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = t("errors.nameRequired");
            if (!formData.email.trim()) newErrors.email = t("errors.emailRequired");
            else if (!/\S+@\S+\.\S+/.test(formData.email))
                newErrors.email = t("errors.emailInvalid");
            if (!formData.phone.trim()) newErrors.phone = t("errors.phoneRequired");
        }
        if (currentStep === 2) {
            if (!formData.englishLevel)
                newErrors.englishLevel = t("errors.levelRequired");
        }
        if (currentStep === 3) {
            if (!formData.courseType)
                newErrors.courseType = t("errors.courseRequired");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handlePrev = () => setStep(step - 1);

    const handleSubmit = async () => {
        if (validateStep(step)) {
            setIsSubmitting(true);

            // Split name into first and last
            const nameParts = formData.name.trim().split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email: formData.email,
                        phone: formData.phone,
                        englishLevel: formData.englishLevel,
                        desiredCourse: formData.courseType
                    }),
                });

                if (response.ok) {
                    setSubmitted(true);
                } else {
                    console.error("Submission failed");
                    // Optionally handle error state
                }
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const stepIndicators = [
        { num: 1, label: t("step1"), icon: User },
        { num: 2, label: t("step2"), icon: BookOpen },
        { num: 3, label: t("step3"), icon: GraduationCap },
    ];

    if (submitted) {
        return (
            <section id="journey-form" className="py-20 lg:py-28 bg-white">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-2xl font-bold text-navy mb-4"
                    >
                        {t("success")}
                    </motion.h3>
                </div>
            </section>
        );
    }

    return (
        <div className="w-full">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-10">
                {stepIndicators.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.num} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${step >= s.num
                                        ? "bg-navy border-navy text-white"
                                        : "bg-white border-navy/15 text-navy/30"
                                        }`}
                                >
                                    <Icon size={20} />
                                </div>
                                <span
                                    className={`text-xs mt-2 font-medium transition-colors ${step >= s.num ? "text-navy" : "text-navy/30"
                                        }`}
                                >
                                    {s.label}
                                </span>
                            </div>
                            {i < stepIndicators.length - 1 && (
                                <div
                                    className={`w-16 sm:w-24 h-0.5 mx-2 mb-6 transition-colors duration-300 ${step > s.num ? "bg-navy" : "bg-navy/10"
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Form Card */}
            <div className="w-full">
                <AnimatePresence mode="wait">
                    {/* Step 1 */}
                    {step === 1 && (
                        <motion.div
                            key="step-1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="text-navy font-medium mb-2 block"
                                >
                                    {t("nameLabel")}
                                </Label>
                                <div className="relative">
                                    <User
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/30"
                                    />
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder={t("namePlaceholder")}
                                        className="pl-10 h-12 rounded-xl border-2 border-navy/10 focus:border-navy/30 bg-sand-light/30 text-base"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-navy font-medium mb-2 block"
                                >
                                    {t("emailLabel")}
                                </Label>
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/30"
                                    />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        placeholder={t("emailPlaceholder")}
                                        className="pl-10 h-12 rounded-xl border-2 border-navy/10 focus:border-navy/30 bg-sand-light/30 text-base"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label
                                    htmlFor="phone"
                                    className="text-navy font-medium mb-2 block"
                                >
                                    {t("phoneLabel")}
                                </Label>
                                <div className="relative">
                                    <Phone
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/30"
                                    />
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        placeholder={t("phonePlaceholder")}
                                        className="pl-10 h-12 rounded-xl border-2 border-navy/10 focus:border-navy/30 bg-sand-light/30 text-base"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <motion.div
                            key="step-2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <div>
                                <Label className="text-navy font-medium mb-3 block">
                                    {t("englishLevel")}
                                </Label>
                                <div className="space-y-3">
                                    {(
                                        [
                                            "beginner",
                                            "elementary",
                                            "intermediate",
                                            "upperIntermediate",
                                            "advanced",
                                        ] as const
                                    ).map((level) => (
                                        <button
                                            key={level}
                                            onClick={() =>
                                                setFormData({ ...formData, englishLevel: level })
                                            }
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${formData.englishLevel === level
                                                ? "border-navy bg-navy/5 shadow-[3px_3px_0px_0px_rgba(10,25,47,0.1)]"
                                                : "border-navy/10 hover:border-navy/20 bg-white"
                                                }`}
                                        >
                                            <span
                                                className={`text-sm sm:text-base font-medium ${formData.englishLevel === level
                                                    ? "text-navy"
                                                    : "text-navy/60"
                                                    }`}
                                            >
                                                {t(`levels.${level}`)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {errors.englishLevel && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.englishLevel}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <motion.div
                            key="step-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-5"
                        >
                            <div>
                                <Label className="text-navy font-medium mb-3 block">
                                    {t("courseType")}
                                </Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(
                                        ["elicos", "vet", "university", "unsure"] as const
                                    ).map((course) => (
                                        <button
                                            key={course}
                                            onClick={() =>
                                                setFormData({ ...formData, courseType: course })
                                            }
                                            className={`p-5 rounded-xl border-2 transition-all duration-200 text-center ${formData.courseType === course
                                                ? "border-navy bg-navy/5 shadow-[3px_3px_0px_0px_rgba(10,25,47,0.1)]"
                                                : "border-navy/10 hover:border-navy/20 bg-white"
                                                }`}
                                        >
                                            <span
                                                className={`text-sm sm:text-base font-medium ${formData.courseType === course
                                                    ? "text-navy"
                                                    : "text-navy/60"
                                                    }`}
                                            >
                                                {t(`courses.${course}`)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {errors.courseType && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.courseType}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-navy/5">
                    {step > 1 ? (
                        <Button
                            onClick={handlePrev}
                            variant="outline"
                            className="rounded-xl border-2 border-navy/15 text-navy hover:bg-navy/5 px-6 h-12"
                        >
                            <ChevronLeft size={18} className="mr-1" />
                            {t("prev")}
                        </Button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <Button
                            onClick={handleNext}
                            className="bg-navy hover:bg-navy-light text-white rounded-xl border-2 border-navy shadow-[3px_3px_0px_0px_rgba(10,25,47,0.15)] hover:shadow-[1px_1px_0px_0px_rgba(10,25,47,0.15)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all px-6 h-12"
                        >
                            {t("next")}
                            <ChevronRight size={18} className="ml-1" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`bg-navy hover:bg-navy-light text-white rounded-xl border-2 border-navy transition-all px-8 h-12 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "shadow-[3px_3px_0px_0px_rgba(10,25,47,0.15)] hover:shadow-[1px_1px_0px_0px_rgba(10,25,47,0.15)] hover:translate-x-[2px] hover:translate-y-[2px]"}`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    <span>Sending...</span>
                                </div>
                            ) : (
                                <>
                                    <Send size={18} className="mr-2" />
                                    {t("submit")}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
