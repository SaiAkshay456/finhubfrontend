"use client"
import { useEffect, useState } from 'react';
import { Search, Plus, TrendingUp, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import CreateRecommendationModal from '../../components/CreateRecommendationModal';
import * as Popover from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';


export default function RecommendationTable() {
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all recommendations
  const fetchRecommendations = async () => {
    try {
      const res = await fetch('http://localhost:3030/api/v1/recommendations/getRecommendations');
      const data = await res.json();
      if (data.success) {
        setRecommendations(data.data);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    }
  };
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
    try {
      const res = await fetch(`http://localhost:3030/api/v1/recommendations/updateStatus/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchRecommendations(); 
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };
  
  useEffect(() => {
    fetchRecommendations()
    
  }, []);

  const filtered = recommendations.filter(rec =>
    rec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionIcon = (action) => {
    switch (action) {
      case 'Buy': return <TrendingUp className="w-3 h-3" />;
      case 'Sell': return <TrendingUp className="w-3 h-3 rotate-180" />;
      case 'Hold': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'Low': return <CheckCircle2 className="w-3 h-3" />;
      case 'Medium': return <AlertCircle className="w-3 h-3" />;
      case 'High': return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-9xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investment Recommendations</h1>
              <p className="text-gray-600 mt-1">Manage and track your investment recommendations</p>
            </div>
          </div>
          <CreateRecommendationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCreated={() => fetchRecommendations()}
          />
        </div>
        {/* Main Content Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Controls Header */}
          <div className="bg-gradient-to-r from-white to-gray-50/50 px-8 py-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recommendations by name..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm hover:border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Create Button */}
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-5 h-5" />
                Create Recommendation
              </button>
            </div>
          </div>

          

          {/* Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Category</th>
                  {/* <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Sector</th> */}
                  {/* <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Recommendation Date</th> */}
                  <th className="text-left px-8 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Asset Name</th>
                  
                  <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">RMP</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">CMP</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Risk Level</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Action</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                  {/* <th className="text-left px-8 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Remarks</th> */}
                  <th className="text-right px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">More</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
  {filtered.length === 0 ? (
    <tr>
      <td colSpan="11" className="text-center py-16">
        <div className="flex flex-col items-center justify-center">
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recommendations found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first investment recommendation</p>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Create First Recommendation
          </button>
        </div>
      </td>
    </tr>
  ) : (
    filtered.map((rec, index) => (
      <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/20 transition-all duration-200 group">
        {/* Category */}
        <td className="px-6 py-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-xl text-sm font-medium">
            {rec.category}
          </span>
        </td>
        {/* Sector */}
        {/* <td className="px-6 py-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-100 text-pink-700 rounded-xl text-sm font-medium">
            {rec.sector || '—'}
          </span>
        </td> */}

        {/* Recommendation Date */}
        {/* <td className="px-6 py-6">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="font-medium">
              {new Date(rec.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </td> */}

        {/* Asset Name */}
        <td className="px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{rec.name}</p>
              <p className="text-sm text-gray-500">Investment Asset</p>
            </div>
          </div>
        </td>

        

        {/* RMP */}
        <td className="px-6 py-6 text-sm text-gray-800 font-medium">
          ₹{rec.rmp?.toFixed(2) ?? '—'}
        </td>

        {/* CMP */}
        <td className="px-6 py-6 text-sm text-gray-800 font-medium">
          ₹{rec.cmp?.toFixed(2) ?? '—'}
        </td>

        {/* Risk Level */}
        <td className="px-6 py-6">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium ${
            rec.riskProfile === 'Low'
              ? 'bg-green-100 text-green-700'
              : rec.riskProfile === 'Medium'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {getRiskIcon(rec.riskProfile)}
            {rec.riskProfile} Risk
          </span>
        </td>

        {/* Action */}
        <td className="px-6 py-6">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium ${
            rec.action === 'Buy' 
              ? 'bg-green-100 text-green-700' 
              : rec.action === 'Sell'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {getActionIcon(rec.action)}
            {rec.action}
          </span>
        </td>

        {/* Status */}
        <td className="px-6 py-6">
  <button
    onClick={() => handleStatusToggle(rec._id, rec.status)}
    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
      rec.status === 'Active'
        ? 'bg-green-100 text-green-700 hover:bg-green-200'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
    title="Click to toggle status"
  >
    {rec.status === 'Active' ? (
      <CheckCircle2 className="w-3 h-3" />
    ) : (
      <Clock className="w-3 h-3" />
    )}
    {rec.status}
  </button>
</td>


        {/* Remarks */}
        {/* <td className="px-8 py-6">
          <div className="max-w-xs">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
              {rec.remark}
            </p>
          </div>
        </td> */}
        {/* More Options */}
<td className="px-6 py-6 text-right">
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className="p-2 rounded-full hover:bg-gray-100 transition">
        <MoreHorizontal className="w-5 h-5 text-gray-600" />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        align="end"
        sideOffset={8}
        className="w-72 rounded-xl bg-white shadow-lg border border-gray-200 p-4 z-50"
      >
        <div className="space-y-2 text-sm text-gray-700">
          <div>
            <p className="font-semibold text-gray-800 mb-1">Sector</p>
            <p>{rec.sector || '—'}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Date</p>
            <p>
              {new Date(rec.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 mb-1">Remarks</p>
            <p className="line-clamp-3">{rec.remark || '—'}</p>
          </div>
        </div>
        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
</td>

      </tr>
    ))
  )}
        </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}