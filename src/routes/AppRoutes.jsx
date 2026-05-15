import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Login from '../pages/Auth/Login';

// Student Pages
import StudentDashboard from '../pages/Student/StudentDashboard';
import Listings from '../pages/Student/Listings';
import ListingDetail from '../pages/Student/ListingDetail';
import MyApplications from '../pages/Student/MyApplications';

// Company Pages
import CompanyDashboard from '../pages/Company/CompanyDashboard';
import PostInternship from '../pages/Company/PostInternship';
import ManageApplications from '../pages/Company/ManageApplications';
import CompanyProfilePublic from '../pages/Company/CompanyProfilePublic';

// Shared Pages
import Messages from '../pages/Shared/Messages';
import DemoGuide from '../pages/Shared/DemoGuide';

// Lecturer Pages
import LecturerDashboard from '../pages/Lecturer/LecturerDashboard';

// Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard';
import SystemUsers from '../pages/Admin/SystemUsers';
import AllInternships from '../pages/Admin/AllInternships';

// Auth guard - redirects unauthenticated users to /login
const RequireAuth = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};

// Role-specific guard
const PrivateRoute = ({ allowedRole }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to={`/${user.role.toLowerCase()}`} replace />;
  
  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/demo-guide" element={<DemoGuide />} />

      <Route element={<Layout />}>
        {/* Student Routes */}
        <Route element={<PrivateRoute allowedRole="Student" />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/listings" element={<Listings />} />
          <Route path="/student/listings/:id" element={<ListingDetail />} />
          <Route path="/student/applications" element={<MyApplications />} />
        </Route>

        {/* Shared Routes - any logged-in user can access */}
        <Route element={<RequireAuth />}>
          <Route path="/companies/:id" element={<CompanyProfilePublic />} />
          <Route path="/messages" element={<Messages />} />
        </Route>

        {/* Company Routes */}
        <Route element={<PrivateRoute allowedRole="Company" />}>
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/company/post" element={<PostInternship />} />
          <Route path="/company/applications" element={<ManageApplications />} />
        </Route>

        {/* Lecturer Routes */}
        <Route element={<PrivateRoute allowedRole="Lecturer" />}>
          <Route path="/lecturer" element={<LecturerDashboard />} />
          <Route path="/lecturer/students" element={<LecturerDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRole="Admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<SystemUsers />} />
          <Route path="/admin/internships" element={<AllInternships />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
