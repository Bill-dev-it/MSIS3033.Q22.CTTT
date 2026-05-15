import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Users, Building, Briefcase, FileText, Eye, BarChart3, CheckCircle, Search, ClipboardList } from 'lucide-react';

const DemoGuide = () => {
  const accounts = [
    { username: 'student_a', password: '123', role: 'Student', desc: 'Nguyen Van A – Browse and apply for internships' },
    { username: 'fpt_hr', password: '123', role: 'Company', desc: 'FPT Software HR – Review and match applicants' },
    { username: 'lecturer', password: '123', role: 'Lecturer', desc: 'Dr. Le Minh – Monitor student internship progress' },
    { username: 'admin', password: '123', role: 'Admin', desc: 'System Admin – View reporting dashboard' },
  ];

  const demoSteps = [
    { step: 1, role: 'Admin', action: 'Login as admin / 123', detail: 'View Reporting Dashboard with KPIs, charts, and application status breakdown.', icon: BarChart3 },
    { step: 2, role: 'Admin', action: 'Browse admin pages', detail: 'Check Student Management, Enterprise Management pages.', icon: Users },
    { step: 3, role: 'Student', action: 'Login as student_a / 123', detail: 'View Student Dashboard with application summary.', icon: GraduationCap },
    { step: 4, role: 'Student', action: 'Go to Internship Registration', detail: 'Search and filter internships by field, type, or keyword.', icon: Search },
    { step: 5, role: 'Student', action: 'Click on an internship', detail: 'View detail, then click "Apply Now" → fill cover letter → Submit.', icon: FileText },
    { step: 6, role: 'Student', action: 'Check My Applications', detail: 'See the new application with Pending status.', icon: ClipboardList },
    { step: 7, role: 'Company', action: 'Login as fpt_hr / 123', detail: 'View Company Dashboard → go to Matching / Applications.', icon: Building },
    { step: 8, role: 'Company', action: 'Match or reject a student', detail: 'Click "Match Student" to approve, or "Reject". Toast notification confirms.', icon: CheckCircle },
    { step: 9, role: 'Admin', action: 'Login as admin / 123', detail: 'Verify updated application counts and status in Reporting Dashboard.', icon: BarChart3 },
    { step: 10, role: 'Lecturer', action: 'Login as lecturer / 123', detail: 'View Student Monitoring table with all applications and matched status.', icon: Eye },
  ];

  const features = [
    { label: 'Student Management', desc: 'Admin manages student accounts and views student info.' },
    { label: 'Enterprise Management', desc: 'Admin manages company/enterprise partnerships and postings.' },
    { label: 'Internship Registration', desc: 'Students browse, search, filter, and apply for internships.' },
    { label: 'Matching / Assignment', desc: 'Companies review applications and match students to internships.' },
    { label: 'Search & Filter', desc: 'Keyword search, field filter, and type filter for internship listings.' },
    { label: 'Reporting Dashboard', desc: 'Admin dashboard with KPIs, charts, status breakdowns, and trends.' },
    { label: 'Student Monitoring', desc: 'Lecturer monitors all student applications and matched status.' },
    { label: 'Messaging', desc: 'In-app communication between students and company HR.' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link to="/login" className="inline-flex items-center text-indigo-200 hover:text-white text-sm font-medium mb-6 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="h-7 w-7 text-indigo-600" />
            </div>
            <span className="text-3xl font-bold tracking-tight">SIMS Demo Guide</span>
          </div>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Student Internship Management System — Presentation demo guide with accounts, recommended flow, and feature mapping.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Demo Accounts */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Users className="mr-3 h-6 w-6 text-indigo-600" />
            Demo Accounts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map(acc => (
              <div key={acc.username} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">{acc.role}</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">Username:</span>{' '}
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-700 font-mono text-sm">{acc.username}</code>
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">Password:</span>{' '}
                    <code className="bg-slate-100 px-2 py-0.5 rounded text-indigo-700 font-mono text-sm">{acc.password}</code>
                  </p>
                </div>
                <p className="text-xs text-slate-500 mt-3">{acc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Demo Flow */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <ClipboardList className="mr-3 h-6 w-6 text-indigo-600" />
            Recommended Demo Flow (5–7 min)
          </h2>
          <div className="space-y-4">
            {demoSteps.map(s => (
              <div key={s.step} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">{s.role}</span>
                    <h3 className="text-base font-bold text-slate-900">{s.action}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{s.detail}</p>
                </div>
                <s.icon className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </section>

        {/* Feature Mapping */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <Briefcase className="mr-3 h-6 w-6 text-indigo-600" />
            Feature Mapping (Report Terms)
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {features.map(f => (
                  <tr key={f.label} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-700">{f.label}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 border-t border-slate-200">
          <p className="text-sm text-slate-400">SIMS – Student Internship Management System | PMBOK + SCRUM Project Demo</p>
          <Link to="/login" className="inline-flex items-center mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            Go to Login →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DemoGuide;
