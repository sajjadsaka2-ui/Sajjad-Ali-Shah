import React, { useState } from 'react';
import { EducationLevel, MatchResult, StudentProfile, EligibilityStatus } from './types';
import { SCHOLARSHIP_DATABASE } from './scholarships';
import { checkEligibility } from './services/geminiService';
import ProfileForm from './components/ProfileForm';
import MatchCard from './components/MatchCard';
import { GraduationCap, Sparkles, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile>({
    name: '',
    gpa: 3.5,
    educationLevel: EducationLevel.Undergraduate,
    major: '',
    financialNeed: false,
    gender: 'Prefer not to say',
    region: '',
    extracurriculars: ''
  });

  const [results, setResults] = useState<MatchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    // Basic validation
    if (!profile.major || !profile.region) {
      setError("Please fill in Major and Region to get accurate results.");
      setIsLoading(false);
      return;
    }

    try {
      const matchResults = await checkEligibility(profile, SCHOLARSHIP_DATABASE);
      setResults(matchResults);
    } catch (err) {
      setError("Failed to analyze eligibility. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
              ScholarMatch AI
            </h1>
          </div>
          <div className="text-xs font-medium text-slate-500 hidden sm:block">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4 xl:col-span-3">
             <div className="sticky top-24">
               <ProfileForm 
                  profile={profile} 
                  setProfile={setProfile} 
                  onSearch={handleSearch}
                  isLoading={isLoading}
               />
             </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* Intro / Empty State */}
            {!results && !isLoading && !error && (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-brand-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Find Your Perfect Scholarship</h2>
                <p className="text-slate-500 max-w-md">
                  Enter your academic and demographic details to instantly match with opportunities from our database. 
                  Our AI engine analyzes strict and partial eligibility criteria.
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Loading Skeleton */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-100 rounded w-full"></div>
                      <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results List */}
            {results && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-800">
                    Analysis Results <span className="text-slate-400 font-normal text-sm ml-2">({results.length} evaluated)</span>
                  </h3>
                </div>
                
                <div className="space-y-0">
                  {results.filter(r => r.status === EligibilityStatus.FULL).length > 0 && (
                     <div className="mb-8">
                       <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                         Top Matches
                       </h4>
                       {results.filter(r => r.status === EligibilityStatus.FULL).map(result => (
                         <MatchCard key={result.scholarshipId} result={result} />
                       ))}
                     </div>
                  )}

                  {results.filter(r => r.status === EligibilityStatus.PARTIAL).length > 0 && (
                     <div className="mb-8">
                       <h4 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                         Potentially Eligible (Partial)
                       </h4>
                       {results.filter(r => r.status === EligibilityStatus.PARTIAL).map(result => (
                         <MatchCard key={result.scholarshipId} result={result} />
                       ))}
                     </div>
                  )}

                  {results.filter(r => r.status === EligibilityStatus.NONE).length > 0 && (
                     <div>
                       <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                         Not Eligible
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {results.filter(r => r.status === EligibilityStatus.NONE).map(result => (
                          <MatchCard key={result.scholarshipId} result={result} />
                        ))}
                       </div>
                     </div>
                  )}
                </div>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;