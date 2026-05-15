import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const PostInternship = () => {
  const { user } = useAuth();
  const { addInternship } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    field: 'IT',
    location: '',
    deadline: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInternship = {
      id: `i${Date.now()}`,
      companyId: user.refId,
      ...formData
    };
    addInternship(newInternship);
    navigate('/company');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Post New Internship</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Internship Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="field" className="block text-sm font-medium text-slate-700">Field</label>
              <select
                name="field"
                id="field"
                value={formData.field}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              >
                <option value="IT">IT / Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Data">Data Analytics</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
              <input
                type="text"
                name="location"
                id="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
              />
            </div>
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-slate-700">Application Deadline</label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              required
              value={formData.deadline}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description & Requirements</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Publish Internship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostInternship;
