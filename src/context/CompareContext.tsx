"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { School } from "@/constants/schools";

interface CompareContextType {
    selectedSchools: School[];
    addSchool: (school: School) => void;
    removeSchool: (schoolId: string) => void;
    clearComparison: () => void;
    isSchoolSelected: (schoolId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [selectedSchools, setSelectedSchools] = useState<School[]>([]);

    const addSchool = (school: School) => {
        if (selectedSchools.length < 3 && !selectedSchools.some(s => s.id === school.id)) {
            setSelectedSchools([...selectedSchools, school]);
        }
    };

    const removeSchool = (schoolId: string) => {
        setSelectedSchools(selectedSchools.filter(s => s.id !== schoolId));
    };

    const clearComparison = () => {
        setSelectedSchools([]);
    };

    const isSchoolSelected = (schoolId: string) => {
        return selectedSchools.some(s => s.id === schoolId);
    };

    return (
        <CompareContext.Provider
            value={{
                selectedSchools,
                addSchool,
                removeSchool,
                clearComparison,
                isSchoolSelected
            }}
        >
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (context === undefined) {
        throw new Error("useCompare must be used within a CompareProvider");
    }
    return context;
}
