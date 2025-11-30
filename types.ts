export enum EducationLevel {
  HighSchool = "High School Senior",
  Undergraduate = "Undergraduate",
  Graduate = "Graduate/PhD",
}

export enum EligibilityStatus {
  FULL = "Full Match",
  PARTIAL = "Partial Match",
  NONE = "Not Eligible",
}

export interface StudentProfile {
  name: string;
  gpa: number;
  educationLevel: EducationLevel;
  major: string;
  financialNeed: boolean;
  gender: string;
  region: string;
  extracurriculars: string;
}

export interface Scholarship {
  id: string;
  name: string;
  organization: string;
  amount: number;
  deadline: string;
  description: string;
  requirements: {
    minGpa?: number;
    levels?: EducationLevel[];
    majors?: string[]; // Empty implies all
    financialNeedRequired?: boolean;
    demographics?: string[];
    regions?: string[];
  };
}

export interface MatchResult {
  scholarshipId: string;
  scholarshipName: string;
  organization: string;
  amount: number;
  status: EligibilityStatus;
  matchScore: number; // 0-100
  reason: string;
  missingRequirements: string[];
}
