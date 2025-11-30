import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StudentProfile, Scholarship, MatchResult, EligibilityStatus } from "../types";

export const checkEligibility = async (
  profile: StudentProfile,
  scholarships: Scholarship[]
): Promise<MatchResult[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Define the schema for the response
  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        scholarshipId: { type: Type.STRING },
        status: { type: Type.STRING, enum: [EligibilityStatus.FULL, EligibilityStatus.PARTIAL, EligibilityStatus.NONE] },
        matchScore: { type: Type.INTEGER, description: "Confidence score 0-100" },
        reason: { type: Type.STRING, description: "A concise explanation of why the student matches or doesn't match." },
        missingRequirements: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of specific requirements the student failed to meet (e.g. 'GPA 3.4 < 3.5', 'Wrong Major')"
        },
      },
      required: ["scholarshipId", "status", "matchScore", "reason", "missingRequirements"],
    },
  };

  const prompt = `
    You are a strict Scholarship Eligibility Engine. 
    
    I will provide a Student Profile and a list of Scholarships.
    Your task is to evaluate the student's eligibility for EACH scholarship in the list.

    Rules for Evaluation:
    1. **Full Match**: Student meets ALL strict criteria (GPA, Major, Level, Region, Financial Need).
       - Note: Majors should be matched semantically (e.g., "Software Engineering" matches "Computer Science" or "Engineering").
       - Note: If a scholarship requires Financial Need and the student does not have it, it is a mismatch.
    2. **Partial Match**: 
       - Student misses a GPA requirement by a small margin (within 0.2 points).
       - Student misses a "soft" preference but hits mandatory ones.
       - Student's major is adjacent but not an exact match.
    3. **Not Eligible**:
       - Student is in the wrong Education Level (e.g., High School applying for Graduate only).
       - Student belongs to a strictly excluded demographic or region.
       - Student misses GPA by a large margin (> 0.2).

    Student Profile:
    ${JSON.stringify(profile, null, 2)}

    Scholarship Database:
    ${JSON.stringify(scholarships.map(s => ({
      id: s.id,
      name: s.name,
      requirements: s.requirements
    })), null, 2)}

    Return the result for every scholarship provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, // Low temperature for deterministic evaluation
      },
    });

    const rawResults = JSON.parse(response.text || "[]");

    // Merge the AI results with the original scholarship data for display
    const mergedResults: MatchResult[] = rawResults.map((res: any) => {
      const original = scholarships.find(s => s.id === res.scholarshipId);
      return {
        ...res,
        scholarshipName: original?.name || "Unknown",
        organization: original?.organization || "Unknown",
        amount: original?.amount || 0,
      };
    });

    // Sort: Full > Partial > None
    const sortOrder = { [EligibilityStatus.FULL]: 0, [EligibilityStatus.PARTIAL]: 1, [EligibilityStatus.NONE]: 2 };
    mergedResults.sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);

    return mergedResults;

  } catch (error) {
    console.error("Error checking eligibility:", error);
    throw error;
  }
};
