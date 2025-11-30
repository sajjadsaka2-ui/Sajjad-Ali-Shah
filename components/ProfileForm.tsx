import React from 'react';
import { EducationLevel, StudentProfile } from '../types';
import { User, BookOpen, GraduationCap, DollarSign, Globe, Briefcase } from 'lucide-react';

interface ProfileFormProps {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  onSearch: () => void;
  isLoading: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, setProfile, onSearch, isLoading }) => {
  const handleChange = (field: keyof StudentProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 h-full">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-brand-600" />
        Student Profile
      </h2>

      <div className="space-y-6">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            placeholder="Jane Doe"
          />
        </div>

        {/* GPA & Level Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> GPA
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              value={profile.gpa}
              onChange={(e) => handleChange('gpa', parseFloat(e.target.value))}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              placeholder="3.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" /> Level
            </label>
            <select
              value={profile.educationLevel}
              onChange={(e) => handleChange('educationLevel', e.target.value as EducationLevel)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
            >
              {Object.values(EducationLevel).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Major */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5" /> Field of Study
          </label>
          <input
            type="text"
            value={profile.major}
            onChange={(e) => handleChange('major', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            placeholder="e.g. Computer Science, Nursing, Arts"
          />
        </div>

        {/* Region & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> Region/State
            </label>
            <input
              type="text"
              value={profile.region}
              onChange={(e) => handleChange('region', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              placeholder="e.g. Midwest, California"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
            >
              <option value="">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>
        </div>

        {/* Financial Need Toggle */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50">
          <div className={`w-5 h-5 rounded flex items-center justify-center cursor-pointer transition-colors ${profile.financialNeed ? 'bg-brand-600' : 'bg-slate-300'}`}
               onClick={() => handleChange('financialNeed', !profile.financialNeed)}>
             {profile.financialNeed && <DollarSign className="w-3.5 h-3.5 text-white" />}
          </div>
          <span className="text-sm font-medium text-slate-700 select-none cursor-pointer" onClick={() => handleChange('financialNeed', !profile.financialNeed)}>
            I qualify for need-based financial aid
          </span>
        </div>

        {/* Extracurriculars */}
        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Extracurriculars / Keywords</label>
           <textarea
            value={profile.extracurriculars}
            onChange={(e) => handleChange('extracurriculars', e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all h-20 resize-none text-sm"
            placeholder="e.g. Volunteer, Chess Club, Football, Robotics"
           />
        </div>

        <button
          onClick={onSearch}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-xl text-white font-semibold shadow-lg transition-all transform active:scale-[0.98]
            ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 hover:shadow-brand-500/25'}
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking Eligibility...
            </span>
          ) : (
            "Find Scholarships"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;