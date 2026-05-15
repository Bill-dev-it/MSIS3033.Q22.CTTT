import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { LogOut, UserCircle, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { data } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Unread messages logic
  const unreadCount = data.messages?.filter(m => m.receiverId === user.id && !m.read).length || 0;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
      <div className="flex-1"></div>
      <div className="flex items-center space-x-5">
        <Link to="/messages" className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
          <MessageSquare className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </Link>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center space-x-3 text-slate-700">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-sm" />
          ) : (
            <UserCircle className="h-9 w-9 text-slate-400" />
          )}
          <div className="text-sm">
            <p className="font-semibold text-slate-900 leading-tight">{user.name}</p>
            <p className="text-xs text-slate-500 font-medium">{user.role}</p>
          </div>
        </div>
        <div className="h-6 w-px bg-slate-200"></div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
