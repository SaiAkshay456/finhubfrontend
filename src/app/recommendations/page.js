"use client"
import { useEffect, useState, useMemo } from 'react';
import { Search, Plus, TrendingUp, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import CreateRecommendationModal from "../../components/CreateRecommendationModal";
import * as Popover from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import axiosInstance from '../../helpers/axios';
ModuleRegistry.registerModules([AllCommunityModule]);


export default function RecommendationTable() {
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all recommendations
  const fetchRecommendations = async () => {
    try {
      const { data } = await axiosInstance.get('/v1/recommendations/getRecommendations');

      console.log(data)
      if (data.success) {
        setRecommendations(data.data);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Closed' : 'Active';

    const confirmed = window.confirm(
      `Are you sure you want to change the status to "${newStatus}"?`
    );

    if (!confirmed) return;

    try {
      const { data } = await axiosInstance.patch(
        `/v1/recommendations/updateStatus/${id}`,
        { status: newStatus },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

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

  // Category Cell Renderer
  const CategoryCellRenderer = (params) => {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-xl text-sm font-medium">
        {params.value}
      </span>
    );
  };

  // Asset Name Cell Renderer
  const AssetNameCellRenderer = (params) => {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{params.value}</p>
          <p className="text-sm text-gray-500">Investment Asset</p>
        </div>
      </div>
    );
  };

  // Price Cell Renderer
  const PriceCellRenderer = (params) => {
    return (
      <span className="text-sm text-gray-800 font-medium">
        ₹{params.value?.toFixed(2) ?? '—'}
      </span>
    );
  };

  // Gain/Loss Cell Renderer
  const GainLossCellRenderer = (params) => {
    return (
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium bg-green-100 text-green-700">
        +50%
      </span>
    );
  };

  // Risk Level Cell Renderer
  const RiskLevelCellRenderer = (params) => {
    const risk = params.value;
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium ${risk === 'Low'
        ? 'bg-green-100 text-green-700'
        : risk === 'Medium'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-red-100 text-red-700'
        }`}>
        {getRiskIcon(risk)}
        {risk} Risk
      </span>
    );
  };

  // Action Cell Renderer
  const ActionCellRenderer = (params) => {
    const action = params.value;
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium ${action === 'Buy'
        ? 'bg-green-100 text-green-700'
        : action === 'Sell'
          ? 'bg-red-100 text-red-700'
          : 'bg-yellow-100 text-yellow-700'
        }`}>
        {getActionIcon(action)}
        {action}
      </span>
    );
  };

  // Status Cell Renderer
  const StatusCellRenderer = (params) => {
    const rec = params.data;
    return (
      <button
        onClick={() => handleStatusToggle(rec._id, rec.status)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${rec.status === 'Active'
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
    );
  };

  // More Options Cell Renderer
  const MoreOptionsCellRenderer = (params) => {
    const rec = params.data;
    return (
      <div className="flex justify-end">
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
      </div>
    );
  };

  // Column Definitions
  const columnDefs = useMemo(() => [
    {
      headerName: 'CATEGORY',
      field: 'category',
      cellRenderer: CategoryCellRenderer,
      width: 150,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'ASSET NAME',
      field: 'name',
      cellRenderer: AssetNameCellRenderer,
      width: 250,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'RMP',
      field: 'rmp',
      cellRenderer: PriceCellRenderer,
      width: 120,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'CMP',
      field: 'cmp',
      cellRenderer: PriceCellRenderer,
      width: 120,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'GAIN/LOSS %',
      field: 'gainLoss',
      cellRenderer: GainLossCellRenderer,
      width: 140,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'RISK LEVEL',
      field: 'riskProfile',
      cellRenderer: RiskLevelCellRenderer,
      width: 150,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'ACTION',
      field: 'action',
      cellRenderer: ActionCellRenderer,
      width: 120,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'STATUS',
      field: 'status',
      cellRenderer: StatusCellRenderer,
      width: 120,
      headerClass: 'ag-header-custom'
    },
    {
      headerName: 'MORE',
      field: 'more',
      cellRenderer: MoreOptionsCellRenderer,
      width: 100,
      headerClass: 'ag-header-custom',
      sortable: false,
      filter: false
    }
  ], []);

  // Default Column Definition
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    cellStyle: { padding: '24px 16px' }
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-9xl mx-auto px-2 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--dashboard-text-dark)]">Investment Recommendations</h1>
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

          {/* AG Grid Container */}
          <div className="p-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
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
              </div>
            ) : (
              <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
                <style jsx global>{`
                  .ag-header-custom {
                    background: linear-gradient(to right, #f8fafc, #f1f5f9) !important;
                    border-bottom: 1px solid #e5e7eb !important;
                    font-weight: 600 !important;
                    color: #374151 !important;
                    font-size: 0.875rem !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.05em !important;
                    padding: 16px !important;
                  }
                  
                  .ag-row {
                    border-bottom: 1px solid #f3f4f6 !important;
                  }
                  
                  .ag-row:hover {
                    background: linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(99, 102, 241, 0.05)) !important;
                  }
                  
                  .ag-cell {
                    border-right: none !important;
                    padding: 24px 16px !important;
                  }
                  
                  .ag-root-wrapper {
                    border: none !important;
                    border-radius: 12px !important;
                    overflow: hidden !important;
                  }
                  
                  .ag-header {
                    border-bottom: 1px solid #e5e7eb !important;
                  }
                `}</style>
                <AgGridReact
                  rowData={filtered}
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  suppressRowClickSelection={true}
                  rowHeight={100}
                  headerHeight={60}
                  animateRows={true}
                  suppressCellFocus={true}
                  pagination={true}
                  paginationPageSize={10}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}