import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { Briefcase, FileText, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const { data } = useData();

  const myInternships = data.internships.filter(i => i.companyId === user.refId);
  const myApplications = data.applications.filter(a => 
    myInternships.some(i => i.id === a.internshipId)
  );

  const pendingApps = myApplications.filter(a => a.status === 'Pending').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Company Dashboard</h1>
          <p className="mt-2 text-slate-500">Manage your postings and review candidates.</p>
        </div>
        <Link 
          to="/company/post"
          className="inline-flex items-center justify-center py-2.5 px-5 rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Post New Internship
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase className="w-16 h-16 text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Active Postings</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-extrabold text-slate-900">{myInternships.length}</p>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 w-max px-2 py-1 rounded-md">
            <TrendingUp className="w-3 h-3 mr-1" /> 12% vs last month
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-16 h-16 text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Applications</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-extrabold text-slate-900">{myApplications.length}</p>
          </div>
          <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 w-max px-2 py-1 rounded-md">
            <TrendingUp className="w-3 h-3 mr-1" /> 24% vs last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-2xl shadow-md border border-indigo-400 relative overflow-hidden group text-white">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-16 h-16 text-white" />
          </div>
          <p className="text-sm font-semibold text-indigo-100 uppercase tracking-wider">Pending Review</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-4xl font-extrabold text-white">{pendingApps}</p>
          </div>
          {pendingApps > 0 && (
            <Link to="/company/applications" className="mt-4 inline-flex items-center text-sm font-medium text-white hover:text-indigo-100 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors">
              Review now <ArrowUpRight className="w-3 h-3 ml-1" />
            </Link>
          )}
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">Your Recent Postings</h2>
          <Link to="/company/applications" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">View All Apps &rarr;</Link>
        </div>
        <div className="p-0">
          {myInternships.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Briefcase className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <p>No internships posted yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {myInternships.map(internship => {
                const appsForThis = myApplications.filter(a => a.internshipId === internship.id);
                const pendingForThis = appsForThis.filter(a => a.status === 'Pending').length;
                
                return (
                  <li key={internship.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <Link to={`/student/listings/${internship.id}`} className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                          {internship.title}
                        </Link>
                        <div className="flex items-center mt-1 text-sm text-slate-500 space-x-3">
                          <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">{internship.type || 'N/A'}</span>
                          <span>{internship.location}</span>
                          <span>Deadline: {internship.deadline}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-sm font-semibold text-slate-900">
                          {appsForThis.length} Total Applicants
                        </div>
                        {pendingForThis > 0 ? (
                          <div className="text-xs font-medium text-amber-600 mt-1">
                            {pendingForThis} pending review
                          </div>
                        ) : (
                          <div className="text-xs font-medium text-slate-400 mt-1">
                            All reviewed
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
      </div>
    </div>
  );
};

export default CompanyDashboard;
