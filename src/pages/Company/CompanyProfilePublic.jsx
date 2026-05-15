import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { MapPin, Briefcase, ExternalLink, Users, ArrowLeft, DollarSign, Clock } from 'lucide-react';

const CompanyProfilePublic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useData();

  const company = data.companies.find(c => c.id === id);
  const activeInternships = data.internships.filter(i => i.companyId === id);

  if (!company) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Company not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-indigo-600 hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="h-48 md:h-64 w-full bg-slate-200 relative">
          <img 
            src={company.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        {/* Header Info */}
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-6 gap-4">
            <div className="flex items-end space-x-5">
              <div className="h-28 w-28 bg-white rounded-2xl shadow-lg border-4 border-white flex items-center justify-center p-2 overflow-hidden z-10">
                <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
              </div>
              <div className="pb-2 z-10">
                <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">{company.name}</h1>
                <p className="text-lg font-medium text-slate-100 drop-shadow-md mt-1">{company.industry}</p>
              </div>
            </div>
            
            <div className="flex gap-3 sm:mt-0 mt-4">
              <a href="#" className="flex items-center justify-center py-2.5 px-5 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors">
                <ExternalLink className="mr-2 h-4 w-4" />
                Website
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">About Us</h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {company.description || 'No description provided.'}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Company Overview</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-indigo-500 mr-3 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Headquarters</p>
                      <p className="text-sm font-semibold text-slate-900">{company.location}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="h-5 w-5 text-indigo-500 mr-3 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Company Size</p>
                      <p className="text-sm font-semibold text-slate-900">1,000+ employees</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Jobs Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
          Open Positions <span className="ml-3 bg-indigo-100 text-indigo-700 text-sm py-1 px-3 rounded-full">{activeInternships.length}</span>
        </h2>
        
        {activeInternships.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center text-slate-500">
            There are currently no open positions at this company.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeInternships.map(internship => (
              <Link 
                key={internship.id} 
                to={`/student/listings/${internship.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-lg hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1">
                    <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  {internship.type && (
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                      {internship.type}
                    </span>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{internship.title}</h3>
                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="mr-2.5 h-4 w-4 text-slate-400" />
                      {internship.location}
                    </div>
                    {internship.salary && (
                      <div className="flex items-center text-sm text-slate-600">
                        <DollarSign className="mr-2.5 h-4 w-4 text-slate-400" />
                        {internship.salary}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="mr-2.5 h-4 w-4 text-slate-400" />
                      Deadline: {internship.deadline}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfilePublic;
