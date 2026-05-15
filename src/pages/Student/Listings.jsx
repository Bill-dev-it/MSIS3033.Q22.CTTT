import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter } from 'lucide-react';

const Listings = () => {
  const { data } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredInternships = data.internships.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          data.companies.find(c => c.id === i.companyId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesField = filterField ? i.field === filterField : true;
    const matchesType = filterType ? i.type === filterType : true;
    return matchesSearch && matchesField && matchesType;
  });

  const fields = [...new Set(data.internships.map(i => i.field))];
  const types = [...new Set(data.internships.map(i => i.type))].filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Find Your Next Internship</h1>
        <p className="mt-2 text-slate-500">Discover top opportunities from leading companies.</p>
      </div>

      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by role or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="w-full md:w-48 relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <select 
            value={filterField} 
            onChange={(e) => setFilterField(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer text-sm"
          >
            <option value="">All Fields</option>
            {fields.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="w-full md:w-48">
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer text-sm"
          >
            <option value="">All Types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map(internship => {
          const company = data.companies.find(c => c.id === internship.companyId);
          return (
            <Link 
              key={internship.id} 
              to={`/student/listings/${internship.id}`}
              className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-lg hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1">
                  {company?.logo ? (
                    <img src={company.logo} alt={company.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <Briefcase className="h-6 w-6 text-slate-400" />
                  )}
                </div>
                {internship.type && (
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                    {internship.type}
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{internship.title}</h3>
                <div className="text-slate-500 font-medium text-sm mt-1" onClick={(e) => { e.preventDefault(); navigate(`/companies/${company.id}`); }}>
                  <span className="hover:text-indigo-600 hover:underline cursor-pointer">{company?.name}</span>
                </div>
                
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="mr-2.5 h-4 w-4 text-slate-400" />
                    {internship.location}
                  </div>
                  {internship.salary && (
                    <div className="flex items-center text-sm text-slate-600">
                      <DollarSign className="mr-2.5 h-4 w-4 text-slate-400" />
                      {internship.salary}
                    </div>
                  )}
                  {internship.postedAt && (
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="mr-2.5 h-4 w-4 text-slate-400" />
                      {internship.postedAt}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {filteredInternships.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 border-dashed py-20 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">No internships found</h3>
          <p className="text-slate-500 mt-1 max-w-md">We couldn't find anything matching your criteria. Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
};

export default Listings;
