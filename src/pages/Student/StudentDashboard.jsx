import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data } = useData();

  const myApps = data.applications.filter(a => a.studentId === user.refId);
  const pendingApps = myApps.filter(a => a.status === 'Pending').length;
  const approvedApps = myApps.filter(a => a.status === 'Approved').length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Applications</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{myApps.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Pending</p>
          <p className="mt-2 text-3xl font-bold text-yellow-600">{pendingApps}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Approved</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{approvedApps}</p>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-medium text-slate-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          {myApps.length === 0 ? (
            <p className="text-slate-500 text-sm">No applications submitted yet.</p>
          ) : (
            <ul className="space-y-4">
              {myApps.slice(0, 3).map(app => {
                const internship = data.internships.find(i => i.id === app.internshipId);
                const company = data.companies.find(c => c.id === internship?.companyId);
                return (
                  <li key={app.id} className="text-sm">
                    Applied for <span className="font-semibold text-slate-900">{internship?.title}</span> at <span className="font-semibold">{company?.name}</span> on {app.dateApplied}.
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

export default StudentDashboard;
