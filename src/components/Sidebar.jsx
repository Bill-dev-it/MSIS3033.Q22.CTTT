import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Users, 
  PlusSquare,
  GraduationCap,
  Building,
  ClipboardList,
  BookOpen,
  Eye
} from 'lucide-react';
import { cn } from './StatusBadge';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  let links = [];

  switch (user.role) {
    case 'Student':
      links = [
        { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
        { name: 'Internship Registration', path: '/student/listings', icon: Briefcase },
        { name: 'My Applications', path: '/student/applications', icon: FileText },
      ];
      break;
    case 'Company':
      links = [
        { name: 'Dashboard', path: '/company', icon: LayoutDashboard },
        { name: 'Post Internship', path: '/company/post', icon: PlusSquare },
        { name: 'Matching / Applications', path: '/company/applications', icon: ClipboardList },
      ];
      break;
    case 'Lecturer':
      links = [
        { name: 'Student Monitoring', path: '/lecturer', icon: Eye },
      ];
      break;
    case 'Admin':
      links = [
        { name: 'Reporting Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Student Management', path: '/admin/users', icon: GraduationCap },
        { name: 'Enterprise Management', path: '/admin/internships', icon: Building },
      ];
      break;
    default:
      break;
  }

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-full flex flex-col shadow-sm z-20 relative">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">SIMS Portal</h2>
      </div>
      
      <div className="px-4 pt-6 pb-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">Menu</p>
        <nav className="space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path.split('/').length === 2}
              className={({ isActive }) => cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 shadow-sm" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <link.icon className={cn(
                "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                // eslint-disable-next-line react/prop-types
                window.location.pathname === link.path ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"
              )} />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
