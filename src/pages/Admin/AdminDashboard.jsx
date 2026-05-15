import React, { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import { StatusBadge } from '../../components/StatusBadge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Users, Building, Briefcase, FileText, TrendingUp, ArrowUpRight, GraduationCap, RotateCcw, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { data, resetData } = useData();
  const [toast, setToast] = useState(null);

  const totalStudents = data.students.length;
  const totalCompanies = data.companies.length;
  const totalInternships = data.internships.length;
  const totalApplications = data.applications.length;
  const pendingApps = data.applications.filter(a => a.status === 'Pending').length;
  const approvedApps = data.applications.filter(a => a.status === 'Approved').length;
  const rejectedApps = data.applications.filter(a => a.status === 'Rejected').length;

  // Prepare data for BarChart: Applications by company
  const appsByCompanyData = useMemo(() => {
    const counts = {};
    data.companies.forEach(c => {
      counts[c.name] = 0;
    });

    data.applications.forEach(app => {
      const internship = data.internships.find(i => i.id === app.internshipId);
      if (internship) {
        const company = data.companies.find(c => c.id === internship.companyId);
        if (company) {
          counts[company.name]++;
        }
      }
    });

    return Object.keys(counts).map(name => ({
      name,
      Applications: counts[name]
    })).sort((a, b) => b.Applications - a.Applications);
  }, [data]);

  // Applications by field/category
  const appsByFieldData = useMemo(() => {
    const counts = {};
    data.applications.forEach(app => {
      const internship = data.internships.find(i => i.id === app.internshipId);
      if (internship) {
        counts[internship.field] = (counts[internship.field] || 0) + 1;
      }
    });
    return Object.keys(counts).map(name => ({
      name,
      Applications: counts[name]
    })).sort((a, b) => b.Applications - a.Applications);
  }, [data]);

  // Prepare data for PieChart: Applications by status
  const appsByStatusData = useMemo(() => {
    return [
      { name: 'Matched', value: approvedApps },
      { name: 'Pending', value: pendingApps },
      { name: 'Rejected', value: rejectedApps },
    ];
  }, [approvedApps, pendingApps, rejectedApps]);

  // Mock data for AreaChart (Applications over time)
  const timeData = [
    { date: 'Week 1', apps: 4 },
    { date: 'Week 2', apps: 7 },
    { date: 'Week 3', apps: 12 },
    { date: 'Week 4', apps: 9 },
    { date: 'Week 5', apps: 15 },
    { date: 'Week 6', apps: 11 },
    { date: 'Week 7', apps: 20 },
  ];

  const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444']; // Emerald, Amber, Red
  const FIELD_COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const handleReset = () => {
    resetData();
    setToast('Demo data has been reset successfully!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {toast}
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reporting Dashboard</h1>
          <p className="mt-2 text-slate-500">SIMS – Real-time metrics and analytics overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            +18% growth this week
          </div>
          <button
            onClick={handleReset}
            className="flex items-center text-sm font-medium text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Demo Data
          </button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Students</p>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">{totalStudents}</p>
          <div className="mt-4 text-xs font-medium text-emerald-600 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +5 this month
          </div>
          <div className="absolute -bottom-4 -right-4 text-slate-50 opacity-50 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-24 h-24" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Companies</p>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">{totalCompanies}</p>
          <div className="mt-4 text-xs font-medium text-slate-400 flex items-center">
            No change
          </div>
          <div className="absolute -bottom-4 -right-4 text-slate-50 opacity-50 group-hover:scale-110 transition-transform">
            <Building className="w-24 h-24" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Internships</p>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">{totalInternships}</p>
          <div className="mt-4 text-xs font-medium text-emerald-600 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +5 this week
          </div>
          <div className="absolute -bottom-4 -right-4 text-slate-50 opacity-50 group-hover:scale-110 transition-transform">
            <Briefcase className="w-24 h-24" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Applications</p>
            <div className="p-2 bg-amber-50 rounded-lg">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <p className="text-4xl font-extrabold text-slate-900">{totalApplications}</p>
          <div className="mt-4 text-xs font-medium text-emerald-600 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +12 this week
          </div>
          <div className="absolute -bottom-4 -right-4 text-slate-50 opacity-50 group-hover:scale-110 transition-transform">
            <FileText className="w-24 h-24" />
          </div>
        </div>
      </div>

      {/* Status breakdown cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-extrabold text-yellow-800 mt-1">{pendingApps}</p>
          </div>
          <div className="text-yellow-300">
            <FileText className="w-12 h-12" />
          </div>
        </div>
        <div className="bg-green-50 p-5 rounded-2xl border border-green-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-700 uppercase tracking-wider">Matched</p>
            <p className="text-3xl font-extrabold text-green-800 mt-1">{approvedApps}</p>
          </div>
          <div className="text-green-300">
            <CheckCircle className="w-12 h-12" />
          </div>
        </div>
        <div className="bg-red-50 p-5 rounded-2xl border border-red-200 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-red-700 uppercase tracking-wider">Rejected</p>
            <p className="text-3xl font-extrabold text-red-800 mt-1">{rejectedApps}</p>
          </div>
          <div className="text-red-300">
            <FileText className="w-12 h-12" />
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Application Trends</h2>
            <select className="text-sm border-slate-200 rounded-lg text-slate-600 bg-slate-50 py-1 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500">
              <option>Last 7 weeks</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <RechartsTooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', padding: '12px'}} 
                  itemStyle={{color: '#0f172a', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Application Status</h2>
          <div className="h-72 w-full flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appsByStatusData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {appsByStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                  itemStyle={{color: '#0f172a', fontWeight: 'bold'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Companies Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Applications by Company</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appsByCompanyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} allowDecimals={false} />
                <RechartsTooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="Applications" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={48}>
                  {appsByCompanyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Applications by Field Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Applications by Field</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appsByFieldData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} allowDecimals={false} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} width={80} />
                <RechartsTooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="Applications" radius={[0, 6, 6, 0]} barSize={28}>
                  {appsByFieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FIELD_COLORS[index % FIELD_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Internship</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Field</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data.applications
                .sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied))
                .slice(0, 10)
                .map(app => {
                  const student = data.students.find(s => s.id === app.studentId);
                  const internship = data.internships.find(i => i.id === app.internshipId);
                  const company = internship ? data.companies.find(c => c.id === internship.companyId) : null;
                  return (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={student?.avatar} alt={student?.name} className="h-8 w-8 rounded-full mr-3" />
                          <div className="text-sm font-medium text-slate-900">{student?.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{internship?.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{company?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{internship?.field}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{app.dateApplied}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={app.status} showMatchLabel={true} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
