import React from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Building, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const { data } = useData();
  const { user } = useAuth();

  const myApps = data.applications.filter(a => a.studentId === user.refId);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Applications</h1>
        <p className="mt-2 text-slate-500">Track the status of your internship applications.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {myApps.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No applications yet</h3>
            <p className="text-slate-500 mt-1 max-w-sm mb-6">You haven't applied to any internships. Start exploring opportunities to kickstart your career.</p>
            <Link to="/student/listings" className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              Browse Internships <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {myApps.map(app => {
              const internship = data.internships.find(i => i.id === app.internshipId);
              const company = data.companies.find(c => c.id === internship?.companyId);
              return (
                <li key={app.id} className="p-6 hover:bg-slate-50 transition-colors group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-1 shrink-0 shadow-sm">
                        {company?.logo ? (
                          <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                          <Building className="h-6 w-6 text-slate-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <Link to={`/student/listings/${internship?.id}`} className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {internship?.title}
                        </Link>
                        <div className="flex items-center text-sm text-slate-500 space-x-4 mt-1">
                          <span className="flex items-center font-medium">
                            {company?.name}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center">
                            Applied: {app.dateApplied}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center sm:ml-4">
                      <StatusBadge status={app.status} showMatchLabel={true} />
                    </div>
                  </div>
                  <div className="mt-4 ml-16 text-sm text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>
                    <span className="font-semibold text-slate-900 block mb-1">Your Cover Letter</span>
                    <p className="line-clamp-3 leading-relaxed">{app.coverLetter}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
