import React from 'react';
import { MatchResult, EligibilityStatus } from '../types';
import { CheckCircle2, AlertTriangle, XCircle, DollarSign, Building } from 'lucide-react';

interface MatchCardProps {
  result: MatchResult;
}

const MatchCard: React.FC<MatchCardProps> = ({ result }) => {
  const getStatusColor = (status: EligibilityStatus) => {
    switch (status) {
      case EligibilityStatus.FULL: return 'bg-emerald-50 border-emerald-200';
      case EligibilityStatus.PARTIAL: return 'bg-amber-50 border-amber-200';
      case EligibilityStatus.NONE: return 'bg-slate-50 border-slate-200 opacity-60';
    }
  };

  const getStatusIcon = (status: EligibilityStatus) => {
    switch (status) {
      case EligibilityStatus.FULL: return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case EligibilityStatus.PARTIAL: return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case EligibilityStatus.NONE: return <XCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusText = (status: EligibilityStatus) => {
    switch (status) {
      case EligibilityStatus.FULL: return <span className="text-emerald-700 font-bold text-sm">Full Match</span>;
      case EligibilityStatus.PARTIAL: return <span className="text-amber-700 font-bold text-sm">Partial Match</span>;
      case EligibilityStatus.NONE: return <span className="text-slate-500 font-bold text-sm">Not Eligible</span>;
    }
  };

  return (
    <div className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${getStatusColor(result.status)} hover:shadow-md mb-4`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {getStatusIcon(result.status)}
            {getStatusText(result.status)}
            {result.status !== EligibilityStatus.NONE && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white bg-opacity-50 border border-black/5">
                {result.matchScore}% Match
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{result.scholarshipName}</h3>
          <div className="flex items-center gap-1.5 text-slate-600 text-sm mt-1">
            <Building className="w-3.5 h-3.5" />
            <span>{result.organization}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-slate-900 font-bold text-lg">
            <span className="text-brand-600">$</span>
            {result.amount.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-60 rounded-lg p-3 text-sm text-slate-700 border border-black/5">
        <p className="mb-2"><span className="font-semibold text-slate-900">Analysis: </span>{result.reason}</p>
        
        {result.missingRequirements && result.missingRequirements.length > 0 && (
          <div className="mt-2 pt-2 border-t border-black/5">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Missing Requirements:</p>
            <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-600">
              {result.missingRequirements.map((req, idx) => (
                <li key={idx} className="text-red-700">{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;