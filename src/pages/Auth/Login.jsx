import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, ArrowRight, BookOpen } from 'lucide-react';

const Login = () => {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(formData.username, formData.password);
    if (result.success) {
      navigate(`/${result.role.toLowerCase()}`);
    }
  };

  const fillDemoCreds = (username) => {
    setFormData({ username, password: '123' });
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Pane - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden flex-col justify-center px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-blue-800 opacity-90"></div>
        <div className="relative z-10 text-white max-w-lg">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="h-7 w-7 text-indigo-600" />
            </div>
            <span className="text-3xl font-bold tracking-tight">SIMS Portal</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-6 leading-tight">
            Student Internship Management System
          </h1>
          <p className="text-indigo-100 text-lg mb-10 leading-relaxed">
            The university platform for managing student internships — connecting students with enterprise opportunities through systematic matching and monitoring.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-3xl font-bold text-white mb-1">5,000+</p>
              <p className="text-indigo-200 text-sm font-medium">Active Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <p className="text-3xl font-bold text-white mb-1">1,200+</p>
              <p className="text-indigo-200 text-sm font-medium">Partner Companies</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white relative">
        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">SIMS Portal</span>
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome back</h2>
          <p className="text-slate-500 mb-8">Please enter your details to sign in.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white"
                placeholder="e.g. student_a"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-slate-50 focus:bg-white"
                placeholder="••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-md text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Demo Access (Pwd: 123)</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => fillDemoCreds('student_a')} className="text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">Student (student_a)</button>
              <button onClick={() => fillDemoCreds('fpt_hr')} className="text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">Company (fpt_hr)</button>
              <button onClick={() => fillDemoCreds('lecturer')} className="text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">Lecturer (lecturer)</button>
              <button onClick={() => fillDemoCreds('admin')} className="text-xs py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors">Admin (admin)</button>
            </div>
          </div>

          {/* Demo Guide Link */}
          <div className="mt-6 text-center">
            <Link to="/demo-guide" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              <BookOpen className="mr-1.5 h-4 w-4" />
              View Demo Guide & Instructions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
