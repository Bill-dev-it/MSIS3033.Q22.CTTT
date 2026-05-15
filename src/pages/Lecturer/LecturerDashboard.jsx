import React, { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/StatusBadge';
import { Building, UserCircle, Briefcase, Calendar, GraduationCap, Users, CheckCircle, Clock, XCircle } from 'lucide-react';

const LecturerDashboard = () => {
  const { data } = useData();

  // Build a flat list of all student applications with their details
  const studentAppData = useMemo(() => {
    return data.applications.map(app => {
      const student = data.students.find(s => s.id === app.studentId);
      const internship = data.internships.find(i => i.id === app.internshipId);
      const company = internship ? data.companies.find(c => c.id === internship.companyId) : null;
      return { app, student, internship, company };
    }).filter(item => item.student && item.internship)
      .sort((a, b) => {
        // Sort by status: Approved first, then Pending, then Rejected
        const order = { Approved: 0, Pending: 1, Rejected: 2 };
        return (order[a.app.status] ?? 3) - (order[b.app.status] ?? 3);
      });
  }, [data]);

  const totalStudents = data.students.length;
  const totalApps = data.applications.length;
  const matchedCount = data.applications.filter(a => a.status === 'Approved').length;
  const pendingCount = data.applications.filter(a => a.status === 'Pending').length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Monitoring</h1>
        <p className="mt-2 text-slate-500">Overview of all student internship applications, matching status, and progress.</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Total Students</p>
            <p className="text-2xl font-extrabold text-slate-900">{totalStudents}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Total Applications</p>
            <p className="text-2xl font-extrabold text-slate-900">{totalApps}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Matched</p>
            <p className="text-2xl font-extrabold text-green-700">{matchedCount}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-yellow-50 rounded-xl">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Pending</p>
            <p className="text-2xl font-extrabold text-yellow-700">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* Monitoring Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Student Internship Status</h2>
          <span className="text-sm text-slate-500">{studentAppData.length} records</span>
        </div>
        
        {studentAppData.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <UserCircle className="h-16 w-16 text-slate-200 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No applications yet</h3>
            <p className="text-slate-500 mt-1 max-w-sm">There are currently no student internship applications to monitor.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">University</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Internship Applied</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Field</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {studentAppData.map(({ app, student, internship, company }) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={student.avatar} alt={student.name} className="h-9 w-9 rounded-full border border-slate-200 mr-3" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500">{student.major}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{student.university}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{internship.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-slate-600">
                        {company?.logo && (
                          <img src={company.logo} alt={company.name} className="h-6 w-6 rounded mr-2 object-contain" />
                        )}
                        {company?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">{internship.field}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{app.dateApplied}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={app.status} showMatchLabel={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerDashboard;
