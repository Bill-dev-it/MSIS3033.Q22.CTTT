import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/StatusBadge';
import { CheckCircle, XCircle, UserCircle, Briefcase, Users } from 'lucide-react';

const ManageApplications = () => {
  const { user } = useAuth();
  const { data, updateApplicationStatus } = useData();

  const [selectedCv, setSelectedCv] = useState(null);
  const [toast, setToast] = useState(null);

  const myInternships = data.internships.filter(i => i.companyId === user.refId);
  const myApplications = data.applications.filter(a => 
    myInternships.some(i => i.id === a.internshipId)
  ).sort((a, b) => {
    // Sort pending first
    if (a.status === 'Pending' && b.status !== 'Pending') return -1;
    if (a.status !== 'Pending' && b.status === 'Pending') return 1;
    return new Date(b.dateApplied) - new Date(a.dateApplied);
  });

  const handleStatusUpdate = (appId, status) => {
    updateApplicationStatus(appId, status);
    const label = status === 'Approved' ? 'matched to this internship' : 'rejected';
    setToast(`Student has been ${label} successfully.`);
    setTimeout(() => setToast(null), 3000);
  };

  const pendingCount = myApplications.filter(a => a.status === 'Pending').length;
  const matchedCount = myApplications.filter(a => a.status === 'Approved').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Internship Matching</h1>
        <p className="mt-2 text-slate-500">Review candidates and match students to your internship positions.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Applicants</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{myApplications.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
          <p className="text-sm font-semibold text-yellow-700">Pending Review</p>
          <p className="text-2xl font-extrabold text-yellow-800 mt-1">{pendingCount}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <p className="text-sm font-semibold text-green-700">Matched</p>
          <p className="text-2xl font-extrabold text-green-800 mt-1">{matchedCount}</p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {toast}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {myApplications.length === 0 ? (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center">
            <UserCircle className="h-16 w-16 text-slate-200 mb-4" />
            <p className="text-lg font-medium text-slate-700">No applications received yet.</p>
            <p className="mt-1">When students apply, they will appear here for matching.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {myApplications.map(app => {
              const internship = myInternships.find(i => i.id === app.internshipId);
              const student = data.students.find(s => s.id === app.studentId);
              
              return (
                <li key={app.id} className="p-6 sm:p-8 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col xl:flex-row gap-6">
                    {/* Left: Applicant Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <img src={student?.avatar} alt={student?.name} className="h-14 w-14 rounded-full shadow-sm border border-slate-200" />
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{student?.name}</h3>
                            <p className="text-sm font-medium text-slate-600 mt-0.5">
                              {student?.university} • {student?.major}
                            </p>
                          </div>
                        </div>
                        <div className="xl:hidden">
                          <StatusBadge status={app.status} showMatchLabel={true} />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 relative mt-4">
                        <div className="absolute -top-2 left-8 w-4 h-4 bg-slate-50 border-t border-l border-slate-200 transform rotate-45"></div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cover Letter</h4>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed mb-4">{app.coverLetter}</p>
                        
                        {app.cvName && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Attached Resume</h4>
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 w-max cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors" onClick={() => setSelectedCv(app.cvName)}>
                              <div className="bg-red-100 p-2 rounded text-red-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-slate-700">{app.cvName}</p>
                                <p className="text-xs text-slate-400">PDF Document</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Right: Job Info & Actions */}
                    <div className="xl:w-1/3 flex flex-col justify-between space-y-4 xl:pl-6 xl:border-l xl:border-slate-100">
                      <div>
                        <div className="hidden xl:flex justify-end mb-4">
                          <StatusBadge status={app.status} showMatchLabel={true} />
                        </div>
                        <div className="text-sm text-slate-600 space-y-2">
                          <p className="flex items-start">
                            <Briefcase className="w-4 h-4 mr-2 text-indigo-500 shrink-0 mt-0.5" />
                            <span>Applied for <span className="font-semibold text-slate-900">{internship?.title}</span></span>
                          </p>
                          <p className="text-slate-500 text-xs ml-6">on {app.dateApplied}</p>
                        </div>
                      </div>

                      {app.status === 'Pending' && (
                        <div className="flex gap-3 pt-4 border-t border-slate-100 xl:border-0">
                          <button
                            onClick={() => handleStatusUpdate(app.id, 'Approved')}
                            className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-xl shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all hover:-translate-y-0.5"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Match Student
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                            className="flex-1 inline-flex justify-center items-center px-4 py-2.5 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-red-50 hover:text-red-700 hover:border-red-200 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* CV Modal Mockup */}
      {selectedCv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                {selectedCv}
              </h3>
              <button onClick={() => setSelectedCv(null)} className="text-slate-400 hover:text-slate-700 transition-colors p-2 hover:bg-slate-200 rounded-lg">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 p-8 overflow-y-auto bg-slate-100 flex justify-center">
              {/* Fake PDF rendering */}
              <div className="w-full max-w-2xl bg-white shadow-md min-h-[800px] p-12 text-slate-800">
                <h1 className="text-3xl font-bold border-b-2 border-slate-900 pb-4 mb-6 uppercase tracking-wider">Curriculum Vitae</h1>
                <div className="space-y-8">
                  <section>
                    <h2 className="text-xl font-bold text-indigo-600 mb-2">Education</h2>
                    <p className="font-semibold">University of Information Technology (UIT)</p>
                    <p className="text-slate-600">Major: Software Engineering | 2024 - 2028</p>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold text-indigo-600 mb-2">Technical Skills</h2>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Programming Languages: JavaScript, Python, Java</li>
                      <li>Frameworks: React, Node.js, Express</li>
                      <li>Tools: Git, Docker, Figma</li>
                    </ul>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold text-indigo-600 mb-2">Projects</h2>
                    <div className="mb-4">
                      <p className="font-semibold">SIMS – Student Internship Management System</p>
                      <p className="text-slate-600 text-sm">Fullstack Developer | May 2026</p>
                      <p className="text-sm mt-1">Built a comprehensive internship management portal using React and Tailwind CSS featuring role-based dashboards.</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
