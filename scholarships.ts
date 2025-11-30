import { EducationLevel, Scholarship } from "./types";

export const SCHOLARSHIP_DATABASE: Scholarship[] = [
  {
    id: "s1",
    name: "Future Tech Leaders Grant",
    organization: "Global Tech Foundation",
    amount: 10000,
    deadline: "2024-05-15",
    description: "Supporting the next generation of innovators in Computer Science and Engineering fields.",
    requirements: {
      minGpa: 3.5,
      levels: [EducationLevel.Undergraduate, EducationLevel.Graduate],
      majors: ["Computer Science", "Engineering", "Data Science", "Information Technology"],
      financialNeedRequired: false,
    }
  },
  {
    id: "s2",
    name: "Access to Education Scholarship",
    organization: "The Open Door Fund",
    amount: 5000,
    deadline: "2024-06-01",
    description: "Financial aid for students demonstrating significant financial need across all disciplines.",
    requirements: {
      minGpa: 2.5,
      levels: [EducationLevel.HighSchool, EducationLevel.Undergraduate],
      financialNeedRequired: true,
    }
  },
  {
    id: "s3",
    name: "Women in Science Fellowship",
    organization: "Science for Her",
    amount: 15000,
    deadline: "2024-04-30",
    description: "Empowering women pursuing careers in biological and physical sciences.",
    requirements: {
      minGpa: 3.2,
      levels: [EducationLevel.Undergraduate, EducationLevel.Graduate],
      majors: ["Biology", "Physics", "Chemistry", "Environmental Science"],
      demographics: ["Female", "Non-binary"],
    }
  },
  {
    id: "s4",
    name: "Midwest Academic Excellence",
    organization: "Heartland Alliance",
    amount: 2500,
    deadline: "2024-07-15",
    description: "Merit-based scholarship for high-achieving students residing in the Midwest region.",
    requirements: {
      minGpa: 3.8,
      levels: [EducationLevel.HighSchool, EducationLevel.Undergraduate],
      regions: ["Midwest", "USA", "Ohio", "Michigan", "Illinois", "Indiana", "Wisconsin"],
    }
  },
  {
    id: "s5",
    name: "Creative Arts Visionary Award",
    organization: "National Arts Council",
    amount: 7500,
    deadline: "2024-05-20",
    description: "For students demonstrating exceptional promise in visual or performing arts.",
    requirements: {
      minGpa: 3.0,
      levels: [EducationLevel.Undergraduate],
      majors: ["Fine Arts", "Music", "Theater", "Design", "Film"],
    }
  },
  {
    id: "s6",
    name: "Global Humanities Grant",
    organization: "World Culture Institute",
    amount: 4000,
    deadline: "2024-08-01",
    description: "Supporting research and study in history, literature, and philosophy.",
    requirements: {
      minGpa: 3.0,
      levels: [EducationLevel.Graduate],
      majors: ["History", "Literature", "Philosophy", "Anthropology"],
    }
  },
  {
    id: "s7",
    name: "Community Service Hero",
    organization: "Civic Duty Corps",
    amount: 2000,
    deadline: "2024-09-01",
    description: "Awarded to students with a strong track record of volunteering and community impact.",
    requirements: {
      minGpa: 2.0,
      levels: [EducationLevel.HighSchool, EducationLevel.Undergraduate],
    }
  },
  {
    id: "s8",
    name: "NextGen Nursing Scholarship",
    organization: "Healthcare Heroes",
    amount: 6000,
    deadline: "2024-05-10",
    description: "Supporting students entering the nursing profession to address global shortages.",
    requirements: {
      minGpa: 3.2,
      levels: [EducationLevel.Undergraduate],
      majors: ["Nursing"],
      financialNeedRequired: true
    }
  }
];