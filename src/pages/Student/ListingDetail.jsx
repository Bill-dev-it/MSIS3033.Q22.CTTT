import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Briefcase, Calendar, Building, DollarSign, Clock, ArrowLeft, CheckCircle } from 'lucide-react';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, addApplication } = useData();
  const { user } = useAuth();
  
  const [coverLetter, setCoverLetter] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [toast, setToast] = useState(null);

  const internship = data.internships.find(i => i.id === id);
  
  if (!internship) return <div>Internship not found.</div>;

  const company = data.companies.find(c => c.id === internship.companyId);
  const hasApplied = data.applications.some(a => a.internshipId === id && a.studentId === user.refId);

  const handleApply = (e) => {
    e.preventDefault();
    const newApp = {
      id: `a${Date.now()}`,
      studentId: user.refId,
      internshipId: internship.id,
      coverLetter,
      cvName: cvFile ? cvFile.name : null,
      status: 'Pending',
      dateApplied: new Date().toISOString().split('T')[0]
    };
    addApplication(newApp);
    setIsApplying(false);
    setToast('Application submitted successfully!');
    setTimeout(() => navigate('/student/applications'), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {toast}
        </div>
      )}
      <button 
        onClick={() => navigate('/student/listings')}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to listings
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
        
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 mb-8 gap-4">
            <div className="flex items-end space-x-5">
              <div className="h-24 w-24 bg-white rounded-2xl shadow-md border-4 border-white flex items-center justify-center p-2 overflow-hidden">
                {company?.logo ? (
                  <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <Building className="h-10 w-10 text-slate-300" />
                )}
              </div>
              <div className="pb-1">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{internship.title}</h1>
                <Link to={`/companies/${company?.id}`} className="text-lg font-medium text-indigo-600 hover:text-indigo-800 hover:underline mt-1 inline-block">{company?.name}</Link>
              </div>
            </div>
            
            {!hasApplied && !isApplying && (
              <button
                onClick={() => setIsApplying(true)}
                className="flex-shrink-0 flex items-center justify-center py-3 px-6 rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>
            )}
            {hasApplied && (
              <div className="flex-shrink-0 flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 font-medium text-sm">
                <CheckCircle className="mr-2 h-5 w-5" />
                Applied
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {internship.description}
                </div>
              </section>

              {isApplying && (
                <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Submit Application</h3>
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-semibold text-slate-700 mb-2">
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        rows={5}
                        required
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="block w-full rounded-xl border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-4 transition-colors"
                        placeholder="Explain why you are a good fit for this role..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Upload Resume (CV)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 transition-colors bg-white">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-slate-600 justify-center">
                            <label htmlFor="cv-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Upload a file</span>
                              <input id="cv-upload" name="cv-upload" type="file" className="sr-only" onChange={(e) => setCvFile(e.target.files[0])} accept=".pdf,.doc,.docx" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-slate-500">
                            {cvFile ? <span className="font-bold text-indigo-600">{cvFile.name}</span> : 'PDF, DOC up to 10MB'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        className="flex-1 justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                      >
                        Submit Application
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="flex-1 justify-center py-3 px-4 border border-slate-300 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Job Overview</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-indigo-500 mr-3 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Location</p>
                      <p className="text-sm font-semibold text-slate-900">{internship.location}</p>
                    </div>
                  </li>
                  {internship.type && (
                    <li className="flex items-start">
                      <Briefcase className="h-5 w-5 text-indigo-500 mr-3 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Job Type</p>
                        <p className="text-sm font-semibold text-slate-900">{internship.type}</p>
                      </div>
                    </li>
                  )}
                  {internship.salary && (
                    <li className="flex items-start">
                      <DollarSign className="h-5 w-5 text-indigo-500 mr-3 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Salary</p>
                        <p className="text-sm font-semibold text-slate-900">{internship.salary}</p>
                      </div>
                    </li>
                  )}
                  <li className="flex items-start">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-3 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Deadline</p>
                      <p className="text-sm font-semibold text-slate-900">{internship.deadline}</p>
                    </div>
                  </li>
                  {internship.postedAt && (
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-indigo-500 mr-3 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Posted</p>
                        <p className="text-sm font-semibold text-slate-900">{internship.postedAt}</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
